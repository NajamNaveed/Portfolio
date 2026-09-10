import { Router } from "express";
import { getPublicSiteSettings } from "../controllers/siteSettingsController.js";
import { getPublicHeader } from "../controllers/headerController.js";
import { getPublicHero } from "../controllers/heroController.js";
import { getPublicAbout } from "../controllers/aboutController.js";
import { listSkillsPublic } from "../controllers/skillController.js";
import { listExperiencePublic } from "../controllers/experienceController.js";
import { listServicesPublic } from "../controllers/serviceController.js";
import { listProjectsPublic, getProjectPublic } from "../controllers/projectController.js";
import { listSocialLinksPublic } from "../controllers/socialLinkController.js";
import { getPublicFooter } from "../controllers/footerController.js";
import { listBlogsPublic } from "../controllers/blogController.js";

/**
 * Read-only endpoints for the public-facing portfolio (Phase 5).
 *
 * These are intentionally unauthenticated - a visitor never has an
 * admin session - and each one is scoped server-side to what is safe
 * to show publicly (isVisible: true, and for blogs, status: "published"
 * as well). They reuse the exact same Mongoose models, services, and
 * response shape ({ success, message, data }) as the existing admin
 * routes; nothing here bypasses validation or duplicates business logic.
 *
 * The existing authenticated routes under /api/v1/<resource> are
 * untouched, so the Admin CMS keeps working exactly as before.
 */
const router = Router();

router.get("/site-settings", getPublicSiteSettings);
router.get("/header", getPublicHeader);
router.get("/hero", getPublicHero);
router.get("/about", getPublicAbout);
router.get("/skills", listSkillsPublic);
router.get("/experience", listExperiencePublic);
router.get("/services", listServicesPublic);
router.get("/projects", listProjectsPublic);
router.get("/projects/:slug", getProjectPublic);
router.get("/social-links", listSocialLinksPublic);
router.get("/footer", getPublicFooter);
router.get("/blogs", listBlogsPublic);

export default router;
