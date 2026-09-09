import mongoose from "mongoose";

const footerLinkSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true, required: true, maxlength: 80 },
    href: { type: String, trim: true, required: true, maxlength: 300 },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const footerColumnSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true, maxlength: 80 },
    links: { type: [footerLinkSchema], default: [] },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const footerSchema = new mongoose.Schema(
  {
    description: { type: String, trim: true, maxlength: 500, default: "" },
    copyrightText: { type: String, trim: true, maxlength: 200, default: "" },
    columns: { type: [footerColumnSchema], default: [] },
    socialLinks: [{ type: mongoose.Schema.Types.ObjectId, ref: "SocialLink" }],
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Footer = mongoose.model("Footer", footerSchema);

export default Footer;