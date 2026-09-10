import asyncHandler from "../utils/asyncHandler.js";
import { getAbout, updateAbout, getAboutPublic } from "../services/aboutService.js";

export const getAboutInfo = asyncHandler(async (req, res) => {
  const about = await getAbout();
  res.status(200).json({
    success: true,
    message: "About fetched successfully.",
    data: about,
  });
});

export const updateAboutInfo = asyncHandler(async (req, res) => {
  const about = await updateAbout(req.body);
  res.status(200).json({
    success: true,
    message: "About updated successfully.",
    data: about,
  });
});

export const getPublicAbout = asyncHandler(async (req, res) => {
  const about = await getAboutPublic();
  res.status(200).json({
    success: true,
    message: "About fetched successfully.",
    data: about,
  });
});