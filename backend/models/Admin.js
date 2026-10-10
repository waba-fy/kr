const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const permissionSchema = new mongoose.Schema(
  {
    module: { type: String, required: true, trim: true },
    actions: [{ type: String, enum: ["view", "create", "edit", "delete", "export"] }],
  },
  { _id: false }
);

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, trim: true, default: "" },
    role: { type: String, enum: ["Super Admin", "Admin"], default: "Admin", index: true },
    permissions: { type: [permissionSchema], default: [] },
    isActive: { type: Boolean, default: true, index: true },
    lastLoginAt: { type: Date, default: null },
    passwordChangedAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
  },
  { timestamps: true, versionKey: false }
);

adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordChangedAt = new Date();
});

adminSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

adminSchema.methods.hasPermission = function (moduleName, action) {
  if (this.role === "Super Admin") return true;
  const permission = this.permissions.find((item) => item.module === moduleName);
  return Boolean(permission?.actions?.includes(action));
};

adminSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.password;
    return ret;
  },
});

module.exports = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
