const createTurnstileVerification = (options = {}) => async (req, res, next) => {
  const enabled = options.enabled ?? (process.env.TURNSTILE_ENABLED === "true");
  if (!enabled) return next();
  const secret = options.secret ?? process.env.TURNSTILE_SECRET_KEY;
  const hostnames = options.hostnames ?? String(process.env.TURNSTILE_HOSTNAMES || "").split(",").map(value => value.trim()).filter(Boolean);
  if (!secret || !hostnames.length) return res.status(503).json({ success: false, message: "Spam protection is not configured. Please contact support." });
  const token = req.headers["x-turnstile-token"] || req.body?.turnstileToken;
  if (typeof token !== "string" || !token || token.length > 2048) return res.status(400).json({ success: false, message: "Please complete the security verification and try again." });
  try {
    const response = await (options.fetchImpl || fetch)("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }), signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("Verification service unavailable");
    const result = await response.json();
    if (result.success !== true || !hostnames.includes(result.hostname) || result.action !== "public_form") {
      return res.status(400).json({ success: false, message: "Security verification expired or failed. Please verify again." });
    }
    return next();
  } catch {
    return res.status(503).json({ success: false, message: "Security verification is temporarily unavailable. Please try again." });
  }
};
module.exports = { createTurnstileVerification, verifyTurnstile: createTurnstileVerification() };
