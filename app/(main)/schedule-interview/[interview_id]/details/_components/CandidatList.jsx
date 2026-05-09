import { Button } from "@/components/ui/button";
import moment from "moment";
import React from "react";
import CandidateFeedbackDialog from "./CandidateFeedbackDialog";
import { Users } from "lucide-react";

function CandidatList({ detail }) {
  const calculateAverageScore = (feedback) => {
    if (typeof feedback === "string") {
      try {
        feedback = JSON.parse(feedback);
      } catch {
        return "N/A";
      }
    }
    const rating = feedback?.rating;
    const scores = [
      rating?.technicalSkills,
      rating?.communication,
      rating?.problemSolving,
      rating?.experience,
    ];
    const validScores = scores.filter((score) => typeof score === "number");
    return validScores.length
      ? (validScores.reduce((a, b) => a + b, 0) / validScores.length).toFixed(1)
      : "N/A";
  };

  return (
    <div className="mt-8">
      <h2 className="flex items-center gap-2 font-bold text-foreground text-lg mb-4">
        <Users className="w-5 h-5 text-primary" />
        Candidates ({detail?.length || 0})
      </h2>

      {(!detail || detail.length === 0) && (
        <div className="glass-card rounded-2xl p-8 text-center">
          <p className="text-sm text-muted-foreground">No candidates have completed this interview yet.</p>
        </div>
      )}

      <div className="space-y-3">
        {detail?.map((candidate, index) => {
          const averageScore = calculateAverageScore(candidate?.feedback?.feedback);
          const numScore = parseFloat(averageScore);
          const scoreColor =
            averageScore === "N/A"
              ? "text-muted-foreground"
              : numScore >= 7
              ? "text-emerald-600"
              : numScore >= 4
              ? "text-amber-600"
              : "text-red-500";
          const scoreBg =
            averageScore === "N/A"
              ? "bg-accent"
              : numScore >= 7
              ? "bg-emerald-50"
              : numScore >= 4
              ? "bg-amber-50"
              : "bg-red-50";

          return (
            <div
              key={index}
              className="glass-card rounded-2xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md shadow-teal-500/20">
                  {candidate.userName?.[0]?.toUpperCase() || "?"}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{candidate?.userName}</h3>
                  <p className="text-xs text-muted-foreground">
                    Completed {moment(candidate?.created_at).format("MMM DD, YYYY")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${scoreColor} ${scoreBg}`}>
                  {averageScore}/10
                </div>
                <CandidateFeedbackDialog candidate={candidate} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CandidatList;
