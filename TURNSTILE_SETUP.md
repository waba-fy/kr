# Cloudflare Turnstile spam protection

Create a managed Turnstile widget in Cloudflare for keyroutes.co and www.keyroutes.co. Add localhost and 127.0.0.1 if using the widget locally.

Set VITE_TURNSTILE_SITE_KEY to the public site key in frontend environment configuration. Set TURNSTILE_SECRET_KEY to the private secret and TURNSTILE_HOSTNAMES to a comma-separated hostname allowlist in backend/Plesk configuration. Set TURNSTILE_ENABLED=true after both sides are configured. Rebuild/restart as applicable. Never place the secret in frontend code or tracked environment files.

The consultation, newsletter, career and problem-report endpoints verify tokens with Cloudflare before processing submissions. Career verification runs before file uploads. Missing/invalid tokens, wrong hostnames/actions and provider failures are rejected when enabled. Tokens reset after requests. Public form rate limiting runs before these endpoints.

Protection is not enabled until real keys are configured. The local admin API uses port 5002 because macOS reserves port 5000; start the frontend with VITE_API_URL=http://127.0.0.1:5002/api.

Reference: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
