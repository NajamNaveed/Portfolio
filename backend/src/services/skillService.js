import Skill from "../models/Skill.js";
import createCrudService from "./crudServiceFactory.js";

const ALLOWED_FIELDS = ["name", "category", "icon", "description", "proficiency", "order", "isVisible"];

const buildFilter = (query) => {
  const filter = {};
  if (query.category) filter.category = query.category;
  if (query.visible !== undefined) filter.isVisible = query.visible === "true";
  return filter;
};

const skillService = createCrudService(Skill, ALLOWED_FIELDS, {
  defaultSort: "order -createdAt",
  buildFilter,
});

export default skillService;