import Experience from "../models/Experience.js";
import createCrudService from "./crudServiceFactory.js";

const ALLOWED_FIELDS = [
  "company",
  "position",
  "description",
  "startDate",
  "endDate",
  "current",
  "location",
  "technologies",
  "order",
  "isVisible",
];

const buildFilter = (query) => {
  const filter = {};
  if (query.visible !== undefined) filter.isVisible = query.visible === "true";
  if (query.current !== undefined) filter.current = query.current === "true";
  return filter;
};

const experienceService = createCrudService(Experience, ALLOWED_FIELDS, {
  defaultSort: "-startDate",
  buildFilter,
});

export default experienceService;