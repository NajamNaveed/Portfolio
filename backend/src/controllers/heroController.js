import asyncHandler from "../utils/asyncHandler.js";
import { getHero, updateHero, getHeroPublic } from "../services/heroService.js";

export const getHeroInfo = asyncHandler(async (req, res) => {
  const hero = await getHero();
  res.status(200).json({
    success: true,
    message: "Hero fetched successfully.",
    data: hero,
  });
});

export const updateHeroInfo = asyncHandler(async (req, res) => {
  const hero = await updateHero(req.body);
  res.status(200).json({
    success: true,
    message: "Hero updated successfully.",
    data: hero,
  });
});

export const getPublicHero = asyncHandler(async (req, res) => {
  const hero = await getHeroPublic();
  res.status(200).json({
    success: true,
    message: "Hero fetched successfully.",
    data: hero,
  });
});