import asyncHandler from "../utils/asyncHandler.js";
import { getHeader, updateHeader } from "../services/headerService.js";

export const getHeaderInfo = asyncHandler(async (req, res) => {
  const header = await getHeader();
  res.status(200).json({
    success: true,
    message: "Header fetched successfully.",
    data: header,
  });
});

export const updateHeaderInfo = asyncHandler(async (req, res) => {
  const header = await updateHeader(req.body);
  res.status(200).json({
    success: true,
    message: "Header updated successfully.",
    data: header,
  });
});