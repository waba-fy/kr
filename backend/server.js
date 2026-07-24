const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const connectDB = require("./config/db");

const consultationRoutes = require("./routes/consultationRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const careerRoutes = require("./routes/careerRoutes");
const supportRoutes = require("./routes/supportRoutes");

const app = express();

/* ----------------------------------
   CORS
----------------------------------- */

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5176",
  "http://localhost:5173",
].filter(Boolean);

console.log("Environment check:", {
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USER: process.env.SMTP_USER,
  FROM_EMAIL: process.env.FROM_EMAIL,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
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

      const error = new Error(
        `CORS blocked request from origin: ${origin}`
      );

      error.statusCode = 403;

      return callback(error);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads"),
    {
      fallthrough: false,
      maxAge:
        process.env.NODE_ENV === "production"
          ? "1d"
          : 0,
    }
  )
);

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