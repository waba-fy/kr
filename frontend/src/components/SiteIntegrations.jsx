import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const addScript = (id, src, code) => {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  if (src) script.src = src;
  if (code) script.text = code;
  document.head.appendChild(script);
};

const SiteIntegrations = () => {
  useEffect(() => {
    let active = true;
    fetch(`${API_URL}/public/site`)
      .then((response) => response.json())
      .then(({ data = {} }) => {
        if (!active) return;
        const gtm = String(data.googleTagManagerId || "").trim();
        const ga = String(data.googleAnalyticsId || "").trim();
        const verification = String(data.searchConsoleVerification || "").trim();
        if (/^GTM-[A-Z0-9]+$/i.test(gtm)) {
          addScript("kr-gtm", `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtm)}`);
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
        }
        if (/^G-[A-Z0-9]+$/i.test(ga)) {
          addScript("kr-gtag-source", `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga)}`);
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
          window.gtag("js", new Date());
          window.gtag("config", ga);
        }
        if (verification) {
          let meta = document.querySelector('meta[name="google-site-verification"]');
          if (!meta) { meta = document.createElement("meta"); meta.name = "google-site-verification"; document.head.appendChild(meta); }
          meta.content = verification;
        }
      })
      .catch(() => {});
    return () => { active = false; };
  }, []);
  return null;
};

export default SiteIntegrations;
