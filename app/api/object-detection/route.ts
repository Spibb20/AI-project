import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

const HF_TOKEN = process.env.HF_TOKEN;
const inference = new InferenceClient(HF_TOKEN);

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const results = (await inference.imageToText({
      model: "nlpconnect/vit-gpt2-image-captioning",
      inputs: image,
    })) as any;

    /*const objects = results
      .filter((obj: any) => obj.score > 0.5)
      .map((obj: any) => ({
        label: obj.label,
        score: obj.score,
        box: obj.box,
      }));

    return NextResponse.json({ objects });*/
    return NextResponse.json({ caption: results.generated_text });
  } catch (error) {
    console.error("Error in object detection: ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
