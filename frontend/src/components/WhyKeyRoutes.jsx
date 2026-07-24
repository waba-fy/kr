import {
  FaBullseye,
  FaChartBar,
  FaRobot,
  FaHandshake,
  FaClipboardCheck,
  FaRocket,
} from "react-icons/fa";
import "../styles/why-keyroutes.css";

const reasons = [
  {
    icon: <FaBullseye />,
    title: "Strategy First",
    desc: "We begin with clear business direction before running campaigns or building systems.",
  },
  {
    icon: <FaChartBar />,
    title: "Data Backed",
    desc: "Every decision is supported by performance insights, tracking and measurable outcomes.",
  },
  {
    icon: <FaRobot />,
    title: "Automation Focused",
    desc: "We reduce manual work through WhatsApp, CRM, email, IVR and workflow automation.",
  },
  {
    icon: <FaHandshake />,
    title: "Business Friendly",
    desc: "We keep communication simple, practical and focused on what actually improves growth.",
  },
  {
    icon: <FaClipboardCheck />,
    title: "Transparent Reporting",
    desc: "You get clear updates on leads, campaigns, performance and next action points.",
  },
  {
    icon: <FaRocket />,
    title: "Built to Scale",
    desc: "Our systems are designed to support long-term growth, not just short-term activity.",
  },
];

const WhyKeyRoutes = () => {
  return (
    <section className="kr-why-section">
      <div className="kr-why-bg-dot dot-a"></div>
      <div className="kr-why-bg-dot dot-b"></div>
      <div className="kr-why-line line-a"></div>
      <div className="kr-why-line line-b"></div>

      <div className="kr-why-container">
        <div className="kr-why-left">
          <span className="kr-why-label">WHY KEYROUTES</span>

          <h2>
            We Don’t Just Market. <br />
            We Build <strong>Growth Systems.</strong>
          </h2>

          <p>
            KeyRoutes connects strategy, marketing and automation into one
            practical growth framework, helping businesses move faster with
            better clarity and stronger execution.
          </p>

          <div className="kr-why-stats">
            <div>
              <h3>360°</h3>
              <span>Growth Approach</span>
            </div>
            <div>
              <h3>24/7</h3>
              <span>Automation Support</span>
            </div>
            <div>
              <h3>100%</h3>
              <span>Performance Focus</span>
            </div>
          </div>
        </div>

        <div className="kr-why-right">
          {reasons.map((item, index) => (
            <div className="kr-why-card" key={index}>
              <div className="kr-why-icon">{item.icon}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyKeyRoutes;