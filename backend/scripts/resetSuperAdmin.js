const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Admin = require("../models/Admin");
const { validatePasswordStrength } = require("../utils/password");

dotenv.config();

(async () => {
  try {
    const email = String(process.env.SUPER_ADMIN_EMAIL || "").trim().toLowerCase();
    const password = String(process.env.SUPER_ADMIN_PASSWORD || "");
    const validation = validatePasswordStrength(password);
    if (!email || !validation.isValid) throw new Error(validation.message || "SUPER_ADMIN_EMAIL is required.");
    await connectDB();
    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) throw new Error("Super Admin account was not found. Run npm run create-admin first.");
    admin.password = password;
    admin.isActive = true;
    admin.role = "Super Admin";
    // Older admin records used a different permissions shape. Super Admins do
    // not require explicit permissions, so normalize the field while resetting.
    admin.permissions = [];
    await admin.save();
    console.log("Super Admin password reset successfully.");
  } catch (error) {
    console.error("Reset Super Admin Error:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
})();
