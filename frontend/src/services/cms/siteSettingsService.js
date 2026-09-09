import createSingletonService from "./createSingletonService.js";

const { getOne, update } = createSingletonService("/site-settings");

export const getSiteSettings = getOne;
export const updateSiteSettings = update;

export default { getSiteSettings, updateSiteSettings };
