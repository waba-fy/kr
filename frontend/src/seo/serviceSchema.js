import {
  toAbsoluteUrl,
} from "./schemaHelper";

const SITE_URL = "https://keyroutes.co";

export const createServiceSchema = ({
  name,
  description,
  url,
  serviceType,
  areaServed = "India",
  image,
}) => {
  const absoluteUrl = toAbsoluteUrl(url);

  return {
    "@context": "https://schema.org",
    "@type": "Service",

    "@id": `${absoluteUrl}#service`,

    name,

    description,

    serviceType: serviceType || name,

    url: absoluteUrl,

    provider: {
      "@id": `${SITE_URL}/#organization`,
    },

    areaServed: {
      "@type": "Country",
      name: areaServed,
    },

    ...(image && {
      image: toAbsoluteUrl(image),
    }),
  };
};

export const createProductSchema = ({
  name,
  description,
  url,
  category,
  image,
  brand = "KeyRoutes",
}) => {
  const absoluteUrl = toAbsoluteUrl(url);

  return {
    "@context": "https://schema.org",
    "@type": "Product",

    "@id": `${absoluteUrl}#product`,

    name,

    description,

    url: absoluteUrl,

    brand: {
      "@type": "Brand",
      name: brand,
    },

    ...(category && {
      category,
    }),

    ...(image && {
      image: toAbsoluteUrl(image),
    }),
  };
};

export const strategyServiceSchema =
  createServiceSchema({
    name: "Real Estate Strategy Consulting",

    description:
      "KeyRoutes provides brand strategy, digital strategy, marketing strategy and sales strategy consulting for real estate developers and builders.",

    url: "/strategy",

    serviceType:
      "Real Estate Strategy Consulting",
  });

export const supportingServicesSchema =
  createServiceSchema({
    name:
      "Real Estate Digital Marketing and Technology Services",

    description:
      "KeyRoutes provides market research, SEO, GEO, performance marketing, website development, CRM integration and automation services for real estate businesses.",

    url: "/supporting-services",

    serviceType:
      "Real Estate Digital Marketing and Technology Services",
  });

export const whatsappBusinessApiSchema =
  createProductSchema({
    name: "WhatsApp Business API",

    description:
      "WhatsApp Business API solutions for real estate businesses to automate customer conversations, enquiry responses and lead follow-ups.",

    url:
      "/product-solutions#whatsapp-business-api",

    category:
      "Business Communication Software",
  });

export const emailMarketingSchema =
  createProductSchema({
    name: "Email Marketing Automation",

    description:
      "Email marketing automation for real estate businesses to nurture prospects, share project updates and improve lead engagement.",

    url:
      "/product-solutions#email-marketing",

    category:
      "Marketing Automation Software",
  });

export const ivrVoiceSchema =
  createProductSchema({
    name: "IVR and Voice Solutions",

    description:
      "IVR and voice solutions for real estate businesses to manage incoming enquiries, automate call routing and improve customer response.",

    url:
      "/product-solutions#ivr-voice",

    category:
      "Business Communication Software",
  });

export const productSolutionsSchema = [
  whatsappBusinessApiSchema,
  emailMarketingSchema,
  ivrVoiceSchema,
];