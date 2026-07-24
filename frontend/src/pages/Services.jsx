import { Link } from "react-router-dom";
import {
  FaSearch,
  FaChartLine,
  FaLaptopCode,
  FaCheckCircle,
  FaArrowRight,
  FaGoogle,
  FaMapMarkedAlt,
  FaWhatsapp,
  FaDatabase,
  FaBullhorn,
  FaChartPie,
} from "react-icons/fa";
import SEO from "../components/SEO";
import "../styles/services.css";

const serviceCategories = [
  {
    icon: <FaSearch />,
    title: "Market Research & Audits",
    desc: "Understand competitors, location demand, buyer intent, pricing signals and SEO opportunities before spending on campaigns.",
    link: "/supporting-services#market-research-audits",
  },
  {
    icon: <FaChartLine />,
    title: "SEO, GEO & Performance Marketing",
    desc: "Improve Google visibility, AI-search readiness, Google Ads performance, Meta Ads planning and lead quality.",
    link: "/supporting-services#seo-geo-performance",
  },
  {
    icon: <FaLaptopCode />,
    title: "Website, CRM & Automation",
    desc: "Build SEO-ready websites, landing pages, CRM workflows, WhatsApp automation and lead tracking systems.",
    link: "/supporting-services#website-crm-automation",
  },
];

const growthFlow = [
  "Research",
  "Strategy",
  "Website",
  "SEO + GEO",
  "Campaigns",
  "CRM",
  "Automation",
  "Reporting",
];

const whyItems = [
  "Real estate focused service planning",
  "SEO and GEO-ready website approach",
  "Campaigns connected with CRM and tracking",
  "WhatsApp and automation support",
  "Lead quality and site visit focused execution",
  "Performance reporting for better decisions",
];

const resultCards = [
  {
    icon: <FaGoogle />,
    title: "Google Visibility",
    desc: "Rank-ready structure for project, location and buyer-intent searches.",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Local & GEO Search",
    desc: "Content planned for Google Maps, local areas and AI discovery.",
  },
  {
    icon: <FaWhatsapp />,
    title: "Faster Lead Response",
    desc: "WhatsApp, CRM and automation support for faster follow-up.",
  },
  {
    icon: <FaChartPie />,
    title: "Performance Clarity",
    desc: "Track enquiries, sources, campaigns and conversion quality.",
  },
];

const Services = () => {
  return (
    <main className="kr-services-page">
      <SEO
        title="Real Estate Marketing Services | SEO, GEO, Ads, Website & CRM | KeyRoutes"
        description="KeyRoutes provides real estate marketing services including market research, SEO, GEO, Google Ads, Meta Ads, website development, CRM and automation for builders."
        keywords="real estate marketing services, real estate SEO, GEO SEO for builders, Google Ads for real estate, real estate website development, CRM for builders, WhatsApp automation real estate"
        canonical="https://keyroutes.in/services"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Real Estate Marketing Services",
          provider: {
            "@type": "Organization",
            name: "KeyRoutes",
            url: "https://keyroutes.in",
          },
          areaServed: "Hyderabad",
          serviceType: [
            "Market Research",
            "Real Estate SEO",
            "GEO SEO",
            "Google Ads",
            "Website Development",
            "CRM Automation",
          ],
        }}
      />

      <section className="kr-sv-hero">
        
        <div className="kr-sv-bg"></div>

        <div className="kr-sv-container kr-sv-hero-grid">
          <div className="kr-sv-hero-content">
            <div className="kr-sv-breadcrumb">
          <Link to="/">Home</Link> <span>›</span> Services
        </div>
            <span>REAL ESTATE SERVICES</span>

            <h1>
              Growth Services Built for{" "}
              <strong>Builders, Projects & Sales Teams.</strong>
            </h1>

            <p>
              KeyRoutes connects market research, SEO, GEO, websites, campaigns,
              CRM and automation into one growth system for real estate
              projects.
            </p>

            <div className="kr-sv-actions">
              <a
                href="https://wa.me/918309436998"
                target="_blank"
                rel="noreferrer"
              >
                Book Free Audit ›
              </a>

              <a href="#service-categories" className="outline">
                Explore Services
              </a>
            </div>
          </div>

          <div className="kr-sv-hero-card">
            <div className="kr-sv-mini-stat">
              <FaSearch />
              <div>
                <strong>SEO + GEO</strong>
                <p>Search-ready planning</p>
              </div>
            </div>

            <div className="kr-sv-mini-stat">
              <FaBullhorn />
              <div>
                <strong>Campaigns</strong>
                <p>Google & Meta funnels</p>
              </div>
            </div>

            <div className="kr-sv-mini-stat">
              <FaDatabase />
              <div>
                <strong>CRM</strong>
                <p>Lead tracking workflows</p>
              </div>
            </div>

            <div className="kr-sv-progress">
              <span style={{ width: "92%" }}></span>
            </div>
            <p className="kr-sv-card-note">
              Website → SEO → Campaigns → CRM → Follow-up → Site Visits
            </p>
          </div>
        </div>
      </section>

      <section className="kr-sv-framework">
        <div className="kr-sv-container">
          <div className="kr-sv-head center">
            <span>GROWTH FRAMEWORK</span>
            <h2>
              Every Service Works as One <strong>Connected System</strong>
            </h2>
            <p>
              We do not treat website, SEO, campaigns and CRM separately. Every
              service supports visibility, enquiry quality and conversion.
            </p>
          </div>

          <div className="kr-sv-flow">
            {growthFlow.map((item, index) => (
              <div className="kr-sv-flow-card" key={index}>
                <span>0{index + 1}</span>
                <h3>{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-sv-categories" id="service-categories">
        <div className="kr-sv-container">
          <div className="kr-sv-head center">
            <span>SERVICE CATEGORIES</span>
            <h2>
              Choose the Right Support for <strong>Your Real Estate Project</strong>
            </h2>
            <p>
              Start with the category that matches your current challenge. Each
              one opens a detailed service section.
            </p>
          </div>

          <div className="kr-sv-category-grid">
            {serviceCategories.map((item, index) => (
              <Link to={item.link} className="kr-sv-category-card" key={index}>
                <div className="kr-sv-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span>
                  Explore Details <FaArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-sv-why">
        <div className="kr-sv-container kr-sv-why-grid-wrap">
          <div className="kr-sv-why-content">
            <span>WHY KEYROUTES</span>
            <h2>
              Services Designed for Real Estate Growth, Not Generic Marketing.
            </h2>
            <p>
              Builders need more than ads. They need project positioning,
              search visibility, landing pages, CRM workflows and follow-up
              systems that move buyers from enquiry to site visit.
            </p>
          </div>

          <div className="kr-sv-why-grid">
            {whyItems.map((item, index) => (
              <div className="kr-sv-why-card" key={index}>
                <FaCheckCircle />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-sv-results">
        <div className="kr-sv-container">
          <div className="kr-sv-head center">
            <span>WHAT THIS HELPS IMPROVE</span>
            <h2>
              Better Visibility, Faster Follow-up and <strong>More Qualified Enquiries</strong>
            </h2>
          </div>

          <div className="kr-sv-results-grid">
            {resultCards.map((item, index) => (
              <div className="kr-sv-result-card" key={index}>
                <div>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-sv-cta">
        <div className="kr-sv-container">
          <h2>Ready to Build a Real Estate Growth System?</h2>
          <p>
            Let’s review your current website, SEO, campaigns, CRM and
            automation before your next marketing spend.
          </p>

          <a
            href="https://wa.me/918309436998"
            target="_blank"
            rel="noreferrer"
          >
            Book Free Service Audit ›
          </a>
        </div>
      </section>
    </main>
  );
};

export default Services;