import { ButtonProps } from "@/lib/types";
import Image from "next/image";

export const Button = ({
  clickHandler,
  children,
  btnFor,
  type,
  btnIcon,
}: ButtonProps) => {
  const color = {
    adminButton: "",
    reload: "w-fit  p-2",
    generate: "border-black w-fit p-4",
  };
  return (
    <button
      type={type}
      onClick={clickHandler}
      className={`cursor-pointer rounded-md flex gap-2 h-[22px] border hover:bg-gray-200  items-center  ${
        color[btnFor as keyof typeof color] ?? ""
      }`}
    >
      <Image
        alt="admin navigation icon"
        src={btnIcon}
        height={14}
        width={14}
        className=" active:bg-white"
      ></Image>
      {children}
    </button>
  );
};
