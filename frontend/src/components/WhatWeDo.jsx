import { Link } from "react-router-dom";
import {
  FaBullseye,
  FaRocket,
  FaLayerGroup,
  FaArrowRight,
} from "react-icons/fa";
import "../styles/what-we-do.css";

const pillars = [
  {
    tag: "01",
    icon: <FaBullseye />,
    title: "Strategy Consulting",
    desc: "Build a clear direction for brand positioning, digital growth, marketing and sales alignment.",
    points: ["Brand Strategy", "Digital Strategy", "Marketing & Sales"],
    link: "/strategy",
  },
  {
    tag: "02",
    icon: <FaRocket />,
    title: "Growth Services",
    desc: "Execute campaigns and systems that improve visibility, generate leads and increase conversions.",
    points: [
      "PPC Campaigns",
      "Social Media Management",
      "Website & CRM",
      "Analytics",
    ],
    link: "/services",
  },
  {
    tag: "03",
    icon: <FaLayerGroup />,
    title: "Business Products",
    desc: "Automate communication and operations with WhatsApp API, Google Sheet flows, IVR and integrations.",
    points: [
      "WhatsApp API",
      "Google Sheet Automation",
      "Email Marketing",
      "IVR & Toll-free",
      "Integrations",
    ],
    link: "/products",
  },
];

const WhatWeDo = () => {
  return (
    <section className="kr-what-section">
      <div className="kr-what-bg-line line-one"></div>
      <div className="kr-what-bg-line line-two"></div>

      <div className="kr-what-container">
        <div className="kr-what-heading">
          <span>WHAT WE DO</span>
          <h2>
            Strategy, Marketing & Automation <strong>Built Together</strong>
          </h2>
          <p>
            KeyRoutes connects business strategy with digital execution and
            automation tools, so every part of your growth system works in one
            direction.
          </p>
        </div>

        <div className="kr-what-grid">
          {pillars.map((item, index) => (
            <div className="kr-what-card" key={index}>
              <div className="kr-what-top">
                <div className="kr-what-icon">{item.icon}</div>
                <span>{item.tag}</span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.desc}</p>

              <ul>
                {item.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>

              <Link to={item.link} className="kr-what-link">
                Explore More <FaArrowRight />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;