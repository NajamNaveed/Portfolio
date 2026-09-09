import createCollectionService from "./createCollectionService.js";

const skillResource = createCollectionService("/skills");

export const listSkills = skillResource.list;
export const getSkillById = skillResource.getById;
export const createSkill = skillResource.create;
export const updateSkill = skillResource.update;
export const deleteSkill = skillResource.remove;

export default skillResource;
