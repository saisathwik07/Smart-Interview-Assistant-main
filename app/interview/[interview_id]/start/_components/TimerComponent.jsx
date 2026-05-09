"use client";

import React, { useEffect, useState } from "react";

const formatTime = (seconds) => {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
};

const TimerComponent = ({ start }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!start) return;

    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [start]);

  return <span>{formatTime(elapsedTime)}</span>;
};

export default TimerComponent;
