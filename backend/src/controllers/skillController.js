import asyncHandler from "../utils/asyncHandler.js";
import skillService from "../services/skillService.js";

export const listSkills = asyncHandler(async (req, res) => {
  const { items, pagination } = await skillService.list(req.query);
  res.status(200).json({
    success: true,
    message: "Skills fetched successfully.",
    data: items,
    pagination,
  });
});

export const getSkill = asyncHandler(async (req, res) => {
  const skill = await skillService.getById(req.params.id);
  res.status(200).json({
    success: true,
    message: "Skill fetched successfully.",
    data: skill,
  });
});

export const createSkill = asyncHandler(async (req, res) => {
  const skill = await skillService.create(req.body);
  res.status(201).json({
    success: true,
    message: "Skill created successfully.",
    data: skill,
  });
});

export const updateSkill = asyncHandler(async (req, res) => {
  const skill = await skillService.update(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: "Skill updated successfully.",
    data: skill,
  });
});

export const deleteSkill = asyncHandler(async (req, res) => {
  await skillService.remove(req.params.id);
  res.status(200).json({
    success: true,
    message: "Skill deleted successfully.",
  });
});