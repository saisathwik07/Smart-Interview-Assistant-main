import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InterviewType } from '@/services/Constants';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, FileText, Clock, Tag, Hash, Gauge, CalendarClock } from 'lucide-react';

function FormContainer({ onHandleInputChange, GoToNext }) {
  const [interviewType, setInterviewType] = useState([]);

  useEffect(() => {
    if (interviewType.length > 0) {
      onHandleInputChange('interviewType', interviewType);
    }
  }, [interviewType]);

  const AddInterviewType = (type) => {
    const alreadySelected = interviewType.includes(type);
    if (alreadySelected) {
      setInterviewType(interviewType.filter(item => item !== type));
    } else {
      setInterviewType(prev => [...prev, type]);
    }
  };

  return (
    <div className="glass-card p-6 rounded-2xl">
      {/* Job Position */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
          <Briefcase className="w-4 h-4 text-primary" />
          Job Position
        </label>
        <Input
          placeholder="e.g. Full Stack Developer"
          className="rounded-xl"
          onChange={(event) => onHandleInputChange('jobPosition', event.target.value)}
        />
      </div>

      {/* Job Description */}
      <div className="mt-5">
        <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
          <FileText className="w-4 h-4 text-primary" />
          Job Description
        </label>
        <Textarea
          placeholder="Describe the role, responsibilities, and required skills..."
          className="h-[150px] rounded-xl"
          onChange={(event) => onHandleInputChange('jobDescription', event.target.value)}
        />
      </div>

      {/* Row: Duration + Difficulty + Questions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {/* Interview Duration */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
            <Clock className="w-4 h-4 text-primary" />
            Duration
          </label>
          <Select onValueChange={(value) => onHandleInputChange('interviewDuration', value)}>
            <SelectTrigger className="w-full rounded-xl">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5 Min">5 Min</SelectItem>
              <SelectItem value="15 Min">15 Min</SelectItem>
              <SelectItem value="30 Min">30 Min</SelectItem>
              <SelectItem value="45 Min">45 Min</SelectItem>
              <SelectItem value="60 Min">60 Min</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Difficulty Level */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
            <Gauge className="w-4 h-4 text-primary" />
            Difficulty
          </label>
          <Select onValueChange={(value) => onHandleInputChange('difficulty', value)}>
            <SelectTrigger className="w-full rounded-xl">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Link Expiry */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
            <CalendarClock className="w-4 h-4 text-primary" />
            Link Expires
          </label>
          <Select onValueChange={(value) => onHandleInputChange('expiresIn', value)} defaultValue="7">
            <SelectTrigger className="w-full rounded-xl">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Day</SelectItem>
              <SelectItem value="3">3 Days</SelectItem>
              <SelectItem value="7">7 Days</SelectItem>
              <SelectItem value="14">14 Days</SelectItem>
              <SelectItem value="30">30 Days</SelectItem>
              <SelectItem value="never">Never</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Interview Type */}
      <div className="mt-5">
        <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
          <Tag className="w-4 h-4 text-primary" />
          Interview Type
        </label>
        <div className="flex gap-2 flex-wrap">
          {InterviewType.map((type, index) => (
            <button
              key={index}
              className={`flex items-center gap-2 py-2 px-4 rounded-xl border text-sm font-medium transition-all
              ${interviewType.includes(type.title)
                ? 'bg-primary/10 border-primary/30 text-primary shadow-sm'
                : 'border-border hover:bg-accent text-foreground/70'}`}
              onClick={() => AddInterviewType(type.title)}
            >
              <type.icon className="w-4 h-4" />
              <span>{type.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-end">
        <Button
          onClick={GoToNext}
          className="gradient-primary text-white border-0 rounded-xl shadow-md shadow-teal-500/20 px-6 py-5 font-semibold group"
        >
          Generate Questions
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}

export default FormContainer;
