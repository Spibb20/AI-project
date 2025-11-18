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
    reload: "",
  };
  return (
    <button
      type={type}
      onClick={clickHandler}
      className={`cursor-pointer rounded-md flex gap-2 h-[22px] border hover:bg-white p-4 items-center  ${
        color[btnFor as keyof typeof color] ?? ""
      }`}
    >
      <Image
        alt="admin navigation icon"
        src={btnIcon}
        height={16}
        width={16}
        className=" active:bg-white"
      ></Image>
      {children}
    </button>
  );
};
