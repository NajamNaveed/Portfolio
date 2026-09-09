import cn from "../../utils/cn.js";

const VARIANTS = {
  neutral: "bg-slate-800 text-slate-300",
  success: "border border-emerald-900 bg-emerald-950 text-emerald-400",
  warning: "border border-amber-900 bg-amber-950 text-amber-400",
  info: "border border-indigo-900 bg-indigo-950 text-indigo-300",
};

const Badge = ({ variant = "neutral", className = "", children }) => {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", VARIANTS[variant], className)}>
      {children}
    </span>
  );
};

export default Badge;
