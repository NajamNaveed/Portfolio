import { Router } from "express";
import requireAuth from "../middleware/auth.js";
import { validateAbout } from "../validators/aboutValidator.js";
import { getAboutInfo, updateAboutInfo } from "../controllers/aboutController.js";

const router = Router();

router.get("/", requireAuth, getAboutInfo);
router.put("/", requireAuth, validateAbout, updateAboutInfo);

export default router;