import { Router } from "express";
import requireAuth from "../middleware/auth.js";
import { validateObjectId } from "../validators/commonValidators.js";
import { validateCreateExperience, validateUpdateExperience } from "../validators/experienceValidator.js";
import {
  listExperience,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";

const router = Router();

router.get("/", requireAuth, listExperience);
router.get("/:id", requireAuth, validateObjectId(), getExperience);
router.post("/", requireAuth, validateCreateExperience, createExperience);
router.put("/:id", requireAuth, validateObjectId(), validateUpdateExperience, updateExperience);
router.delete("/:id", requireAuth, validateObjectId(), deleteExperience);

export default router;