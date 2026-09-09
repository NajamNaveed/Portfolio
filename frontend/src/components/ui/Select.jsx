import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import cn from "../../utils/cn.js";

const Select = forwardRef(({ label, id, error, hint, options = [], className = "", ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={id}
          className={cn(
            "w-full appearance-none rounded-lg border bg-slate-950/60 px-3.5 py-2.5 pr-9 text-sm text-slate-100 outline-none transition",
            error
              ? "border-red-700 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </div>
      {error ? (
        <p className="mt-1.5 text-xs text-red-400">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
});

Select.displayName = "Select";

export default Select;
