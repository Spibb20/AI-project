import { NextRequest } from "next/server";
import { InferenceClient } from "@huggingface/inference";
import { error } from "console";

const HF_TOKEN = process.env.HF_TOKEN;
const inference = new InferenceClient(HF_TOKEN);

export const POST = async (request: NextRequest) => {};
