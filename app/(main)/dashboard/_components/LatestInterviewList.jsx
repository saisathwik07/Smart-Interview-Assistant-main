"use client";
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { Video, Inbox } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import InterviewCard from './InterviewCard';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

function LatestInterviewList() {
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
      .select('*')
      .order('id', { ascending: false })
      .limit(6);
  
    if (error) {
      console.error("Error fetching interviews:", error);
      toast.error("Failed to fetch interviews.");
    } else {
      setInterviewList(interviews || []);
    }
    setLoading(false);
  };

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-xl text-foreground">Recent Interviews</h2>
        {interviewList?.length > 0 && (
          <button 
            onClick={() => router.push('/all-interview')}
            className="text-sm text-primary font-medium hover:underline"
          >
            View All →
          </button>
        )}
      </div>

      {loading && (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[1,2,3].map(i => (
            <div key={i} className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="skeleton w-10 h-10 rounded-xl" />
                <div className="skeleton w-20 h-5 rounded-full" />
              </div>
              <div className="skeleton w-3/4 h-5 rounded-lg mb-3" />
              <div className="skeleton w-1/2 h-4 rounded-lg mb-6" />
              <div className="flex gap-2">
                <div className="skeleton flex-1 h-9 rounded-xl" />
                <div className="skeleton flex-1 h-9 rounded-xl" />
              </div>
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
          <p className="text-muted-foreground text-sm mb-5">Create your first AI-powered interview to get started</p>
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
          {interviewList.map((interview, index) => (
            <motion.div
              key={interview.interview_id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <InterviewCard 
                interview={interview}
                onDelete={(id) => setInterviewList(prev => prev.filter(i => i.interview_id !== id))}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default LatestInterviewList;
