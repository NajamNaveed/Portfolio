import createSingletonService from "./createSingletonService.js";

const { getOne, update } = createSingletonService("/about");

export const getAbout = getOne;
export const updateAbout = update;

export default { getAbout, updateAbout };
