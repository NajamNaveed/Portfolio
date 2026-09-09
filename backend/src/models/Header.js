import mongoose from "mongoose";

const navigationItemSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true, required: true, maxlength: 60 },
    href: { type: String, trim: true, required: true, maxlength: 300 },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  { _id: true }
);

const ctaSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true, maxlength: 60, default: "" },
    href: { type: String, trim: true, maxlength: 300, default: "" },
    isVisible: { type: Boolean, default: false },
  },
  { _id: false }
);

const headerSchema = new mongoose.Schema(
  {
    logo: { type: String, trim: true, default: "" },
    navigationItems: { type: [navigationItemSchema], default: [] },
    cta: { type: ctaSchema, default: () => ({}) },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Header = mongoose.model("Header", headerSchema);

export default Header;