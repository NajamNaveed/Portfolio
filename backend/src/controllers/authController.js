import asyncHandler from "../utils/asyncHandler.js";
import { loginAdmin } from "../services/authService.js";
import {
  AUTH_COOKIE_NAME,
  getAuthCookieOptions,
  getClearCookieOptions,
} from "../config/cookieConfig.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { token, admin } = await loginAdmin(email, password);

  res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

  res.status(200).json({
    success: true,
    message: "Login successful.",
    data: { admin },
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME, getClearCookieOptions());

  res.status(200).json({
    success: true,
    message: "Logout successful.",
  });
});

export const me = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: { admin: req.admin },
  });
});