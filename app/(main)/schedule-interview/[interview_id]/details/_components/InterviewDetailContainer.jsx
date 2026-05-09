import { Calendar, Clock, Tag, FileText, Gauge } from "lucide-react";
import moment from "moment";
import React from "react";

function InterviewDetailContainer({ InterviewDetail }) {
  return (
    <div className="glass-card p-6 rounded-2xl">
      <h2 className="text-xl font-bold text-foreground">{InterviewDetail?.jobPosition}</h2>

      <div className="mt-5 flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Duration</p>
            <p className="text-sm font-semibold text-foreground">{InterviewDetail?.InterviewDuration}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Calendar className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Created</p>
            <p className="text-sm font-semibold text-foreground">{moment(InterviewDetail?.created_at).format('MMM DD, YYYY')}</p>
          </div>
        </div>

        {InterviewDetail?.InterviewType && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Tag className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Type</p>
              <p className="text-sm font-semibold text-foreground">{InterviewDetail?.InterviewType}</p>
            </div>
          </div>
        )}

        {InterviewDetail?.difficulty && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Gauge className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Difficulty</p>
              <p className="text-sm font-semibold text-foreground">{InterviewDetail.difficulty}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h3 className="flex items-center gap-2 font-semibold text-foreground text-sm mb-2">
          <FileText className="w-4 h-4 text-primary" /> Job Description
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed bg-accent/50 p-4 rounded-xl">{InterviewDetail?.jobDescription}</p>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-foreground text-sm mb-3">Interview Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {InterviewDetail?.questionList?.map((item, index) => (
            <div key={index} className="flex gap-2 p-3 rounded-xl bg-accent/50 hover:bg-accent transition-colors">
              <div className="w-6 h-6 rounded-md gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-[10px] font-bold">{index + 1}</span>
              </div>
              <span className="text-sm text-foreground">{item?.question}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default InterviewDetailContainer;