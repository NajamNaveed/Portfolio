import mongoose from "mongoose";

const heroButtonSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true, maxlength: 60, default: "" },
    href: { type: String, trim: true, maxlength: 300, default: "" },
    isVisible: { type: Boolean, default: false },
  },
  { _id: false }
);

const heroSchema = new mongoose.Schema(
  {
    badge: { type: String, trim: true, maxlength: 80, default: "" },
    heading: { type: String, trim: true, maxlength: 200, default: "" },
    subheading: { type: String, trim: true, maxlength: 200, default: "" },
    description: { type: String, trim: true, maxlength: 500, default: "" },
    primaryButton: { type: heroButtonSchema, default: () => ({}) },
    secondaryButton: { type: heroButtonSchema, default: () => ({}) },
    image: { type: String, trim: true, default: "" },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Hero = mongoose.model("Hero", heroSchema);

export default Hero;