import { NextRequest, NextResponse } from "next/server";

const HF_TOKEN = process.env.HF_TOKEN;
const HF_IMAGE_TO_TEXT_MODEL =
  process.env.HF_IMAGE_TO_TEXT_MODEL || "google/gemma-3-4b-it";

async function fileToDataUrl(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");
  const mimeType = file.type || "image/png";

  return `data:${mimeType};base64,${base64}`;
}

function cleanModelOutput(text: string) {
  return text
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/<think>[\s\S]*/gi, "")
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    if (!HF_TOKEN) {
      return NextResponse.json(
        { error: "HF_TOKEN is missing in .env.local" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const image = formData.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }

    const imageUrl = await fileToDataUrl(image);

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: HF_IMAGE_TO_TEXT_MODEL,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Look at the image and answer only in this format:\n\nVisible ingredients: ...\nRecipe idea: ...\n\nDo not explain your reasoning. Do not write analysis. Do not include markdown table.",
                },
                {
                  type: "image_url",
                  image_url: {
                    url: imageUrl,
                  },
                },
              ],
            },
          ],
          max_tokens: 900,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const message =
        typeof data.error === "string"
          ? data.error
          : data.error?.message || "Hugging Face image analysis failed";

      console.error("HF image analysis error:", data);

      return NextResponse.json({ error: message }, { status: response.status });
    }

    console.log("HF image raw response:", JSON.stringify(data, null, 2));
    const message = data.choices?.[0]?.message;

    const rawText =
      typeof message?.content === "string"
        ? message.content
        : data.choices?.[0]?.text || "";

    const caption = cleanModelOutput(rawText);

    if (!caption || caption.length < 10) {
      return NextResponse.json({
        caption:
          "The model detected the image, but returned an incomplete answer. Try another image analysis model or increase max_tokens.",
      });
    }

    return NextResponse.json({ caption });
  } catch (error) {
    console.error("Image analysis error:", error);

    const message =
      error instanceof Error ? error.message : "Image analysis failed";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
