"use client";
import React, { useState } from 'react';
import WelcomeContainer from '../_components/WelcomeContainer';
import { ArrowLeft, FileText, Sparkles, Link as LinkIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import FormContainer from './_components/FormContainer';
import QuestionList from './_components/QuestionList';
import { toast } from 'sonner';
import InterviewLink from './_components/InterviewLink';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  { label: "Job Details", icon: FileText },
  { label: "AI Questions", icon: Sparkles },
  { label: "Share Link", icon: LinkIcon },
];

function CreateInterview() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const [interviewId, setInterviewId] = useState();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const GoToNext = () => {
    if (!formData?.jobPosition || !formData?.jobDescription || !formData?.interviewDuration || !formData?.interviewType) {
      toast.error("Please fill all the fields");
      return;
    }
    setStep(step + 1);
  };

  const onCreateLink = (interview_id) => {
    setInterviewId(interview_id);
    setStep(step + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <WelcomeContainer />

      <div className="mt-8 px-0 md:px-16 lg:px-32 xl:px-44">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h2 className="font-bold text-xl text-foreground">Create New Interview</h2>
        </div>

        {/* Step Indicator */}
        <div className="glass-card rounded-2xl p-5 mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                  step > i + 1
                    ? 'gradient-primary text-white shadow-md shadow-teal-500/20'
                    : step === i + 1
                    ? 'gradient-primary text-white shadow-md shadow-teal-500/20'
                    : 'bg-accent text-muted-foreground'
                }`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${
                  step >= i + 1 ? 'text-foreground' : 'text-muted-foreground'
                }`}>{s.label}</span>
                {i < 2 && (
                  <div className={`flex-1 h-0.5 mx-3 rounded-full transition-all ${
                    step > i + 1 ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={step * 33.33} className="h-1.5 rounded-full" />
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && <FormContainer onHandleInputChange={onHandleInputChange} GoToNext={GoToNext} />}
            {step === 2 && <QuestionList formData={formData} onCreateLink={onCreateLink} />}
            {step === 3 && <InterviewLink interview_id={interviewId} formData={formData} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default CreateInterview;
