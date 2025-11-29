"use client";

import { ButtonProps } from "@/lib/types";
import Image from "next/image";

export const Button = ({
  clickHandler,
  children,
  btnFor = "generate",
  type = "button",
  btnIcon,
  disabled = false,
}: ButtonProps) => {
  const color = {
    adminButton: "",
    reload: "w-fit p-2 h-8",
    generate: "border-black w-fit px-4 py-2 h-10",
  };

  return (
    <button
      type={type}
      onClick={clickHandler}
      disabled={disabled}
      className={`cursor-pointer rounded-md flex gap-2 border hover:bg-gray-200 items-center disabled:cursor-not-allowed disabled:opacity-50 ${
        color[btnFor] ?? ""
      }`}
    >
      {btnIcon ? (
        <Image alt="button icon" src={btnIcon} height={14} width={14} />
      ) : null}
      {children}
    </button>
  );
};
