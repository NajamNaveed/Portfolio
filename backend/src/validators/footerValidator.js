import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";

const validateColumns = (columns, errors) => {
  if (columns === undefined) return;

  if (!Array.isArray(columns)) {
    errors.push("columns must be an array.");
    return;
  }

  columns.forEach((column, index) => {
    if (!column.title || typeof column.title !== "string") {
      errors.push(`columns[${index}].title is required.`);
    }
    if (column.links !== undefined && !Array.isArray(column.links)) {
      errors.push(`columns[${index}].links must be an array.`);
    } else if (Array.isArray(column.links)) {
      column.links.forEach((link, linkIndex) => {
        if (!link.label || typeof link.label !== "string") {
          errors.push(`columns[${index}].links[${linkIndex}].label is required.`);
        }
        if (!link.href || typeof link.href !== "string") {
          errors.push(`columns[${index}].links[${linkIndex}].href is required.`);
        }
      });
    }
  });
};

const validateSocialLinks = (socialLinks, errors) => {
  if (socialLinks === undefined) return;

  if (!Array.isArray(socialLinks)) {
    errors.push("socialLinks must be an array of ids.");
    return;
  }

  socialLinks.forEach((id, index) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      errors.push(`socialLinks[${index}] is not a valid id.`);
    }
  });
};

export const validateFooter = (req, res, next) => {
  const errors = [];
  const body = req.body;

  if (body.description !== undefined && typeof body.description !== "string") {
    errors.push("description must be a string.");
  }

  if (body.copyrightText !== undefined && typeof body.copyrightText !== "string") {
    errors.push("copyrightText must be a string.");
  }

  validateColumns(body.columns, errors);
  validateSocialLinks(body.socialLinks, errors);

  if (body.isVisible !== undefined && typeof body.isVisible !== "boolean") {
    errors.push("isVisible must be a boolean.");
  }

  if (errors.length > 0) {
    return next(new ApiError(400, "Invalid footer data.", errors));
  }

  next();
};