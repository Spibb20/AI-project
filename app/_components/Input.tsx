"use client";

import { InputPropsImgAnalysis } from "@/lib/types";
import { Button } from "./Buttons";
import Image from "next/image";

export const Input = ({
  placeholder,
  type = "text",
  name = "input",
  value,
  onChange,
  onGenerate,
  previewUrl,
  result,
  generatedImageUrl,
  children,
  isLoading = false,
  error,
}: InputPropsImgAnalysis) => {
  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        onGenerate?.();
      }}
    >
      <label
        htmlFor={name}
        className="text-gray-500 text-[14px] flex flex-col gap-2"
      >
        {children}
        <input
          className="p-2 rounded-md border border-[#8E8E8E] text-black file-input"
          name={name}
          type={type}
          accept={type === "file" ? "image/*" : undefined}
          placeholder={placeholder}
          id={name}
          value={type === "text" ? value ?? "" : undefined}
          onChange={onChange}
        />
      </label>

      {previewUrl ? (
        <div className="w-full flex justify-center py-2">
          <Image
            src={previewUrl}
            alt="preview"
            width={220}
            height={220}
            className="rounded-md border object-contain"
            unoptimized
          />
        </div>
      ) : null}

      <div className="flex justify-end">
        <Button
          type="submit"
          btnFor="generate"
          btnIcon="/generative.png"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate"}
        </Button>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {generatedImageUrl ? (
        <div className="w-full flex justify-center py-2">
          <Image
            src={generatedImageUrl}
            alt="generated result"
            width={260}
            height={260}
            className="rounded-md border object-contain"
            unoptimized
          />
        </div>
      ) : null}

      {result ? (
        <div className="space-y-2">
          <div className="flex gap-2 h-4 items-center">
            <Image
              alt="summary icon"
              src="/summaryIcon.png"
              width={16}
              height={16}
            />
            <h1 className="font-bold">Here is the summary</h1>
          </div>
          <p className="whitespace-pre-line text-sm text-gray-800">{result}</p>
        </div>
      ) : null}
    </form>
  );
};
