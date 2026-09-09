import createSingletonService from "./createSingletonService.js";

const { getOne, update } = createSingletonService("/hero");

export const getHero = getOne;
export const updateHero = update;

export default { getHero, updateHero };
