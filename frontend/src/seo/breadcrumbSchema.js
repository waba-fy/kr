import {
  toAbsoluteUrl,
} from "./schemaHelper";

export const createBreadcrumbSchema = (
  items = []
) => {
  if (
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: items.map(
      (item, index) => ({
        "@type": "ListItem",

        position: index + 1,

        name: item.name,

        item: toAbsoluteUrl(item.url),
      })
    ),
  };
};

export const homeBreadcrumbSchema =
  createBreadcrumbSchema([
    {
      name: "Home",
      url: "/",
    },
  ]);

export const strategyBreadcrumbSchema =
  createBreadcrumbSchema([
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Strategy",
      url: "/strategy",
    },
  ]);

export const servicesBreadcrumbSchema =
  createBreadcrumbSchema([
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Services",
      url: "/services",
    },
  ]);

export const supportingServicesBreadcrumbSchema =
  createBreadcrumbSchema([
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Services",
      url: "/services",
    },
    {
      name: "Supporting Services",
      url: "/supporting-services",
    },
  ]);

export const productsBreadcrumbSchema =
  createBreadcrumbSchema([
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Products",
      url: "/products",
    },
  ]);

export const productSolutionsBreadcrumbSchema =
  createBreadcrumbSchema([
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Products",
      url: "/products",
    },
    {
      name: "Product Solutions",
      url: "/product-solutions",
    },
  ]);

export const aboutBreadcrumbSchema =
  createBreadcrumbSchema([
    {
      name: "Home",
      url: "/",
    },
    {
      name: "About",
      url: "/about",
    },
  ]);

export const careersBreadcrumbSchema =
  createBreadcrumbSchema([
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Careers",
      url: "/careers",
    },
  ]);

export const successStoriesBreadcrumbSchema =
  createBreadcrumbSchema([
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Success Stories",
      url: "/success-stories",
    },
  ]);

export const marketReportsBreadcrumbSchema =
  createBreadcrumbSchema([
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Market Reports",
      url: "/market-reports",
    },
  ]);

export const reviewsBreadcrumbSchema =
  createBreadcrumbSchema([
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Reviews & Feedback",
      url: "/reviews-feedback",
    },
  ]);