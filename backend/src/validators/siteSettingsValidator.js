import ApiError from "../utils/ApiError.js";
import isValidUrl from "../utils/isValidUrl.js";

const STRING_FIELDS_MAX = {
  siteName: 120,
  siteTitle: 160,
  siteDescription: 500,
  logo: 300,
  favicon: 300,
  email: 254,
  phone: 30,
  location: 150,
  defaultSeoTitle: 160,
  defaultSeoDescription: 300,
};

const URL_FIELDS = ["logo", "favicon"];

export const validateSiteSettings = (req, res, next) => {
  const errors = [];
  const body = req.body;

  Object.entries(STRING_FIELDS_MAX).forEach(([field, maxLength]) => {
    if (body[field] !== undefined) {
      if (typeof body[field] !== "string") {
        errors.push(`${field} must be a string.`);
      } else if (body[field].length > maxLength) {
        errors.push(`${field} must be under ${maxLength} characters.`);
      }
    }
  });

  URL_FIELDS.forEach((field) => {
    if (body[field] !== undefined && body[field] !== "" && !isValidUrl(body[field])) {
      errors.push(`${field} must be a valid URL.`);
    }
  });

  if (body.email !== undefined && body.email !== "" && !/^\S+@\S+\.\S+$/.test(body.email)) {
    errors.push("Email must be a valid email address.");
  }

  if (errors.length > 0) {
    return next(new ApiError(400, "Invalid site settings data.", errors));
  }

  next();
};