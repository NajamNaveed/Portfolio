import ApiError from "../utils/ApiError.js";

const validateButton = (button, fieldName, errors) => {
  if (button === undefined) return;

  if (typeof button !== "object" || button === null || Array.isArray(button)) {
    errors.push(`${fieldName} must be an object.`);
    return;
  }

  if (button.label !== undefined && typeof button.label !== "string") {
    errors.push(`${fieldName}.label must be a string.`);
  }
  if (button.href !== undefined && typeof button.href !== "string") {
    errors.push(`${fieldName}.href must be a string.`);
  }
  if (button.isVisible !== undefined && typeof button.isVisible !== "boolean") {
    errors.push(`${fieldName}.isVisible must be a boolean.`);
  }
};

export const validateHero = (req, res, next) => {
  const errors = [];
  const body = req.body;

  ["badge", "heading", "subheading", "description", "image"].forEach((field) => {
    if (body[field] !== undefined && typeof body[field] !== "string") {
      errors.push(`${field} must be a string.`);
    }
  });

  validateButton(body.primaryButton, "primaryButton", errors);
  validateButton(body.secondaryButton, "secondaryButton", errors);

  if (body.isVisible !== undefined && typeof body.isVisible !== "boolean") {
    errors.push("isVisible must be a boolean.");
  }

  if (errors.length > 0) {
    return next(new ApiError(400, "Invalid hero data.", errors));
  }

  next();
};