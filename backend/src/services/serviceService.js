import Service from "../models/Service.js";
import createCrudService from "./crudServiceFactory.js";

const ALLOWED_FIELDS = ["title", "description", "icon", "features", "order", "isVisible"];

const buildFilter = (query) => {
  const filter = {};
  if (query.visible !== undefined) filter.isVisible = query.visible === "true";
  return filter;
};

const serviceService = createCrudService(Service, ALLOWED_FIELDS, {
  defaultSort: "order -createdAt",
  buildFilter,
});

export default serviceService;