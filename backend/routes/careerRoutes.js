const express = require("express");

const careerController = require("../controllers/careerController");

const {
  resumeUpload,
} = require("../config/resumeUpload");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Career Routes
|--------------------------------------------------------------------------
|
| POST /api/careers/apply
| Public API
|
*/

router.post(
  "/apply",
  resumeUpload.single("resume"),
  careerController.createCareerApplication
);

module.exports = router;