export type ButtonProps = {
  clickHandler?: () => void;
  children?: React.ReactNode;
  btnFor?: "adminButton" | string;
  type?: "button" | "submit" | "reset";
  btnIcon: string;
};

export type InputPropsImgAnalysis = {
  clickHandler?: () => void;
  children?: React.ReactNode;
  placeholder?: string;
  type?: string;
  name?: string;
  required?: false;
  onChange?: () => void;
};
//children, placeholder, type, required, name, onChange
