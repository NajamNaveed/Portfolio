import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, trim: true, lowercase: true, unique: true },
    excerpt: { type: String, trim: true, maxlength: 300, default: "" },
    content: { type: String, required: true },
    coverImage: { type: String, trim: true, default: "" },
    category: { type: String, trim: true, maxlength: 80, default: "" },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    featured: { type: Boolean, default: false },
    author: { type: String, trim: true, maxlength: 120, default: "Admin" },
    readingTime: { type: Number, default: 1 },
    seoTitle: { type: String, trim: true, maxlength: 160, default: "" },
    seoDescription: { type: String, trim: true, maxlength: 300, default: "" },
    publishedAt: { type: Date, default: null },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

blogPostSchema.index({ status: 1 });
blogPostSchema.index({ publishedAt: -1 });

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

export default BlogPost;