'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Clock, Info, Loader2Icon, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import { useContext } from 'react'
import { InterviewDataContext } from '@/context/InterviewDataContext'

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
        .select('jobPosition, jobDescription, InterviewDuration, InterviewType')
        .eq('interview_id', interview_id);

      if (error) {
        throw error;
      }

      if (!interviews?.length) {
        toast.error("Interview link expired or invalid");
        return;
      }

      setInterviewData(interviews[0]);
    } catch (e) {
      toast.error("Interview link expired or invalid");
    } finally {
      setLoading(false);
    }
  }

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

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
        userName: userName,
        userEmail: userEmail,
        interviewData: interviews[0]
      });

      router.push('/interview/' + interview_id + '/start');
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-10">

      {/* Card */}
      <div className="flex flex-col items-center w-full max-w-md bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl shadow-md p-6">

        {/* Logo */}
        <Image 
          src="/logo.png" 
          alt="Logo" 
          width={140} 
          height={100} 
          className="w-[120px] mb-4"
        />

        {/* Main Heading */}
        <h1 className="text-2xl font-bold text-primary text-center mb-6">
          AI-Powered Interview Platform
        </h1>

        {/* Interview Illustration */}
        <Image 
          src="/interview.png" 
          alt="Interview Illustration" 
          width={300} 
          height={300} 
          className="w-[250px] mb-8"
        />

        {/* Job Title */}
        <h2 className="text-xl font-semibold text-center mb-2">
          {interviewData?.jobPosition || 'Loading...'}
        </h2>

        {/* Duration */}
        <p className="flex items-center gap-2 text-gray-500 text-sm mb-6">
          <Clock className="h-4 w-4" />
          {interviewData?.InterviewDuration || '--'}
        </p>

        {/* Full Name Input */}
        <div className="w-full mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your full name
          </label>
          <Input 
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            placeholder="e.g. John Doe" 
            className="w-full"
          />
        </div>
        
        {/* Email Input */}
        <div className="w-full mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your E-mail
          </label>
          <Input 
            value={userEmail}
            onChange={(event) => setUserEmail(event.target.value)}
            placeholder="e.g. john@example.com" 
            className="w-full"
            type="email"
          />
        </div>

        {/* Before You Begin Box */}
        <div className="w-full bg-blue-50 rounded-lg p-5 flex gap-4 items-start">
          <Info className="text-primary mt-1" />
          <div>
            <h3 className="font-bold text-base mb-2">Before You Begin</h3>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
              <li>Test your camera and microphone</li>
              <li>Ensure you have a stable internet connection</li>
              <li>Find a quiet place for the interview</li>
            </ul>
          </div>
        </div>

        {/* Join Interview Button */}
        <Button 
          className="mt-5 font-bold w-full flex items-center justify-center gap-2"
          disabled={loading || !userName.trim()}
          onClick={onJoinInterview}
        >
          {loading && <Loader2Icon className="animate-spin" />}
          <Video className="h-5 w-5" /> Join Interview
        </Button>

      </div>

    </div>
  );
}

export default Interview;
