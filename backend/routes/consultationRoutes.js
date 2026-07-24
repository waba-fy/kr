const express = require("express");
const consultationController = require("../controllers/consultationController");

const router = express.Router();

/**
 * @route   POST /api/consultations
 * @desc    Submit a new consultation request
 * @access  Public
 */
router.post("/", consultationController.createConsultationLead);

module.exports = router;