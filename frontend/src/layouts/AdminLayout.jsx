import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar.jsx";
import Topbar from "../components/admin/Topbar.jsx";

const ROUTE_TITLES = {
  "/admin": "Dashboard",
  "/admin/site-settings": "Site Settings",
  "/admin/header": "Header",
  "/admin/hero": "Hero",
  "/admin/about": "About",
  "/admin/skills": "Skills",
  "/admin/experience": "Experience",
  "/admin/services": "Services",
  "/admin/projects": "Projects",
  "/admin/social-links": "Social Links",
  "/admin/footer": "Footer",
  "/admin/blogs": "Blog",
  "/admin/jobs": "Jobs",
};

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const title = ROUTE_TITLES[location.pathname] || "Admin";

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((prev) => !prev)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} onOpenMobile={() => setMobileOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
