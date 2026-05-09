import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Check, Clock, Copy, Link2, List, Mail, Plus, Share2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

function InterviewLink({ interview_id, formData }) {
  const [copied, setCopied] = useState(false);

  const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interview_id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const onSendEmail = () => {
    const recipient = prompt("Enter recipient email:");
    if (!recipient) return;
    const subject = encodeURIComponent("Your AI Interview Link — AiCruiter");
    const body = encodeURIComponent(`You have been invited to an AI-powered interview.\n\nInterview Link: ${url}\n\nPlease click the link above to start your interview.\n\nBest regards,\nAiCruiter Team`);
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  const onShareWhatsApp = () => {
    const text = encodeURIComponent(`You've been invited to an AI interview!\n\n${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  // Simple QR code using Google Charts API
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(url)}&bgcolor=ffffff&color=0d9488`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center"
    >
      {/* Success Header */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mb-5 shadow-lg shadow-green-500/20"
      >
        <Check className="w-8 h-8 text-white" />
      </motion.div>

      <h2 className="font-bold text-xl text-foreground">Your AI Interview is Ready! 🎉</h2>
      <p className="text-muted-foreground text-sm mt-1 text-center">Share this link with candidates to start the interview</p>

      {/* Main Card */}
      <div className="glass-card rounded-2xl p-6 mt-6 w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground text-sm">Interview Link</h3>
          </div>
          <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">Valid for 30 days</span>
        </div>

        <div className="mt-3 flex gap-2 items-center">
          <Input value={url} readOnly className="rounded-xl bg-accent/50 text-sm font-mono" />
          <Button
            onClick={handleCopy}
            className={`rounded-xl min-w-[120px] ${copied ? 'bg-emerald-500 hover:bg-emerald-500 text-white' : ''}`}
          >
            {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
            {copied ? "Copied!" : "Copy Link"}
          </Button>
        </div>

        <div className="h-px bg-border my-5" />

        <div className="flex gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {formData?.interviewDuration || "—"}</span>
          <span className="flex items-center gap-1.5"><List className="h-4 w-4" /> {formData?.interviewType?.join?.(", ") || formData?.interviewType || "Interview"}</span>
        </div>
      </div>

      {/* Share & QR Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 w-full">
        {/* Share Options */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="flex items-center gap-2 font-semibold text-foreground text-sm mb-4">
            <Share2 className="w-4 h-4 text-primary" /> Share Via
          </h3>
          <div className="flex flex-col gap-2">
            <Button variant="outline" onClick={onSendEmail} className="rounded-xl justify-start">
              <Mail className="w-4 h-4 mr-2" /> Send via Email
            </Button>
            <Button variant="outline" onClick={onShareWhatsApp} className="rounded-xl justify-start">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Send via WhatsApp
            </Button>
          </div>
        </div>

        {/* QR Code */}
        <div className="glass-card rounded-2xl p-5 flex flex-col items-center justify-center">
          <h3 className="flex items-center gap-2 font-semibold text-foreground text-sm mb-3">Scan to Join</h3>
          <img src={qrUrl} alt="QR Code" className="w-[140px] h-[140px] rounded-xl border border-border p-1" />
          <p className="text-[10px] text-muted-foreground mt-2">Candidates can scan this QR code</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 w-full mt-6">
        <Link href="/dashboard" className="flex-1">
          <Button variant="outline" className="w-full rounded-xl">
            <ArrowLeft className="w-4 h-4 mr-2" /> Dashboard
          </Button>
        </Link>
        <Link href="/dashboard/create-interview" className="flex-1">
          <Button className="w-full rounded-xl gradient-primary text-white border-0 shadow-md shadow-teal-500/20">
            <Plus className="w-4 h-4 mr-2" /> New Interview
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

export default InterviewLink;
