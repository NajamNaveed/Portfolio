import createCollectionService from "./createCollectionService.js";

const experienceResource = createCollectionService("/experience");

export const listExperience = experienceResource.list;
export const getExperienceById = experienceResource.getById;
export const createExperience = experienceResource.create;
export const updateExperience = experienceResource.update;
export const deleteExperience = experienceResource.remove;

export default experienceResource;
