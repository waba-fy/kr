const ClientUser = require("../models/ClientUser");
const Client = require("../models/Client");
const { extractToken, verifyClientToken } = require("../utils/jwt");

const authenticateClient = async (req, res, next) => {
  try {
    const token = extractToken(req.headers.authorization);
    if (!token) return res.status(401).json({ success: false, message: "Client authentication token is required." });
    const decoded = verifyClientToken(token);
    const [user, client] = await Promise.all([ClientUser.findById(decoded.id), Client.findById(decoded.clientId)]);
    if (!user || !user.isActive) return res.status(403).json({ success: false, message: "Client user access is disabled." });
    if (!client || client.status !== "Active") return res.status(403).json({ success: false, message: "Client account is inactive." });
    if (String(user.client) !== String(client._id)) return res.status(403).json({ success: false, message: "Client access mismatch." });
    const changedAt = user.passwordChangedAt?.getTime() || 0;
    if (decoded.pwv !== undefined ? decoded.pwv !== changedAt : (changedAt && decoded.iat * 1000 < Math.floor(changedAt / 1000) * 1000)) return res.status(401).json({ success: false, message: "Password changed. Please sign in again." });
    req.clientUser = user; req.client = client;
    return next();
  } catch (error) {
    if (["TokenExpiredError", "JsonWebTokenError"].includes(error.name)) return res.status(401).json({ success: false, message: "Client session is invalid or expired." });
    return next(error);
  }
};

module.exports = { authenticateClient };
