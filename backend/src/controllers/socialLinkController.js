import asyncHandler from "../utils/asyncHandler.js";
import socialLinkService from "../services/socialLinkService.js";

export const listSocialLinks = asyncHandler(async (req, res) => {
  const { items, pagination } = await socialLinkService.list(req.query);
  res.status(200).json({
    success: true,
    message: "Social links fetched successfully.",
    data: items,
    pagination,
  });
});

export const getSocialLink = asyncHandler(async (req, res) => {
  const socialLink = await socialLinkService.getById(req.params.id);
  res.status(200).json({
    success: true,
    message: "Social link fetched successfully.",
    data: socialLink,
  });
});

export const createSocialLink = asyncHandler(async (req, res) => {
  const socialLink = await socialLinkService.create(req.body);
  res.status(201).json({
    success: true,
    message: "Social link created successfully.",
    data: socialLink,
  });
});

export const updateSocialLink = asyncHandler(async (req, res) => {
  const socialLink = await socialLinkService.update(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: "Social link updated successfully.",
    data: socialLink,
  });
});

export const deleteSocialLink = asyncHandler(async (req, res) => {
  await socialLinkService.remove(req.params.id);
  res.status(200).json({
    success: true,
    message: "Social link deleted successfully.",
  });
});

export const listSocialLinksPublic = asyncHandler(async (req, res) => {
  const items = await socialLinkService.listPublic();
  res.status(200).json({
    success: true,
    message: "Social links fetched successfully.",
    data: items,
  });
});