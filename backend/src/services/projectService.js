import Project from "../models/Project.js";
import createCrudService from "./crudServiceFactory.js";
import slugify from "../utils/slugify.js";
import ensureUniqueSlug from "../utils/ensureUniqueSlug.js";
import ApiError from "../utils/ApiError.js";

const ALLOWED_FIELDS = [
  "title",
  "slug",
  "shortDescription",
  "description",
  "coverImage",
  "images",
  "technologies",
  "githubUrl",
  "liveUrl",
  "featured",
  "order",
  "isVisible",
];

const buildFilter = (query) => {
  const filter = {};
  if (query.featured !== undefined) filter.featured = query.featured === "true";
  if (query.visible !== undefined) filter.isVisible = query.visible === "true";
  return filter;
};

const beforeCreate = async (payload) => {
  if (!payload.title) {
    throw new ApiError(400, "Title is required.");
  }

  payload.slug = slugify(payload.slug || payload.title);
  await ensureUniqueSlug(Project, payload.slug);
  return payload;
};

const beforeUpdate = async (payload, id) => {
  if (payload.slug) {
    payload.slug = slugify(payload.slug);
    await ensureUniqueSlug(Project, payload.slug, id);
  }
  return payload;
};

const projectService = createCrudService(Project, ALLOWED_FIELDS, {
  defaultSort: "order -createdAt",
  buildFilter,
  beforeCreate,
  beforeUpdate,
});

export default projectService;