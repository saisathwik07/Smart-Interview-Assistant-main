import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

function CandidateFeedbackDialog({ candidate }) {
  const feedback = candidate?.feedback?.feedback;
  //const score = Number(feedback?.Score) || 0;


  const scores = [
    feedback?.rating?.technicalSkills,
    feedback?.rating?.communication,
    feedback?.rating?.problemSolving,
    feedback?.rating?.experience,
  ];

  const validScores = scores.filter(score => typeof score === "number");
  const averageScore =
    validScores.length > 0
      ? (
          validScores.reduce((sum, score) => sum + score, 0) / validScores.length
        ).toFixed(1)
      : "N/A";

  // Score-based color logic
 const getScoreColorClass = avg => {
    if (avg <= 4) {
      return {
        bg: "bg-red-100",
        text: "text-red-700",
        btn: "bg-red-700",
      };
    } else if (avg <= 7) {
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        btn: "bg-yellow-700",
      };
    } else {
      return {
        bg: "bg-green-100",
        text: "text-green-700",
        btn: "bg-green-700",
      };
    }
  };

  const { bg, text, btn } = getScoreColorClass(Number(averageScore));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-primary">
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <h2 className="bg-primary p-3 px-4.5 font-bold text-white rounded-full">
                    {candidate.userName[0] || "U"}
                  </h2>
                  <div>
                    <h2 className="font-bold">{candidate?.userName}</h2>
                    <h2 className="text-sm text-gray-500">{candidate.userEmail}</h2>
                  </div>
                </div>
                <div className="flex gap-3">
                  <h2 className="text-primary text-2xl font-bold">{averageScore}/10</h2>
                </div>
              </div>

              <div className="mt-5">
                <h2 className="font-bold">Skill Assessment</h2>
                <div className="mt-3 grid grid-cols-2 gap-10">
                  <div>
                    <h2 className="flex justify-between">
                      Technical Skills <span>{feedback?.rating?.technicalSkills}</span>
                    </h2>
                    <Progress value={feedback?.rating?.technicalSkills * 10} className="mt-1" />
                  </div>

                  <div>
                    <h2 className="flex justify-between">
                      Communication Skills <span>{feedback?.rating?.communication}</span>
                    </h2>
                    <Progress value={feedback?.rating?.communication * 10} className="mt-1" />
                  </div>

                  <div>
                    <h2 className="flex justify-between">
                      Problem Solving Skills <span>{feedback?.rating?.problemSolving}</span>
                    </h2>
                    <Progress value={feedback?.rating?.problemSolving * 10} className="mt-1" />
                  </div>

                  <div>
                    <h2 className="flex justify-between">
                      Experience <span>{feedback?.rating?.experience}</span>
                    </h2>
                    <Progress value={feedback?.rating?.experience * 10} className="mt-1" />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h2 className="font-bold">Performance Summary</h2>
                <div className="p-5 bg-secondary my-3 rounded-md">
                  <p>{feedback?.summary || feedback?.summery}</p>
                </div>
              </div>

              <div className={`p-5 mt-5 flex items-center justify-between rounded-md ${bg}`}>
                <div>
                  <h2 className={`font-bold ${text}`}>Recommendation Message:</h2>
                  <p className={`${text}`}>{feedback?.RecommendationMsg || feedback?.recommendationMsg}</p>
                </div>
                <Button className={`${btn}`}>Send</Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CandidateFeedbackDialog;
