import SiteSettings from "../models/SiteSettings.js";
import createSingletonService from "./singletonServiceFactory.js";
import pick from "../utils/pick.js";

const ALLOWED_FIELDS = [
  "siteName",
  "siteTitle",
  "siteDescription",
  "logo",
  "favicon",
  "email",
  "phone",
  "location",
  "defaultSeoTitle",
  "defaultSeoDescription",
];

const { getSingleton, upsertSingleton } = createSingletonService(SiteSettings);

export const getSiteSettings = () => getSingleton();
export const updateSiteSettings = (data) => upsertSingleton(pick(data, ALLOWED_FIELDS));

export default { getSiteSettings, updateSiteSettings };