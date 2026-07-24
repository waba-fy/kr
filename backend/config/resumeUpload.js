const fs = require("fs");
const path = require("path");
const multer = require("multer");

const uploadDirectory = path.join(
  __dirname,
  "..",
  "uploads",
  "resumes"
);

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

const sanitizeFilename = (value = "resume") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "resume";

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDirectory);
  },

  filename: (req, file, callback) => {
    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    const applicantName = sanitizeFilename(
      req.body?.name || "candidate"
    );

    const uniqueSuffix = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}`;

    callback(
      null,
      `${applicantName}-${uniqueSuffix}${extension}`
    );
  },
});

const allowedMimeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const allowedExtensions = new Set([
  ".pdf",
  ".doc",
  ".docx",
]);

const fileFilter = (_req, file, callback) => {
  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  const validMimeType = allowedMimeTypes.has(
    file.mimetype
  );

  const validExtension = allowedExtensions.has(
    extension
  );

  if (!validMimeType || !validExtension) {
    const error = new Error(
      "Only PDF, DOC and DOCX resume files are allowed."
    );

    error.statusCode = 400;

    return callback(error);
  }

  return callback(null, true);
};

const resumeUpload = multer({
  storage,
  fileFilter,
  limits: {
    files: 1,
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = {
  resumeUpload,
  uploadDirectory,
};