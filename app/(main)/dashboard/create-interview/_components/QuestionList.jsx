import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2Icon, Sparkles, RefreshCw, AlertTriangle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import QuestionListContainer from './QuestionListContainer';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/services/supabaseClient';
import { motion } from 'framer-motion';

function QuestionList({ formData, onCreateLink }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questionList, setQuestionList] = useState([]);
  const user = useUser();
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, []);

  const GenerateQuestionList = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await axios.post('/api/ai-model', { ...formData });

      if (!result.data?.content) {
        setError("AI returned an empty response. Please try again.");
        setLoading(false);
        return;
      }

      const content = result.data.content;

      // Clean markdown code fences and extract JSON
      let cleanContent = content;
      // Remove thinking tags if present (some models include <think>...</think>)
      cleanContent = cleanContent.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
      // Remove code fences
      cleanContent = cleanContent.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

      // Try to find JSON in the response
      const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        setError("AI response was not in the expected format. Please retry.");
        setLoading(false);
        return;
      }

      let parsedContent;
      try {
        parsedContent = JSON.parse(jsonMatch[0]);
      } catch {
        setError("Failed to parse AI response. Please retry.");
        setLoading(false);
        return;
      }

      const questions = parsedContent?.InterviewQuestions || parsedContent?.interviewQuestions || parsedContent?.questions || [];

      if (questions.length === 0) {
        setError("AI didn't generate any questions. Please retry.");
        setLoading(false);
        return;
      }

      setQuestionList(questions);
      toast.success("Interview questions generated!");
    } catch (e) {
      const errMsg = e.response?.data?.error || "Failed to generate questions. Check your API key.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };
  
  const onFinish = async () => {
    setSaveLoading(true);
  
    try {
      if (!formData || !Array.isArray(questionList) || questionList.length === 0) {
        toast.error("No questions generated yet. Please wait or retry.");
        setSaveLoading(false);
        return;
      }

      const interview_id = uuidv4();

      // Calculate expiry date
      let expiresAt = null;
      if (formData.expiresIn && formData.expiresIn !== 'never') {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + parseInt(formData.expiresIn));
        expiresAt = expiry.toISOString();
      }

      // Base interview data
      const baseData = {
        jobPosition: String(formData.jobPosition || ''),
        jobDescription: String(formData.jobDescription || ''),
        InterviewDuration: String(formData.interviewDuration || ''),
        InterviewType: String(formData.interviewType || ''),
        questionList: questionList,
        interview_id: interview_id
      };

      // Try with new columns first
      let result = await supabase
        .from('interviews')
        .insert([{
          ...baseData,
          difficulty: String(formData.difficulty || 'Medium'),
          expires_at: expiresAt,
        }])
        .select();

      // If schema error (columns don't exist yet), retry without them
      if (result.error && result.error.message?.includes('schema')) {
        result = await supabase
          .from('interviews')
          .insert([baseData])
          .select();
      }
  
      if (result.error) {
        toast.error("Failed to save interview: " + result.error.message);
      } else {
        onCreateLink(interview_id);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again!");
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div>
      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-2xl flex gap-4 items-center"
        >
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-md shadow-teal-500/20">
            <Loader2Icon className="animate-spin text-white w-5 h-5" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Generating Interview Questions</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Our AI is crafting personalized questions — this may take 15-30 seconds...
            </p>
          </div>
        </motion.div>
      )}

      {/* Error State */}
      {!loading && error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-2xl"
        >
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Question Generation Failed</h2>
              <p className="text-sm text-muted-foreground mt-1">{error}</p>
            </div>
          </div>
          <Button
            onClick={GenerateQuestionList}
            variant="outline"
            className="mt-4 rounded-xl"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry Generation
          </Button>
        </motion.div>
      )}

      {/* Questions List */}
      {!loading && questionList?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <QuestionListContainer questionList={questionList} />
        </motion.div>
      )}

      {/* Finish Button — only show when questions exist */}
      {questionList?.length > 0 && (
        <div className='flex justify-end mt-8'>
          <Button
            onClick={onFinish}
            disabled={saveLoading}
            className="gradient-primary text-white border-0 rounded-xl shadow-md shadow-teal-500/20 px-6 py-5 font-semibold"
          >
            {saveLoading && <Loader2Icon className="animate-spin mr-2" />}
            <Sparkles className="w-4 h-4 mr-2" />
            Create Interview Link & Finish
          </Button>
        </div>
      )}
    </div>
  );
}

export default QuestionList;
