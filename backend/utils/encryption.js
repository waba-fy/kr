const crypto = require("crypto");

const getKey = () => {
  const source = process.env.SETTINGS_ENCRYPTION_KEY;
  if (!source) throw new Error("SETTINGS_ENCRYPTION_KEY is not configured.");
  return crypto.createHash("sha256").update(source).digest();
};

const encrypt = (value = "") => {
  if (!value) return "";
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(String(value), "utf8"), cipher.final()]);
  return [iv.toString("hex"), cipher.getAuthTag().toString("hex"), encrypted.toString("hex")].join(":");
};

const decrypt = (payload = "") => {
  if (!payload) return "";
  const [iv, tag, encrypted] = payload.split(":");
  const decipher = crypto.createDecipheriv("aes-256-gcm", getKey(), Buffer.from(iv, "hex"));
  decipher.setAuthTag(Buffer.from(tag, "hex"));
  return Buffer.concat([decipher.update(Buffer.from(encrypted, "hex")), decipher.final()]).toString("utf8");
};

module.exports = { encrypt, decrypt };
