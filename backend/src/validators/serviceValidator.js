import ApiError from "../utils/ApiError.js";

const validatePayload = (body, isUpdate) => {
  const errors = [];

  if (!isUpdate || body.title !== undefined) {
    if (!body.title || typeof body.title !== "string" || !body.title.trim()) {
      errors.push("Title is required.");
    }
  }

  if (body.description !== undefined && typeof body.description !== "string") {
    errors.push("Description must be a string.");
  }

  if (body.features !== undefined && !Array.isArray(body.features)) {
    errors.push("Features must be an array.");
  }

  if (body.order !== undefined && typeof body.order !== "number") {
    errors.push("Order must be a number.");
  }

  if (body.isVisible !== undefined && typeof body.isVisible !== "boolean") {
    errors.push("isVisible must be a boolean.");
  }

  return errors;
};

export const validateCreateService = (req, res, next) => {
  const errors = validatePayload(req.body, false);
  if (errors.length > 0) return next(new ApiError(400, "Invalid service data.", errors));
  next();
};

export const validateUpdateService = (req, res, next) => {
  const errors = validatePayload(req.body, true);
  if (errors.length > 0) return next(new ApiError(400, "Invalid service data.", errors));
  next();
};