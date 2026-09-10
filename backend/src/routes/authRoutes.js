import { Router } from "express";
import { login, logout, me } from "../controllers/authController.js";
import { validateLoginInput } from "../validators/authValidator.js";
import requireAuth from "../middleware/auth.js";
import rateLimit from "express-rate-limit";

const router = Router();

const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 10,
	standardHeaders: "draft-8",
	legacyHeaders: false,
	message: { success: false, message: "Too many login attempts. Try again later." },
});

router.post("/login", loginLimiter, validateLoginInput, login);
router.post("/logout", logout);
router.get("/me", requireAuth, me);

export default router;