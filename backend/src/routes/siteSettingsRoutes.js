import { Router } from "express";
import requireAuth from "../middleware/auth.js";
import { validateSiteSettings } from "../validators/siteSettingsValidator.js";
import { getSettings, updateSettings } from "../controllers/siteSettingsController.js";

const router = Router();

router.get("/", requireAuth, getSettings);
router.put("/", requireAuth, validateSiteSettings, updateSettings);

export default router;