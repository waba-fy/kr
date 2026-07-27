import "../styles/home.css";

import HeroSlider from "../components/HeroSlider";
import WhatWeDo from "../components/WhatWeDo";
import WhyKeyRoutes from "../components/WhyKeyRoutes";
import StrategyHighlights from "../components/StrategyHighlights";
import ServicesHighlights from "../components/ServicesHighlights";
import ProductsHighlights from "../components/ProductsHighlights";
import ProcessTimeline from "../components/ProcessTimeline";
import CaseStudiesPreview from "../components/CaseStudiesPreview";
import TechnologyEcosystem from "../components/TechnologyEcosystem";
import HomeFAQ from "../components/HomeFAQ";
import FinalCTA from "../components/FinalCTA";

import SEO from "../components/seo/SEO";
import Schema from "../components/seo/Schema";

import organizationSchema from "../seo/organizationSchema";
import websiteSchema from "../seo/websiteSchema";

import {
  createWebPageSchema,
} from "../seo/schemaHelper";

const homeDescription =
  "KeyRoutes helps real estate developers and builders grow through strategy, digital marketing, SEO, GEO, CRM, websites, automation and technology solutions.";

const homePageSchema = createWebPageSchema({
  name:
    "KeyRoutes | Real Estate Strategy, Marketing and Technology",

  description: homeDescription,

  url: "/",
});

const Home = () => {
  return (
    <>
      <SEO
        title="Real Estate Strategy, Marketing and Technology"
        description={homeDescription}
        canonical="/"
        image="/key-routes-logo.png"
        type="website"
        keywords={[
          "real estate marketing agency",
          "real estate digital marketing",
          "real estate strategy consulting",
          "real estate SEO",
          "real estate GEO",
          "builder CRM",
          "real estate website development",
          "real estate marketing automation",
        ]}
      />

      <Schema
        data={[
          organizationSchema,
          websiteSchema,
          homePageSchema,
        ]}
      />

      <HeroSlider />

      <WhatWeDo />

      <WhyKeyRoutes />

      <StrategyHighlights />

      <ServicesHighlights />

      <ProductsHighlights />

      <ProcessTimeline />

      <CaseStudiesPreview />

      <TechnologyEcosystem />

      <HomeFAQ />

      <FinalCTA />
    </>
  );
};

export default Home;