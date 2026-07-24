import { Link } from "react-router-dom";
import {
  FaBullhorn,
  FaChartLine,
  FaLaptopCode,
  FaUsersCog,
  FaRobot,
  FaChartPie,
} from "react-icons/fa";
import "../styles/services-highlights.css";

const services = [
  {
    icon: <FaChartLine />,
    title: "PPC Campaigns",
    desc: "Run focused paid campaigns that generate quality enquiries and measurable performance.",
    link: "/ppc-campaigns",
  },
  {
    icon: <FaBullhorn />,
    title: "Social Media Management",
    desc: "Build consistent brand presence with content, creatives, reels and campaign planning.",
    link: "/social-media-management",
  },
  {
    icon: <FaLaptopCode />,
    title: "Website Design & Development",
    desc: "Create responsive websites designed for trust, lead capture and business conversion.",
    link: "/website-design-development",
  },
  {
    icon: <FaUsersCog />,
    title: "CRM & Integration",
    desc: "Connect your leads, teams and follow-ups through CRM workflows and smart integrations.",
    link: "/crm-integration",
  },
  {
    icon: <FaRobot />,
    title: "Automation",
    desc: "Automate WhatsApp, email, Google Sheets and task flows to reduce manual work.",
    link: "/automation",
  },
  {
    icon: <FaChartPie />,
    title: "Analytics",
    desc: "Track performance, understand customer behaviour and improve every growth decision.",
    link: "/analytics",
  },
];

const ServicesHighlights = () => {
  return (
    <section className="kr-services-section">
      <div className="kr-services-shape shape-a"></div>
      <div className="kr-services-shape shape-b"></div>

      <div className="kr-services-container">
        <div className="kr-services-head">
          <span>SERVICES</span>
          <h2>
            Execution That Turns Strategy Into <strong>Measurable Growth</strong>
          </h2>
          <p>
            From paid campaigns to websites, CRM and automation, our services
            help businesses generate leads, manage follow-ups and improve
            conversions.
          </p>
        </div>

        <div className="kr-services-grid">
          {services.map((service, index) => (
            <Link to={service.link} className="kr-service-card" key={index}>
              <div className="kr-service-icon">{service.icon}</div>

              <div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>

              <span className="kr-service-arrow">›</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesHighlights;