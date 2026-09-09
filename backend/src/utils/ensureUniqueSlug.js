import ApiError from "./ApiError.js";

const ensureUniqueSlug = async (Model, slug, excludeId = null) => {
  const filter = { slug };

  if (excludeId) {
    filter._id = { $ne: excludeId };
  }

  const existing = await Model.findOne(filter);

  if (existing) {
    throw new ApiError(409, `The slug "${slug}" is already in use.`);
  }
};

export default ensureUniqueSlug;