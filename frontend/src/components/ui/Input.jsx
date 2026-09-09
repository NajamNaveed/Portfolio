import { forwardRef } from "react";
import cn from "../../utils/cn.js";

const Input = forwardRef(({ label, id, error, hint, className = "", ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          "w-full rounded-lg border bg-slate-950/60 px-3.5 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-600",
          error
            ? "border-red-700 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            : "border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500",
          className
        )}
        {...props}
      />
      {error ? (
        <p className="mt-1.5 text-xs text-red-400">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
