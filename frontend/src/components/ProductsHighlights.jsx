import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaTable,
  FaEnvelopeOpenText,
  FaPhoneAlt,
  FaPlug,
} from "react-icons/fa";
import "../styles/products-highlights.css";

const products = [
  {
    icon: <FaWhatsapp />,
    title: "WhatsApp API",
    desc: "Automate customer conversations, lead replies, reminders and follow-ups through WhatsApp.",
    link: "/whatsapp-business-api",
  },
  {
    icon: <FaTable />,
    title: "Google Sheet Automations",
    desc: "Trigger emails, WhatsApp messages and workflows directly from new Google Sheet entries.",
    link: "/google-sheet-automations",
  },
  {
    icon: <FaEnvelopeOpenText />,
    title: "Email Marketing",
    desc: "Send targeted campaigns, nurture leads and manage follow-up communication at scale.",
    link: "/email-marketing",
  },
  {
    icon: <FaPhoneAlt />,
    title: "IVR & Toll-free Numbers",
    desc: "Manage incoming calls professionally with IVR flows, call routing and toll-free solutions.",
    link: "/ivr-toll-free-numbers",
  },
  {
    icon: <FaPlug />,
    title: "Integrations",
    desc: "Connect websites, CRMs, sheets, forms and communication tools into one smooth workflow.",
    link: "/integrations",
  },
];

const ProductsHighlights = () => {
  return (
    <section className="kr-products-section">
      <div className="kr-products-grid-bg"></div>
      <div className="kr-products-orbit orbit-one"></div>
      <div className="kr-products-orbit orbit-two"></div>

      <div className="kr-products-container">
        <div className="kr-products-head">
          <span>PRODUCTS</span>
          <h2>
            Automation Products That Keep Your <strong>Business Moving</strong>
          </h2>
          <p>
            KeyRoutes products help your team respond faster, manage leads
            better and automate repetitive communication workflows.
          </p>
        </div>

        <div className="kr-products-layout">
          <div className="kr-products-left">
            <div className="kr-products-core">
              <div className="core-ring ring-one"></div>
              <div className="core-ring ring-two"></div>
              <div className="core-dot"></div>

              <h3>Connected Growth Stack</h3>
              <p>
                Bring communication, CRM, automation and reporting together in
                one practical system.
              </p>

              <Link to="/products" className="kr-products-main-link">
                Explore All Products ›
              </Link>
            </div>
          </div>

          <div className="kr-products-list">
            {products.map((item, index) => (
              <Link to={item.link} className="kr-product-row" key={index}>
                <div className="kr-product-icon">{item.icon}</div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>

                <span>›</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsHighlights;