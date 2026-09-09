import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(undefined);

let idCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = "success", duration = 3500) => {
      idCounter += 1;
      const id = idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      window.setTimeout(() => removeToast(id), duration);
    },
    [removeToast]
  );

  const value = useMemo(
    () => ({ toasts, showToast, removeToast }),
    [toasts, showToast, removeToast]
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider.");
  }

  return context;
};
