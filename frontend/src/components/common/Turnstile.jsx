import { useEffect, useRef, useState } from "react";

let scriptPromise;
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.onload = () => window.turnstile ? resolve(window.turnstile) : reject(new Error("Unavailable"));
      script.onerror = () => { script.remove(); scriptPromise = undefined; reject(new Error("Unavailable")); };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

export default function Turnstile() {
  const container = useRef(null);
  const tokenField = useRef(null);
  const [error, setError] = useState("");
  const sitekey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  useEffect(() => {
    if (!sitekey) return;
    let active = true;
    let widget;
    let api;
    const form = container.current?.closest("form");
    const clear = () => { if (tokenField.current) tokenField.current.value = ""; };
    const reset = () => { clear(); if (widget !== undefined) api.reset(widget); };
    form?.addEventListener("kr-turnstile-reset", reset);
    loadTurnstile().then(turnstile => {
      if (!active) return;
      api = turnstile;
      widget = api.render(container.current, {
        sitekey, action: "public_form", size: "flexible", theme: "auto", "response-field": false,
        callback: token => { if (tokenField.current) tokenField.current.value = token; setError(""); },
        "expired-callback": reset,
        "error-callback": () => { clear(); setError("Security verification failed. Please retry."); },
      });
    }).catch(() => { if (active) setError("Unable to load security verification. Please check your connection."); });
    return () => { active = false; form?.removeEventListener("kr-turnstile-reset", reset); if (widget !== undefined) api.remove(widget); };
  }, [sitekey]);
  if (!sitekey) return null;
  return <div style={{ margin: "12px 0", width: "100%" }}><input ref={tokenField} type="hidden" name="kr-turnstile-token" /><div ref={container} />{error && <p role="alert">{error} <button type="button" onClick={() => window.location.reload()}>Reload verification</button></p>}</div>;
}
