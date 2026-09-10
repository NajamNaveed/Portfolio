import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Home from "../pages/public/Home.jsx";
import ProjectDetail from "../pages/public/ProjectDetail.jsx";
import AdminLogin from "../pages/admin/AdminLogin.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import SiteSettings from "../pages/admin/SiteSettings.jsx";
import HeaderPage from "../pages/admin/HeaderPage.jsx";
import HeroPage from "../pages/admin/HeroPage.jsx";
import AboutPage from "../pages/admin/AboutPage.jsx";
import SkillsPage from "../pages/admin/SkillsPage.jsx";
import ExperiencePage from "../pages/admin/ExperiencePage.jsx";
import ServicesPage from "../pages/admin/ServicesPage.jsx";
import ProjectsPage from "../pages/admin/ProjectsPage.jsx";
import SocialLinksPage from "../pages/admin/SocialLinksPage.jsx";
import FooterPage from "../pages/admin/FooterPage.jsx";
import BlogsPage from "../pages/admin/BlogsPage.jsx";
import JobsPage from "../pages/admin/JobsPage.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="site-settings" element={<SiteSettings />} />
        <Route path="header" element={<HeaderPage />} />
        <Route path="hero" element={<HeroPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="skills" element={<SkillsPage />} />
        <Route path="experience" element={<ExperiencePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="social-links" element={<SocialLinksPage />} />
        <Route path="footer" element={<FooterPage />} />
        <Route path="blogs" element={<BlogsPage />} />
        <Route path="jobs" element={<JobsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
