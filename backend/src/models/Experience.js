import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true, trim: true, maxlength: 120 },
    position: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, trim: true, maxlength: 2000, default: "" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    current: { type: Boolean, default: false },
    location: { type: String, trim: true, maxlength: 150, default: "" },
    technologies: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;