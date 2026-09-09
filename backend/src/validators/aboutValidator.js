import ApiError from "../utils/ApiError.js";

const validateStatistics = (statistics, errors) => {
  if (statistics === undefined) return;

  if (!Array.isArray(statistics)) {
    errors.push("statistics must be an array.");
    return;
  }

  statistics.forEach((stat, index) => {
    if (!stat.label || typeof stat.label !== "string") {
      errors.push(`statistics[${index}].label is required.`);
    }
    if (stat.value === undefined || stat.value === null || stat.value === "") {
      errors.push(`statistics[${index}].value is required.`);
    }
    if (stat.order !== undefined && typeof stat.order !== "number") {
      errors.push(`statistics[${index}].order must be a number.`);
    }
  });
};

const validateHighlights = (highlights, errors) => {
  if (highlights === undefined) return;

  if (!Array.isArray(highlights)) {
    errors.push("highlights must be an array.");
    return;
  }

  highlights.forEach((highlight, index) => {
    if (!highlight.title || typeof highlight.title !== "string") {
      errors.push(`highlights[${index}].title is required.`);
    }
    if (highlight.order !== undefined && typeof highlight.order !== "number") {
      errors.push(`highlights[${index}].order must be a number.`);
    }
  });
};

export const validateAbout = (req, res, next) => {
  const errors = [];
  const body = req.body;

  ["title", "subtitle", "description", "image"].forEach((field) => {
    if (body[field] !== undefined && typeof body[field] !== "string") {
      errors.push(`${field} must be a string.`);
    }
  });

  validateStatistics(body.statistics, errors);
  validateHighlights(body.highlights, errors);

  if (body.isVisible !== undefined && typeof body.isVisible !== "boolean") {
    errors.push("isVisible must be a boolean.");
  }

  if (errors.length > 0) {
    return next(new ApiError(400, "Invalid about data.", errors));
  }

  next();
};