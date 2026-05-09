"use client";
import { supabase } from '@/services/supabaseClient';
import { Inbox, Search, SlidersHorizontal } from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';
import { toast } from 'sonner';
import InterviewCard from '../dashboard/_components/InterviewCard';
import WelcomeContainer from '../dashboard/_components/WelcomeContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

function AllInterview() {
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const router = useRouter();

  useEffect(() => {
    GetInterviewList();
  }, []);

  const GetInterviewList = async () => {
    setLoading(true);
    const { data: interviews, error } = await supabase
      .from('interviews')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      toast.error("Failed to fetch interviews.");
    } else {
      setInterviewList(interviews || []);
    }
    setLoading(false);
  };

  const filteredList = useMemo(() => {
    let list = [...interviewList];

    // Search filter
    if (searchQuery.trim()) {
      list = list.filter(i =>
        i.jobPosition?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.jobDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.InterviewType?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === "oldest") {
      list.reverse();
    } else if (sortBy === "name") {
      list.sort((a, b) => (a.jobPosition || "").localeCompare(b.jobPosition || ""));
    }

    return list;
  }, [interviewList, searchQuery, sortBy]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <WelcomeContainer />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 mb-5">
        <h2 className="font-bold text-xl text-foreground">
          All Interviews
          {!loading && <span className="text-sm font-normal text-muted-foreground ml-2">({filteredList.length})</span>}
        </h2>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search interviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-56 rounded-xl bg-accent/50 border-border"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm px-3 py-2 rounded-xl bg-accent/50 border border-border text-foreground cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">By Name</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="skeleton w-10 h-10 rounded-xl" />
                <div className="skeleton w-20 h-5 rounded-full" />
              </div>
              <div className="skeleton w-3/4 h-5 rounded-lg mb-3" />
              <div className="skeleton w-1/2 h-4 rounded-lg mb-6" />
              <div className="flex gap-2">
                <div className="skeleton flex-1 h-9 rounded-xl" />
                <div className="skeleton flex-1 h-9 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !filteredList?.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-10 flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500/10 to-indigo-500/10 flex items-center justify-center mb-4">
            <Inbox className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-bold text-foreground text-lg mb-1">
            {searchQuery ? "No results found" : "No interviews yet"}
          </h3>
          <p className="text-muted-foreground text-sm mb-5">
            {searchQuery ? `No interviews match "${searchQuery}"` : "Create your first AI-powered interview to get started"}
          </p>
          {!searchQuery && (
            <Button
              onClick={() => router.push('/dashboard/create-interview')}
              className="gradient-primary text-white border-0 rounded-xl shadow-md shadow-teal-500/20"
            >
              + Create New Interview
            </Button>
          )}
        </motion.div>
      )}

      {!loading && filteredList?.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredList.map((interview, index) => (
            <motion.div
              key={interview.interview_id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <InterviewCard 
                interview={interview} 
                onDelete={(id) => setInterviewList(prev => prev.filter(i => i.interview_id !== id))}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
export default AllInterview;