import { motion } from "framer-motion";
import { Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";

const Topbar = ({ title, onOpenMobile }) => {
  const { admin, logout } = useAuthContext();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login", { replace: true });
    } catch (error) {
      showToast("Unable to log out. Please try again.", "error");
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-4 py-3.5 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobile}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-slate-200 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h2 className="text-sm font-semibold text-slate-200 sm:text-base">{title}</h2>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-slate-400 sm:inline">{admin?.email}</span>
        <motion.button
          whileTap={{ scale: 0.96 }}
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-800 px-3 py-1.5 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-900"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </motion.button>
      </div>
    </header>
  );
};

export default Topbar;
