import { QUESTION_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  const { jobPosition, jobDescription, interviewDuration, interviewType, difficulty } = await req.json();

  if (!jobPosition || !jobDescription) {
    return NextResponse.json({ error: "Job position and description are required" }, { status: 400 });
  }

  const FINAL_PROMPT = QUESTION_PROMPT
    .replace("{{jobTitle}}", jobPosition)
    .replace("{{jobDescription}}", jobDescription)
    .replace("{{duration}}", interviewDuration)
    .replace("{{type}}", interviewType)
    .replace(/{{difficulty}}/g, difficulty || "Medium");

  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4.1-nano",
      messages: [
        { role: "user", content: FINAL_PROMPT }
      ],
    });

    if (!completion?.choices?.[0]?.message) {
      return NextResponse.json({ error: "No response from AI model. Please try again." }, { status: 500 });
    }

    return NextResponse.json(completion.choices[0].message);
  } catch (e) {
    console.error("AI Model Error:", e?.message || e);
    return NextResponse.json({ error: e?.message || "Failed to generate questions. Check your API key." }, { status: 500 });
  }
}