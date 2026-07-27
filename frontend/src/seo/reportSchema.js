import {
  toAbsoluteUrl,
} from "./schemaHelper";

const SITE_URL = "https://keyroutes.co";

export const createReportSchema = ({
  name,
  description,
  url,
  datePublished,
  dateModified,
  image,
  authorName = "KeyRoutes",
  reportNumber,
  keywords = [],
}) => {
  const absoluteUrl = toAbsoluteUrl(url);

  return {
    "@context": "https://schema.org",
    "@type": "Report",

    "@id": `${absoluteUrl}#report`,

    name,

    headline: name,

    description,

    url: absoluteUrl,

    inLanguage: "en-IN",

    author: {
      "@type": "Organization",
      name: authorName,
      "@id": `${SITE_URL}/#organization`,
    },

    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },

    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },

    ...(datePublished && {
      datePublished,
    }),

    ...(dateModified && {
      dateModified,
    }),

    ...(image && {
      image: toAbsoluteUrl(image),
    }),

    ...(reportNumber && {
      reportNumber,
    }),

    ...(Array.isArray(keywords) &&
      keywords.length > 0 && {
        keywords: keywords.join(", "),
      }),
  };
};

export const marketReportsCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",

  "@id":
    "https://keyroutes.co/market-reports#webpage",

  name: "KeyRoutes Real Estate Market Reports",

  description:
    "Explore real estate market reports, research, trends, buyer insights and location analysis published by KeyRoutes.",

  url:
    "https://keyroutes.co/market-reports",

  inLanguage: "en-IN",

  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },

  about: {
    "@id": `${SITE_URL}/#organization`,
  },

  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
};