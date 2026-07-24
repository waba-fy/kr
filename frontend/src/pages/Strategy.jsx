import {
  FaBullhorn,
  FaLaptopCode,
  FaChartLine,
  FaSearch,
  FaMapMarkedAlt,
  FaUsers,
  FaRocket,
  FaChartPie,
  FaCheckCircle,
  FaBuilding,
  FaHome,
  FaRoute,
  FaGlobe,
  FaGoogle,
  FaWhatsapp,
  FaDatabase,
  FaPhoneAlt,
  FaArrowRight,
  FaBrain,
  FaMapSigns,
  FaClipboardList,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import StrategyDeepDive from "../components/StrategyDeepDive";
import "../styles/strategy-page.css";

const trustItems = [
  "Real Estate Focused",
  "SEO & GEO Ready",
  "Website + Campaign Strategy",
];

const lifecycle = [
  "Project Positioning",
  "Brand Message",
  "Website Structure",
  "SEO & GEO Content",
  "Campaign Funnel",
  "Lead Capture",
  "CRM Follow-up",
  "Site Visit Growth",
];

const benefits = [
  {
    icon: <FaSearch />,
    title: "Market Clarity",
    desc: "Understand competitors, location demand, pricing and buyer expectations before launch.",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Location Focus",
    desc: "Build local relevance around areas, landmarks, roads, connectivity and buyer intent.",
  },
  {
    icon: <FaUsers />,
    title: "Better Buyers",
    desc: "Attract serious home buyers instead of only increasing enquiry volume.",
  },
  {
    icon: <FaRocket />,
    title: "Launch Readiness",
    desc: "Prepare website, landing pages, campaigns, CRM and tracking before launch.",
  },
  {
    icon: <FaChartPie />,
    title: "Performance Control",
    desc: "Measure leads, cost, conversion quality, site visits and follow-up performance.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Sales Alignment",
    desc: "Connect marketing with CRM, WhatsApp, site visits and sales team actions.",
  },
];

const framework = [
  "Research",
  "Position",
  "Plan",
  "Build",
  "Promote",
  "Measure",
  "Optimize",
  "Scale",
];

const process = [
  {
    title: "Discovery",
    desc: "We understand your project type, location, audience, pricing, inventory and current marketing status.",
  },
  {
    title: "Research",
    desc: "We study competitors, buyer intent, local search behaviour and campaign opportunities.",
  },
  {
    title: "Strategy Planning",
    desc: "We define project positioning, website structure, SEO direction, campaign funnel and CRM flow.",
  },
  {
    title: "Execution Roadmap",
    desc: "We prepare the plan for website, landing pages, Google Ads, Meta Ads, automation and reporting.",
  },
];

const pillars = [
  {
    icon: <FaBullhorn />,
    title: "Brand Strategy",
    desc: "Position your project clearly with identity, messaging, trust-building and buyer-focused communication.",
    link: "/strategy-consulting#brand-strategy",
  },
  {
    icon: <FaLaptopCode />,
    title: "Digital Strategy",
    desc: "Plan websites, SEO, GEO content, landing pages, campaigns and automation before execution.",
    link: "/strategy-consulting#digital-strategy",
  },
  {
    icon: <FaChartLine />,
    title: "Marketing & Sales",
    desc: "Connect lead generation, CRM, follow-ups and sales actions into one growth funnel.",
    link: "/strategy-consulting#marketing-sales",
  },
];

const problems = [
  "Low quality leads",
  "Weak project positioning",
  "Poor website conversion",
  "No local SEO structure",
  "No GEO / AI-search readiness",
  "No structured follow-up",
  "High cost per lead",
  "Low site visit conversion",
];

const solutions = [
  "Clear buyer positioning",
  "SEO-ready project funnel",
  "GEO and local keyword planning",
  "Landing page and website strategy",
  "CRM and lead tracking",
  "WhatsApp automation",
  "Google & Meta campaign strategy",
  "Analytics-led optimization",
];

const whyKeyRoutes = [
  {
    icon: <FaBuilding />,
    title: "Real Estate Only",
    desc: "We focus on builders, apartment projects, villas, plots and project launches.",
  },
  {
    icon: <FaGlobe />,
    title: "SEO First",
    desc: "We plan websites and pages with Google visibility from the beginning.",
  },
  {
    icon: <FaBrain />,
    title: "GEO Ready",
    desc: "We structure content for AI search, Google AI Overviews and entity relevance.",
  },
  {
    icon: <FaWhatsapp />,
    title: "Automation Ready",
    desc: "We connect WhatsApp, CRM, Google Sheets and follow-up workflows.",
  },
  {
    icon: <FaGoogle />,
    title: "Campaign Ready",
    desc: "We prepare your funnel before Google Ads and Meta Ads begin.",
  },
  {
    icon: <FaChartPie />,
    title: "Tracking Focused",
    desc: "We help measure enquiries, sources, conversions, site visits and ROI.",
  },
];

const projectTypes = [
  "Luxury Apartments",
  "Affordable Apartments",
  "Villa Communities",
  "Premium Villas",
  "HMDA / DTCP Plots",
  "Commercial Spaces",
  "Mixed-use Projects",
  "New Project Launches",
];

const geoItems = [
  "AI-search-friendly content",
  "Project entity optimization",
  "Local area relevance",
  "Schema-ready page structure",
  "FAQs for buyer questions",
  "Google Business Profile direction",
];

const localAreas = [
  "Kokapet",
  "Tellapur",
  "Narsingi",
  "Financial District",
  "Kollur",
  "Gachibowli",
  "Bachupally",
  "Shamshabad",
  "ORR Growth Corridors",
];

const stats = [
  {
    value: "90%",
    label: "buyers research online before enquiring",
  },
  {
    value: "3x",
    label: "better conversion from focused landing pages",
  },
  {
    value: "24/7",
    label: "lead response through automation",
  },
  {
    value: "100%",
    label: "strategy-led execution approach",
  },
];


const relatedServices = [
  {
    id: "website-development",
    icon: <FaLaptopCode />,
    title: "Website Development",
    desc:
      "SEO-ready, mobile-first project websites and landing pages built for enquiries.",
    link: "/services",
  },
  {
    id: "google-ads",
    icon: <FaGoogle />,
    title: "Google Ads & PPC",
    desc:
      "High-intent campaigns connected with landing pages, analytics and lead tracking.",
    link: "/services",
  },
  {
    id: "real-estate-seo",
    icon: <FaSearch />,
    title: "SEO for Real Estate",
    desc:
      "Search-focused website architecture, project content and organic visibility.",
    link: "/services",
  },
  {
    id: "local-seo",
    icon: <FaMapSigns />,
    title: "Local SEO",
    desc:
      "Location-based visibility for project, area and nearby-landmark searches.",
    link: "/supporting-services",
  },
  {
    id: "crm-integration",
    icon: <FaDatabase />,
    title: "CRM & Integration",
    desc:
      "Lead capture, source tracking, assignment and structured follow-up workflows.",
    link: "/product-solutions",
  },
  {
    id: "automation",
    icon: <FaWhatsapp />,
    title: "Marketing Automation",
    desc:
      "WhatsApp, Google Sheets, email and lead-notification workflows.",
    link: "/supporting-services",
  },
];

const exploreLinks = [
  {
    title: "Brand Strategy",
    desc: "Build project trust, positioning and identity.",
    link: "/strategy#brand-strategy",
  },
  {
    title: "Digital Strategy",
    desc: "Plan SEO, GEO, website, campaigns and funnels.",
    link: "/strategy#digital-strategy",
  },
  {
    title: "Marketing & Sales",
    desc: "Connect campaigns, CRM, follow-ups and sales.",
    link: "/strategy#marketing-sales",
  },
];

const faqs = [
  {
    q: "Why does a real estate project need strategy before marketing?",
    a: "Strategy defines your project positioning, buyer persona, location advantage, website structure, campaign direction and follow-up process before spending on ads.",
  },
  {
    q: "Can strategy improve lead quality?",
    a: "Yes. Better positioning, audience targeting, landing pages, SEO content and follow-up systems help attract more serious buyers.",
  },
  {
    q: "Do you help with project websites and landing pages?",
    a: "Yes. We plan SEO-ready project websites and conversion-focused landing pages with forms, WhatsApp CTA, analytics and campaign tracking.",
  },
  {
    q: "Do you include SEO and GEO SEO?",
    a: "Yes. We include keyword planning, local relevance, buyer FAQs, structured content and AI-search-friendly page planning.",
  },
  {
    q: "Can you help with Google Ads and Meta Ads strategy?",
    a: "Yes. We plan how campaigns should connect with landing pages, CRM, WhatsApp, tracking and remarketing.",
  },
  {
    q: "Do you work with ongoing projects?",
    a: "Yes. We can improve positioning, website performance, campaign structure, lead follow-up and automation for ongoing projects.",
  },
  {
    q: "What makes KeyRoutes different?",
    a: "KeyRoutes focuses on real estate growth systems, not only ads. We connect strategy, websites, SEO, campaigns, CRM, automation and analytics.",
  },
  {
    q: "How do you measure success?",
    a: "We track lead source, cost per lead, lead quality, follow-up speed, site visit intent and conversion performance.",
  },
];
const createWhatsAppLink = (service = "Real Estate Strategy") => {
  const message = encodeURIComponent(
    `Hi KeyRoutes,

I visited your Real Estate Strategy page and would like to know more about ${service} for our project.

Project details:
• Project name:
• Project type:
• Location:
• Current marketing status:

Please contact me to discuss the requirements and schedule a consultation.

Thank you.`
  );

  return `https://wa.me/918309436998?text=${message}`;
};

const Strategy = () => {
  return (
    <main className="kr-strategy-page">
      <SEO
  title="Real Estate Marketing Strategy for Builders | KeyRoutes"
  description="KeyRoutes helps builders create real estate marketing strategies with SEO-ready websites, GEO SEO, Google Ads, CRM, WhatsApp automation and lead generation systems."
  keywords="real estate marketing strategy, builder marketing strategy, real estate SEO, GEO SEO for builders, Google Ads for real estate, real estate website development, CRM for builders, WhatsApp automation for real estate, Hyderabad real estate marketing"
  canonical="https://keyroutes.in/strategy"
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
        "@type": "LocalBusiness",
        "@id": "https://keyroutes.in/#localbusiness",
        name: "KeyRoutes",
        url: "https://keyroutes.in",
        telephone: "+918309436998",
        areaServed: [
          "Hyderabad",
          "Kokapet",
          "Tellapur",
          "Narsingi",
          "Gachibowli",
          "Bachupally",
          "Kollur",
          "Shamshabad",
        ],
        serviceType: [
          "Real Estate Marketing Strategy",
          "Real Estate SEO",
          "Google Ads for Real Estate",
          "Website Development for Builders",
          "CRM and Automation",
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://keyroutes.in/strategy",
        url: "https://keyroutes.in/strategy",
        name: "Real Estate Marketing Strategy for Builders",
        description:
          "Strategy page for builders and real estate projects covering brand strategy, digital strategy, SEO, GEO SEO, Google Ads, CRM and automation.",
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
            name: "Strategy",
            item: "https://keyroutes.in/strategy",
          },
        ],
      },
    ],
  }}
/>
      <section className="kr-sp-hero">
        <div className="kr-sp-grid-bg"></div>
        <div className="kr-sp-glow"></div>

        <div className="kr-sp-container">
          <div className="kr-sp-breadcrumb">
            <Link to="/">Home</Link> <span>›</span> Strategy
          </div>

          <div className="kr-sp-hero-layout">
            <div className="kr-sp-hero-content">
              <span className="kr-sp-label">REAL ESTATE STRATEGY</span>

              <h1>
                Strategy That Drives <strong>Real Estate Growth.</strong>
              </h1>

              <p>
                Every successful real estate project begins with the right
                strategy. KeyRoutes helps builders position projects, build
                SEO-ready digital assets, attract qualified buyers and create
                growth systems that convert enquiries into site visits.
              </p>

              <div className="kr-sp-actions">
                <a
                  href="https://wa.me/918309436998"
                  target="_blank"
                  rel="noreferrer"
                >
                  Book Free Consultation ›
                </a>

                <a href="#framework" className="outline">
                  Explore Framework
                </a>
              </div>

              <div className="kr-sp-trust-list">
                {trustItems.map((item, index) => (
                  <span key={index}>✓ {item}</span>
                ))}
              </div>
            </div>

            <div className="kr-sp-hero-visual">
              <div className="kr-sp-orbit orbit-one"></div>
              <div className="kr-sp-orbit orbit-two"></div>

              <div className="kr-sp-hub">
                <small>KEYROUTES</small>
                <h3>Real Estate Growth Strategy</h3>
                <p>Brand + Website + SEO + Campaigns + CRM + Automation</p>
              </div>

              <div className="kr-sp-mini-card card-one">SEO</div>
              <div className="kr-sp-mini-card card-two">Google Ads</div>
              <div className="kr-sp-mini-card card-three">CRM</div>
              <div className="kr-sp-mini-card card-four">WhatsApp</div>
            </div>
          </div>
        </div>
      </section>

      <section className="kr-sp-intro">
        <div className="kr-sp-container kr-sp-intro-grid">
          <div>
            <span className="kr-sp-label">STRATEGY BEFORE MARKETING</span>
            <h2>
              Most Projects Start With Ads. Successful Projects Start With{" "}
              <strong>Strategy.</strong>
            </h2>
          </div>

          <p>
            Before investing in Google Ads, Meta campaigns or portal listings,
            builders need clarity on project positioning, buyer persona,
            location advantage, pricing communication, project story, website
            structure, SEO direction, CRM flow and follow-up systems. Without
            this foundation, campaigns may generate leads but fail to create
            qualified site visits.
          </p>
        </div>
      </section>

      <section className="kr-sp-lifecycle">
        <div className="kr-sp-container">
          <div className="kr-sp-section-head center">
            <span>REAL ESTATE PROJECT LIFECYCLE</span>
            <h2>
              Strategy Connects Every Stage of <strong>Project Growth</strong>
            </h2>
            <p>
              From positioning to website, SEO, campaigns, lead capture and
              sales follow-up, every stage should work as one connected system.
            </p>
          </div>

          <div className="kr-sp-lifecycle-row">
            {lifecycle.map((item, index) => (
              <div className="kr-sp-lifecycle-step" key={index}>
                <span>0{index + 1}</span>
                <h3>{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-sp-benefits">
        <div className="kr-sp-container">
          <div className="kr-sp-section-head center">
            <span>WHY BUILDERS NEED STRATEGY</span>
            <h2>
              A Better Plan Creates <strong>Better Leads</strong>
            </h2>
            <p>
              Strategy helps your project communicate clearly, rank better,
              advertise smarter and convert faster.
            </p>
          </div>

          <div className="kr-sp-benefit-grid">
            {benefits.map((item, index) => (
              <div className="kr-sp-benefit-card" key={index}>
                <div>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-sp-framework" id="framework">
        <div className="kr-sp-container">
          <div className="kr-sp-section-head">
            <span>KEYROUTES FRAMEWORK</span>
            <h2>
              Our Real Estate Strategy <strong>Framework</strong>
            </h2>
            <p>
              We connect research, positioning, project communication, website
              planning, SEO, campaigns, automation and analytics into one clear
              framework.
            </p>
          </div>

          <div className="kr-sp-framework-row">
            {framework.map((step, index) => (
              <div className="kr-sp-framework-step" key={index}>
                <span>0{index + 1}</span>
                <h3>{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-sp-process">
        <div className="kr-sp-container">
          <div className="kr-sp-section-head center">
            <span>HOW WE WORK</span>
            <h2>
              From Project Understanding to <strong>Growth Roadmap</strong>
            </h2>
          </div>

          <div className="kr-sp-process-grid">
            {process.map((item, index) => (
              <div className="kr-sp-process-card" key={index}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     <section className="kr-sp-pillars" id="strategy-pillars">
        <div className="kr-sp-container">
          <div className="kr-sp-section-head center">
            <span>STRATEGY PILLARS</span>
            <h2>
              Three Pillars of <strong>Real Estate Growth</strong>
            </h2>
          </div>

          <div className="kr-sp-pillar-grid">
            {pillars.map((item, index) => (
              <Link to={item.link} className="kr-sp-pillar-card" key={index}>
                <div className="kr-sp-pillar-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span>Learn More ›</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-sp-problem">
        <div className="kr-sp-container kr-sp-problem-grid">
          <div className="kr-sp-problem-card dark">
            <h2>Where Builders Lose Buyers</h2>
            {problems.map((item, index) => (
              <p key={index}>✕ {item}</p>
            ))}
          </div>

          <div className="kr-sp-problem-card red">
            <h2>How KeyRoutes Solves Them</h2>
            {solutions.map((item, index) => (
              <p key={index}>✓ {item}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-sp-why">
        <div className="kr-sp-container">
          <div className="kr-sp-section-head center">
            <span>WHY KEYROUTES</span>
            <h2>
              Built Specifically for <strong>Real Estate Growth</strong>
            </h2>
          </div>

          <div className="kr-sp-why-grid">
            {whyKeyRoutes.map((item, index) => (
              <div className="kr-sp-why-card" key={index}>
                <div>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-sp-project-types">
        <div className="kr-sp-container">
          <div className="kr-sp-section-head center">
            <span>PROJECTS WE SUPPORT</span>
            <h2>
              Strategy for Different <strong>Real Estate Projects</strong>
            </h2>
          </div>

          <div className="kr-sp-type-grid">
            {projectTypes.map((item, index) => (
              <div className="kr-sp-type-card" key={index}>
                <FaHome />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-sp-geo">
        <div className="kr-sp-container kr-sp-geo-grid">
          <div>
            <span className="kr-sp-label">GEO + LOCAL SEO</span>
            <h2>
              Preparing Real Estate Projects for{" "}
              <strong>Google and AI Search.</strong>
            </h2>
            <p>
              Buyers now discover projects through Google, Maps, AI answers and
              location-based searches. We plan content that helps search engines
              and AI systems understand your project, location, value and buyer
              relevance.
            </p>

            <div className="kr-sp-area-tags">
              {localAreas.map((area, index) => (
                <span key={index}>{area}</span>
              ))}
            </div>
          </div>

          <div className="kr-sp-geo-card">
            {geoItems.map((item, index) => (
              <p key={index}>✓ {item}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-sp-stats">
        <div className="kr-sp-container kr-sp-stats-grid">
          {stats.map((item, index) => (
            <div className="kr-sp-stat-card" key={index}>
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="kr-sp-related">
        <div className="kr-sp-container">
          <div className="kr-sp-section-head center">
            <span>RELATED SERVICES</span>
            <h2>
              Strategy Connected With <strong>Execution</strong>
            </h2>
          </div>

          <div className="kr-sp-related-grid">
            {relatedServices.map((item, index) => (
              <Link to={item.link} className="kr-sp-related-card" key={index}>
                <div>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span>Explore <FaArrowRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

     

      <section className="kr-sp-faq">
        <div className="kr-sp-container">
          <div className="kr-sp-section-head center">
            <span>FAQS</span>
            <h2>
              Strategy Questions <strong>Builders Ask</strong>
            </h2>
          </div>

          <div className="kr-sp-faq-list">
            {faqs.map((item, index) => (
              <div className="kr-sp-faq-item" key={index}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-sp-cta">
        <div className="kr-sp-container">
          <h2>Ready to Build a Strategy Before Spending on Marketing?</h2>
          <p>
            Let’s review your project, location, audience, competition, website
            structure, SEO opportunity and lead funnel before your next
            campaign.
          </p>

          <div className="kr-sp-cta-actions">
            <a
              href={createWhatsAppLink("Real Estate Growth Strategy")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Strategy Consultation ›
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Strategy;