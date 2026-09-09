import createCollectionService from "./createCollectionService.js";

const serviceResource = createCollectionService("/services");

export const listServices = serviceResource.list;
export const getServiceById = serviceResource.getById;
export const createService = serviceResource.create;
export const updateService = serviceResource.update;
export const deleteService = serviceResource.remove;

export default serviceResource;
