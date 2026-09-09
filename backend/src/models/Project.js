import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    slug: { type: String, required: true, trim: true, lowercase: true, unique: true },
    shortDescription: { type: String, required: true, trim: true, maxlength: 300 },
    description: { type: String, required: true, trim: true },
    coverImage: { type: String, trim: true, default: "" },
    images: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    githubUrl: { type: String, trim: true, default: "" },
    liveUrl: { type: String, trim: true, default: "" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

projectSchema.index({ featured: 1 });

const Project = mongoose.model("Project", projectSchema);

export default Project;