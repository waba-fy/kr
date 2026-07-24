const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: "Authentication is required.",
      });
    }

    if (!allowedRoles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to access this resource.",
      });
    }

    return next();
  };
};

const requirePermission = (moduleName, action) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: "Authentication is required.",
      });
    }

    if (typeof req.admin.hasPermission !== "function") {
      return res.status(500).json({
        success: false,
        message: "Admin permission configuration is unavailable.",
      });
    }

    const hasPermission = req.admin.hasPermission(moduleName, action);

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: `You do not have permission to ${action} ${moduleName}.`,
      });
    }

    return next();
  };
};

module.exports = {
  requireRole,
  requirePermission,
};