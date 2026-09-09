import { Router } from "express";
import requireAuth from "../middleware/auth.js";
import { validateHeader } from "../validators/headerValidator.js";
import { getHeaderInfo, updateHeaderInfo } from "../controllers/headerController.js";

const router = Router();

router.get("/", requireAuth, getHeaderInfo);
router.put("/", requireAuth, validateHeader, updateHeaderInfo);

export default router;