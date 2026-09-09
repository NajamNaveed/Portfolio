import Footer from "../models/Footer.js";
import createSingletonService from "./singletonServiceFactory.js";
import pick from "../utils/pick.js";

const ALLOWED_FIELDS = ["description", "copyrightText", "columns", "socialLinks", "isVisible"];

const { getSingleton, upsertSingleton } = createSingletonService(Footer);

export const getFooter = () => getSingleton();
export const updateFooter = (data) => upsertSingleton(pick(data, ALLOWED_FIELDS));

export default { getFooter, updateFooter };