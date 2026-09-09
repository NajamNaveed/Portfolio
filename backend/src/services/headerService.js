import Header from "../models/Header.js";
import createSingletonService from "./singletonServiceFactory.js";
import pick from "../utils/pick.js";

const ALLOWED_FIELDS = ["logo", "navigationItems", "cta", "isVisible"];

const { getSingleton, upsertSingleton } = createSingletonService(Header);

export const getHeader = () => getSingleton();
export const updateHeader = (data) => upsertSingleton(pick(data, ALLOWED_FIELDS));

export default { getHeader, updateHeader };