"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Clock, Sparkles, Home } from "lucide-react";

function InterviewCompleted() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 glass rounded-3xl p-10 max-w-lg w-full text-center border border-white/10"
        style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)' }}
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mb-6 shadow-lg shadow-green-500/20"
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-extrabold text-white mb-2"
        >
          Interview Complete!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300 mt-2"
        >
          Thank you for participating in the AI-powered interview with AiCruiter.
        </motion.p>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left mt-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h2 className="font-bold text-white">What&apos;s Next?</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            The recruiter will review your AI-generated feedback including scores on technical skills, communication, and problem-solving.
          </p>
          <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Response within 2–3 business days</span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <Link href="/">
            <button className="gradient-primary text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-teal-500/20 hover:opacity-90 transition-all flex items-center gap-2 mx-auto group">
              <Home className="w-4 h-4" />
              Back to Home
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default InterviewCompleted;
