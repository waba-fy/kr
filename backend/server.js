const dotenv = require("dotenv");

dotenv.config({ path: require("path").join(__dirname, ".env.local"), quiet: true });
dotenv.config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const connectDB = require("./config/db");
const Client = require("./models/Client");

const consultationRoutes = require("./routes/consultationRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const careerRoutes = require("./routes/careerRoutes");
const supportRoutes = require("./routes/supportRoutes");
const { createInvoiceRouter } = require("./routes/invoiceRoutes");
const { createTicketRouter } = require("./routes/supportTicketRoutes");
const marketingRoutes = require("./routes/marketingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contentRoutes = require("./routes/contentRoutes");
const trackingRoutes = require("./routes/trackingRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const clientRoutes = require("./routes/clientRoutes");
const adminClientRoutes = require("./routes/adminClientRoutes");

const app = express();

app.disable("x-powered-by");
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});

const publicPostAttempts = new Map();
const protectPublicForms = (req, res, next) => {
  if (req.method !== "POST" || req.path.startsWith("/api/admin/") || req.path === "/api/client/events/collect") return next();
  const ip = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown").split(",")[0].trim();
  const key = `${ip}:${req.path}`;
  const now = Date.now();
  const current = publicPostAttempts.get(key) || { count: 0, resetAt: now + 15 * 60 * 1000 };
  if (now > current.resetAt) { current.count = 0; current.resetAt = now + 15 * 60 * 1000; }
  current.count += 1;
  publicPostAttempts.set(key, current);
  if (current.count > 20) {
    return res.status(429).json({ success: false, message: "Too many submissions. Please try again later." });
  }
  return next();
};

/* ----------------------------------
   CORS
----------------------------------- */

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5176",
  "http://localhost:5173",
  "http://127.0.0.1:5176",
  "http://127.0.0.1:5173",
  "https://keyroutes.co",
  "https://www.keyroutes.co"
].filter(Boolean);

console.log("Environment loaded:", {
  database: Boolean(process.env.MONGO_URI),
  mail: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER),
  jwt: Boolean(process.env.JWT_SECRET),
});

app.use(
  cors({
    origin(origin, callback) {
      /*
       * Allow requests without an Origin header,
       * such as Postman, curl and server-to-server calls.
       */
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      let hostname = "";
      try { hostname = new URL(origin).hostname.toLowerCase().replace(/^www\./, ""); } catch { hostname = ""; }
      const escapedHostname = hostname.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return Client.exists({ status: "Active", $or: [
        { domain: hostname },
        { landingPages: { $elemMatch: { isActive: { $ne: false }, url: { $regex: `^https?://(www\\.)?${escapedHostname}(/|$)`, $options: "i" } } } },
      ] })
        .then((exists) => callback(exists ? null : Object.assign(new Error(`CORS blocked request from origin: ${origin}`), { statusCode: 403 }), Boolean(exists)))
        .catch(() => callback(Object.assign(new Error("Unable to validate request origin."), { statusCode: 503 })));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Turnstile-Token"],
  })
);

/* ----------------------------------
   Request Parsers
----------------------------------- */

app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);

/* ----------------------------------
   Static Uploads
----------------------------------- */

// Uploaded resumes contain personal information and are intentionally not public.

/* ----------------------------------
   Health Check
----------------------------------- */

app.get("/", (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "KeyRoutes Backend API Running",
    environment:
      process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "KeyRoutes API is healthy",
  });
});

/* ----------------------------------
   API Routes
----------------------------------- */

app.use(protectPublicForms);

app.use(
  "/api/consultations",
  consultationRoutes
);

app.use(
  "/api/newsletter",
  newsletterRoutes
);

app.use(
  "/api/careers",
  careerRoutes
);

app.use("/api/support", 
  supportRoutes
);

app.use("/api/tracking", trackingRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/public", require("./routes/crawlRoutes"));
app.use("/api/public", settingsRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/admin/clients", adminClientRoutes);
app.use("/api/client/invoices", createInvoiceRouter(false));
app.use("/api/admin/invoices", createInvoiceRouter(true));
app.use("/api/client/tickets", createTicketRouter(false));
app.use("/api/admin/tickets", createTicketRouter(true));
app.use("/api/marketing", marketingRoutes);
app.use("/api/admin/marketing", marketingRoutes);
app.use("/api/admin", adminRoutes);
/* ----------------------------------
   404 Handler
----------------------------------- */

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

/* ----------------------------------
   Global Error Handler
----------------------------------- */

app.use((err, _req, res, _next) => {
  console.error("Unhandled server error:", err);

  /*
   * Multer-specific upload errors.
   */
  if (err instanceof multer.MulterError) {
    let message = "Unable to upload the file.";

    if (err.code === "LIMIT_FILE_SIZE") {
      message =
        "Resume file is too large. Maximum allowed size is 5 MB.";
    }

    if (err.code === "LIMIT_FILE_COUNT") {
      message =
        "Only one resume file can be uploaded.";
    }

    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      message =
        "Unexpected upload field. Please upload the resume using the 'resume' field.";
    }

    return res.status(400).json({
      success: false,
      message,
      errors: {
        resume: message,
      },
    });
  }

  const statusCode =
    err.statusCode ||
    err.status ||
    500;

  const isProduction =
    process.env.NODE_ENV === "production";

  return res.status(statusCode).json({
    success: false,
    message:
      isProduction && statusCode >= 500
        ? "Internal Server Error"
        : err.message ||
          "Internal Server Error",
  });
});

/* ----------------------------------
   Start Server
----------------------------------- */

const PORT = Number(
  process.env.PORT || 5000
);

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(
      PORT,
      () => {
        console.log(
          `🚀 KeyRoutes Backend running on port ${PORT}`
        );
      }
    );

    const shutdown = (signal) => {
      console.log(
        `${signal} received. Closing server...`
      );

      server.close(() => {
        console.log(
          "HTTP server closed successfully"
        );

        process.exit(0);
      });
    };

    process.on("SIGINT", () =>
      shutdown("SIGINT")
    );

    process.on("SIGTERM", () =>
      shutdown("SIGTERM")
    );
  } catch (error) {
    console.error(
      "Unable to start server:",
      error.message
    );

    process.exit(1);
  }
};

startServer();
