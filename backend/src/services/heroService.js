import Hero from "../models/Hero.js";
import createSingletonService from "./singletonServiceFactory.js";
import pick from "../utils/pick.js";

const ALLOWED_FIELDS = [
  "badge",
  "heading",
  "subheading",
  "description",
  "primaryButton",
  "secondaryButton",
  "image",
  "isVisible",
];

const { getSingleton, upsertSingleton } = createSingletonService(Hero);

export const getHero = () => getSingleton();
export const updateHero = (data) => upsertSingleton(pick(data, ALLOWED_FIELDS));

export default { getHero, updateHero };