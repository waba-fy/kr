import { NavLink } from "react-router-dom";
import {
  FaBullhorn,
  FaLaptopCode,
  FaChartLine,
  FaSearchDollar,
  FaShareAlt,
  FaDesktop,
  FaWhatsapp,
  FaEnvelopeOpenText,
  FaPhoneAlt,
  FaInfoCircle,
  FaCogs,
  FaNewspaper,
  FaBriefcase,
  FaUsers,
} from "react-icons/fa";

import "../styles/megamenu.css";

export const menuData = {
  strategy: {
    title: "Strategy Consulting",

    cta: {
      icon: "↗",
      title: "Free Strategy Consultation",
      desc: "Get clear direction for your real estate brand, digital presence, marketing and sales.",
      btnText: "Strategy Consultation ›",
      link: "/strategy",
    },

    items: [
      {
        title: "Brand Strategy",
        desc: "Build a strong real estate brand with clear positioning, messaging and buyer-focused communication.",
        icon: <FaBullhorn />,
        link: "/strategy-consulting#brand-strategy",
      },
      {
        title: "Digital Strategy",
        desc: "Plan websites, SEO, GEO, landing pages and digital channels to improve project visibility.",
        icon: <FaLaptopCode />,
        link: "/strategy-consulting#digital-strategy",
      },
      {
        title: "Marketing & Sales",
        desc: "Connect campaigns, CRM, automation and follow-ups to generate better quality leads.",
        icon: <FaChartLine />,
        link: "/strategy-consulting#marketing-sales",
      },
    ],
  },

  services: {
    title: "Our Services",

    cta: {
      icon: "✓",
      title: "Free Service Audit",
      desc: "Review your website, SEO, campaigns and lead management with our experts.",
      btnText: "Check Service List ›",
      link: "/services",
    },

    items: [
      {
        title: "Market Research & Audits",
        desc: "Research competitors, locations, buyer behaviour and identify growth opportunities.",
        icon: <FaSearchDollar />,
        link: "/supporting-services#market-research-audits",
      },
      {
        title: "SEO, GEO & Performance Marketing",
        desc: "Grow visibility through SEO, GEO, Google Ads, Meta Ads and campaign tracking.",
        icon: <FaShareAlt />,
        link: "/supporting-services#seo-geo-performance",
      },
      {
        title: "Website, CRM & Automation",
        desc: "Develop conversion-focused project websites integrated with CRM and automation.",
        icon: <FaDesktop />,
        link: "/supporting-services#website-crm-automation",
      },
    ],
  },

  products: {
    title: "Products",

    cta: {
      icon: "✦",
      title: "Product Demo Support",
      desc: "Discover automation products designed for real estate businesses.",
      btnText: "Ask for Demo ›",
      link: "/products",
    },

    items: [
      {
        title: "WhatsApp Business API",
        desc: "Automate customer conversations and improve enquiry response time.",
        icon: <FaWhatsapp />,
        link: "/product-solutions#whatsapp-business-api",
      },
      {
        title: "Email Marketing",
        desc: "Nurture buyers with automated email campaigns and project updates.",
        icon: <FaEnvelopeOpenText />,
        link: "/product-solutions#email-marketing",
      },
      {
        title: "IVR & Voice",
        desc: "Manage incoming enquiries using IVR and smart call routing.",
        icon: <FaPhoneAlt />,
        link: "/product-solutions#ivr-voice",
      },
    ],
  },

  about: {
    title: "About KeyRoutes",

    cta: {
      icon: "●",
      title: "Know KeyRoutes Better",
      desc: "Learn how KeyRoutes helps builders grow through digital strategy.",
      btnText: "Know More ›",
      link: "/about",
    },

    items: [
      {
        title: "About Us",
        desc: "Discover our mission, vision and commitment to real estate growth.",
        icon: <FaInfoCircle />,
        link: "/about#about-us",
      },
      {
        title: "How We Work",
        desc: "Explore our proven process from strategy to lead generation.",
        icon: <FaCogs />,
        link: "/about#how-we-work",
      },
      {
        title: "Reviews & Feedback",
        desc: "Discover what our clients say about working with KeyRoutes.",
        icon: <FaNewspaper />,
        link: "/about#media-resources",
      },
    ],
  },

  careers: {
    title: "Careers",

    cta: {
      icon: "→",
      title: "Build With KeyRoutes",
      desc: "Join our growing team and shape the future of real estate marketing.",
      btnText: "Contact HR ›",
      link: "https://wa.me/918309436998",
    },

    items: [
      {
        title: "Life at KeyRoutes",
        desc: "See our culture, values and collaborative work environment.",
        icon: <FaUsers />,
        link: "/careers#life-at-keyroutes",
      },
      {
        title: "Open Positions",
        desc: "Explore current opportunities to join the KeyRoutes team.",
        icon: <FaBriefcase />,
        link: "/careers#open-positions",
      },
    ],
  },
};

const isExternalUrl = (url = "") =>
  /^https?:\/\//i.test(url);

const MegaMenu = ({
  id,
  type,
  onItemClick,
}) => {
  const data = menuData[type];

  if (!data) {
    return null;
  }

  const handleItemClick = () => {
    if (typeof onItemClick === "function") {
      onItemClick();
    }
  };

  return (
    <div
      id={id}
      className="mega-wrapper"
      role="region"
      aria-label={`${data.title} menu`}
    >
      <div className="mega-container">
        <div className="mega-cta-card">
          <div
            className="mega-cta-icon"
            aria-hidden="true"
          >
            {data.cta.icon}
          </div>

          <h3>{data.cta.title}</h3>

          <p>{data.cta.desc}</p>

          {isExternalUrl(data.cta.link) ? (
            <a
              href={data.cta.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mega-cta-btn"
              onClick={handleItemClick}
            >
              {data.cta.btnText}
            </a>
          ) : (
            <NavLink
              to={data.cta.link}
              className="mega-cta-btn"
              onClick={handleItemClick}
            >
              {data.cta.btnText}
            </NavLink>
          )}
        </div>

        <div className="mega-content">
          <h4>{data.title}</h4>

          <div className="mega-grid">
            {data.items.map((item) => (
              <NavLink
                key={item.link}
                to={item.link}
                className="mega-item"
                onClick={handleItemClick}
              >
                <span
                  className="mega-icon"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <div className="mega-item-content">
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>

                <span
                  className="mega-arrow"
                  aria-hidden="true"
                >
                  ›
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;