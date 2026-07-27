import SEO from "../components/seo/SEO";
import Schema from "../components/seo/Schema";

import organizationSchema from "../seo/organizationSchema";

import {
  createCollectionPageSchema,
} from "../seo/schemaHelper";

import {
  successStoriesBreadcrumbSchema,
} from "../seo/breadcrumbSchema";

import SuccessHero from "../components/successStories/SuccessHero";
import ProjectGrid from "../components/successStories/ProjectGrid";
import SuccessCTA from "../components/successStories/SuccessCTA";

import "../styles/success-stories.css";

const successStoriesDescription =
  "Explore KeyRoutes client success stories featuring digital experiences, performance marketing, lead generation, automation and measurable business growth.";

const successStoriesPageSchema =
  createCollectionPageSchema({
    name: "Client Success Stories",
    description: successStoriesDescription,
    url: "/success-stories",
  });

const successStoriesTopicSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",

  "@id":
    "https://keyroutes.co/success-stories#collection",

  name:
    "Client Success Stories by KeyRoutes",

  description:
    successStoriesDescription,

  url:
    "https://keyroutes.co/success-stories",

  inLanguage: "en-IN",

  isPartOf: {
    "@id":
      "https://keyroutes.co/#website",
  },

  about: {
    "@id":
      "https://keyroutes.co/#organization",
  },

  publisher: {
    "@id":
      "https://keyroutes.co/#organization",
  },

  keywords: [
    "KeyRoutes success stories",
    "digital marketing success stories",
    "website development projects",
    "performance marketing results",
    "Google Ads success stories",
    "Meta Ads success stories",
    "lead generation success stories",
    "lead automation",
    "client growth stories",
  ],
};

const SuccessStories = () => {
  return (
    <main className="kr-success-stories-page">
      <SEO
        title="Client Success Stories"
        description={successStoriesDescription}
        canonical="/success-stories"
        keywords={[
          "client success stories",
          "digital marketing success stories",
          "KeyRoutes clients",
          "website development success stories",
          "Google Ads results",
          "Meta Ads results",
          "lead generation projects",
          "business growth stories",
          "marketing automation success stories",
        ]}
      />

      <Schema
        data={[
          organizationSchema,
          successStoriesPageSchema,
          successStoriesTopicSchema,
          successStoriesBreadcrumbSchema,
        ]}
      />

      <SuccessHero />

      <ProjectGrid />

      <SuccessCTA />
    </main>
  );
};

export default SuccessStories;