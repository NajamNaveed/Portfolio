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

export default { fetchPortfolioData };
