"use client"
import WelcomeContainer from "@/app/(main)/dashboard/_components/WelcomeContainer";
import { supabase } from "@/services/supabaseClient";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import InterviewDetailContainer from "./_components/InterviewDetailContainer";
import CandidatList from "./_components/CandidatList";
import { motion } from "framer-motion";

function InterviewDetail() {
  const [interviewDetail, setInterviewDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const { interview_id } = useParams();

  useEffect(() => {
    if (interview_id) {
      GetInterviewDetail();
    }
  }, [interview_id]);

  const GetInterviewDetail = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('interviews')
      .select(`
        jobPosition,
        jobDescription,
        InterviewDuration,
        InterviewType,
        interview_id,
        questionList,
        created_at,
        interview-feedback(
          userName,
          userEmail,
          feedback,
          created_at
        )
      `)
      .eq('interview_id', interview_id)
      .single();

    if (error) {
      console.error("Error fetching interview:", error);
    } else {
      setInterviewDetail(data);
    }
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <WelcomeContainer />
      <h2 className="font-bold text-xl text-foreground mt-8 mb-5">Interview Details</h2>

      {loading && (
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div className="skeleton w-1/2 h-6 rounded-lg" />
          <div className="flex gap-8">
            <div className="skeleton w-24 h-10 rounded-lg" />
            <div className="skeleton w-24 h-10 rounded-lg" />
            <div className="skeleton w-24 h-10 rounded-lg" />
          </div>
          <div className="skeleton w-full h-4 rounded-lg" />
          <div className="skeleton w-3/4 h-4 rounded-lg" />
        </div>
      )}

      {!loading && interviewDetail && (
        <InterviewDetailContainer InterviewDetail={interviewDetail} />
      )}

      {!loading && (
        <CandidatList detail={interviewDetail?.['interview-feedback']} />
      )}
    </motion.div>
  );
}

export default InterviewDetail;
