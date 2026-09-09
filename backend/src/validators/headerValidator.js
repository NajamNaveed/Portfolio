import ApiError from "../utils/ApiError.js";

const validateNavigationItems = (items, errors) => {
  if (items === undefined) return;

  if (!Array.isArray(items)) {
    errors.push("navigationItems must be an array.");
    return;
  }

  items.forEach((item, index) => {
    if (!item.label || typeof item.label !== "string") {
      errors.push(`navigationItems[${index}].label is required.`);
    }
    if (!item.href || typeof item.href !== "string") {
      errors.push(`navigationItems[${index}].href is required.`);
    }
    if (item.order !== undefined && typeof item.order !== "number") {
      errors.push(`navigationItems[${index}].order must be a number.`);
    }
    if (item.isVisible !== undefined && typeof item.isVisible !== "boolean") {
      errors.push(`navigationItems[${index}].isVisible must be a boolean.`);
    }
  });
};

const validateCta = (cta, errors) => {
  if (cta === undefined) return;

  if (typeof cta !== "object" || cta === null || Array.isArray(cta)) {
    errors.push("cta must be an object.");
    return;
  }

  if (cta.label !== undefined && typeof cta.label !== "string") {
    errors.push("cta.label must be a string.");
  }
  if (cta.href !== undefined && typeof cta.href !== "string") {
    errors.push("cta.href must be a string.");
  }
  if (cta.isVisible !== undefined && typeof cta.isVisible !== "boolean") {
    errors.push("cta.isVisible must be a boolean.");
  }
};

export const validateHeader = (req, res, next) => {
  const errors = [];
  const body = req.body;

  if (body.logo !== undefined && typeof body.logo !== "string") {
    errors.push("logo must be a string.");
  }

  validateNavigationItems(body.navigationItems, errors);
  validateCta(body.cta, errors);

  if (body.isVisible !== undefined && typeof body.isVisible !== "boolean") {
    errors.push("isVisible must be a boolean.");
  }

  if (errors.length > 0) {
    return next(new ApiError(400, "Invalid header data.", errors));
  }

  next();
};