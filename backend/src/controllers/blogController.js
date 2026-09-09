import asyncHandler from "../utils/asyncHandler.js";
import blogService from "../services/blogService.js";

export const listBlogs = asyncHandler(async (req, res) => {
  const { items, pagination } = await blogService.list(req.query);
  res.status(200).json({
    success: true,
    message: "Blog posts fetched successfully.",
    data: items,
    pagination,
  });
});

export const getBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.getById(req.params.id);
  res.status(200).json({
    success: true,
    message: "Blog post fetched successfully.",
    data: blog,
  });
});

export const createBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.create(req.body);
  res.status(201).json({
    success: true,
    message: "Blog post created successfully.",
    data: blog,
  });
});

export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.update(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: "Blog post updated successfully.",
    data: blog,
  });
});

export const deleteBlog = asyncHandler(async (req, res) => {
  await blogService.remove(req.params.id);
  res.status(200).json({
    success: true,
    message: "Blog post deleted successfully.",
  });
});