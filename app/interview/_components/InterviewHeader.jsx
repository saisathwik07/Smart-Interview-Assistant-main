import React from 'react';
import { Sparkles } from 'lucide-react';

function InterviewHeader() {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)' }}>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-md shadow-teal-500/20">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="text-lg font-bold text-white">AiCruiter</span>
      </div>
    </header>
  );
}

export default InterviewHeader;
