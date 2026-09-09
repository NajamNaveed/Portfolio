import asyncHandler from "../utils/asyncHandler.js";
import experienceService from "../services/experienceService.js";

export const listExperience = asyncHandler(async (req, res) => {
  const { items, pagination } = await experienceService.list(req.query);
  res.status(200).json({
    success: true,
    message: "Experience entries fetched successfully.",
    data: items,
    pagination,
  });
});

export const getExperience = asyncHandler(async (req, res) => {
  const item = await experienceService.getById(req.params.id);
  res.status(200).json({
    success: true,
    message: "Experience entry fetched successfully.",
    data: item,
  });
});

export const createExperience = asyncHandler(async (req, res) => {
  const item = await experienceService.create(req.body);
  res.status(201).json({
    success: true,
    message: "Experience entry created successfully.",
    data: item,
  });
});

export const updateExperience = asyncHandler(async (req, res) => {
  const item = await experienceService.update(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: "Experience entry updated successfully.",
    data: item,
  });
});

export const deleteExperience = asyncHandler(async (req, res) => {
  await experienceService.remove(req.params.id);
  res.status(200).json({
    success: true,
    message: "Experience entry deleted successfully.",
  });
});