const jwt = require("jsonwebtoken");

const getSecret = () => {
  if (!process.env.JWT_SECRET) {
    const error = new Error("JWT_SECRET is not configured.");
    error.statusCode = 500;
    throw error;
  }
  return process.env.JWT_SECRET;
};

const signAccessToken = (admin) =>
  jwt.sign(
    { id: admin._id.toString(), role: admin.role, pwv: admin.passwordChangedAt?.getTime() || 0 },
    getSecret(),
    { expiresIn: process.env.JWT_EXPIRES_IN || "8h", issuer: "keyroutes-admin" }
  );

const signClientToken = (user) =>
  jwt.sign(
    { id: user._id.toString(), clientId: user.client.toString(), type: "client", pwv: user.passwordChangedAt?.getTime() || 0 },
    getSecret(),
    { expiresIn: process.env.CLIENT_JWT_EXPIRES_IN || "12h", issuer: "keyroutes-client" }
  );

const verifyAccessToken = (token) =>
  jwt.verify(token, getSecret(), { issuer: "keyroutes-admin" });

const verifyClientToken = (token) =>
  jwt.verify(token, getSecret(), { issuer: "keyroutes-client" });

const extractToken = (authorization = "") => {
  const [scheme, token] = String(authorization).split(" ");
  return scheme === "Bearer" && token ? token : null;
};

module.exports = { signAccessToken, signClientToken, verifyAccessToken, verifyClientToken, extractToken };
