import api from "../api.js";

const PUBLIC_BASE = "/public";

// Keys map 1:1 to the section that consumes them. `path` is appended to
// PUBLIC_BASE and hits the unauthenticated backend routes added in
// backend/src/routes/publicRoutes.js - the same models/response shape as
// the admin CMS, just filtered server-side to isVisible (and, for blogs,
// status: "published") content only.
const RESOURCES = {
  siteSettings: "/site-settings",
  header: "/header",
  hero: "/hero",
  about: "/about",
  skills: "/skills",
  experience: "/experience",
  services: "/services",
  projects: "/projects",
  socialLinks: "/social-links",
  footer: "/footer",
  blogs: "/blogs?limit=3",
};

const fetchOne = async (path) => {
  const response = await api.get(`${PUBLIC_BASE}${path}`);
  return response.data.data;
};

/**
 * Fetches every public CMS resource in parallel with Promise.allSettled
 * so a single failing endpoint (e.g. Projects being briefly unavailable)
 * never blocks or breaks the rest of the homepage. Returns:
 *   - data:   { [key]: value | null }  (null when that resource failed)
 *   - errors: { [key]: true }          (only present for failed keys)
 */
export const fetchPortfolioData = async () => {
  const keys = Object.keys(RESOURCES);
  const settled = await Promise.allSettled(keys.map((key) => fetchOne(RESOURCES[key])));

  const data = {};
  const errors = {};

  keys.forEach((key, index) => {
    const result = settled[index];
    if (result.status === "fulfilled") {
      data[key] = result.value;
    } else {
      data[key] = null;
      errors[key] = true;
    }
  });

  return { data, errors };
};

/**
 * Fetches a single project by slug for the public project detail page
 * (Phase 7). Hits the unauthenticated /public/projects/:slug route,
 * which 404s for hidden or nonexistent projects - never the admin
 * /projects/:id endpoint, which requires a session.
 */
export const fetchProjectBySlug = async (slug) => {
  const response = await api.get(`${PUBLIC_BASE}/projects/${encodeURIComponent(slug)}`);
  return response.data.data;
};

/**
 * Standalone public projects list fetch, used by the project detail
 * page for "Related Projects". Deliberately not routed through
 * fetchPortfolioData, which would pull all 11 homepage resources just
 * to get one of them.
 */
export const fetchPublicProjects = () => fetchOne(RESOURCES.projects);

/**
 * Standalone Site Settings fetch. The project detail page needs this
 * for its <title> suffix and the global favicon (via useDocumentHead) -
 * it deliberately doesn't re-fetch all 11 homepage resources just for
 * that, and it doesn't reimplement the favicon logic from Phase 6.
 */
export const fetchPublicSiteSettings = () => fetchOne(RESOURCES.siteSettings);

export default { fetchPortfolioData, fetchProjectBySlug, fetchPublicProjects, fetchPublicSiteSettings };
