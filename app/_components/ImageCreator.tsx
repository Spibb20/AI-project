"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Button } from "./Buttons";
import { Input } from "./Input";

export const ImageCreator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setPrompt("");
    setGeneratedImageUrl(null);
    setError("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
    setError("");
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please write an image prompt first.");
      return;
    }

    setLoading(true);
    setGeneratedImageUrl(null);
    setError("");

    try {
      const response = await fetch("/api/image-generation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate image");
      }

      setGeneratedImageUrl(data.imageUrl || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate image");
    } finally {
      setLoading(false);
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
          <h1 className="font-bold">Image creator</h1>
        </div>
        <Button
          type="button"
          btnFor="reload"
          btnIcon="/reload.png"
          clickHandler={reset}
        />
      </div>

      <Input
        name="image-prompt"
        placeholder="Жишээ: Mongolian noodle soup, realistic food photography"
        type="text"
        value={prompt}
        onChange={handleChange}
        onGenerate={handleGenerate}
        generatedImageUrl={generatedImageUrl}
        isLoading={loading}
        error={error}
      >
        Describe the food image you want to create.
      </Input>
    </div>
  );
};
