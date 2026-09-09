import createCollectionService from "./createCollectionService.js";

const socialLinkResource = createCollectionService("/social-links");

export const listSocialLinks = socialLinkResource.list;
export const getSocialLinkById = socialLinkResource.getById;
export const createSocialLink = socialLinkResource.create;
export const updateSocialLink = socialLinkResource.update;
export const deleteSocialLink = socialLinkResource.remove;

export default socialLinkResource;
