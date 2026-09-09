import { Router } from "express";
import requireAuth from "../middleware/auth.js";
import { validateObjectId } from "../validators/commonValidators.js";
import { validateCreateSkill, validateUpdateSkill } from "../validators/skillValidator.js";
import {
  listSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js";

const router = Router();

router.get("/", requireAuth, listSkills);
router.get("/:id", requireAuth, validateObjectId(), getSkill);
router.post("/", requireAuth, validateCreateSkill, createSkill);
router.put("/:id", requireAuth, validateObjectId(), validateUpdateSkill, updateSkill);
router.delete("/:id", requireAuth, validateObjectId(), deleteSkill);

export default router;