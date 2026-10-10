
export function readTurnstileToken(form) {
  const token = form?.querySelector('[name="kr-turnstile-token"]')?.value || "";
  if (import.meta.env.VITE_TURNSTILE_SITE_KEY && !token) throw new Error("Please complete the security verification before submitting.");
  return token;
}

export function resetTurnstile(form) {
  form?.dispatchEvent(new Event("kr-turnstile-reset"));
}
