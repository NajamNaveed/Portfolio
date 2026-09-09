import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FolderKanban, Newspaper, Star, Briefcase, Layers, Settings, Plus, ArrowRight } from "lucide-react";
import Card from "../../components/ui/Card.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import StatCard from "../../components/admin/StatCard.jsx";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { listProjects } from "../../services/cms/projectService.js";
import { listBlogs } from "../../services/cms/blogService.js";
import { listSkills } from "../../services/cms/skillService.js";
import { listExperience } from "../../services/cms/experienceService.js";
import { listServices } from "../../services/cms/serviceService.js";

const QUICK_ACTIONS = [
  { label: "Edit Site Settings", to: "/admin/site-settings", icon: Settings },
  { label: "Manage Projects", to: "/admin/projects", icon: FolderKanban },
  { label: "Manage Blog", to: "/admin/blogs", icon: Newspaper },
];

const Dashboard = () => {
  const { admin } = useAuthContext();
  const [stats, setStats] = useState(null);
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      setIsLoading(true);
      setHasError(false);

      const results = await Promise.allSettled([
        listProjects({ limit: 3 }),
        listBlogs({ limit: 3 }),
        listSkills({ limit: 1 }),
        listExperience({ limit: 1 }),
        listServices({ limit: 1 }),
      ]);

      if (!isMounted) return;

      const [projectsRes, blogsRes, skillsRes, experienceRes, servicesRes] = results;

      const safeCount = (result) =>
        result.status === "fulfilled" ? result.value.pagination?.totalItems ?? 0 : null;

      setStats({
        projects: safeCount(projectsRes),
        blogs: safeCount(blogsRes),
        skills: safeCount(skillsRes),
        experience: safeCount(experienceRes),
        services: safeCount(servicesRes),
      });

      setRecentProjects(projectsRes.status === "fulfilled" ? projectsRes.value.items : []);
      setRecentBlogs(blogsRes.status === "fulfilled" ? blogsRes.value.items : []);

      setHasError(results.every((result) => result.status === "rejected"));
      setIsLoading(false);
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const statCards = [
    { label: "Projects", value: stats?.projects, icon: FolderKanban },
    { label: "Blog Posts", value: stats?.blogs, icon: Newspaper },
    { label: "Skills", value: stats?.skills, icon: Star },
    { label: "Experience", value: stats?.experience, icon: Briefcase },
    { label: "Services", value: stats?.services, icon: Layers },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="mb-8"
      >
        <h1 className="text-2xl font-semibold tracking-tight text-slate-100">
          Welcome back{admin?.email ? `, ${admin.email.split("@")[0]}` : ""}.
        </h1>
        <p className="mt-1 text-sm text-slate-400">Here's a quick overview of your portfolio content.</p>
      </motion.div>

      {hasError && (
        <Card className="mb-6 border-red-900/50 bg-red-950/30 p-4 text-sm text-red-300">
          Dashboard data couldn't be loaded right now. Try refreshing the page.
        </Card>
      )}

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((card, index) => (
          <StatCard
            key={card.label}
            label={card.label}
            value={card.value ?? 0}
            icon={card.icon}
            isLoading={isLoading}
            index={index}
          />
        ))}
      </div>

      <div className="mb-8">
        <h3 className="mb-3 text-sm font-semibold text-slate-300">Quick actions</h3>
        <div className="flex flex-wrap gap-3">
          {QUICK_ACTIONS.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-indigo-600/50 hover:bg-slate-900"
            >
              <Icon className="h-4 w-4 text-indigo-400" />
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-200">Recent projects</h3>
            <Link to="/admin/projects" className="inline-flex items-center gap-1 text-xs font-medium text-indigo-400 hover:text-indigo-300">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : recentProjects.length === 0 ? (
            <EmptyState
              icon={FolderKanban}
              title="No projects yet"
              description="Projects you add will appear here."
              action={
                <Link to="/admin/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300">
                  <Plus className="h-4 w-4" /> Add a project
                </Link>
              }
            />
          ) : (
            <ul className="space-y-2">
              {recentProjects.map((project) => (
                <li key={project._id} className="flex items-center justify-between rounded-lg border border-slate-800/70 px-3.5 py-2.5">
                  <span className="truncate text-sm text-slate-200">{project.title}</span>
                  <span className="ml-3 shrink-0 text-xs text-slate-500">
                    {project.featured ? "Featured" : project.isVisible ? "Visible" : "Hidden"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-200">Recent blog posts</h3>
            <Link to="/admin/blogs" className="inline-flex items-center gap-1 text-xs font-medium text-indigo-400 hover:text-indigo-300">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : recentBlogs.length === 0 ? (
            <EmptyState
              icon={Newspaper}
              title="No blog posts yet"
              description="Posts you write will appear here."
              action={
                <Link to="/admin/blogs" className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300">
                  <Plus className="h-4 w-4" /> Write a post
                </Link>
              }
            />
          ) : (
            <ul className="space-y-2">
              {recentBlogs.map((post) => (
                <li key={post._id} className="flex items-center justify-between rounded-lg border border-slate-800/70 px-3.5 py-2.5">
                  <span className="truncate text-sm text-slate-200">{post.title}</span>
                  <span
                    className={`ml-3 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                      post.status === "published" ? "bg-emerald-950 text-emerald-400" : "bg-amber-950 text-amber-400"
                    }`}
                  >
                    {post.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
