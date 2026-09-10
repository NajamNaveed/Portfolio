import asyncHandler from "../utils/asyncHandler.js";
import { getFooter, updateFooter, getFooterPublic } from "../services/footerService.js";

export const getFooterInfo = asyncHandler(async (req, res) => {
  const footer = await getFooter();
  res.status(200).json({
    success: true,
    message: "Footer fetched successfully.",
    data: footer,
  });
});

export const updateFooterInfo = asyncHandler(async (req, res) => {
  const footer = await updateFooter(req.body);
  res.status(200).json({
    success: true,
    message: "Footer updated successfully.",
    data: footer,
  });
});

export const getPublicFooter = asyncHandler(async (req, res) => {
  const footer = await getFooterPublic();
  res.status(200).json({
    success: true,
    message: "Footer fetched successfully.",
    data: footer,
  });
});