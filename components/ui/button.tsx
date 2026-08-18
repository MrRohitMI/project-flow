import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "outline" | "ghost";
type ButtonPropType = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};
const baseStyles =
  "inline-flex items-center justify-center rounded-lg font-bold transition-colors cursor-pointer";
const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-600 text-white hover:bg-gray-700",
  danger: "bg-red-600 text-white hover:bg-red-700",
  outline:
    "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
  ghost: "text-gray-600 hover:bg-gray-100",
};
type ButtonSize = "sm" | "md" | "lg";
const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};
export default function Button({
  variant = "primary",
  size = "md",
  ...props
}: ButtonPropType) {
  return (
    <button
    {...props}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${props.className ?? ""}`}
    >
      {props.children}
    </button>
  );
}
