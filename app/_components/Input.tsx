import { InputPropsImgAnalysis } from "@/lib/types";
export const Input = ({
  children,
  placeholder,
  type,
  name,
  required,
  onChange,
}: InputPropsImgAnalysis) => {
  return (
    <label
      htmlFor={name}
      className="text-black text-[14px] font-bold flex flex-col gap-2"
    >
      {required !== false ? children + " *" : children}
      <input
        className="p-2 rounded-md border border-[#8E8E8E] "
        name={name}
        type={type}
        placeholder={placeholder}
        id={name}
        onChange={onChange}
      />
    </label>
  );
};
