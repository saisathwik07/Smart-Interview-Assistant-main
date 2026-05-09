"use client";

import { useUser } from "@/app/provider";
import { Sparkles } from "lucide-react";
import React from "react";

function WelcomeContainer() {
  const user = useUser();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="relative overflow-hidden glass-card rounded-2xl p-6">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 via-purple-500/5 to-transparent rounded-bl-full" />
      
      <div className="flex justify-between items-center relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">{getGreeting()}</span>
          </div>
          <h2 className="text-xl font-bold text-foreground">
            Welcome back, {user?.name || "User"} 👋
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            AI-Driven Interviews, Hassle-Free Hiring
          </p>
        </div>
        {user?.picture ? (
          <img
            src={user.picture}
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20 shadow-lg"
          />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center gradient-primary rounded-full text-white text-lg font-bold shadow-lg shadow-blue-500/20">
            {user?.name?.[0] || "U"}
          </div>
        )}
      </div>
    </div>
  );
}

export default WelcomeContainer;
