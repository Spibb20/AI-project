import type { ChangeEvent, ReactNode } from "react";

export type ButtonProps = {
  clickHandler?: () => void;
  children?: ReactNode;
  btnFor?: "adminButton" | "reload" | "generate";
  type?: "button" | "submit" | "reset";
  btnIcon?: string;
  disabled?: boolean;
};

export type InputPropsImgAnalysis = {
  children?: ReactNode;
  placeholder?: string;
  type?: "file" | "text";
  name?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onGenerate?: () => void;
  previewUrl?: string | null;
  result?: string;
  generatedImageUrl?: string | null;
  isLoading?: boolean;
  error?: string;
};
