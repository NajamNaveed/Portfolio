import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Settings,
  PanelTop,
  Sparkles,
  User,
  Star,
  Briefcase,
  Layers,
  FolderKanban,
  Share2,
  PanelBottom,
  Newspaper,
  Search,
  ChevronsLeft,
  ChevronsRight,
  X,
} from "lucide-react";
import cn from "../../utils/cn.js";

const NAV_GROUPS = [
  {
    label: "Main",
    items: [{ to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true }],
  },
  {
    label: "Content",
    items: [
      { to: "/admin/site-settings", label: "Site Settings", icon: Settings },
      { to: "/admin/header", label: "Header", icon: PanelTop },
      { to: "/admin/hero", label: "Hero", icon: Sparkles },
      { to: "/admin/about", label: "About", icon: User },
      { to: "/admin/skills", label: "Skills", icon: Star },
      { to: "/admin/experience", label: "Experience", icon: Briefcase },
      { to: "/admin/services", label: "Services", icon: Layers },
      { to: "/admin/projects", label: "Projects", icon: FolderKanban },
      { to: "/admin/social-links", label: "Social Links", icon: Share2 },
      { to: "/admin/footer", label: "Footer", icon: PanelBottom },
      { to: "/admin/blogs", label: "Blog", icon: Newspaper },
    ],
  },
  {
    label: "Intelligence",
    items: [{ to: "/admin/jobs", label: "Jobs", icon: Search }],
  },
];

const Sidebar = ({ collapsed, onToggleCollapsed, mobileOpen, onCloseMobile }) => {
  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-4 py-5">
        {!collapsed && (
          <span className="text-sm font-semibold tracking-wide text-slate-100">
            CMS<span className="text-indigo-500">•</span>Portfolio
          </span>
        )}
        <button
          type="button"
          onClick={onCloseMobile}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-slate-200 lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={onToggleCollapsed}
          className="hidden rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-slate-200 lg:inline-flex"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-2 pb-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                {group.label}
              </p>
            )}
            <ul className="space-y-1">
              {group.items.map(({ to, label, icon: Icon, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    onClick={onCloseMobile}
                    title={collapsed ? label : undefined}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150",
                        isActive
                          ? "bg-indigo-600/15 text-indigo-300"
                          : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                      )
                    }
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span className="truncate">{label}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      <motion.aside
        animate={{ width: collapsed ? 76 : 248 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="hidden shrink-0 border-r border-slate-800/80 bg-slate-950 lg:block"
      >
        {content}
      </motion.aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-50 h-full w-64 border-r border-slate-800 bg-slate-950"
          >
            {content}
          </motion.aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
