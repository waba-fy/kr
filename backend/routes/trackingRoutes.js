const express = require("express");
const EmailLog = require("../models/EmailLog");

const router = express.Router();
const pixel = Buffer.from("R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=", "base64");

router.get("/open/:token.gif", async (req, res) => {
  res.set({
    "Content-Type": "image/gif",
    "Content-Length": pixel.length,
    "Cache-Control": "no-store, no-cache, must-revalidate, private",
  });
  res.status(200).end(pixel);

  try {
    const now = new Date();
    await EmailLog.updateOne(
      { trackingToken: req.params.token },
      {
        $set: { lastOpenedAt: now },
        $inc: { openCount: 1 },
      }
    );
    await EmailLog.updateOne(
      { trackingToken: req.params.token, openedAt: null },
      { $set: { openedAt: now } }
    );
  } catch (error) {
    console.error("Email open tracking error:", error.message);
  }
});

router.get("/click/:token", async (req, res) => {
  let target;
  try {
    target = new URL(String(req.query.url || ""));
    if (!["http:", "https:"].includes(target.protocol)) throw new Error("Invalid protocol");
  } catch (_error) {
    return res.status(400).send("Invalid tracking URL.");
  }

  try {
    const now = new Date();
    await EmailLog.updateOne(
      { trackingToken: req.params.token },
      {
        $set: { lastClickedAt: now, lastClickedUrl: target.toString() },
        $inc: { clickCount: 1 },
      }
    );
    await EmailLog.updateOne(
      { trackingToken: req.params.token, clickedAt: null },
      { $set: { clickedAt: now } }
    );
  } catch (error) {
    console.error("Email click tracking error:", error.message);
  }
  return res.redirect(302, target.toString());
});

module.exports = router;
