"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Button } from "./Buttons";
import { Input } from "./Input";

export const IngredientRecognition = () => {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setDescription("");
    setResult("");
    setError("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
    setError("");
  };

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError("Please describe the food first.");
      return;
    }

    setLoading(true);
    setResult("");
    setError("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: description, task: "ingredients" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate ingredients");
      }

      setResult(data.text || "No ingredient result returned from the model.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate ingredients"
      );
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
          <h1 className="font-bold">Ingredient recognition</h1>
        </div>
        <Button
          type="button"
          btnFor="reload"
          btnIcon="/reload.png"
          clickHandler={reset}
        />
      </div>

      <Input
        name="ingredient-description"
        placeholder="Жишээ: будаатай хуурга, тахиа, өндөгтэй"
        type="text"
        value={description}
        onChange={handleChange}
        onGenerate={handleGenerate}
        result={result}
        isLoading={loading}
        error={error}
      >
        Describe the food, and AI will suggest likely ingredients.
      </Input>
    </div>
  );
};
