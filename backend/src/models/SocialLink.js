import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true, trim: true, maxlength: 60 },
    label: { type: String, trim: true, maxlength: 80, default: "" },
    url: { type: String, required: true, trim: true },
    icon: { type: String, trim: true, default: "" },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const SocialLink = mongoose.model("SocialLink", socialLinkSchema);

export default SocialLink;