import ApiError from "../utils/ApiError.js";

const validatePayload = (body, isUpdate) => {
  const errors = [];

  if (!isUpdate || body.name !== undefined) {
    if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
      errors.push("Name is required.");
    } else if (body.name.trim().length > 80) {
      errors.push("Name must be under 80 characters.");
    }
  }

  if (body.category !== undefined && typeof body.category !== "string") {
    errors.push("Category must be a string.");
  }

  if (body.proficiency !== undefined) {
    if (typeof body.proficiency !== "number" || body.proficiency < 0 || body.proficiency > 100) {
      errors.push("Proficiency must be a number between 0 and 100.");
    }
  }

  if (body.order !== undefined && typeof body.order !== "number") {
    errors.push("Order must be a number.");
  }

  if (body.isVisible !== undefined && typeof body.isVisible !== "boolean") {
    errors.push("isVisible must be a boolean.");
  }

  return errors;
};

export const validateCreateSkill = (req, res, next) => {
  const errors = validatePayload(req.body, false);
  if (errors.length > 0) return next(new ApiError(400, "Invalid skill data.", errors));
  next();
};

export const validateUpdateSkill = (req, res, next) => {
  const errors = validatePayload(req.body, true);
  if (errors.length > 0) return next(new ApiError(400, "Invalid skill data.", errors));
  next();
};