import BlogPost from "../models/BlogPost.js";
import createCrudService from "./crudServiceFactory.js";
import slugify from "../utils/slugify.js";
import ensureUniqueSlug from "../utils/ensureUniqueSlug.js";
import calculateReadingTime from "../utils/readingTime.js";
import ApiError from "../utils/ApiError.js";

const ALLOWED_FIELDS = [
  "title",
  "slug",
  "excerpt",
  "content",
  "coverImage",
  "category",
  "tags",
  "status",
  "featured",
  "author",
  "seoTitle",
  "seoDescription",
  "publishedAt",
  "isVisible",
];

const buildFilter = (query) => {
  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.featured !== undefined) filter.featured = query.featured === "true";
  if (query.category) filter.category = query.category;
  if (query.tag) filter.tags = query.tag;
  return filter;
};

const beforeCreate = async (payload) => {
  if (!payload.title) {
    throw new ApiError(400, "Title is required.");
  }

  payload.slug = slugify(payload.slug || payload.title);
  await ensureUniqueSlug(BlogPost, payload.slug);
  payload.readingTime = calculateReadingTime(payload.content || "");

  if (payload.status === "published" && !payload.publishedAt) {
    payload.publishedAt = new Date();
  }

  return payload;
};

const beforeUpdate = async (payload, id) => {
  if (payload.slug) {
    payload.slug = slugify(payload.slug);
    await ensureUniqueSlug(BlogPost, payload.slug, id);
  }

  if (payload.content) {
    payload.readingTime = calculateReadingTime(payload.content);
  }

  if (payload.status === "published") {
    const existing = await BlogPost.findById(id);
    if (existing && !existing.publishedAt && !payload.publishedAt) {
      payload.publishedAt = new Date();
    }
  }

  return payload;
};

const blogService = createCrudService(BlogPost, ALLOWED_FIELDS, {
  defaultSort: "-publishedAt -createdAt",
  buildFilter,
  beforeCreate,
  beforeUpdate,
});

export default blogService;