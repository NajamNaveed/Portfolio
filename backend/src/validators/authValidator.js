import ApiError from "../utils/ApiError.js";

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

export const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || typeof email !== "string" || !email.trim()) {
    errors.push("Email is required.");
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.push("Email must be a valid email address.");
  } else if (email.trim().length > 254) {
    errors.push("Email is too long.");
  }

  if (!password || typeof password !== "string") {
    errors.push("Password is required.");
  } else if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  } else if (password.length > 128) {
    errors.push("Password is too long.");
  }

  if (errors.length > 0) {
    return next(new ApiError(400, "Invalid login input.", errors));
  }

  next();
};