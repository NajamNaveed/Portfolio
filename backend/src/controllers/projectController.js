import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import projectService from "../services/projectService.js";

export const listProjects = asyncHandler(async (req, res) => {
  const { items, pagination } = await projectService.list(req.query);
  res.status(200).json({
    success: true,
    message: "Projects fetched successfully.",
    data: items,
    pagination,
  });
});

export const getProject = asyncHandler(async (req, res) => {
  const project = await projectService.getById(req.params.id);
  res.status(200).json({
    success: true,
    message: "Project fetched successfully.",
    data: project,
  });
});

export const createProject = asyncHandler(async (req, res) => {
  const project = await projectService.create(req.body);
  res.status(201).json({
    success: true,
    message: "Project created successfully.",
    data: project,
  });
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await projectService.update(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: "Project updated successfully.",
    data: project,
  });
});

export const deleteProject = asyncHandler(async (req, res) => {
  await projectService.remove(req.params.id);
  res.status(200).json({
    success: true,
    message: "Project deleted successfully.",
  });
});

export const listProjectsPublic = asyncHandler(async (req, res) => {
  const items = await projectService.listPublic();
  res.status(200).json({
    success: true,
    message: "Projects fetched successfully.",
    data: items,
  });
});

export const getProjectPublic = asyncHandler(async (req, res) => {
  const project = await projectService.getPublicOne({ slug: req.params.slug });

  if (!project) {
    throw new ApiError(404, "Project not found.");
  }

  res.status(200).json({
    success: true,
    message: "Project fetched successfully.",
    data: project,
  });
});