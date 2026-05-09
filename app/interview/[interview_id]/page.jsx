'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Clock, Info, Loader2Icon, Video, User, Mail, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import { useContext } from 'react'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { motion } from 'framer-motion'

function Interview() {
  const { interview_id } = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { setInterviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();

  useEffect(() => {
    if (interview_id) {
      GetInterviewDetails();
    }
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    setLoading(true);
    try {
      const { data: interviews, error } = await supabase
        .from('interviews')
        .select('jobPosition, jobDescription, InterviewDuration, InterviewType, questionList, difficulty, expires_at')
        .eq('interview_id', interview_id);

      if (error) throw error;
      if (!interviews?.length) {
        toast.error("Interview link expired or invalid");
        return;
      }
      
      // Check expiry
      const interview = interviews[0];
      if (interview.expires_at && new Date(interview.expires_at) < new Date()) {
        setInterviewData({ ...interview, expired: true });
        return;
      }
      
      setInterviewData(interview);
    } catch (e) {
      toast.error("Interview link expired or invalid");
    } finally {
      setLoading(false);
    }
  }

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const onJoinInterview = async () => {
    if (!userName.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (!userEmail.trim() || !validateEmail(userEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const { data: interviews, error } = await supabase
        .from('interviews')
        .select('*')
        .eq('interview_id', interview_id);

      if (error || !interviews?.length) {
        toast.error("Failed to load interview data");
        setLoading(false);
        return;
      }

      setInterviewInfo({
        userName,
        userEmail,
        interviewData: interviews[0]
      });

      router.push('/interview/' + interview_id + '/start');
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (interviewData?.expired) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex flex-col items-center w-full max-w-md glass rounded-3xl p-10 shadow-2xl border border-white/10 text-center"
          style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)' }}
        >
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Link Expired</h2>
          <p className="text-gray-300 mt-2 text-sm">
            The interview for <span className="font-semibold text-white">{interviewData.jobPosition}</span> has expired. Please contact the recruiter for a new link.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center w-full max-w-md glass rounded-3xl p-8 shadow-2xl border border-white/10"
        style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shadow-lg shadow-teal-500/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">AiCruiter</span>
        </div>

        {/* Job Title */}
        {interviewData ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">{interviewData.jobPosition}</h2>
            <p className="flex items-center justify-center gap-1.5 text-gray-300 text-sm mt-2">
              <Clock className="h-3.5 w-3.5" />
              {interviewData.InterviewDuration}
            </p>
          </motion.div>
        ) : (
          <div className="text-center mb-6">
            <div className="skeleton w-48 h-7 rounded-lg mx-auto mb-2" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <div className="skeleton w-24 h-4 rounded-lg mx-auto" style={{ background: 'rgba(255,255,255,0.1)' }} />
          </div>
        )}

        {/* Name Input */}
        <div className="w-full mb-4">
          <label className="flex items-center gap-1.5 text-sm font-medium text-gray-300 mb-2">
            <User className="w-3.5 h-3.5" /> Full Name
          </label>
          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="e.g. John Doe"
            className="bg-white/10 border-white/15 text-white placeholder:text-gray-400 rounded-xl"
          />
        </div>

        {/* Email Input */}
        <div className="w-full mb-6">
          <label className="flex items-center gap-1.5 text-sm font-medium text-gray-300 mb-2">
            <Mail className="w-3.5 h-3.5" /> Email Address
          </label>
          <Input
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="e.g. john@example.com"
            type="email"
            className="bg-white/10 border-white/15 text-white placeholder:text-gray-400 rounded-xl"
          />
        </div>

        {/* Before You Begin */}
        <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 flex gap-3 items-start mb-6">
          <Info className="text-primary mt-0.5 w-5 h-5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-white text-sm mb-1.5">Before You Begin</h3>
            <ul className="text-gray-300 text-xs space-y-1 list-disc list-inside">
              <li>Test your microphone</li>
              <li>Ensure stable internet</li>
              <li>Find a quiet environment</li>
            </ul>
          </div>
        </div>

        {/* Join Button */}
        <Button
          className="w-full gradient-primary text-white font-semibold py-6 rounded-xl shadow-lg shadow-teal-500/25 hover:opacity-90 transition-all text-base"
          disabled={loading || !userName.trim()}
          onClick={onJoinInterview}
        >
          {loading && <Loader2Icon className="animate-spin mr-2" />}
          <Video className="h-5 w-5 mr-2" /> Join Interview
        </Button>
      </motion.div>
    </div>
  );
}

export default Interview;
