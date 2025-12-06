export const runtime = "nodejs";
export const maxDuration = 60;
import { Buffer } from "buffer";
import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

const HF_TOKEN = process.env.HF_TOKEN;
const HF_TEXT_TO_IMAGE_MODEL =
  process.env.HF_TEXT_TO_IMAGE_MODEL || "black-forest-labs/FLUX.1-schnell";

async function imageResultToDataUrl(result: Blob | string) {
  if (typeof result === "string") {
    if (result.startsWith("data:image/")) {
      return result;
    }

    if (result.startsWith("http://") || result.startsWith("https://")) {
      return result;
    }

    return `data:image/png;base64,${result}`;
  }

  const arrayBuffer = await result.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  const mimeType = result.type || "image/png";

  return `data:${mimeType};base64,${base64}`;
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "/api/image-generation",
    runtime: "nodejs",
    hasToken: Boolean(process.env.HF_TOKEN),
    imageModel: process.env.HF_TEXT_TO_IMAGE_MODEL || null,
  });
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

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

    const client = new InferenceClient(HF_TOKEN);

    const imageResult = await client.textToImage({
      model: HF_TEXT_TO_IMAGE_MODEL,
      provider: "auto",
      inputs: prompt,
      parameters: {
        width: 768,
        height: 768,
        num_inference_steps: 4,
      },
    });

    const imageUrl = await imageResultToDataUrl(imageResult);

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Image generation error:", error);

    const message =
      error instanceof Error ? error.message : "Image generation failed";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
