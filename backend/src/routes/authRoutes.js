import { Router } from "express";
import { login, logout, me } from "../controllers/authController.js";
import { validateLoginInput } from "../validators/authValidator.js";
import requireAuth from "../middleware/auth.js";

const router = Router();

router.post("/login", validateLoginInput, login);
router.post("/logout", logout);
router.get("/me", requireAuth, me);

export default router;