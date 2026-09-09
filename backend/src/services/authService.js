import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import ApiError from "../utils/ApiError.js";
import env from "../config/env.js";

const toSafeAdmin = (admin) => ({
  id: admin._id,
  email: admin.email,
  createdAt: admin.createdAt,
  updatedAt: admin.updatedAt,
});

const generateToken = (adminId) => {
  return jwt.sign({ adminId }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
};

export const loginAdmin = async (email, password) => {
  const admin = await Admin.findOne({ email: email.toLowerCase().trim() }).select(
    "+password"
  );

  if (!admin) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const isPasswordValid = await admin.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const token = generateToken(admin._id.toString());

  return { token, admin: toSafeAdmin(admin) };
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.jwtSecret);
  } catch (error) {
    throw new ApiError(401, "Not authenticated.");
  }
};

export const getAdminById = async (adminId) => {
  const admin = await Admin.findById(adminId);

  if (!admin) {
    throw new ApiError(401, "Not authenticated.");
  }

  return toSafeAdmin(admin);
};

export default {
  loginAdmin,
  verifyToken,
  getAdminById,
};