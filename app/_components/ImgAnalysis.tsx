/*import { Button } from "./Buttons";
import Image from "next/image";
import { Input } from "./Input";

export const ImgAnalysis = () => {
  return (
    <div className="w-[400px] h-screen p-2">
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-2 h-4 items-center">
          <Image
            alt="tab title icon"
            src="/TabTitleIcon.png"
            width={16}
            height={16}
          ></Image>
          <h1 className="font-bold">Image Analysis</h1>
        </div>
        <Button type="reset" btnFor="reload" btnIcon="/reload.png"></Button>
      </div>
      <Input name="upload" placeholder="JPG, PNG" type="file"></Input>
    </div>
  );
};*/
"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "./Buttons";
import { Input } from "./Input";

export const ImgAnalysis = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [analyzing, setAnalyzing] = useState(false);
  const [detectedObjects, setDetectedObjects] = useState<any[]>([]);

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleGenerate = async () => {
    if (!uploadedImage) return;

    setAnalyzing(true);
    setDetectedObjects([]);

    try {
      const formData = new FormData();
      formData.append("image", uploadedImage);
      const response = await fetch("/api/object-detection", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setDetectedObjects(data.object || []);
      } else {
        console.error("Failed to analyze image");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setAnalyzing(false);
    }

    setResult("Detected ingredients: ...");
  };

  return (
    <div className="w-[400px] h-screen p-2 space-y-2">
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-2 h-4 items-center">
          <Image
            alt="tab title icon"
            src="/TabTitleIcon.png"
            width={16}
            height={16}
          />
          <h1 className="font-bold">Image Analysis</h1>
        </div>
        <Button type="reset" btnFor="reload" btnIcon="/reload.png"></Button>
      </div>

      <Input
        name="upload"
        placeholder="JPG, PNG"
        type="file"
        onChange={handleFileChange}
        onGenerate={handleGenerate}
        previewUrl={previewUrl}
        result={result}
        children="Upload a food photo, and AI will detect the ingredients."
      />
    </div>
  );
};
