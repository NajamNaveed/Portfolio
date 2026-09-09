import SocialLink from "../models/SocialLink.js";
import createCrudService from "./crudServiceFactory.js";

const ALLOWED_FIELDS = ["platform", "label", "url", "icon", "order", "isVisible"];

const buildFilter = (query) => {
  const filter = {};
  if (query.visible !== undefined) filter.isVisible = query.visible === "true";
  return filter;
};

const socialLinkService = createCrudService(SocialLink, ALLOWED_FIELDS, {
  defaultSort: "order -createdAt",
  buildFilter,
});

export default socialLinkService;