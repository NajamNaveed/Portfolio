import ApiError from "../utils/ApiError.js";
import pick from "../utils/pick.js";
import { parsePagination, buildPaginationMeta } from "../utils/pagination.js";

const createCrudService = (Model, allowedFields, options = {}) => {
  const { defaultSort = "-createdAt", buildFilter, beforeCreate, beforeUpdate } = options;

  const list = async (query = {}) => {
    const { page, limit, skip } = parsePagination(query);
    const filter = buildFilter ? buildFilter(query) : {};
    const sort = query.sort || defaultSort;

    const [items, totalItems] = await Promise.all([
      Model.find(filter).sort(sort).skip(skip).limit(limit),
      Model.countDocuments(filter),
    ]);

    return {
      items,
      pagination: buildPaginationMeta(page, limit, totalItems),
    };
  };

  const getById = async (id) => {
    const doc = await Model.findById(id);

    if (!doc) {
      throw new ApiError(404, "Resource not found.");
    }

    return doc;
  };

  const create = async (data) => {
    let payload = pick(data, allowedFields);

    if (beforeCreate) {
      payload = await beforeCreate(payload);
    }

    return Model.create(payload);
  };

  const update = async (id, data) => {
    let payload = pick(data, allowedFields);

    if (beforeUpdate) {
      payload = await beforeUpdate(payload, id);
    }

    const doc = await Model.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      throw new ApiError(404, "Resource not found.");
    }

    return doc;
  };

  const remove = async (id) => {
    const doc = await Model.findByIdAndDelete(id);

    if (!doc) {
      throw new ApiError(404, "Resource not found.");
    }

    return doc;
  };

  // Public, read-only accessor for the visitor-facing portfolio.
  // Always scoped to isVisible: true and never paginated - these are
  // small, admin-curated collections, so a plain sorted list is enough.
  const listPublic = async (extraFilter = {}, publicOptions = {}) => {
    const filter = { isVisible: true, ...extraFilter };
    const sort = publicOptions.sort || defaultSort;

    let cursor = Model.find(filter).sort(sort);

    if (publicOptions.limit) {
      cursor = cursor.limit(publicOptions.limit);
    }

    return cursor;
  };

  return { list, getById, create, update, remove, listPublic };
};

export default createCrudService;