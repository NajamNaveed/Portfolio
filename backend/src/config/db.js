import mongoose from "mongoose";
import env from "./env.js";

const connectDB = async () => {
  if (!env.mongodbUri) {
    console.warn(
      "MONGODB_URI is not set. Skipping database connection (development boot only)."
    );
    return;
  }

  try {
    await mongoose.connect(env.mongodbUri);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;