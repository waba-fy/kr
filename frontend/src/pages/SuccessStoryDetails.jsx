import { Navigate, useParams } from "react-router-dom";

import SEO from "../components/seo/SEO";

import SuccessStoryDetailsHero from "../components/successStories/SuccessStoryDetailsHero";
import PartnershipSnapshot from "../components/successStories/PartnershipSnapshot";
import ClientHappiness from "../components/successStories/ClientHappiness";
import ServicesDelivered from "../components/successStories/ServicesDelivered";
import PerformanceHighlights from "../components/successStories/PerformanceHighlights";
import Transformation from "../components/successStories/Transformation";
import WebsiteShowcase from "../components/successStories/WebsiteShowcase";
import WhyItWorked from "../components/successStories/WhyItWorked";
import SuccessCTA from "../components/successStories/SuccessCTA";

import { clientStories } from "../data/clientStories";

import "../styles/success-story-details.css";

const normaliseSlug = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/^\/+/, "")
    .replace(/^success-stories\//, "")
    .replace(/\/+$/, "");

const SuccessStoryDetails = () => {
  const { slug } = useParams();

  const currentSlug = normaliseSlug(slug);

  const story = Array.isArray(clientStories)
    ? clientStories.find(
        (item) =>
          normaliseSlug(item?.slug) === currentSlug
      )
    : null;

  if (!story) {
    return (
      <Navigate
        to="/success-stories"
        replace
      />
    );
  }

  const title =
    story?.hero?.title ||
    "Client Success Story";

  const description =
    story?.hero?.description ||
    story?.hero?.result ||
    "Explore this KeyRoutes client success story.";

  const keywords = Array.isArray(story?.tags)
    ? story.tags
    : [];

  return (
    <main className="kr-success-story-details-page">
      <SEO
        title={`${title} Success Story`}
        description={description}
        canonical={`/success-stories/${currentSlug}`}
        keywords={keywords}
      />

      <SuccessStoryDetailsHero story={story} />

      <PartnershipSnapshot story={story} />

      <ClientHappiness story={story} />

      <ServicesDelivered story={story} />

      <PerformanceHighlights story={story} />

      <Transformation story={story} />

      <WebsiteShowcase story={story} />

      <WhyItWorked story={story} />

      <SuccessCTA story={story} />
    </main>
  );
};

export default SuccessStoryDetails;