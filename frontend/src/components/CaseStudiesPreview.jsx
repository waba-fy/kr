import { Link } from "react-router-dom";
import {
  FaBuilding,
  FaHome,
  FaMapMarkedAlt,
  FaHardHat,
  FaArrowRight,
  FaExternalLinkAlt,
} from "react-icons/fa";
import "../styles/case-studies-preview.css";

const caseStudies = [
  {
    icon: <FaBuilding />,
    category: "Luxury Apartments",
    title: "SEO-ready project websites that support search visibility",
    result: "Better Google Visibility",
    desc: "We build project websites with SEO structure, location keywords, enquiry forms, WhatsApp CTA and campaign tracking.",
  },
  {
    icon: <FaHome />,
    category: "Villa Communities",
    title: "GEO-focused landing pages for high-intent villa buyers",
    result: "Higher Site Visit Intent",
    desc: "We create location-based villa pages with ORR, airport, nearby landmarks and buyer-focused content for better local relevance.",
  },
  {
    icon: <FaMapMarkedAlt />,
    category: "Plots & Layouts",
    title: "Lead automation systems for plotted developments",
    result: "Faster Lead Response",
    desc: "We connect project pages, Google Sheets, WhatsApp alerts, CRM follow-ups and lead tracking to reduce missed enquiries.",
  },
  {
    icon: <FaHardHat />,
    category: "Project Launches",
    title: "Complete digital launch systems for builders",
    result: "Stronger Launch Funnel",
    desc: "We plan website, landing pages, SEO, Google Ads, Meta Ads, analytics, CRM and automated lead nurturing from day one.",
  },
];

const CaseStudiesPreview = () => {
  return (
    <section className="kr-case-section">
      <div className="kr-case-bg-line"></div>
      <div className="kr-case-dot-pattern"></div>

      <div className="kr-case-container">
        <div className="kr-case-head">
          <span>REAL ESTATE SUCCESS STORIES</span>

          <h2>
            Growth Systems Built for <strong>Builders & Projects</strong>
          </h2>

          <p>
            From SEO-ready project websites to GEO-focused landing pages,
            campaigns, CRM and automation, KeyRoutes helps real estate brands
            improve search visibility, lead quality and site visit conversions.
          </p>
        </div>

        <div className="kr-case-grid">
          {caseStudies.map((item, index) => (
            <div className="kr-case-card" key={index}>
              <div className="kr-case-top">
                <div className="kr-case-icon">{item.icon}</div>
                <span>{item.category}</span>
              </div>

              <h3>{item.title}</h3>

              <div className="kr-case-result">{item.result}</div>

              <p>{item.desc}</p>

              <Link to="/success-stories" className="kr-case-link">
                View Growth Stories <FaArrowRight />
              </Link>
            </div>
          ))}
        </div>

        <div className="kr-case-cta">
          <div>
            <span>EXPLORE OUR WORK</span>
            <h3>See real estate websites, reports and growth systems.</h3>
            <p>
              View project websites, landing pages, SEO reports, campaign
              results and automation systems created for real estate brands.
            </p>
          </div>

          <div className="kr-case-cta-actions">
            <Link to="/success-stories">
              Explore Success Stories <FaExternalLinkAlt />
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesPreview;