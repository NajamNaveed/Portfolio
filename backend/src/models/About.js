import mongoose from "mongoose";

const statisticSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true, required: true, maxlength: 60 },
    value: { type: String, trim: true, required: true, maxlength: 30 },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const highlightSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 300, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const aboutSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, maxlength: 150, default: "" },
    subtitle: { type: String, trim: true, maxlength: 200, default: "" },
    description: { type: String, trim: true, maxlength: 2000, default: "" },
    image: { type: String, trim: true, default: "" },
    statistics: { type: [statisticSchema], default: [] },
    highlights: { type: [highlightSchema], default: [] },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const About = mongoose.model("About", aboutSchema);

export default About;