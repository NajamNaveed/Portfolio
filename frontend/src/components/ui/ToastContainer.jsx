import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, X } from "lucide-react";
import { useToast } from "../../context/ToastContext.jsx";

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
};

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:left-auto sm:right-4 sm:items-end">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type] || CheckCircle2;
          const isError = toast.type === "error";

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur ${
                isError
                  ? "border-red-900/50 bg-red-950/80 text-red-200"
                  : "border-emerald-900/50 bg-emerald-950/80 text-emerald-200"
              }`}
              role="status"
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0" />
              <p className="flex-1 text-sm leading-snug">{toast.message}</p>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-current/70 transition hover:text-current"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
