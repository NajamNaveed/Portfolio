import ApiError from "../utils/ApiError.js";

const isValidDate = (value) => !Number.isNaN(new Date(value).getTime());

const validatePayload = (body, isUpdate) => {
  const errors = [];

  if (!isUpdate || body.company !== undefined) {
    if (!body.company || typeof body.company !== "string" || !body.company.trim()) {
      errors.push("Company is required.");
    }
  }

  if (!isUpdate || body.position !== undefined) {
    if (!body.position || typeof body.position !== "string" || !body.position.trim()) {
      errors.push("Position is required.");
    }
  }

  if (!isUpdate || body.startDate !== undefined) {
    if (!body.startDate || !isValidDate(body.startDate)) {
      errors.push("A valid startDate is required.");
    }
  }

  if (body.endDate !== undefined && body.endDate !== null && !isValidDate(body.endDate)) {
    errors.push("endDate must be a valid date.");
  }

  if (body.current !== undefined && typeof body.current !== "boolean") {
    errors.push("current must be a boolean.");
  }

  if (body.technologies !== undefined && !Array.isArray(body.technologies)) {
    errors.push("technologies must be an array.");
  }

  if (body.order !== undefined && typeof body.order !== "number") {
    errors.push("Order must be a number.");
  }

  if (body.isVisible !== undefined && typeof body.isVisible !== "boolean") {
    errors.push("isVisible must be a boolean.");
  }

  return errors;
};

export const validateCreateExperience = (req, res, next) => {
  const errors = validatePayload(req.body, false);
  if (errors.length > 0) return next(new ApiError(400, "Invalid experience data.", errors));
  next();
};

export const validateUpdateExperience = (req, res, next) => {
  const errors = validatePayload(req.body, true);
  if (errors.length > 0) return next(new ApiError(400, "Invalid experience data.", errors));
  next();
};