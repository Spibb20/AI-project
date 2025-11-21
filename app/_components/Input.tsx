/*import { InputPropsImgAnalysis } from "@/lib/types";
import { Button } from "./Buttons";
import Image from "next/image";
export const Input = ({
  children,
  placeholder,
  type,
  name,
  onChange,
}: InputPropsImgAnalysis) => {
  return (
    <form className="flex flex-col gap-1 ">
      <label
        htmlFor={name}
        className="text-gray-400 text-[14px] flex flex-col gap-2 "
      >
        Upload a food photo, and AI will detect the ingredients.
        <input
          className="p-2 rounded-md border border-[#8E8E8E]"
          name={name}
          type={type}
          accept="image/*"
          placeholder={placeholder}
          id={name}
          onChange={onChange}
        />
      </label>
      <div className="flex justify-end">
        <Button btnFor="generate" btnIcon="/generative.png">
          Generate
        </Button>
      </div>
      <div className="flex gap-2 h-4 items-center">
        <Image
          alt="tab title icon"
          src="/summaryIcon.png"
          width={16}
          height={16}
        ></Image>
        <h1 className="font-bold">Here is the summary</h1>
      </div>
      <p>Result</p>
    </form>
  );
};*/

import { InputPropsImgAnalysis } from "@/lib/types";
import { Button } from "./Buttons";
import Image from "next/image";

export const Input = ({
  placeholder,
  type,
  name,
  onChange,
  onGenerate,
  previewUrl,
  result,
  children,
}: any) => {
  return (
    <form className="flex flex-col gap-1 ">
      <label
        htmlFor={name}
        className="text-gray-400 text-[14px] flex flex-col gap-2 "
      >
        {children}
        <input
          className="p-2 rounded-md border border-[#8E8E8E] active: text-black file-input"
          name={name}
          type={type}
          accept="image/*"
          placeholder={placeholder}
          id={name}
          onChange={onChange}
        />
      </label>

      {previewUrl && (
        <div className="w-full flex justify-center py-2">
          <Image
            src={previewUrl}
            alt="preview"
            width={200}
            height={200}
            className="rounded-md border"
          />
        </div>
      )}

      <div className="flex justify-end">
        <Button
          type="button"
          btnFor="generate"
          btnIcon="/generative.png"
          clickHandler={onGenerate}
        >
          Generate
        </Button>
      </div>

      {result && (
        <>
          <div className="flex gap-2 h-4 items-center">
            <Image
              alt="tab title icon"
              src="/summaryIcon.png"
              width={16}
              height={16}
            />
            <h1 className="font-bold">Here is the summary</h1>
          </div>
          <p>{result}</p>
        </>
      )}
    </form>
  );
};
