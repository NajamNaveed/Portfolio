import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, trim: true, maxlength: 1000, default: "" },
    icon: { type: String, trim: true, default: "" },
    features: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;