'use client'
import { Phone, Video, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

function CreateOptions() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <motion.div
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
        className='glass-card rounded-2xl p-6 cursor-pointer group'
        onClick={() => router.push('/dashboard/create-interview')}
      >
        <div className="flex items-start justify-between">
          <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-400 flex items-center justify-center shadow-md shadow-teal-500/20'>
            <Video className='w-6 h-6 text-white'/>
          </div>
          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
        <h2 className='font-bold text-foreground mt-4'>Create AI Interview</h2>
        <p className='text-muted-foreground text-sm mt-1'>Generate AI-powered questions and schedule interviews with candidates</p>
      </motion.div>

      <motion.div
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
        className='glass-card rounded-2xl p-6 cursor-pointer group opacity-60'
      >
        <div className="flex items-start justify-between">
          <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-400 flex items-center justify-center shadow-md shadow-purple-500/20'>
            <Phone className='w-6 h-6 text-white'/>
          </div>
          <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">Coming Soon</span>
        </div>
        <h2 className='font-bold text-foreground mt-4'>Phone Screening Call</h2>
        <p className='text-muted-foreground text-sm mt-1'>Schedule automated phone screening calls with candidates</p>
      </motion.div>
    </div>
  );
}

export default CreateOptions;
