import cn from "../../utils/cn.js";

const Switch = ({ id, label, checked, onChange, disabled, hint }) => {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-slate-800 bg-slate-950/40 px-3.5 py-3">
      <div>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-slate-200">
            {label}
          </label>
        )}
        {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
      </div>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60",
          checked ? "bg-indigo-600" : "bg-slate-700"
        )}
      >
        <span
          className={cn(
            "inline-block h-4.5 w-4.5 transform rounded-full bg-white transition-transform duration-150",
            checked ? "translate-x-5.5" : "translate-x-1"
          )}
          style={{ height: "1.125rem", width: "1.125rem" }}
        />
      </button>
    </div>
  );
};

export default Switch;
