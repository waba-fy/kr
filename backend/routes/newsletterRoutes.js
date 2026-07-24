const express = require("express");
const newsletterController = require("../controllers/newsletterController");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Newsletter Routes
|--------------------------------------------------------------------------
|
| POST /api/newsletter/subscribe
| Public API
|
*/

router.post(
  "/subscribe",
  newsletterController.subscribe
);

module.exports = router;