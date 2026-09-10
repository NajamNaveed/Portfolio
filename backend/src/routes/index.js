import { Router } from "express";
import authRoutes from "./authRoutes.js";
import siteSettingsRoutes from "./siteSettingsRoutes.js";
import headerRoutes from "./headerRoutes.js";
import heroRoutes from "./heroRoutes.js";
import aboutRoutes from "./aboutRoutes.js";
import skillRoutes from "./skillRoutes.js";
import experienceRoutes from "./experienceRoutes.js";
import serviceRoutes from "./serviceRoutes.js";
import projectRoutes from "./projectRoutes.js";
import socialLinkRoutes from "./socialLinkRoutes.js";
import footerRoutes from "./footerRoutes.js";
import blogRoutes from "./blogRoutes.js";
import publicRoutes from "./publicRoutes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is healthy." });
});

router.use("/auth", authRoutes);
router.use("/site-settings", siteSettingsRoutes);
router.use("/header", headerRoutes);
router.use("/hero", heroRoutes);
router.use("/about", aboutRoutes);
router.use("/skills", skillRoutes);
router.use("/experience", experienceRoutes);
router.use("/services", serviceRoutes);
router.use("/projects", projectRoutes);
router.use("/social-links", socialLinkRoutes);
router.use("/footer", footerRoutes);
router.use("/blogs", blogRoutes);
router.use("/public", publicRoutes);

export default router;