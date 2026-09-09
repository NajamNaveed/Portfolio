import { Router } from "express";
import requireAuth from "../middleware/auth.js";
import { validateObjectId } from "../validators/commonValidators.js";
import { validateCreateSocialLink, validateUpdateSocialLink } from "../validators/socialLinkValidator.js";
import {
  listSocialLinks,
  getSocialLink,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from "../controllers/socialLinkController.js";

const router = Router();

router.get("/", requireAuth, listSocialLinks);
router.get("/:id", requireAuth, validateObjectId(), getSocialLink);
router.post("/", requireAuth, validateCreateSocialLink, createSocialLink);
router.put("/:id", requireAuth, validateObjectId(), validateUpdateSocialLink, updateSocialLink);
router.delete("/:id", requireAuth, validateObjectId(), deleteSocialLink);

export default router;