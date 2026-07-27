import {
  toAbsoluteUrl,
} from "./schemaHelper";

const SITE_URL = "https://keyroutes.co";

/* -------------------------------------------------------
   Individual Review Schema
------------------------------------------------------- */

export const createReviewSchema = ({
  author,
  reviewBody,
  rating = 5,
  itemReviewed = "KeyRoutes",
  datePublished,
  url,
}) => {
  const absoluteUrl = url
    ? toAbsoluteUrl(url)
    : `${SITE_URL}/reviews-feedback`;

  return {
    "@context": "https://schema.org",
    "@type": "Review",

    "@id": `${absoluteUrl}#review-${author
      .toLowerCase()
      .replace(/\s+/g, "-")}`,

    reviewBody,

    reviewRating: {
      "@type": "Rating",
      ratingValue: rating,
      bestRating: 5,
      worstRating: 1,
    },

    author: {
      "@type": "Person",
      name: author,
    },

    itemReviewed: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: itemReviewed,
    },

    ...(datePublished && {
      datePublished,
    }),
  };
};

/* -------------------------------------------------------
   Aggregate Rating
------------------------------------------------------- */

export const createAggregateRatingSchema = ({
  ratingValue,
  reviewCount,
}) => ({
  "@context": "https://schema.org",
  "@type": "AggregateRating",

  "@id":
    `${SITE_URL}/reviews-feedback#aggregate-rating`,

  itemReviewed: {
    "@id": `${SITE_URL}/#organization`,
  },

  ratingValue,

  reviewCount,

  bestRating: 5,

  worstRating: 1,
});

/* -------------------------------------------------------
   Reviews Collection Page
------------------------------------------------------- */

export const reviewsCollectionSchema = {
  "@context": "https://schema.org",

  "@type": "CollectionPage",

  "@id":
    `${SITE_URL}/reviews-feedback#webpage`,

  name:
    "KeyRoutes Reviews & Client Feedback",

  description:
    "Read reviews and feedback from clients who partnered with KeyRoutes for strategy, digital marketing, websites, CRM and automation.",

  url:
    `${SITE_URL}/reviews-feedback`,

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