import asyncHandler from "../utils/asyncHandler.js";
import serviceService from "../services/serviceService.js";

export const listServices = asyncHandler(async (req, res) => {
  const { items, pagination } = await serviceService.list(req.query);
  res.status(200).json({
    success: true,
    message: "Services fetched successfully.",
    data: items,
    pagination,
  });
});

export const getService = asyncHandler(async (req, res) => {
  const service = await serviceService.getById(req.params.id);
  res.status(200).json({
    success: true,
    message: "Service fetched successfully.",
    data: service,
  });
});

export const createService = asyncHandler(async (req, res) => {
  const service = await serviceService.create(req.body);
  res.status(201).json({
    success: true,
    message: "Service created successfully.",
    data: service,
  });
});

export const updateService = asyncHandler(async (req, res) => {
  const service = await serviceService.update(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: "Service updated successfully.",
    data: service,
  });
});

export const deleteService = asyncHandler(async (req, res) => {
  await serviceService.remove(req.params.id);
  res.status(200).json({
    success: true,
    message: "Service deleted successfully.",
  });
});

export const listServicesPublic = asyncHandler(async (req, res) => {
  const items = await serviceService.listPublic();
  res.status(200).json({
    success: true,
    message: "Services fetched successfully.",
    data: items,
  });
});