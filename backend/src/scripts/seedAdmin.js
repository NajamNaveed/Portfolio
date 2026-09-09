import mongoose from "mongoose";
import env from "../config/env.js";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

const seedAdmin = async () => {
  const email = env.adminEmail;
  const password = env.adminPassword;

  if (!email || !password) {
    console.error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set in the environment to seed the admin account."
    );
    process.exit(1);
  }

  await connectDB();

  const existingAdmin = await Admin.findOne({});

  if (existingAdmin) {
    console.log("An Admin account already exists. Skipping seed.");
    await mongoose.disconnect();
    process.exit(0);
  }

  const admin = new Admin({
    email: email.toLowerCase().trim(),
    password,
  });

  await admin.save();

  console.log(`Admin account created successfully for ${admin.email}.`);

  await mongoose.disconnect();
  process.exit(0);
};

seedAdmin().catch((error) => {
  console.error("Failed to seed Admin account:", error.message);
  process.exit(1);
});