import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    category: { type: String, trim: true, maxlength: 80, default: "" },
    icon: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, maxlength: 300, default: "" },
    proficiency: { type: Number, min: 0, max: 100, default: 0 },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

skillSchema.index({ category: 1 });

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;