import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { ManagedContentContext } from "./hooks/ManagedContentContext";

export function render(url, content) {
  const html = renderToString(<HelmetProvider><ManagedContentContext.Provider value={content}><StaticRouter location={url}><App /></StaticRouter></ManagedContentContext.Provider></HelmetProvider>);
  // React 19 emits metadata directly; move it into the document head.
  const tags = /<title[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b(?=[^>]*rel="canonical")[^>]*>|<script\b(?=[^>]*type="application\/ld\+json")[^>]*>[\s\S]*?<\/script>/g;
  const head = (html.match(tags) || []).join("\n");
  return {body: html.replace(tags, ""), head};
}
