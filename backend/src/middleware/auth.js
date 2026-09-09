import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyToken, getAdminById } from "../services/authService.js";
import { AUTH_COOKIE_NAME } from "../config/cookieConfig.js";

const requireAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies ? req.cookies[AUTH_COOKIE_NAME] : undefined;

  if (!token) {
    throw new ApiError(401, "Not authenticated.");
  }

  const decoded = verifyToken(token);
  const admin = await getAdminById(decoded.adminId);

  req.admin = admin;
  next();
});

export default requireAuth;