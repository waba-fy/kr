import { Link } from "react-router-dom";
import {
  FaBullhorn,
  FaLaptopCode,
  FaChartLine,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import "../styles/strategy-deep-dive.css";

const strategySections = [
  {
    id: "brand-strategy",
    icon: <FaBullhorn />,
    label: "BRAND STRATEGY",
    title: "Build a Real Estate Brand Buyers Can Trust",
    desc: "We help builders create strong project positioning, clear messaging, buyer-focused communication and a trustworthy brand identity before spending on marketing.",
    points: [
      "Project positioning",
      "Buyer persona planning",
      "Competitor differentiation",
      "Trust-building message",
      "Location advantage communication",
      "Project naming and story direction",
    ],
  },
  {
    id: "digital-strategy",
    icon: <FaLaptopCode />,
    label: "DIGITAL STRATEGY",
    title: "Plan Website, SEO, GEO and Digital Funnel",
    desc: "We create a complete digital roadmap covering project websites, landing pages, SEO, GEO, Google Ads, Meta Ads, analytics and tracking.",
    points: [
      "SEO-ready website structure",
      "GEO and AI-search planning",
      "Landing page strategy",
      "Google Ads funnel planning",
      "GA4 and GTM tracking",
      "Lead capture journey",
    ],
  },
  {
    id: "marketing-sales",
    icon: <FaChartLine />,
    label: "MARKETING & SALES",
    title: "Connect Campaigns, CRM and Site Visits",
    desc: "We align lead generation with CRM, WhatsApp automation, lead assignment, follow-up tracking and sales reporting to improve conversions.",
    points: [
      "Lead generation funnel",
      "CRM and lead assignment",
      "WhatsApp follow-up flow",
      "Remarketing strategy",
      "Site visit conversion tracking",
      "Sales performance reporting",
    ],
  },
];

const StrategyDeepDive = () => {
  return (
    <section className="kr-sdd-section">
      <div className="kr-sdd-container">
        <div className="kr-sdd-head">
          <span>STRATEGY DEEP DIVE</span>
          <h2>
            Real Estate Growth Strategy, <strong>Explained Clearly</strong>
          </h2>
          <p>
            Each strategy area is built to improve project positioning, search
            visibility, lead quality and sales conversion.
          </p>
        </div>

        <div className="kr-sdd-list">
          {strategySections.map((item, index) => (
            <div
              className={`kr-sdd-block ${index % 2 !== 0 ? "reverse" : ""}`}
              id={item.id}
              key={item.id}
            >
              <div className="kr-sdd-content">
                <div className="kr-sdd-icon">{item.icon}</div>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>

                <Link to="/success-stories" className="kr-sdd-link">
                  View Related Success Stories <FaArrowRight />
                </Link>
              </div>

              <div className="kr-sdd-points">
                {item.points.map((point, i) => (
                  <div className="kr-sdd-point" key={i}>
                    <FaCheckCircle />
                    <p>{point}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategyDeepDive;