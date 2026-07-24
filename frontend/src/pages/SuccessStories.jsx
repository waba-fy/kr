import { useEffect, useState } from "react";

import SEO from "../components/SEO";
import SuccessHero from "../components/successStories/SuccessHero";
import ProjectGrid from "../components/successStories/ProjectGrid";
import PerformanceStats from "../components/successStories/PerformanceStats";
import DownloadsSection from "../components/successStories/DownloadsSection";
import WebsiteShowcase from "../components/successStories/WebsiteShowcase";
import SeoGeoResults from "../components/successStories/SeoGeoResults";
import CampaignResults from "../components/successStories/CampaignResults";
import SuccessCTA from "../components/successStories/SuccessCTA";
import SuccessStoryModal from "../components/successStories/SuccessStoryModal";

import "../styles/success-stories.css";

const SuccessStories = () => {
  const [selectedStory, setSelectedStory] = useState(null);

  const closeStory = () => {
    setSelectedStory(null);
  };

  useEffect(() => {
    if (!selectedStory) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeStory();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [selectedStory]);

  return (
    <main className="kr-success-stories-page">
      <SEO
        title="Real Estate Success Stories | Websites, SEO, Ads & Automation | KeyRoutes"
        description="Explore KeyRoutes real estate success stories including SEO-ready project websites, GEO-focused landing pages, Google Ads, Meta Ads, CRM, WhatsApp automation and lead systems for builders."
        keywords="real estate success stories, real estate case studies, builder marketing case studies, real estate website projects, SEO for real estate projects, GEO SEO for builders, Google Ads real estate case study, real estate CRM automation, Hyderabad real estate marketing"
        canonical="https://keyroutes.in/success-stories"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://keyroutes.in/#organization",
              name: "KeyRoutes",
              url: "https://keyroutes.in",
              logo: "https://keyroutes.in/key-routes-logo.png",
              parentOrganization: {
                "@type": "Organization",
                name: "Sixedge Innovations",
              },
            },
            {
              "@type": "WebPage",
              "@id": "https://keyroutes.in/success-stories",
              url: "https://keyroutes.in/success-stories",
              name: "Real Estate Success Stories",
              description:
                "Real estate growth stories showing project websites, landing pages, SEO, GEO SEO, Google Ads, CRM, WhatsApp automation and analytics systems.",
            },
            {
              "@type": "CollectionPage",
              name: "Real Estate Success Stories by KeyRoutes",
              url: "https://keyroutes.in/success-stories",
              about: [
                "Real Estate Website Development",
                "SEO for Real Estate",
                "GEO SEO for Builders",
                "Google Ads for Real Estate",
                "CRM Automation for Builders",
                "WhatsApp Automation",
              ],
              hasPart: [
                {
                  "@type": "CreativeWork",
                  name: "Urban Woods Villas",
                  url: "https://keyroutes.in/success-stories/urban-woods-villas",
                },
                {
                  "@type": "CreativeWork",
                  name: "Jayabheri Pinnacle",
                  url: "https://keyroutes.in/success-stories/jayabheri-pinnacle",
                },
                {
                  "@type": "CreativeWork",
                  name: "Ramky One Odyssey",
                  url: "https://keyroutes.in/success-stories/ramky-one-odyssey",
                },
                {
                  "@type": "CreativeWork",
                  name: "Profound Vanam",
                  url: "https://keyroutes.in/success-stories/profound-vanam",
                },
                {
                  "@type": "CreativeWork",
                  name: "Sujay Sierra",
                  url: "https://keyroutes.in/success-stories/sujay-sierra",
                },
                {
                  "@type": "CreativeWork",
                  name: "RR Zenora Villas",
                  url: "https://keyroutes.in/success-stories/rr-zenora-villas",
                },
              ],
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://keyroutes.in",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Success Stories",
                  item: "https://keyroutes.in/success-stories",
                },
              ],
            },
          ],
        }}
      />

      <SuccessHero />

      <ProjectGrid onViewDetails={setSelectedStory} />

      

      <DownloadsSection />

      <WebsiteShowcase />

      <SeoGeoResults />

      <CampaignResults />

      <SuccessCTA />

      {selectedStory && (
        <SuccessStoryModal
          story={selectedStory}
          onClose={closeStory}
        />
      )}
    </main>
  );
};

export default SuccessStories;