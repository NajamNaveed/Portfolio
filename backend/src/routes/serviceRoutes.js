import { Router } from "express";
import requireAuth from "../middleware/auth.js";
import { validateObjectId } from "../validators/commonValidators.js";
import { validateCreateService, validateUpdateService } from "../validators/serviceValidator.js";
import {
  listServices,
  getService,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

const router = Router();

router.get("/", requireAuth, listServices);
router.get("/:id", requireAuth, validateObjectId(), getService);
router.post("/", requireAuth, validateCreateService, createService);
router.put("/:id", requireAuth, validateObjectId(), validateUpdateService, updateService);
router.delete("/:id", requireAuth, validateObjectId(), deleteService);

export default router;