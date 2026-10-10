const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const clientUserSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true, index: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  password: { type: String, required: true, select: false },
  isActive: { type: Boolean, default: true, index: true },
  passwordChangedAt: { type: Date, default: null },
  lastLoginAt: { type: Date, default: null },
}, { timestamps: true, versionKey: false });

clientUserSchema.pre("save", async function () {
  if (this.isModified("password")) { this.password = await bcrypt.hash(this.password, 12); this.passwordChangedAt = new Date(); }
});
clientUserSchema.methods.comparePassword = function (candidate) { return bcrypt.compare(candidate, this.password); };
clientUserSchema.set("toJSON", { transform(_doc, ret) { delete ret.password; return ret; } });

module.exports = mongoose.models.ClientUser || mongoose.model("ClientUser", clientUserSchema);
