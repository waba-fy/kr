import { Link } from "react-router-dom";
import { FaBullhorn, FaLaptopCode, FaChartLine } from "react-icons/fa";
import "../styles/strategy-highlights.css";

const strategies = [
  {
    icon: <FaBullhorn />,
    title: "Brand Strategy",
    desc: "Build strong real estate positioning, messaging and identity that makes your project easier to trust and remember.",
    link: "/strategy-consulting#brand-strategy",
  },
  {
    icon: <FaLaptopCode />,
    title: "Digital Strategy",
    desc: "Plan the right website, SEO, GEO, landing pages, campaigns and customer journey before execution.",
    link: "/strategy-consulting#digital-strategy",
  },
  {
    icon: <FaChartLine />,
    title: "Marketing & Sales",
    desc: "Align campaigns, lead generation, CRM, WhatsApp follow-up and sales process to improve conversions.",
    link: "/strategy-consulting#marketing-sales",
  },
];

const StrategyHighlights = () => {
  return (
    <section className="kr-strategy-section">
      <div className="kr-strategy-bg"></div>

      <div className="kr-strategy-container">
        <div className="kr-strategy-head">
          <span>REAL ESTATE STRATEGY</span>
          <h2>
            Clear Strategy Before <strong>Every Execution</strong>
          </h2>
          <p>
            We help builders and real estate projects create direction before
            spending on websites, campaigns, CRM, SEO or automation.
          </p>
        </div>

        <div className="kr-strategy-grid">
          {strategies.map((item, index) => (
            <Link to={item.link} className="kr-strategy-card" key={index}>
              <div className="kr-strategy-number">0{index + 1}</div>
              <div className="kr-strategy-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className="kr-strategy-link">Explore More ›</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategyHighlights;