import {
  FaGlobe,
  FaBullhorn,
  FaSearchLocation,
  FaGoogle,
  FaFacebookF,
  FaWhatsapp,
  FaUsersCog,
  FaChartPie,
  FaRobot,
  FaTable,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import "../styles/technology-ecosystem.css";

const techItems = [
  {
    icon: <FaGlobe />,
    title: "Project Websites",
    points: ["Fast loading", "SEO ready", "Lead focused"],
  },
  {
    icon: <FaBullhorn />,
    title: "Landing Pages",
    points: ["Campaign ready", "WhatsApp CTA", "Form tracking"],
  },
  {
    icon: <FaSearchLocation />,
    title: "SEO & GEO SEO",
    points: ["Location pages", "Google ranking", "Project keywords"],
  },
  {
    icon: <FaGoogle />,
    title: "Google Ads",
    points: ["Search ads", "Call ads", "Lead tracking"],
  },
  {
    icon: <FaFacebookF />,
    title: "Meta Ads",
    points: ["Facebook", "Instagram", "Lead forms"],
  },
  {
    icon: <FaWhatsapp />,
    title: "WhatsApp Cloud API",
    points: ["Templates", "Follow-ups", "Instant alerts"],
  },
  {
    icon: <FaUsersCog />,
    title: "CRM & Workflows",
    points: ["Lead status", "Assignments", "Site visits"],
  },
  {
    icon: <FaChartPie />,
    title: "Analytics",
    points: ["GA4", "GTM", "Reports"],
  },
 {
  icon: <FaTable />,
  title: "Lead Automation",
  points: [
    "Instant Email Alerts",
    "WhatsApp Workflows",
    "Lead Synchronization",
  ],
},
  {
    icon: <FaPhoneAlt />,
    title: "IVR & Automation",
    points: ["Call routing", "Recording", "Workflow triggers"],
  },
];

const TechnologyEcosystem = () => {
  return (
    <section className="kr-tech-section">
      <div className="kr-tech-bg-grid"></div>
      <div className="kr-tech-glow glow-red"></div>
      <div className="kr-tech-glow glow-dark"></div>

      <div className="kr-tech-container">
        <div className="kr-tech-head">
          <span>TECHNOLOGY ECOSYSTEM</span>
          <h2>
            One Connected Growth System for <strong>Real Estate Projects</strong>
          </h2>
          <p>
            From SEO-ready project websites and GEO-focused landing pages to CRM,
            WhatsApp API, analytics and automation — KeyRoutes connects every
            part of your real estate lead journey.
          </p>
        </div>

        <div className="kr-tech-layout">
          <div className="kr-tech-hub">
            <div className="hub-ring ring-one"></div>
            <div className="hub-ring ring-two"></div>
            <div className="hub-core">
              <small>KEYROUTES</small>
              <h3>Growth Hub</h3>
              <p>Strategy + Website + Campaigns + Automation</p>
            </div>
          </div>

          <div className="kr-tech-nodes">
            {techItems.map((item, index) => (
              <div className="kr-tech-card" key={index}>
                <div className="kr-tech-icon">{item.icon}</div>

                <div className="kr-tech-content">
                  <h3>{item.title}</h3>
                  <ul>
                    {item.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>

                <span className="kr-tech-pulse"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyEcosystem;