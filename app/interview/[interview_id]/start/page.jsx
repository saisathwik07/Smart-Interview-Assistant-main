"use client";

import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Loader2Icon, Mic, MicOff, Phone, Timer } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";
import TimerComponent from "./_components/TimerComponent";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const vapiRef = useRef(null);
  const conversationRef = useRef([]);
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState(null);
  const { interview_id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    }

    const vapi = vapiRef.current;

    const handleMessage = (message) => {
      // Capture conversation from message events
      if (message?.type === 'transcript' && message?.transcriptType === 'final') {
        conversationRef.current = [
          ...conversationRef.current,
          { role: message.role, content: message.transcript }
        ];
        setConversation(JSON.stringify(conversationRef.current));
      }
      // Also capture from conversation-update events  
      if (message?.type === 'conversation-update' && message?.conversation) {
        setConversation(JSON.stringify(message.conversation));
      }
      // Fallback: capture any message with conversation data
      if (message?.conversation) {
        setConversation(JSON.stringify(message.conversation));
      }
    };

    const handleCallStart = () => {
      toast.success("Call connected!");
      conversationRef.current = [];
    };
    const handleSpeechStart = () => setActiveUser(false);
    const handleSpeechEnd = () => setActiveUser(true);
    const handleCallEnd = () => {
      toast("Interview Ended");
      // Build conversation from ref if state wasn't updated
      if (conversationRef.current.length > 0 && !conversation) {
        setConversation(JSON.stringify(conversationRef.current));
      }
    };

    vapi.on("message", handleMessage);
    vapi.on("call-start", handleCallStart);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("call-end", handleCallEnd);

    return () => {
      vapi.off("message", handleMessage);
      vapi.off("call-start", handleCallStart);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("call-end", handleCallEnd);
    };
  }, []);

  useEffect(() => {
    if (interviewInfo && vapiRef.current) {
      startCall();
    }
  }, [interviewInfo]);

  const startCall = () => {
    const questionList = interviewInfo?.interviewData?.questionList
      ?.map((item) => item?.question)
      .filter(Boolean)
      .join(", ");

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
              You are an AI voice assistant conducting interviews.
              Your job is to ask candidates provided interview questions and assess their responses.
              Begin with a friendly introduction, setting a relaxed yet professional tone.
              Ask one question at a time and wait for the candidate's response.
              Questions: ${questionList}
              If the candidate struggles, offer hints or rephrase without giving the answer.
              Provide brief, encouraging feedback after each answer.
              Keep the conversation natural.
              After all questions, wrap up smoothly by summarizing performance.
              End positively.
              Key Guidelines: Be friendly, engaging. Keep responses short and natural. Adapt based on candidate's confidence.
            `.trim(),
          },
        ],
      },
    };
    vapiRef.current.start(assistantOptions);
  };

  const stopInterview = async () => {
    setLoading(true);
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
    // Small delay to let final transcripts arrive
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Use ref as fallback
    const finalConversation = conversation || (
      conversationRef.current.length > 0 ? JSON.stringify(conversationRef.current) : null
    );
    
    if (finalConversation) {
      setConversation(finalConversation);
    }
    GenerateFeedback(finalConversation);
  };

  const GenerateFeedback = async (conversationData) => {
    setLoading(true);
    const convo = conversationData || conversation;
    if (!convo) {
      toast.error("No conversation data captured. Please have a longer interview.");
      setLoading(false);
      return;
    }

    try {
      const result = await axios.post("/api/ai-feedback", {
        conversation: convo,
      });

      const content = result.data.content;
      if (!content) {
        toast.error("Failed to generate feedback.");
        setLoading(false);
        return;
      }

      const finalContent = content.replace(/```json/g, '').replace(/```/g, '').trim();
      
      let parsedFeedback;
      try {
        parsedFeedback = JSON.parse(finalContent);
      } catch {
        toast.error("Failed to parse feedback.");
        setLoading(false);
        return;
      }

      const { error } = await supabase
        .from("interview-feedback")
        .insert([
          {
            userName: interviewInfo?.userName,
            userEmail: interviewInfo?.userEmail,
            interview_id: interview_id,
            feedback: parsedFeedback,
            recommendation: false,
          },
        ])
        .select();

      if (error) {
        toast.error("Failed to save feedback.");
        setLoading(false);
        return;
      }

      router.replace('/interview/' + interview_id + '/completed');
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const VoiceWave = ({ active }) => (
    <div className="voice-wave">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{
          opacity: active ? 1 : 0.3,
          animationPlayState: active ? 'running' : 'paused'
        }} />
      ))}
    </div>
  );

  return (
    <div className="p-6 md:p-10 lg:px-48 xl:px-56 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="font-bold text-xl text-foreground">AI Interview Session</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {interviewInfo?.interviewData?.jobPosition || "Interview"} — {interviewInfo?.userName || "Candidate"}
            </p>
          </div>
          <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-2">
            <Timer className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm font-semibold"><TimerComponent start={true} /></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {/* AI Panel */}
          <motion.div
            animate={!activeUser ? { boxShadow: '0 0 30px rgba(59, 130, 246, 0.15)' } : { boxShadow: '0 0 0px transparent' }}
            className="glass-card h-[400px] rounded-2xl flex flex-col items-center justify-center gap-4 relative overflow-hidden"
          >
            {!activeUser && (
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent" />
            )}
            <div className="relative">
              {!activeUser && (
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 w-[80px] h-[80px] rounded-full bg-blue-500/30"
                />
              )}
              <Image
                src="/ai.jpg"
                alt="AI"
                width={120}
                height={120}
                className="w-[80px] h-[80px] rounded-full object-cover ring-4 ring-blue-500/20 relative z-10"
              />
            </div>
            <h2 className="text-lg font-semibold text-foreground">AI Recruiter</h2>
            <VoiceWave active={!activeUser} />
            {!activeUser && (
              <span className="text-xs text-primary font-medium animate-pulse">Speaking...</span>
            )}
          </motion.div>

          {/* User Panel */}
          <motion.div
            animate={activeUser ? { boxShadow: '0 0 30px rgba(59, 130, 246, 0.15)' } : { boxShadow: '0 0 0px transparent' }}
            className="glass-card h-[400px] rounded-2xl flex flex-col items-center justify-center gap-4 relative overflow-hidden"
          >
            {activeUser && (
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent" />
            )}
            <div className="relative">
              {activeUser && (
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 w-16 h-16 rounded-full bg-emerald-500/30"
                />
              )}
              <div className="gradient-primary text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold relative z-10 ring-4 ring-blue-500/20">
                {interviewInfo?.userName?.[0] || "U"}
              </div>
            </div>
            <h2 className="text-lg font-medium text-foreground">{interviewInfo?.userName || "Candidate"}</h2>
            <VoiceWave active={activeUser} />
            {activeUser && (
              <span className="text-xs text-emerald-500 font-medium animate-pulse">Your turn...</span>
            )}
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-5 mt-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMuted(!isMuted)}
            className={`h-14 w-14 rounded-full flex items-center justify-center transition-colors shadow-lg ${
              isMuted ? 'bg-red-100 text-red-500' : 'bg-accent text-foreground'
            }`}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </motion.button>

          {!loading ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={stopInterview}
              className="h-16 w-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/30 hover:bg-red-600 transition-colors"
            >
              <Phone className="h-6 w-6 rotate-[135deg]" />
            </motion.button>
          ) : (
            <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
              <Loader2Icon className="h-7 w-7 text-red-500 animate-spin" />
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          {loading ? "Generating AI feedback..." : "Interview in progress — click the red button to end"}
        </p>
      </motion.div>
    </div>
  );
}

export default StartInterview;