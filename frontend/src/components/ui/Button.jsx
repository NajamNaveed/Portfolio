import { forwardRef } from "react";
import cn from "../../utils/cn.js";

const VARIANTS = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:ring-indigo-500",
  secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700 focus-visible:ring-slate-500",
  outline:
    "border border-slate-700 text-slate-200 hover:border-slate-500 hover:bg-slate-900 focus-visible:ring-slate-500",
  ghost: "text-slate-300 hover:bg-slate-900 focus-visible:ring-slate-500",
  danger: "bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-500",
};

const SIZES = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-sm",
};

const Button = forwardRef(
  (
    { variant = "primary", size = "md", className = "", isLoading = false, disabled, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60",
          VARIANTS[variant],
          SIZES[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
