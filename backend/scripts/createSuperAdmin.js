const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const Admin = require("../models/Admin");
const { validatePasswordStrength } = require("../utils/password");

dotenv.config();

const createSuperAdmin = async () => {
  try {
    await connectDB();

    const name = process.env.SUPER_ADMIN_NAME;
    const email = process.env.SUPER_ADMIN_EMAIL;
    const password = process.env.SUPER_ADMIN_PASSWORD;
    const phone = process.env.SUPER_ADMIN_PHONE || "";

    if (!name || !email || !password) {
      throw new Error(
        "SUPER_ADMIN_NAME, SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD are required in .env."
      );
    }

    const passwordValidation = validatePasswordStrength(password);

    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.message);
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingAdmin = await Admin.findOne({
      email: normalizedEmail,
    });

    if (existingAdmin) {
      console.log(`Super Admin already exists: ${normalizedEmail}`);
      return;
    }

    const admin = await Admin.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      phone: phone.trim(),
      role: "Super Admin",
      isActive: true,
    });

    console.log("Super Admin created successfully");
    console.log(`Name: ${admin.name}`);
    console.log(`Email: ${admin.email}`);
  } catch (error) {
    console.error("Create Super Admin Error:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

createSuperAdmin();