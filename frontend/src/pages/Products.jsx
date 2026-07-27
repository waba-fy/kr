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
  FaTable,
  FaPlug,
} from "react-icons/fa";

import SEO from "../components/seo/SEO";
import Schema from "../components/seo/Schema";

import organizationSchema from "../seo/organizationSchema";
import {
  createCollectionPageSchema,
} from "../seo/schemaHelper";
import {
  createProductSchema,
} from "../seo/serviceSchema";
import {
  productsBreadcrumbSchema,
} from "../seo/breadcrumbSchema";

import "../styles/products.css";

const productsDescription =
  "Explore KeyRoutes automation products for real estate businesses, including WhatsApp Business API, Google Sheet automation, email marketing, IVR, CRM integrations, lead management and analytics solutions.";

const productsPageSchema =
  createCollectionPageSchema({
    name:
      "KeyRoutes Real Estate Automation Products",
    description: productsDescription,
    url: "/products",
  });

const whatsappBusinessApiSchema =
  createProductSchema({
    name: "WhatsApp Business API",
    description:
      "WhatsApp Business API solutions for real estate businesses to automate buyer conversations, enquiry responses and CRM-connected follow-ups.",
    url:
      "/product-solutions#whatsapp-business-api",
    category:
      "Business Communication Software",
  });

const googleSheetAutomationsSchema =
  createProductSchema({
    name: "Google Sheet Automations",
    description:
      "Google Sheet automation solutions that trigger WhatsApp messages, emails, CRM updates and workflow actions from new or updated spreadsheet entries.",
    url:
      "/product-solutions#google-sheet-automations",
    category:
      "Workflow Automation Software",
  });

const emailMarketingSchema =
  createProductSchema({
    name: "Email Marketing Automation",
    description:
      "Email marketing automation for real estate businesses to nurture leads, share project updates and improve buyer engagement.",
    url:
      "/product-solutions#email-marketing",
    category:
      "Marketing Automation Software",
  });

const ivrVoiceSchema =
  createProductSchema({
    name: "IVR and Voice Solutions",
    description:
      "IVR and voice solutions for real estate businesses to manage inbound calls, route enquiries and improve sales response.",
    url:
      "/product-solutions#ivr-voice",
    category:
      "Business Communication Software",
  });

const integrationsSchema =
  createProductSchema({
    name: "Business Integrations",
    description:
      "Integration solutions that connect websites, CRM platforms, Google Sheets, forms, WhatsApp, email tools and reporting systems.",
    url:
      "/product-solutions#integrations",
    category:
      "Business Integration Software",
  });

const productCards = [
  {
    icon: <FaWhatsapp />,
    title: "WhatsApp Business API",
    desc:
      "Automate buyer conversations, template messages, enquiry responses and CRM-connected follow-ups.",
    link:
      "/product-solutions#whatsapp-business-api",
  },
  {
    icon: <FaTable />,
    title: "Google Sheet Automations",
    desc:
      "Trigger WhatsApp messages, emails, CRM updates and workflows from new or updated Google Sheet entries.",
    link:
      "/product-solutions#google-sheet-automations",
  },
  {
    icon: <FaEnvelopeOpenText />,
    title: "Email Marketing",
    desc:
      "Send project updates, lead nurturing emails, campaign sequences and automated follow-up communication.",
    link:
      "/product-solutions#email-marketing",
  },
  {
    icon: <FaPhoneAlt />,
    title: "IVR & Voice",
    desc:
      "Manage inbound calls, route enquiries, track call leads and improve sales team response.",
    link:
      "/product-solutions#ivr-voice",
  },
  {
    icon: <FaPlug />,
    title: "Integrations",
    desc:
      "Connect websites, CRMs, Google Sheets, forms and communication tools into one coordinated workflow.",
    link:
      "/product-solutions#integrations",
  },
];

const productFlow = [
  "Lead Capture",
  "CRM",
  "Google Sheets",
  "WhatsApp",
  "Email",
  "IVR",
  "Automation",
  "Analytics",

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
    desc:
      "Capture enquiries from websites, forms, campaigns and calls in one connected workflow.",
  },
  {
    icon: <FaCogs />,
    title: "Automation Ready",
    desc:
      "Automate responses, reminders, follow-ups and lead updates without repetitive manual work.",
  },
  {
    icon: <FaRobot />,
    title: "Smart Communication",
    desc:
      "Use WhatsApp, email and IVR with Google Sheets or CRM workflows to improve buyer communication.",
  },
  {
    icon: <FaChartPie />,
    title: "Better Tracking",
    desc:
      "Understand lead sources, response time, follow-up status and conversion outcomes.",
  },
];

const Products = () => {
  return (
    <main className="kr-products-page">
      <SEO
        title="Real Estate Automation Products"
        description={productsDescription}
        canonical="/products"
        keywords={[
          "real estate automation products",
          "WhatsApp API for real estate",
          "Google Sheet automation",
          "email marketing for builders",
          "IVR for real estate",
          "CRM automation",
          "lead management system",
          "business integrations",
          "real estate CRM tools",
        ]}
      />

      <Schema
        data={[
          organizationSchema,
          productsPageSchema,
          whatsappBusinessApiSchema,
          googleSheetAutomationsSchema,
          emailMarketingSchema,
          ivrVoiceSchema,
          integrationsSchema,
          productsBreadcrumbSchema,
        ]}
      />

      <section className="kr-pr-hero">
        <div className="kr-pr-bg"></div>

        <div className="kr-pr-container kr-pr-hero-grid">
          <div className="kr-pr-hero-content">
            <div className="kr-pr-breadcrumb">
              <Link to="/">Home</Link>
              <span>›</span>
              Products
            </div>

            <span>REAL ESTATE PRODUCTS</span>

            <h1>
              Automation Products Built for{" "}
              <strong>
                Leads, Follow-ups & Sales.
              </strong>
            </h1>

            <p>
              KeyRoutes product solutions help
              builders connect WhatsApp, email,
              IVR, CRM, Google Sheets,
              integrations and analytics into one
              real estate lead management system.
            </p>

            <div className="kr-pr-actions">
              <a
                href="https://wa.me/918309436998"
                target="_blank"
                rel="noreferrer"
              >
                Ask for Demo ›
              </a>

              <a
                href="#product-categories"
                className="outline"
              >
                Explore Products
              </a>
            </div>
          </div>

          <div className="kr-pr-hero-card">
            <div className="kr-pr-mini-card">
              <FaWhatsapp />

              <div>
                <strong>WhatsApp API</strong>
                <p>
                  Instant buyer communication
                </p>
              </div>
            </div>

            <div className="kr-pr-mini-card">
              <FaTable />

              <div>
                <strong>
                  Google Sheet Automation
                </strong>
                <p>
                  Trigger workflows from lead data
                </p>
              </div>
            </div>

            <div className="kr-pr-mini-card">
              <FaEnvelopeOpenText />

              <div>
                <strong>
                  Email Automation
                </strong>
                <p>
                  Lead nurturing sequences
                </p>
              </div>
            </div>

            <div className="kr-pr-mini-card">
              <FaPhoneAlt />

              <div>
                <strong>
                  IVR & Toll-free
                </strong>
                <p>
                  Call routing and tracking
                </p>
              </div>
            </div>

            <div className="kr-pr-progress">
              <span
                style={{ width: "88%" }}
              ></span>
            </div>

            <p className="kr-pr-card-note">
              Website Lead → CRM or Google Sheet
              → WhatsApp → Email → Call → Sales
              Follow-up
            </p>
          </div>
        </div>
      </section>

      <section className="kr-pr-flow-section">
        <div className="kr-pr-container">
          <div className="kr-pr-head center">
            <span>PRODUCT ECOSYSTEM</span>

            <h2>
              Every Product Supports the{" "}
              <strong>Lead Journey</strong>
            </h2>

            <p>
              These products work together to
              capture, communicate, track and
              convert real estate enquiries.
            </p>
          </div>

          <div className="kr-pr-flow">
            {productFlow.map(
              (item, index) => (
                <div
                  className="kr-pr-flow-card"
                  key={item}
                >
                  <span>
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <h3>{item}</h3>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section
        className="kr-pr-categories"
        id="product-categories"
      >
        <div className="kr-pr-container">
          <div className="kr-pr-head center">
            <span>PRODUCT CATEGORIES</span>

            <h2>
              Choose the Right Product for{" "}
              <strong>
                Your Sales Workflow
              </strong>
            </h2>
          </div>

          <div className="kr-pr-category-grid">
            {productCards.map((item) => (
              <Link
                to={item.link}
                className="kr-pr-category-card"
                key={item.link}
              >
                <div className="kr-pr-icon">
                  {item.icon}
                </div>

                <h3>{item.title}</h3>

                <p>{item.desc}</p>

                <span>
                  Explore Details{" "}
                  <FaArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-pr-why">
        <div className="kr-pr-container kr-pr-why-grid-wrap">
          <div className="kr-pr-why-content">
            <span>
              WHY KEYROUTES PRODUCTS
            </span>

            <h2>
              Designed for Real Estate
              Enquiry Handling and Follow-up.
            </h2>

            <p>
              Real estate sales depend on fast
              response, proper lead tracking and
              consistent communication. Our
              products help teams reduce manual
              work and improve buyer engagement.
            </p>
          </div>

          <div className="kr-pr-why-grid">
            {whyItems.map((item) => (
              <div
                className="kr-pr-why-card"
                key={item}
              >
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
              Better Lead Management, Faster
              Response and{" "}
              <strong>Clearer Tracking</strong>
            </h2>
          </div>

          <div className="kr-pr-benefit-grid">
            {benefitCards.map((item) => (
              <div
                className="kr-pr-benefit-card"
                key={item.title}
              >
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
          <h2>
            Want to Automate Your Real Estate
            Lead Follow-up?
          </h2>

          <p>
            Let’s review your current lead flow
            and suggest the right WhatsApp,
            Google Sheet, email, IVR, CRM and
            integration solutions.
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