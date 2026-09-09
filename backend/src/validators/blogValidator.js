import ApiError from "../utils/ApiError.js";

const validatePayload = (body, isUpdate) => {
  const errors = [];

  if (!isUpdate || body.title !== undefined) {
    if (!body.title || typeof body.title !== "string" || !body.title.trim()) {
      errors.push("Title is required.");
    } else if (body.title.trim().length > 200) {
      errors.push("Title must be under 200 characters.");
    }
  }

  if (!isUpdate || body.content !== undefined) {
    if (!body.content || typeof body.content !== "string" || !body.content.trim()) {
      errors.push("Content is required.");
    }
  }

  if (body.slug !== undefined && body.slug !== "" && !/^[a-z0-9-]+$/i.test(body.slug)) {
    errors.push("Slug must contain only letters, numbers and hyphens.");
  }

  if (body.status !== undefined && !["draft", "published"].includes(body.status)) {
    errors.push("Status must be either draft or published.");
  }

  if (body.tags !== undefined && !Array.isArray(body.tags)) {
    errors.push("Tags must be an array.");
  }

  if (body.featured !== undefined && typeof body.featured !== "boolean") {
    errors.push("Featured must be a boolean.");
  }

  if (body.isVisible !== undefined && typeof body.isVisible !== "boolean") {
    errors.push("isVisible must be a boolean.");
  }

  if (body.publishedAt !== undefined && body.publishedAt !== null) {
    if (Number.isNaN(new Date(body.publishedAt).getTime())) {
      errors.push("publishedAt must be a valid date.");
    }
  }

  return errors;
};

export const validateCreateBlog = (req, res, next) => {
  const errors = validatePayload(req.body, false);
  if (errors.length > 0) return next(new ApiError(400, "Invalid blog data.", errors));
  next();
};

export const validateUpdateBlog = (req, res, next) => {
  const errors = validatePayload(req.body, true);
  if (errors.length > 0) return next(new ApiError(400, "Invalid blog data.", errors));
  next();
};