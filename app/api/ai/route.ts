export const runtime = "nodejs";
export const maxDuration = 60;

import { NextRequest, NextResponse } from "next/server";

const HF_TOKEN = process.env.HF_TOKEN;
const HF_TEXT_MODEL =
  process.env.HF_TEXT_MODEL || "Qwen/Qwen2.5-1.5B-Instruct:novita";

function buildIngredientPrompt(prompt: string) {
  return `
The user provided these ingredients:

${prompt}

Create one simple recipe using mostly these ingredients.
Include:
1. Recipe name
2. Ingredients
3. Short cooking steps
4. Estimated cooking time

If the input does not contain ingredients, ask the user to provide ingredients.
`;
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "/api/ai",
    runtime: "nodejs",
    hasToken: Boolean(process.env.HF_TOKEN),
    textModel: process.env.HF_TEXT_MODEL || null,
  });
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, task } = await request.json();

    if (!HF_TOKEN) {
      return NextResponse.json(
        { error: "HF_TOKEN is missing in .env.local" },
        { status: 500 }
      );
    }

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const finalPrompt =
      task === "ingredients" ? buildIngredientPrompt(prompt) : prompt;

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: HF_TEXT_MODEL,
          messages: [
            {
              role: "system",
              content:
                "You are a food and recipe assistant. Help users with recipes, ingredients, cooking steps, substitutions, meal ideas, and food-related questions. If the user asks something unrelated to food, politely redirect them back to food or recipe topics. Do not reveal chain-of-thought. Do not include <think> tags. Keep answers clear, practical, and concise.",
            },
            {
              role: "user",
              content: finalPrompt,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("HF text error:", data);
      return NextResponse.json(
        { error: data.error || "Hugging Face text request failed" },
        { status: response.status }
      );
    }

    function cleanModelOutput(text: string) {
      return text
        .replace(/<think>[\s\S]*?<\/think>/gi, "")
        .replace(/<think>[\s\S]*/gi, "")
        .trim();
    }
    const rawText =
      data.choices?.[0]?.message?.content ||
      data.choices?.[0]?.text ||
      "No response generated.";

    const text = cleanModelOutput(rawText);

    return NextResponse.json({ text });
  } catch (error) {
    console.error("AI route error:", error);
    return NextResponse.json({ error: "AI request failed" }, { status: 500 });
  }
}
