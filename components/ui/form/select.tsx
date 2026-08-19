import type { SelectHTMLAttributes } from "react";
type SelectLayout = "vertical" | "horizontal";
type SelectOption = {
  label: string;
  value: string;
};
type SelectComponentProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  layout?: SelectLayout;
  wrapperClassName?: string;
  labelClassName?: string;
  placeholder?: string;
  options: SelectOption[];
};
export default function Select({
  label,
  error,
  layout = "vertical",
  className,
  wrapperClassName,
  labelClassName,
  placeholder,
  options,
  ...props
}: SelectComponentProps) {
  const isHorizontal = layout === "horizontal";
  return (
    <div>
      {label && (
        <label
          className={`${isHorizontal ? "w-32 shrink-0" : ""} text-md text-gray-600 ${labelClassName ?? ""}`}
        >
          {label}
        </label>
      )}
      <select
        {...props}
        id={props.id ?? props.name}
        className={`w-full rounded-md border border-gray-300 px-3 py-2
               outline-none focus:border-blue-500 focus:ring-2
               focus:ring-blue-100 ${error ? "border-red-500" : ""} ${className ?? ""}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
