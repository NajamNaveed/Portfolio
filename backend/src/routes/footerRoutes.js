import { Router } from "express";
import requireAuth from "../middleware/auth.js";
import { validateFooter } from "../validators/footerValidator.js";
import { getFooterInfo, updateFooterInfo } from "../controllers/footerController.js";

const router = Router();

router.get("/", requireAuth, getFooterInfo);
router.put("/", requireAuth, validateFooter, updateFooterInfo);

export default router;