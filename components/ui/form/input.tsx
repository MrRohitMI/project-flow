import type { InputHTMLAttributes } from "react";
type InputLayout = "vertical" | "horizontal";
type InputComponentProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  layout?: InputLayout;
  wrapperClassName?: string;
  labelClassName?: string;
};
export default function Input({
  label,
  error,
  layout = "vertical",
  className,
  wrapperClassName,
  labelClassName,
  ...props
}: InputComponentProps) {
  const isHorizontal = layout === "horizontal";
  return (
    <div
      className={`mb-2 ${isHorizontal ? "flex items-center gap-4" : "space-y-1"} ${wrapperClassName ?? ""}`}
    >
      {label && (
        <label
          className={`${isHorizontal ? "w-32 shrink-0" : ""} text-md text-gray-600 ${labelClassName ?? ""}`}
        >
          {label}
        </label>
      )}
      <input
        {...props}
        id={props.id ?? props.name}
        className={`w-full rounded-md border border-gray-300 px-3 py-2
               outline-none focus:border-blue-500 focus:ring-2
               focus:ring-blue-100 ${error ? "border-red-500" : ""} ${className ?? ""}`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
