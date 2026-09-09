import createCollectionService from "./createCollectionService.js";

const projectResource = createCollectionService("/projects");

export const listProjects = projectResource.list;
export const getProjectById = projectResource.getById;
export const createProject = projectResource.create;
export const updateProject = projectResource.update;
export const deleteProject = projectResource.remove;

export default projectResource;
