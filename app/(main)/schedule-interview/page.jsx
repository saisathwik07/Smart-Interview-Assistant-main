"use client";
import { supabase } from '@/services/supabaseClient';
import { Inbox } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import InterviewCard from '../dashboard/_components/InterviewCard';
import WelcomeContainer from '../dashboard/_components/WelcomeContainer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

function ScheduledInterview() {
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    GetInterviewList();
  }, []);

  const GetInterviewList = async () => {
    setLoading(true);
    const { data: interviews, error } = await supabase
      .from('interviews')
      .select(`
        jobPosition,
        jobDescription,
        InterviewDuration,
        InterviewType,
        interview_id,
        questionList,
        created_at,
        difficulty,
        expires_at,
        interview-feedback(userEmail)
      `)
      .order('id', { ascending: false });

    if (error) {
      toast.error("Failed to fetch interviews.");
    } else {
      setInterviewList(interviews || []);
    }
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <WelcomeContainer />
      <h2 className="font-bold text-xl text-foreground mt-8 mb-5">Scheduled Interviews & Feedback</h2>

      {loading && (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="skeleton w-10 h-10 rounded-xl" />
                <div className="skeleton w-20 h-5 rounded-full" />
              </div>
              <div className="skeleton w-3/4 h-5 rounded-lg mb-3" />
              <div className="skeleton w-1/2 h-4 rounded-lg mb-6" />
              <div className="skeleton w-full h-9 rounded-xl" />
            </div>
          ))}
        </div>
      )}

      {!loading && !interviewList?.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-10 flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500/10 to-indigo-500/10 flex items-center justify-center mb-4">
            <Inbox className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-bold text-foreground text-lg mb-1">No interviews yet</h3>
          <p className="text-muted-foreground text-sm mb-5">Create your first interview to see candidate feedback here</p>
          <Button
            onClick={() => router.push('/dashboard/create-interview')}
            className="gradient-primary text-white border-0 rounded-xl shadow-md shadow-teal-500/20"
          >
            + Create New Interview
          </Button>
        </motion.div>
      )}

      {!loading && interviewList?.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {interviewList?.map((interview, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <InterviewCard 
                interview={interview} 
                viewDetail={true}
                onDelete={(id) => setInterviewList(prev => prev.filter(i => i.interview_id !== id))}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
export default ScheduledInterview;