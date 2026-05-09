"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Send, Clock, Users, Briefcase } from "lucide-react";
import moment from "moment";
import React from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

function InterviewCard({ interview, viewDetail = false }) {
  const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interview?.interview_id}`;

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

  const candidateCount = interview['interview-feedback']?.length || 0;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="glass-card rounded-2xl p-5 flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-indigo-500 flex items-center justify-center shadow-md shadow-teal-500/20">
          <Briefcase className="w-5 h-5 text-white" />
        </div>
        <span className="text-xs text-muted-foreground bg-accent px-2.5 py-1 rounded-full font-medium">
          {moment(interview?.created_at).format("DD MMM YYYY")}
        </span>
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

      <div className="flex-1" />

      {!viewDetail ? (
        <div className="flex gap-2 mt-5">
          <Button variant="outline" size="sm" onClick={copyLink} className="flex-1 rounded-xl">
            <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
          </Button>
          <Button size="sm" onClick={onSend} className="flex-1 rounded-xl gradient-primary text-white border-0 shadow-md shadow-teal-500/20">
            <Send className="mr-1.5 h-3.5 w-3.5" /> Send
          </Button>
        </div>
      ) : (
        <a href={'/schedule-interview/' + interview?.interview_id + "/details"}>
          <Button className="mt-5 w-full rounded-xl" variant="outline" size="sm">
            View Details
            <ArrowRight className="ml-1.5 w-4 h-4" />
          </Button>
        </a>
      )}
    </motion.div>
  );
}

export default InterviewCard;
