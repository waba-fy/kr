import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaEnvelopeOpenText,
  FaPhoneAlt,
  FaRobot,
  FaDatabase,
  FaCogs,
  FaChartPie,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import SEO from "../components/SEO";
import "../styles/products.css";

const productCards = [
  {
    icon: <FaWhatsapp />,
    title: "WhatsApp Business API",
    desc: "Automate buyer conversations, template messages, enquiry responses and CRM-connected follow-ups.",
    link: "/product-solutions#whatsapp-business-api",
  },
  {
    icon: <FaEnvelopeOpenText />,
    title: "Email Marketing",
    desc: "Send project updates, lead nurturing emails, campaign sequences and automated follow-up communication.",
    link: "/product-solutions#email-marketing",
  },
  {
    icon: <FaPhoneAlt />,
    title: "IVR & Voice",
    desc: "Manage inbound calls, route enquiries, track call leads and improve sales team response.",
    link: "/product-solutions#ivr-voice",
  },
];

const productFlow = [
  "Lead Capture",
  "CRM",
  "WhatsApp",
  "Email",
  "IVR",
  "Automation",
  "Analytics",
  "Sales Follow-up",
];

const whyItems = [
  "Built for real estate lead management",
  "Connects with websites and landing pages",
  "Supports WhatsApp, email and call workflows",
  "Improves follow-up speed and lead tracking",
  "Helps reduce missed enquiries",
  "Works with CRM and Google Sheet systems",
];

const benefitCards = [
  {
    icon: <FaDatabase />,
    title: "Centralized Leads",
    desc: "Capture enquiries from websites, forms, campaigns and calls in one connected workflow.",
  },
  {
    icon: <FaCogs />,
    title: "Automation Ready",
    desc: "Automate responses, reminders, follow-ups and lead updates without manual effort.",
  },
  {
    icon: <FaRobot />,
    title: "Smart Communication",
    desc: "Use WhatsApp, email, and IVR from Google Sheet to improve buyer communication.",
  },
  {
    icon: <FaChartPie />,
    title: "Better Tracking",
    desc: "Understand lead sources, response time, follow-up status and conversion outcomes.",
  },
];

const Products = () => {
  return (
    <main className="kr-products-page">
      <SEO
        title="Real Estate Automation Products | WhatsApp API, Email, IVR & CRM | KeyRoutes"
        description="Explore KeyRoutes products for real estate businesses including WhatsApp Business API, email marketing, IVR, CRM automation, lead management and analytics solutions."
        keywords="real estate automation products, WhatsApp API for real estate, email marketing for builders, IVR for real estate, CRM automation, lead management system, real estate CRM tools"
        canonical="https://keyroutes.in/products"
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "KeyRoutes Real Estate Automation Products",
          brand: {
            "@type": "Brand",
            name: "KeyRoutes",
          },
          description:
            "Automation products for real estate lead management, WhatsApp API, email marketing, IVR, CRM and analytics.",
        }}
      />

      <section className="kr-pr-hero">
        <div className="kr-pr-bg"></div>

        <div className="kr-pr-container kr-pr-hero-grid">
          <div className="kr-pr-hero-content">
            <div className="kr-pr-breadcrumb">
              <Link to="/">Home</Link> <span>›</span> Products
            </div>

            <span>REAL ESTATE PRODUCTS</span>

            <h1>
              Automation Products Built for{" "}
              <strong>Leads, Follow-ups & Sales.</strong>
            </h1>

            <p>
              KeyRoutes product solutions help builders connect WhatsApp, email,
              IVR, CRM, Google Sheets and analytics into one real estate lead
              management system.
            </p>

            <div className="kr-pr-actions">
              <a
                href="https://wa.me/918309436998"
                target="_blank"
                rel="noreferrer"
              >
                Ask for Demo ›
              </a>

              <a href="#product-categories" className="outline">
                Explore Products
              </a>
            </div>
          </div>

          <div className="kr-pr-hero-card">
            <div className="kr-pr-mini-card">
              <FaWhatsapp />
              <div>
                <strong>WhatsApp API</strong>
                <p>Instant buyer communication</p>
              </div>
            </div>

            <div className="kr-pr-mini-card">
              <FaEnvelopeOpenText />
              <div>
                <strong>Email Automation</strong>
                <p>Lead nurturing sequences</p>
              </div>
            </div>

            <div className="kr-pr-mini-card">
              <FaPhoneAlt />
              <div>
                <strong>IVR & Toll free</strong>
                <p>Call routing and tracking</p>
              </div>
            </div>

            <div className="kr-pr-progress">
              <span style={{ width: "88%" }}></span>
            </div>

            <p className="kr-pr-card-note">
              Website Lead → CRM or Google Sheet  → WhatsApp → Email → Call → Sales Follow-up
            </p>
          </div>
        </div>
      </section>

      <section className="kr-pr-flow-section">
        <div className="kr-pr-container">
          <div className="kr-pr-head center">
            <span>PRODUCT ECOSYSTEM</span>
            <h2>
              Every Product Supports the <strong>Lead Journey</strong>
            </h2>
            <p>
              These products work together to capture, communicate, track and
              convert real estate enquiries.
            </p>
          </div>

          <div className="kr-pr-flow">
            {productFlow.map((item, index) => (
              <div className="kr-pr-flow-card" key={index}>
                <span>0{index + 1}</span>
                <h3>{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-pr-categories" id="product-categories">
        <div className="kr-pr-container">
          <div className="kr-pr-head center">
            <span>PRODUCT CATEGORIES</span>
            <h2>
              Choose the Right Product for <strong>Your Sales Workflow</strong>
            </h2>
          </div>

          <div className="kr-pr-category-grid">
            {productCards.map((item, index) => (
              <Link to={item.link} className="kr-pr-category-card" key={index}>
                <div className="kr-pr-icon">{item.icon}</div>
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

      <section className="kr-pr-why">
        <div className="kr-pr-container kr-pr-why-grid-wrap">
          <div className="kr-pr-why-content">
            <span>WHY KEYROUTES PRODUCTS</span>
            <h2>
              Designed for Real Estate Enquiry Handling and Follow-up.
            </h2>
            <p>
              Real estate sales depend on fast response, proper lead tracking
              and consistent communication. Our products help teams reduce
              manual work and improve buyer engagement.
            </p>
          </div>

          <div className="kr-pr-why-grid">
            {whyItems.map((item, index) => (
              <div className="kr-pr-why-card" key={index}>
                <FaCheckCircle />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-pr-benefits">
        <div className="kr-pr-container">
          <div className="kr-pr-head center">
            <span>BUSINESS BENEFITS</span>
            <h2>
              Better Lead Management, Faster Response and{" "}
              <strong>Clearer Tracking</strong>
            </h2>
          </div>

          <div className="kr-pr-benefit-grid">
            {benefitCards.map((item, index) => (
              <div className="kr-pr-benefit-card" key={index}>
                <div>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-pr-cta">
        <div className="kr-pr-container">
          <h2>Want to Automate Your Real Estate Lead Follow-up?</h2>
          <p>
            Let’s review your current lead flow and suggest the right WhatsApp,
            email, IVR, CRM and automation products.
          </p>

          <a
            href="https://wa.me/918309436998"
            target="_blank"
            rel="noreferrer"
          >
            Ask for Product Demo ›
          </a>
        </div>
      </section>
    </main>
  );
};

export default Products;