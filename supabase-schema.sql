-- ==========================================
-- AiCruiter Database Schema
-- Run this in Supabase SQL Editor
-- ==========================================

-- 1. Users table
CREATE TABLE IF NOT EXISTS "Users" (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  picture TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Interviews table
CREATE TABLE IF NOT EXISTS interviews (
  id BIGSERIAL PRIMARY KEY,
  interview_id UUID UNIQUE NOT NULL,
  "jobPosition" TEXT NOT NULL,
  "jobDescription" TEXT,
  "InterviewDuration" TEXT,
  "InterviewType" TEXT,
  "questionList" JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Interview Feedback table
CREATE TABLE IF NOT EXISTS "interview-feedback" (
  id BIGSERIAL PRIMARY KEY,
  interview_id UUID REFERENCES interviews(interview_id),
  "userName" TEXT,
  "userEmail" TEXT,
  feedback JSONB,
  recommendation BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE "Users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE "interview-feedback" ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (adjust for production)
CREATE POLICY "Allow all on Users" ON "Users" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on interviews" ON interviews FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on interview-feedback" ON "interview-feedback" FOR ALL USING (true) WITH CHECK (true);
