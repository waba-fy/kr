const SITE_URL = "https://keyroutes.co";

export const toAbsoluteUrl = (value = "/") => {
  if (!value) {
    return SITE_URL;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const normalizedPath = value.startsWith("/")
    ? value
    : `/${value}`;

  return `${SITE_URL}${normalizedPath}`;
};

export const createWebPageSchema = ({
  name,
  description,
  url,
  type = "WebPage",
}) => ({
  "@context": "https://schema.org",
  "@type": type,

  "@id": `${toAbsoluteUrl(url)}#webpage`,

  name,
  description,
  url: toAbsoluteUrl(url),

  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },

  about: {
    "@id": `${SITE_URL}/#organization`,
  },

  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },

  inLanguage: "en-IN",
});

export const createCollectionPageSchema = ({
  name,
  description,
  url,
}) =>
  createWebPageSchema({
    name,
    description,
    url,
    type: "Collection",
  });

export const createAboutPageSchema = ({
  name,
  description,
  url,
}) =>
  createWebPageSchema({
    name,
    description,
    url,
    type: "About",
  });

export const createContactPageSchema = ({
  name,
  description,
  url,
}) =>
  createWebPageSchema({
    name,
    description,
    url,
    type: "Contact",
  });