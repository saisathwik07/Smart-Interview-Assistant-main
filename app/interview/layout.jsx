'use client';
import React, { useState } from 'react';
import InterviewHeader from './_components/InterviewHeader';
import { InterviewDataContext } from '@/context/InterviewDataContext';

function InterviewLayout({ children }) {
  const [interviewInfo, setInterviewInfo] = useState();
  return (
    <InterviewDataContext.Provider value={{ interviewInfo, setInterviewInfo }}>
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0c1222 0%, #0f172a 50%, #0c1a2e 100%)' }}>
        <InterviewHeader />
        {children}
      </div>
    </InterviewDataContext.Provider>
  );
}
export default InterviewLayout;