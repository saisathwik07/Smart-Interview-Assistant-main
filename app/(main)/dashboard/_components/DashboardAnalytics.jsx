"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, Users, Briefcase, Clock, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

function DashboardAnalytics() {
  const [stats, setStats] = useState({ total: 0, candidates: 0, avgScore: 0, thisWeek: 0 });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch interviews
      const { data: interviews } = await supabase
        .from("interviews")
        .select("created_at")
        .order("created_at", { ascending: true });

      // Fetch feedback
      const { data: feedbacks } = await supabase
        .from("interview-feedback")
        .select("feedback, created_at");

      const total = interviews?.length || 0;
      const candidates = feedbacks?.length || 0;

      // Calculate average score
      let totalScore = 0;
      let scoreCount = 0;
      feedbacks?.forEach((f) => {
        const fb = typeof f.feedback === "string" ? JSON.parse(f.feedback) : f.feedback;
        const rating = fb?.feedback?.rating || fb?.rating;
        if (rating) {
          const scores = [rating.technicalSkills, rating.communication, rating.problemSolving, rating.experience].filter(
            (s) => typeof s === "number"
          );
          if (scores.length) {
            totalScore += scores.reduce((a, b) => a + b, 0) / scores.length;
            scoreCount++;
          }
        }
      });
      const avgScore = scoreCount ? (totalScore / scoreCount).toFixed(1) : "—";

      // This week count
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const thisWeek = interviews?.filter((i) => new Date(i.created_at) > weekAgo).length || 0;

      setStats({ total, candidates, avgScore, thisWeek });

      // Build chart data (last 7 days)
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dayStr = d.toLocaleDateString("en-US", { weekday: "short" });
        const dateStr = d.toISOString().split("T")[0];
        const count = interviews?.filter((item) => item.created_at?.startsWith(dateStr)).length || 0;
        const fbCount = feedbacks?.filter((item) => item.created_at?.startsWith(dateStr)).length || 0;
        days.push({ day: dayStr, interviews: count, candidates: fbCount });
      }
      setChartData(days);
    } catch (err) {
      console.error("Analytics error:", err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: "Total Interviews", value: stats.total, icon: Briefcase, color: "from-teal-500 to-emerald-400", change: `+${stats.thisWeek} this week` },
    { label: "Candidates", value: stats.candidates, icon: Users, color: "from-indigo-500 to-violet-400", change: "Total responses" },
    { label: "Avg Score", value: stats.avgScore, icon: TrendingUp, color: "from-amber-500 to-orange-400", change: "Out of 10" },
    { label: "This Week", value: stats.thisWeek, icon: Clock, color: "from-rose-500 to-pink-400", change: "New interviews" },
  ];

  if (loading) {
    return (
      <div className="mt-8">
        <div className="skeleton w-48 h-6 rounded-lg mb-5" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-card rounded-2xl p-5">
              <div className="skeleton w-8 h-8 rounded-lg mb-3" />
              <div className="skeleton w-12 h-7 rounded-lg mb-2" />
              <div className="skeleton w-24 h-4 rounded-lg" />
            </div>
          ))}
        </div>
        <div className="glass-card rounded-2xl p-5">
          <div className="skeleton w-full h-48 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="font-bold text-xl text-foreground mb-5">Analytics Overview</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card rounded-2xl p-5"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md mb-3`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-extrabold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            <div className="flex items-center gap-1 mt-2 text-[10px] text-primary font-medium">
              <ArrowUpRight className="w-3 h-3" />
              {stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground text-sm">Last 7 Days Activity</h3>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-teal-500" /> Interviews</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500" /> Candidates</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0d9488" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#0d9488" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCandidates" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#a8a29e" axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12 }} stroke="#a8a29e" axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.95)",
                border: "1px solid #e7e5e4",
                borderRadius: "12px",
                fontSize: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <Area type="monotone" dataKey="interviews" stroke="#0d9488" strokeWidth={2} fill="url(#colorInterviews)" />
            <Area type="monotone" dataKey="candidates" stroke="#6366f1" strokeWidth={2} fill="url(#colorCandidates)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

export default DashboardAnalytics;
