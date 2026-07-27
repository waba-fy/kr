import { Link } from "react-router-dom";
import {
  FaSearch,
  FaChartLine,
  FaLaptopCode,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaGoogle,
  FaMapMarkedAlt,
  FaBullhorn,
  FaDatabase,
  FaWhatsapp,
  FaCogs,
  FaChartPie,
  FaRobot,
} from "react-icons/fa";
import SEO from "../components/seo/SEO";
import Schema from "../components/seo/Schema";

import organizationSchema from "../seo/organizationSchema";
import { createWebPageSchema } from "../seo/schemaHelper";
import { supportingServicesSchema } from "../seo/serviceSchema";
import {
  supportingServicesBreadcrumbSchema,
} from "../seo/breadcrumbSchema";

import "../styles/supporting-services.css";

const serviceData = [
  {
    id: "market-research-audits",
    icon: <FaSearch />,
    label: "MARKET RESEARCH & AUDITS",
    title: "Understand Your Market Before Spending on Campaigns",
    what:
      "Market research helps builders understand buyer demand, competitor activity, location opportunity, pricing signals, search behaviour and project positioning.",
    why:
      "Without research, campaigns may target the wrong audience, use weak messaging and waste budget on low-quality enquiries.",
    problems: [
      "No clarity on buyer persona",
      "Weak competitor understanding",
      "Random campaign planning",
      "Poor location positioning",
    ],
    solutions: [
      "Competitor research",
      "Buyer persona analysis",
      "Keyword and demand research",
      "Project opportunity audit",
    ],
    deliverables: [
      "Market audit report",
      "Competitor analysis",
      "Buyer persona notes",
      "Keyword opportunity report",
    ],
    benefits: [
      "Better decision making",
      "Clearer project positioning",
      "Smarter marketing spend",
      "Improved lead quality",
    ],
    seoTitle: "SEO + GEO Role in Research",
    seoDesc:
      "Research identifies the locations, buyer questions, project keywords and search behaviour needed to improve Google and AI-search visibility.",
    seoItems: [
      "Location keyword research",
      "Competitor SEO analysis",
      "Buyer search intent mapping",
      "Google Maps opportunity review",
      "Content gap analysis",
      "Project entity planning",
    ],
    flow: ["Research", "Buyer Intent", "Keywords", "Strategy", "Campaign Plan"],
  },
  {
    id: "seo-geo-performance",
    icon: <FaChartLine />,
    label: "SEO, GEO & PERFORMANCE MARKETING",
    title: "Improve Google Visibility and Generate Better Enquiries",
    what:
      "SEO, GEO and performance marketing connect organic search, AI-search visibility, Google Ads, Meta Ads and conversion tracking.",
    why:
      "Without proper search and campaign planning, your project may get traffic but fail to generate serious enquiries and site visit intent.",
    problems: [
      "Low Google visibility",
      "High cost per lead",
      "Poor landing page relevance",
      "No tracking or optimization",
    ],
    solutions: [
      "SEO and GEO planning",
      "Google Ads strategy",
      "Meta campaign planning",
      "GA4 and GTM tracking",
    ],
    deliverables: [
      "SEO roadmap",
      "GEO content plan",
      "Campaign structure",
      "Performance tracking setup",
    ],
    benefits: [
      "Better search visibility",
      "Higher quality enquiries",
      "Lower wasted ad spend",
      "Improved campaign ROI",
    ],
    seoTitle: "SEO + GEO Growth Framework",
    seoDesc:
      "We structure project pages for Google rankings, Google Maps visibility, AI Overviews, local search and buyer-intent enquiries.",
    seoItems: [
      "SEO-ready project pages",
      "GEO-focused location content",
      "Schema-ready structure",
      "Google Ads keyword mapping",
      "Meta retargeting funnel",
      "Conversion tracking setup",
    ],
    flow: ["SEO", "GEO", "Google Ads", "Landing Page", "Lead Capture"],
  },
  {
    id: "website-crm-automation",
    icon: <FaLaptopCode />,
    label: "WEBSITE, CRM & AUTOMATION",
    title: "Build a Digital System That Captures and Converts Leads",
    what:
      "A project website, CRM and automation system helps builders capture enquiries, assign leads, automate follow-ups and track sales activity.",
    why:
      "Without a connected system, leads may get missed, follow-ups may be delayed and sales teams may not know which campaigns work.",
    problems: [
      "Website not converting",
      "Missed enquiries",
      "Manual lead follow-up",
      "No sales tracking",
    ],
    solutions: [
      "SEO-ready website development",
      "CRM integration",
      "WhatsApp automation",
      "Lead tracking workflow",
    ],
    deliverables: [
      "Project website",
      "Landing pages",
      "CRM workflow",
      "WhatsApp and email automation",
    ],
    benefits: [
      "Faster lead response",
      "Better enquiry management",
      "Improved site visit follow-up",
      "Scalable sales process",
    ],
    seoTitle: "Website + CRM Role in Search Growth",
    seoDesc:
      "A fast, SEO-ready website with CRM and tracking helps convert search visitors and campaign traffic into measurable enquiries.",
    seoItems: [
      "SEO-ready website architecture",
      "Landing page conversion flow",
      "Lead form tracking",
      "WhatsApp click tracking",
      "CRM source attribution",
      "Follow-up performance data",
    ],
    flow: ["Website", "Lead Form", "CRM", "WhatsApp", "Sales Follow-up"],
  },
];

const platformItems = [
  {
    icon: <FaGoogle />,
    title: "Google Search",
    desc: "Project and location search visibility.",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "GEO / Maps",
    desc: "Area-based visibility and location authority.",
  },
  {
    icon: <FaWhatsapp />,
    title: "WhatsApp",
    desc: "Fast enquiry response and automated follow-ups.",
  },
  {
    icon: <FaDatabase />,
    title: "CRM",
    desc: "Lead tracking, assignment and sales activity.",
  },
];

const faqs = [
  {
    q: "Do you provide all services together or separately?",
    a: "Both. KeyRoutes can support individual requirements like SEO, CRM or website development, but the best results come when services are connected as one growth system.",
  },
  {
    q: "Can you build SEO-ready real estate websites?",
    a: "Yes. We build project websites and landing pages with SEO structure, GEO content, forms, WhatsApp CTA, analytics and conversion tracking.",
  },
  {
    q: "Do you help with Google Ads and Meta Ads?",
    a: "Yes. We plan and manage campaigns with landing pages, CRM tracking, source attribution and follow-up workflows.",
  },
  {
    q: "Can you connect leads to CRM and WhatsApp?",
    a: "Yes. We can connect website and campaign leads to CRM, Google Sheets, WhatsApp alerts, email workflows and follow-up tracking.",
  },
];

const supportingServicesDescription =
  "Explore KeyRoutes supporting services for real estate, including market research, SEO, GEO, Google Ads, Meta Ads, website development, CRM, WhatsApp automation and analytics.";

const supportingServicesPageSchema =
  createWebPageSchema({
    name:
      "Supporting Real Estate Growth Services",
    description:
      supportingServicesDescription,
    url: "/supporting-services",
  });

const SupportingServices = () => {
  return (
    <main className="kr-ss-page">
      <SEO
        title="Supporting Real Estate Growth Services"
        description={supportingServicesDescription}
        canonical="/supporting-services"
        keywords={[
          "real estate supporting services",
          "real estate SEO services",
          "GEO for builders",
          "Google Ads for real estate",
          "Meta Ads for real estate",
          "real estate website development",
          "CRM automation for builders",
          "WhatsApp automation for real estate",
          "real estate lead generation",
          "real estate analytics",
        ]}
      />

      <Schema
        data={[
          organizationSchema,
          supportingServicesPageSchema,
          supportingServicesSchema,
          supportingServicesBreadcrumbSchema,
        ]}
      />

      <section className="kr-ss-hero">
        <div className="kr-ss-bg"></div>

        <div className="kr-ss-container">
          <div className="kr-ss-breadcrumb">
            <Link to="/">Home</Link> <span>›</span>
            <Link to="/services">Services</Link> <span>›</span> Supporting Services
          </div>

          <span>SUPPORTING SERVICES</span>

          <h1>
            Real Estate Services That Support <strong>Search, Leads & Sales.</strong>
          </h1>

          <p>
            Explore how KeyRoutes connects research, SEO, GEO, campaigns,
            website development, CRM and automation into one real estate growth
            system.
          </p>

          <div className="kr-ss-actions">
            <a href="#market-research-audits">Market Research</a>
            <a href="#seo-geo-performance">SEO, GEO & Ads</a>
            <a href="#website-crm-automation">Website & CRM</a>
          </div>
        </div>
      </section>

      <section className="kr-ss-intro">
        <div className="kr-ss-container kr-ss-intro-grid">
          <div>
            <span>WHY SUPPORTING SERVICES MATTER</span>
            <h2>
              A Real Estate Growth System Needs More Than Ads.
            </h2>
          </div>

          <p>
            Ads can create traffic, but traffic alone does not create business.
            Builders need strong research, search visibility, project websites,
            landing pages, CRM, WhatsApp response and tracking to convert
            interest into site visits.
          </p>
        </div>

        <div className="kr-ss-container">
          <div className="kr-ss-platform-grid">
            {platformItems.map((item, index) => (
              <div className="kr-ss-platform-card" key={index}>
                <div>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-ss-deep">
        <div className="kr-ss-container">
          {serviceData.map((item, index) => (
            <div
              className={`kr-ss-block ${index % 2 !== 0 ? "reverse" : ""}`}
              id={item.id}
              key={item.id}
            >
              <div className="kr-ss-content">
                <div className="kr-ss-icon">{item.icon}</div>
                <span>{item.label}</span>
                <h2>{item.title}</h2>

                <div className="kr-ss-explain">
                  <h3>What is it?</h3>
                  <p>{item.what}</p>

                  <h3>Why do you need it?</h3>
                  <p>{item.why}</p>
                </div>

                <div className="kr-ss-seo-box">
                  <span>SEO + GEO GROWTH FRAMEWORK</span>
                  <h3>{item.seoTitle}</h3>
                  <p>{item.seoDesc}</p>

                  <div className="kr-ss-seo-list">
                    {item.seoItems.map((point, i) => (
                      <p key={i}>
                        <FaCheckCircle /> {point}
                      </p>
                    ))}
                  </div>

                  <div className="kr-ss-flow">
                    {item.flow.map((step, i) => (
                      <div className="kr-ss-flow-item" key={i}>
                        <span>{i + 1}</span>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Link to="/success-stories" className="kr-ss-link">
                  View Related Success Stories <FaArrowRight />
                </Link>
              </div>

              <div className="kr-ss-side">
                <div className="kr-ss-list danger">
                  <h3>Problems We Solve</h3>
                  {item.problems.map((point, i) => (
                    <p key={i}>
                      <FaTimesCircle /> {point}
                    </p>
                  ))}
                </div>

                <div className="kr-ss-list success">
                  <h3>How KeyRoutes Helps</h3>
                  {item.solutions.map((point, i) => (
                    <p key={i}>
                      <FaCheckCircle /> {point}
                    </p>
                  ))}
                </div>

                <div className="kr-ss-bottom-grid">
                  <div className="kr-ss-mini-box">
                    <h3>What You Get</h3>
                    {item.deliverables.map((point, i) => (
                      <p key={i}>✓ {point}</p>
                    ))}
                  </div>

                  <div className="kr-ss-mini-box">
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

      <section className="kr-ss-faq">
        <div className="kr-ss-container">
          <div className="kr-ss-head center">
            <span>FAQS</span>
            <h2>
              Supporting Service <strong>Questions</strong>
            </h2>
          </div>

          <div className="kr-ss-faq-grid">
            {faqs.map((item, index) => (
              <div className="kr-ss-faq-card" key={index}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-ss-cta">
        <div className="kr-ss-container">
          <h2>Need Help Connecting Your Website, SEO, CRM and Campaigns?</h2>
          <p>
            Let’s review your current real estate growth system and identify
            where your project is losing visibility, leads or site visits.
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

export default SupportingServices;