import { Link } from "react-router-dom";
import {
  FaBullseye,
  FaEye,
  FaHandshake,
  FaRoute,
  FaSearch,
  FaChartLine,
  FaNewspaper,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import SEO from "../components/seo/SEO";
import Schema from "../components/seo/Schema";

import organizationSchema from "../seo/organizationSchema";
import {
  createAboutPageSchema,
} from "../seo/schemaHelper";
import {
  aboutBreadcrumbSchema,
} from "../seo/breadcrumbSchema";

import "../styles/about.css";

const aboutDescription =
  "Learn about KeyRoutes, our mission, vision, process and commitment to helping real estate businesses grow through strategy, websites, SEO, GEO, campaigns, CRM and automation.";

const aboutPageSchema =
  createAboutPageSchema({
    name: "About KeyRoutes",
    description: aboutDescription,
    url: "/about",
  });

const pillars = [
  {
    icon: <FaBullseye />,
    title: "Our Mission",
    desc:
      "To help real estate businesses grow with clear strategy, stronger visibility, better lead systems and measurable execution.",
  },
  {
    icon: <FaEye />,
    title: "Our Vision",
    desc:
      "To become a trusted growth route for builders, developers and lead-driven businesses across India and global markets.",
  },
  {
    icon: <FaHandshake />,
    title: "Our Commitment",
    desc:
      "We focus on transparent planning, practical execution and growth systems that support real business outcomes.",
  },
];

const process = [
  "Understand Business",
  "Audit Current System",
  "Build Strategy",
  "Execute Website & Campaigns",
  "Connect CRM & Automation",
  "Measure, Optimize & Scale",
];

const resources = [
  {
    id: "reviews",
    icon: <FaNewspaper />,
    title: "Reviews & Feedback",
    desc:
      "Discover what our clients say about working with KeyRoutes through real experiences, project outcomes and business growth stories.",
    link: "/reviews-feedback",
    linkLabel: "Read Reviews",
  },
  {
    id: "case-studies",
    icon: <FaSearch />,
    title: "Case Studies",
    desc:
      "Explore real project examples, websites, campaigns and connected growth systems.",
    link: "/success-stories",
    linkLabel: "View Case Studies",
  },
  {
    id: "market-reports",
    icon: <FaChartLine />,
    title: "Success Stories",
    desc:
      "Explore project websites, landing pages, SEO, GEO optimization, paid campaigns, analytics.",
    link: "/success-stories",
    linkLabel: "Success Stories",
  },
];

const About = () => {
  return (
    <main className="kr-about-page">
      <SEO
        title="About KeyRoutes"
        description={aboutDescription}
        canonical="/about"
        keywords={[
          "about KeyRoutes",
          "real estate growth company",
          "real estate marketing agency",
          "real estate strategy consulting",
          "SEO for builders",
          "GEO for real estate",
          "CRM automation",
          "real estate marketing automation",
        ]}
      />

      <Schema
        data={[
          organizationSchema,
          aboutPageSchema,
          aboutBreadcrumbSchema,
        ]}
      />

      <section className="kr-about-hero">
        <div className="kr-about-bg"></div>

        <div className="kr-about-container">
          <div className="kr-about-breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            About
          </div>

          <span>ABOUT KEYROUTES</span>

          <h1>
            Building Growth Routes for{" "}
            <strong>Real Estate Businesses.</strong>
          </h1>

          <p>
            KeyRoutes helps builders, developers and lead-driven businesses grow
            through strategy, SEO-ready websites, GEO content, campaigns, CRM,
            WhatsApp automation and measurable lead systems.
          </p>

          <div className="kr-about-actions">
            <a href="#about-us">About Us</a>
            <a href="#how-we-work">How We Work</a>
            <a href="#media-resources">Reviews & Feedback</a>
          </div>
        </div>
      </section>

      <section
        className="kr-about-intro"
        id="about-us"
      >
        <div className="kr-about-container kr-about-intro-grid">
          <div>
            <span>ABOUT US</span>

            <h2>
              Discover Our Mission, Vision and Commitment to{" "}
              <strong>Real Estate Growth.</strong>
            </h2>
          </div>

          <p>
            We are a strategy-first growth team focused on helping businesses
            move from random marketing activities to structured growth systems.
            Our work connects brand positioning, websites, SEO, GEO, campaigns,
            CRM and automation so every lead has a clear route from enquiry to
            follow-up.
          </p>
        </div>

        <div className="kr-about-container">
          <div className="kr-about-pillar-grid">
            {pillars.map((item) => (
              <div
                className="kr-about-pillar-card"
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

      <section
        className="kr-about-work"
        id="how-we-work"
      >
        <div className="kr-about-container">
          <div className="kr-about-head center">
            <span>HOW WE WORK</span>

            <h2>
              From Strategy to{" "}
              <strong>Lead Generation</strong>
            </h2>

            <p>
              Our process is designed to give businesses clarity before
              execution and measurable systems after launch.
            </p>
          </div>

          <div className="kr-about-process-grid">
            {process.map((item, index) => (
              <div
                className="kr-about-process-card"
                key={item}
              >
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-about-system">
        <div className="kr-about-container kr-about-system-grid">
          <div className="kr-about-system-content">
            <span>OUR GROWTH SYSTEM</span>

            <h2>
              Strategy, Marketing and Automation Working Together.
            </h2>

            <p>
              We do not treat services as separate tasks. Every website,
              campaign, CRM flow and automation is planned as part of one
              connected growth route.
            </p>

            <div className="kr-about-checks">
              {[
                "Strategy-first execution",
                "SEO and GEO-ready planning",
                "Lead-focused website structure",
                "CRM and automation workflows",
                "Performance tracking and reporting",
              ].map((item) => (
                <p key={item}>
                  <FaCheckCircle />
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="kr-about-system-card">
            <FaRoute />

            <h3>KeyRoutes Growth Route</h3>

            <p>
              Research → Strategy → Website → SEO → Campaigns → CRM → Sales
            </p>
          </div>
        </div>
      </section>

      <section
        className="kr-about-resources"
        id="media-resources"
      >
        <div className="kr-about-container">
          <div className="kr-about-head center">
            <span>REVIEWS & RESOURCES</span>

            <h2>
              Case Studies and{" "}
              <strong>Growth Insights</strong>
            </h2>

            <p>
              Explore practical resources from the KeyRoutes team to understand
              digital growth, search visibility and lead automation better.
            </p>
          </div>

          <div className="kr-about-resource-grid">
            {resources.map((item) => (
              <article
                className="kr-about-resource-card"
                key={item.id}
              >
                <div aria-hidden="true">
                  {item.icon}
                </div>

                <h3>{item.title}</h3>

                <p>{item.desc}</p>

                <Link
                  to={item.link}
                  aria-label={`${item.linkLabel}: ${item.title}`}
                >
                  {item.linkLabel}
                  <FaArrowRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-about-cta">
        <div className="kr-about-container">
          <h2>Want to Build a Clear Growth Route?</h2>

          <p>
            Let’s review your current strategy, website, campaigns, CRM and
            automation system.
          </p>

          <a
            href="https://wa.me/918309436998"
            target="_blank"
            rel="noopener noreferrer"
          >
            Talk to KeyRoutes ›
          </a>
        </div>
      </section>
    </main>
  );
};

export default About;