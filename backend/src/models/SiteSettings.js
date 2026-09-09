import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, trim: true, maxlength: 120, default: "" },
    siteTitle: { type: String, trim: true, maxlength: 160, default: "" },
    siteDescription: { type: String, trim: true, maxlength: 500, default: "" },
    logo: { type: String, trim: true, default: "" },
    favicon: { type: String, trim: true, default: "" },
    email: { type: String, trim: true, lowercase: true, default: "" },
    phone: { type: String, trim: true, default: "" },
    location: { type: String, trim: true, default: "" },
    defaultSeoTitle: { type: String, trim: true, maxlength: 160, default: "" },
    defaultSeoDescription: { type: String, trim: true, maxlength: 300, default: "" },
  },
  { timestamps: true }
);

const SiteSettings = mongoose.model("SiteSettings", siteSettingsSchema);

export default SiteSettings;