import { useEffect } from "react";

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  schema,
}) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (name, content) => {
      if (!content) return;

      let tag = document.querySelector(`meta[name="${name}"]`);

      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }

      tag.setAttribute("content", content);
    };

    const setProperty = (property, content) => {
      if (!content) return;

      let tag = document.querySelector(`meta[property="${property}"]`);

      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }

      tag.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("robots", "index, follow");

    setProperty("og:title", title);
    setProperty("og:description", description);
    setProperty("og:type", "website");
    setProperty("og:url", canonical);

    let link = document.querySelector(`link[rel="canonical"]`);

    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }

    link.setAttribute("href", canonical);

    let script = document.getElementById("page-schema");

    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "page-schema";
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema);
  }, [title, description, keywords, canonical, schema]);

  return null;
};

export default SEO;