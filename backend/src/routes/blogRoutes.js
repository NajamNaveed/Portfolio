import { Router } from "express";
import requireAuth from "../middleware/auth.js";
import { validateObjectId } from "../validators/commonValidators.js";
import { validateCreateBlog, validateUpdateBlog } from "../validators/blogValidator.js";
import {
  listBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

const router = Router();

router.get("/", requireAuth, listBlogs);
router.get("/:id", requireAuth, validateObjectId(), getBlog);
router.post("/", requireAuth, validateCreateBlog, createBlog);
router.put("/:id", requireAuth, validateObjectId(), validateUpdateBlog, updateBlog);
router.delete("/:id", requireAuth, validateObjectId(), deleteBlog);

export default router;