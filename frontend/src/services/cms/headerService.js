import createSingletonService from "./createSingletonService.js";

const { getOne, update } = createSingletonService("/header");

export const getHeader = getOne;
export const updateHeader = update;

export default { getHeader, updateHeader };
