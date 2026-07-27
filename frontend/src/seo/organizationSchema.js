const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",

  "@id": "https://keyroutes.co/#organization",

  name: "KeyRoutes",

  legalName: "KeyRoutes",

  url: "https://keyroutes.co",

  logo: {
    "@type": "ImageObject",
    url: "https://keyroutes.co/key-routes-logo.png"
  },

  image: "https://keyroutes.co/key-routes-logo.png",

  description:
    "KeyRoutes helps real estate developers and builders grow through strategy, digital marketing, SEO, GEO, CRM, websites, automation and technology solutions.",

  email: "info@keyroutes.co",

  telephone: "+91-8309436998",

  foundingLocation: {
    "@type": "Country",
    name: "India"
  },

  areaServed: {
    "@type": "Country",
    name: "India"
  },

  sameAs: [
    "https://www.linkedin.com/company/keyroutes/",
    "https://www.facebook.com/keyroutes",
    "https://www.instagram.com/keyroutes.co",
    "https://www.youtube.com/@KeyRoutes"
  ],

  knowsAbout: [
    "Real Estate Marketing",
    "Real Estate Digital Marketing",
    "Real Estate Strategy",
    "Brand Strategy",
    "Digital Strategy",
    "Search Engine Optimization",
    "Generative Engine Optimization",
    "Performance Marketing",
    "Google Ads",
    "Meta Ads",
    "CRM",
    "Marketing Automation",
    "Website Development",
    "WhatsApp Business API",
    "Lead Generation",
    "Real Estate Technology"
  ]
};

export default organizationSchema;