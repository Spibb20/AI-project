import { Button } from "./Buttons";
import Image from "next/image";
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
      <label htmlFor="input" className="text-gray-400">
        Upload a food photo, and AI will detect the ingredients
      </label>
    </div>
  );
};
