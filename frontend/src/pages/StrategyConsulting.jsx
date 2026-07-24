import { Link } from "react-router-dom";
import {
  FaBullhorn,
  FaLaptopCode,
  FaChartLine,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaSearch,
  FaMapMarkedAlt,
  FaRobot,
  FaGoogle,
} from "react-icons/fa";
import SEO from "../components/SEO";
import "../styles/strategy-consulting.css";

const strategyData = [
  {
    id: "brand-strategy",
    icon: <FaBullhorn />,
    label: "BRAND STRATEGY",
    title: "Build a Real Estate Brand Buyers Can Trust",
    what:
      "Brand strategy defines how buyers understand, remember and trust your real estate project before they enquire or visit the site.",
    why:
      "Without clear positioning, your project may look similar to every other apartment, villa or plot project in the market.",
    problems: [
      "Generic project messaging",
      "Weak buyer trust",
      "No clear positioning",
      "Poor project recall",
    ],
    solutions: [
      "Project positioning",
      "Buyer persona planning",
      "Trust-focused messaging",
      "Location advantage communication",
    ],
    deliverables: [
      "Buyer persona document",
      "Project positioning note",
      "Messaging framework",
      "Website content direction",
    ],
    benefits: [
      "Stronger buyer trust",
      "Better project recall",
      "Premium project perception",
      "Improved enquiry quality",
    ],
    seoTitle: "SEO + GEO Role in Brand Strategy",
    seoDesc:
      "A strong brand strategy helps Google and AI platforms understand your project category, location, builder identity, value proposition and buyer relevance.",
    seoItems: [
      "Project entity positioning",
      "Builder credibility signals",
      "Location + project category keywords",
      "Trust-focused website content",
      "Buyer FAQ structure",
      "Consistent brand messaging across pages",
    ],
    flow: [
      "Project Identity",
      "Buyer Trust",
      "Website Content",
      "Google Relevance",
      "Quality Enquiries",
    ],
    result:
      "A stronger project identity that improves buyer confidence, campaign clarity, Google relevance and enquiry quality.",
  },
  {
    id: "digital-strategy",
    icon: <FaLaptopCode />,
    label: "DIGITAL STRATEGY",
    title: "Plan Website, SEO, GEO and Digital Funnels",
    what:
      "Digital strategy connects your website, landing pages, SEO, GEO, ads, tracking and buyer journey into one planned growth system.",
    why:
      "Without a proper digital plan, campaigns may bring traffic but fail to convert visitors into enquiries, calls or site visits.",
    problems: [
      "Weak website structure",
      "No SEO or GEO planning",
      "Poor landing page flow",
      "No conversion tracking",
    ],
    solutions: [
      "SEO-ready website planning",
      "GEO and local SEO structure",
      "Landing page strategy",
      "GA4 and GTM tracking plan",
    ],
    deliverables: [
      "Website structure plan",
      "SEO and GEO roadmap",
      "Landing page flow",
      "Tracking and analytics plan",
    ],
    benefits: [
      "Better Google visibility",
      "Improved user journey",
      "Higher lead capture rate",
      "Better campaign performance",
    ],
    seoTitle: "SEO + GEO Role in Digital Strategy",
    seoDesc:
      "Digital strategy prepares your project website to rank for location-based searches and appear in AI-driven discovery journeys.",
    seoItems: [
      "SEO-ready website architecture",
      "GEO-focused landing pages",
      "Schema-ready structure",
      "Google Maps and local signals",
      "Core Web Vitals planning",
      "AI-search-friendly content",
    ],
    flow: [
      "Website",
      "SEO + GEO",
      "Landing Page",
      "Tracking",
      "Lead Capture",
    ],
    result:
      "A digital foundation that improves visibility, lead capture, campaign performance and search relevance.",
  },
  {
    id: "marketing-sales",
    icon: <FaChartLine />,
    label: "MARKETING & SALES",
    title: "Connect Campaigns, CRM, Follow-ups and Site Visits",
    what:
      "Marketing and sales strategy aligns lead generation with CRM, WhatsApp follow-ups, sales actions and site visit conversion.",
    why:
      "Without follow-up systems, even good leads may be missed, delayed, poorly handled or never converted into site visits.",
    problems: [
      "Low quality leads",
      "No CRM workflow",
      "Missed follow-ups",
      "Low site visit conversion",
    ],
    solutions: [
      "Google and Meta campaign planning",
      "CRM and lead assignment",
      "WhatsApp automation",
      "Sales reporting and tracking",
    ],
    deliverables: [
      "Campaign funnel plan",
      "CRM workflow",
      "WhatsApp follow-up process",
      "Sales tracking structure",
    ],
    benefits: [
      "Faster lead response",
      "Better site visit intent",
      "Improved sales conversion",
      "Clearer lead source tracking",
    ],
    seoTitle: "SEO + GEO Role in Marketing & Sales",
    seoDesc:
      "Marketing and sales strategy connects search visibility with lead quality, CRM tracking, WhatsApp follow-up and sales team action.",
    seoItems: [
      "Campaign keyword mapping",
      "Landing page relevance",
      "Lead source attribution",
      "Buyer intent segmentation",
      "Remarketing audience planning",
      "Site visit conversion tracking",
    ],
    flow: [
      "Google Ads",
      "Landing Page",
      "CRM",
      "WhatsApp",
      "Site Visit",
    ],
    result:
      "A connected sales funnel that helps improve follow-up speed, site visit intent and conversion quality.",
  },
];

const growthItems = [
  {
    icon: <FaSearch />,
    title: "SEO",
    desc: "Rank for location, project category and buyer-intent keywords.",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "GEO",
    desc: "Improve Google Maps, local search and area-based visibility.",
  },
  {
    icon: <FaGoogle />,
    title: "Google Visibility",
    desc: "Prepare pages for organic search and campaign relevance.",
  },
  {
    icon: <FaRobot />,
    title: "AI Discovery",
    desc: "Structure content for AI search, snippets and answer engines.",
  },
];

const StrategyConsulting = () => {
  return (
    <main className="kr-sc-page">
      <SEO
        title="Real Estate Strategy Consulting | Brand, Digital, Marketing & Sales | KeyRoutes"
        description="Explore KeyRoutes real estate strategy consulting covering brand strategy, digital strategy, marketing, sales, SEO, GEO, CRM and automation for builders."
        keywords="real estate strategy consulting, brand strategy for builders, digital strategy for real estate, real estate marketing strategy, real estate sales strategy, SEO for builders, GEO SEO for real estate, CRM automation for real estate"
        canonical="https://keyroutes.in/strategy-consulting"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Real Estate Strategy Consulting",
          provider: {
            "@type": "Organization",
            name: "KeyRoutes",
            url: "https://keyroutes.in",
          },
          areaServed: "Hyderabad",
          serviceType: [
            "Brand Strategy",
            "Digital Strategy",
            "Marketing and Sales Strategy",
            "Real Estate SEO",
            "Real Estate GEO SEO",
          ],
        }}
      />

      <section className="kr-sc-hero">
        <div className="kr-sc-bg"></div>

        <div className="kr-sc-container">
          <div className="kr-sc-breadcrumb">
            <Link to="/">Home</Link> <span>›</span>
            <Link to="/strategy">Strategy</Link> <span>›</span> Consulting
          </div>

          <span>REAL ESTATE STRATEGY CONSULTING</span>

          <h1>
            Brand, Digital, Marketing & Sales Strategy for{" "}
            <strong>Real Estate Growth.</strong>
          </h1>

          <p>
            Understand what each strategy means, why it matters, what happens
            without it and how KeyRoutes helps builders create a clear path from
            project visibility to qualified enquiries, site visits and sales.
          </p>

          <div className="kr-sc-actions">
            <a href="#brand-strategy">Brand Strategy</a>
            <a href="#digital-strategy">Digital Strategy</a>
            <a href="#marketing-sales">Marketing & Sales</a>
          </div>
        </div>
      </section>

      <section className="kr-sc-intro">
        <div className="kr-sc-container kr-sc-intro-grid">
          <div>
            <span>WHY THIS PAGE MATTERS</span>
            <h2>
              Strategy Helps Builders Avoid Random Marketing Decisions.
            </h2>
          </div>

          <p>
            Many projects start with ads before fixing positioning, website
            structure, SEO, GEO, CRM and follow-up process. KeyRoutes helps
            builders plan the complete growth system first, so every marketing
            rupee has better direction and every lead has a better journey.
          </p>
        </div>

        <div className="kr-sc-container">
          <div className="kr-sc-growth-grid">
            {growthItems.map((item, index) => (
              <div className="kr-sc-growth-card" key={index}>
                <div>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-sc-deep">
        <div className="kr-sc-container">
          {strategyData.map((item, index) => (
            <div
              className={`kr-sc-block ${index % 2 !== 0 ? "reverse" : ""}`}
              id={item.id}
              key={item.id}
            >
              <div className="kr-sc-content">
                <div className="kr-sc-icon">{item.icon}</div>
                <span>{item.label}</span>
                <h2>{item.title}</h2>

                <div className="kr-sc-explain">
                  <h3>What is it?</h3>
                  <p>{item.what}</p>

                  <h3>Why do you need it?</h3>
                  <p>{item.why}</p>

                  <h3>Expected impact</h3>
                  <p>{item.result}</p>
                </div>

                <div className="kr-sc-seo-box">
                  <span>SEO + GEO GROWTH FRAMEWORK</span>
                  <h3>{item.seoTitle}</h3>
                  <p>{item.seoDesc}</p>

                  <div className="kr-sc-seo-list">
                    {item.seoItems.map((point, i) => (
                      <p key={i}>
                        <FaCheckCircle /> {point}
                      </p>
                    ))}
                  </div>

                  <div className="kr-sc-flow">
                    {item.flow.map((step, i) => (
                      <div className="kr-sc-flow-item" key={i}>
                        <span>{i + 1}</span>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Link to="/success-stories" className="kr-sc-link">
                  View Related Success Stories <FaArrowRight />
                </Link>
              </div>

              <div className="kr-sc-side">
                <div className="kr-sc-list danger">
                  <h3>If ignored, what happens?</h3>
                  {item.problems.map((point, i) => (
                    <p key={i}>
                      <FaTimesCircle /> {point}
                    </p>
                  ))}
                </div>

                <div className="kr-sc-list success">
                  <h3>How KeyRoutes helps</h3>
                  {item.solutions.map((point, i) => (
                    <p key={i}>
                      <FaCheckCircle /> {point}
                    </p>
                  ))}
                </div>

                <div className="kr-sc-bottom-grid">
                  <div className="kr-sc-mini-box">
                    <h3>What You Get</h3>
                    {item.deliverables.map((point, i) => (
                      <p key={i}>✓ {point}</p>
                    ))}
                  </div>

                  <div className="kr-sc-mini-box">
                    <h3>Business Impact</h3>
                    {item.benefits.map((point, i) => (
                      <p key={i}>✓ {point}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="kr-sc-cta">
        <div className="kr-sc-container">
          <h2>Need a Strategy Before Running Campaigns?</h2>
          <p>
            Let’s review your project positioning, website, SEO, GEO, campaigns,
            CRM and automation before your next marketing spend.
          </p>

          <a
            href="https://wa.me/918309436998"
            target="_blank"
            rel="noreferrer"
          >
            Book Free Consultation ›
          </a>
        </div>
      </section>
    </main>
  );
};

export default StrategyConsulting;