import ApiError from "../utils/ApiError.js";
import isValidUrl from "../utils/isValidUrl.js";

const validatePayload = (body, isUpdate) => {
  const errors = [];

  if (!isUpdate || body.title !== undefined) {
    if (!body.title || typeof body.title !== "string" || !body.title.trim()) {
      errors.push("Title is required.");
    } else if (body.title.trim().length > 150) {
      errors.push("Title must be under 150 characters.");
    }
  }

  if (!isUpdate || body.shortDescription !== undefined) {
    if (!body.shortDescription || typeof body.shortDescription !== "string") {
      errors.push("Short description is required.");
    } else if (body.shortDescription.length > 300) {
      errors.push("Short description must be under 300 characters.");
    }
  }

  if (!isUpdate || body.description !== undefined) {
    if (!body.description || typeof body.description !== "string") {
      errors.push("Description is required.");
    }
  }

  if (body.slug !== undefined && body.slug !== "") {
    if (typeof body.slug !== "string" || !/^[a-z0-9-]+$/i.test(body.slug)) {
      errors.push("Slug must contain only letters, numbers and hyphens.");
    }
  }

  if (body.githubUrl !== undefined && body.githubUrl !== "" && !isValidUrl(body.githubUrl)) {
    errors.push("Github URL must be a valid URL.");
  }

  if (body.liveUrl !== undefined && body.liveUrl !== "" && !isValidUrl(body.liveUrl)) {
    errors.push("Live URL must be a valid URL.");
  }

  if (body.coverImage !== undefined && body.coverImage !== "" && !isValidUrl(body.coverImage)) {
    errors.push("Cover image must be a valid URL.");
  }

  if (body.images !== undefined) {
    if (!Array.isArray(body.images)) {
      errors.push("Images must be an array.");
    } else if (body.images.some((url) => typeof url !== "string" || !url.trim() || !isValidUrl(url))) {
      errors.push("Each image must be a valid URL.");
    }
  }

  if (body.technologies !== undefined && !Array.isArray(body.technologies)) {
    errors.push("Technologies must be an array.");
  }

  if (body.featured !== undefined && typeof body.featured !== "boolean") {
    errors.push("Featured must be a boolean.");
  }

  if (body.isVisible !== undefined && typeof body.isVisible !== "boolean") {
    errors.push("isVisible must be a boolean.");
  }

  if (body.order !== undefined && typeof body.order !== "number") {
    errors.push("Order must be a number.");
  }

  return errors;
};

export const validateCreateProject = (req, res, next) => {
  const errors = validatePayload(req.body, false);
  if (errors.length > 0) return next(new ApiError(400, "Invalid project data.", errors));
  next();
};

export const validateUpdateProject = (req, res, next) => {
  const errors = validatePayload(req.body, true);
  if (errors.length > 0) return next(new ApiError(400, "Invalid project data.", errors));
  next();
};