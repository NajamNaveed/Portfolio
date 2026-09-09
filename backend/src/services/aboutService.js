import About from "../models/About.js";
import createSingletonService from "./singletonServiceFactory.js";
import pick from "../utils/pick.js";

const ALLOWED_FIELDS = ["title", "subtitle", "description", "image", "statistics", "highlights", "isVisible"];

const { getSingleton, upsertSingleton } = createSingletonService(About);

export const getAbout = () => getSingleton();
export const updateAbout = (data) => upsertSingleton(pick(data, ALLOWED_FIELDS));

export default { getAbout, updateAbout };