"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./Buttons";
import { Input } from "./Input";

export const ImgAnalysis = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const reset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setUploadedImage(null);
    setPreviewUrl(null);
    setResult("");
    setError("");
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload JPG, PNG, WEBP or another image file.");
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setUploadedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult("");
    setError("");
  };

  const handleGenerate = async () => {
    if (!uploadedImage) {
      setError("Please upload an image first.");
      return;
    }

    setAnalyzing(true);
    setResult("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", uploadedImage);

      const response = await fetch("/api/object-detection", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze image");
      }

      setResult(data.caption || "No caption returned from the model.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze image");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="w-[400px] min-h-screen p-2 space-y-3">
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
        <Button
          type="button"
          btnFor="reload"
          btnIcon="/reload.png"
          clickHandler={reset}
        />
      </div>

      <Input
        name="image-analysis-upload"
        placeholder="JPG, PNG"
        type="file"
        onChange={handleFileChange}
        onGenerate={handleGenerate}
        previewUrl={previewUrl}
        result={result}
        isLoading={analyzing}
        error={error}
      >
        Upload a food photo, and AI will describe what it sees.
      </Input>
    </div>
  );
};
