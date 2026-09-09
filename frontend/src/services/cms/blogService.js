import createCollectionService from "./createCollectionService.js";

const blogResource = createCollectionService("/blogs");

export const listBlogs = blogResource.list;
export const getBlogById = blogResource.getById;
export const createBlog = blogResource.create;
export const updateBlog = blogResource.update;
export const deleteBlog = blogResource.remove;

export default blogResource;
