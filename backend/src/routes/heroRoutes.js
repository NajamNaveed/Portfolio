import { Router } from "express";
import requireAuth from "../middleware/auth.js";
import { validateHero } from "../validators/heroValidator.js";
import { getHeroInfo, updateHeroInfo } from "../controllers/heroController.js";

const router = Router();

router.get("/", requireAuth, getHeroInfo);
router.put("/", requireAuth, validateHero, updateHeroInfo);

export default router;