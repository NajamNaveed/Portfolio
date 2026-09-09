import { Router } from "express";
import requireAuth from "../middleware/auth.js";
import { validateObjectId } from "../validators/commonValidators.js";
import { validateCreateProject, validateUpdateProject } from "../validators/projectValidator.js";
import {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = Router();

router.get("/", requireAuth, listProjects);
router.get("/:id", requireAuth, validateObjectId(), getProject);
router.post("/", requireAuth, validateCreateProject, createProject);
router.put("/:id", requireAuth, validateObjectId(), validateUpdateProject, updateProject);
router.delete("/:id", requireAuth, validateObjectId(), deleteProject);

export default router;