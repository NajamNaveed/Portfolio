import createSingletonService from "./createSingletonService.js";

const { getOne, update } = createSingletonService("/footer");

export const getFooter = getOne;
export const updateFooter = update;

export default { getFooter, updateFooter };
