"use client";

import React, { useContext, useEffect, useState } from "react";
import { InterviewDataContext } from "@/context/InterviewDataContext";

const formatTime = (seconds) => {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
};

const TimerComponent = ({ start }) => {
  const { interviewInfo } = useContext(InterviewDataContext);
  const savedTime = interviewInfo?.interviewData?.duration || 0; // in seconds
  const [elapsedTime, setElapsedTime] = useState(savedTime);

  useEffect(() => {
    if (!start) return;

    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, [start]);

  return <span>{formatTime(elapsedTime)}</span>;
};

export default TimerComponent;
