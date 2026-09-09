import asyncHandler from "../utils/asyncHandler.js";
import { getSiteSettings, updateSiteSettings } from "../services/siteSettingsService.js";

export const getSettings = asyncHandler(async (req, res) => {
  const settings = await getSiteSettings();
  res.status(200).json({
    success: true,
    message: "Site settings fetched successfully.",
    data: settings,
  });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await updateSiteSettings(req.body);
  res.status(200).json({
    success: true,
    message: "Site settings updated successfully.",
    data: settings,
  });
});