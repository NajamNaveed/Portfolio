import ApiError from "../utils/ApiError.js";
import isValidUrl from "../utils/isValidUrl.js";

const validatePayload = (body, isUpdate) => {
  const errors = [];

  if (!isUpdate || body.platform !== undefined) {
    if (!body.platform || typeof body.platform !== "string" || !body.platform.trim()) {
      errors.push("Platform is required.");
    }
  }

  if (!isUpdate || body.url !== undefined) {
    if (!body.url || !isValidUrl(body.url)) {
      errors.push("A valid url is required.");
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

export const validateCreateSocialLink = (req, res, next) => {
  const errors = validatePayload(req.body, false);
  if (errors.length > 0) return next(new ApiError(400, "Invalid social link data.", errors));
  next();
};

export const validateUpdateSocialLink = (req, res, next) => {
  const errors = validatePayload(req.body, true);
  if (errors.length > 0) return next(new ApiError(400, "Invalid social link data.", errors));
  next();
};