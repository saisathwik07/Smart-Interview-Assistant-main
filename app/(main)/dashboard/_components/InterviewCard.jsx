"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Send, Clock, Users, Briefcase, Gauge, Trash2, AlertTriangle } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { supabase } from "@/services/supabaseClient";

function InterviewCard({ interview, viewDetail = false, onDelete }) {
  const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interview?.interview_id}`;
  const [deleting, setDeleting] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const onSend = () => {
    const recipient = prompt("Enter recipient email:");
    if (!recipient) return;
    const subject = encodeURIComponent("Your AI Interview Link — AiCruiter");
    const body = encodeURIComponent(`You have been invited to an AI-powered interview.\n\nInterview Link: ${url}\n\nPlease click the link to start your interview.`);
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this interview? This cannot be undone.")) return;
    setDeleting(true);
    try {
      // Delete feedback first (foreign key)
      await supabase.from('interview-feedback').delete().eq('interview_id', interview.interview_id);
      const { error } = await supabase.from('interviews').delete().eq('interview_id', interview.interview_id);
      if (error) throw error;
      toast.success("Interview deleted");
      onDelete?.(interview.interview_id);
    } catch (e) {
      toast.error("Failed to delete interview");
    }
    setDeleting(false);
  };

  const candidateCount = interview['interview-feedback']?.length || 0;

  // Check expiry
  const isExpired = interview.expires_at && new Date(interview.expires_at) < new Date();
  const daysLeft = interview.expires_at 
    ? Math.ceil((new Date(interview.expires_at) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  // Difficulty color
  const difficultyColor = {
    Easy: 'bg-emerald-100 text-emerald-700',
    Medium: 'bg-amber-100 text-amber-700',
    Hard: 'bg-red-100 text-red-700',
    Expert: 'bg-purple-100 text-purple-700',
  }[interview?.difficulty] || 'bg-gray-100 text-gray-700';

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`glass-card rounded-2xl p-5 flex flex-col ${isExpired ? 'opacity-60' : ''}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-indigo-500 flex items-center justify-center shadow-md shadow-teal-500/20">
          <Briefcase className="w-5 h-5 text-white" />
        </div>
        <div className="flex items-center gap-1.5">
          {/* Status badge */}
          {isExpired ? (
            <span className="text-[10px] font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded-full flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Expired
            </span>
          ) : daysLeft !== null && daysLeft <= 3 ? (
            <span className="text-[10px] font-semibold bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">
              {daysLeft}d left
            </span>
          ) : null}
          {/* Difficulty */}
          {interview?.difficulty && (
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${difficultyColor}`}>
              {interview.difficulty}
            </span>
          )}
        </div>
      </div>

      <h2 className="font-bold text-foreground text-lg">{interview?.jobPosition}</h2>

      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {interview?.InterviewDuration}
        </span>
        {candidateCount > 0 && (
          <span className="flex items-center gap-1 text-emerald-600">
            <Users className="w-3.5 h-3.5" />
            {candidateCount} Candidate{candidateCount > 1 ? 's' : ''}
          </span>
        )}
      </div>

      <p className="text-xs text-muted-foreground mt-1.5">
        {moment(interview?.created_at).format("DD MMM YYYY")}
        {interview.expires_at && !isExpired && ` · Expires ${moment(interview.expires_at).format("DD MMM")}`}
      </p>

      <div className="flex-1" />

      {!viewDetail ? (
        <div className="flex gap-2 mt-5">
          <Button variant="outline" size="sm" onClick={copyLink} className="flex-1 rounded-xl" disabled={isExpired}>
            <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
          </Button>
          <Button size="sm" onClick={onSend} className="flex-1 rounded-xl gradient-primary text-white border-0 shadow-md shadow-teal-500/20" disabled={isExpired}>
            <Send className="mr-1.5 h-3.5 w-3.5" /> Send
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDelete} className="rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 px-2" disabled={deleting}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ) : (
        <div className="flex gap-2 mt-5">
          <a href={'/schedule-interview/' + interview?.interview_id + "/details"} className="flex-1">
            <Button className="w-full rounded-xl" variant="outline" size="sm">
              View Details
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </Button>
          </a>
          <Button variant="ghost" size="sm" onClick={handleDelete} className="rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 px-2" disabled={deleting}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </motion.div>
  );
}

export default InterviewCard;
