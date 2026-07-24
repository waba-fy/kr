import {
  FaSearch,
  FaLightbulb,
  FaDraftingCompass,
  FaRocket,
  FaChartLine,
  FaSyncAlt,
} from "react-icons/fa";
import "../styles/process-timeline.css";

const processSteps = [
  {
    number: "01",
    icon: <FaSearch />,
    title: "Discover",
    desc: "We understand your business, audience, goals, current challenges and growth opportunities.",
  },
  {
    number: "02",
    icon: <FaLightbulb />,
    title: "Research",
    desc: "We study your market, competitors, customer journey and existing digital performance.",
  },
  {
    number: "03",
    icon: <FaDraftingCompass />,
    title: "Plan",
    desc: "We create a clear roadmap covering strategy, campaigns, systems, automation and tracking.",
  },
  {
    number: "04",
    icon: <FaRocket />,
    title: "Execute",
    desc: "We launch campaigns, build assets, connect tools and activate growth systems.",
  },
  {
    number: "05",
    icon: <FaChartLine />,
    title: "Measure",
    desc: "We track leads, performance, conversions, user behaviour and return on investment.",
  },
  {
    number: "06",
    icon: <FaSyncAlt />,
    title: "Scale",
    desc: "We refine what works, improve weak areas and scale the system for long-term growth.",
  },
];

const ProcessTimeline = () => {
  return (
    <section className="kr-process-section">
      <div className="kr-process-dots"></div>
      <div className="kr-process-glow glow-one"></div>
      <div className="kr-process-glow glow-two"></div>

      <div className="kr-process-container">
        <div className="kr-process-head">
          <span>OUR PROCESS</span>
          <h2>
            A Clear Growth Process From <strong>Idea to Scale</strong>
          </h2>
          <p>
            We follow a practical step-by-step approach that connects strategy,
            execution, automation and reporting into one growth system.
          </p>
        </div>

        <div className="kr-process-timeline">
          {processSteps.map((step, index) => (
            <div className="kr-process-step" key={index}>
              <div className="kr-process-marker">
                <span>{step.number}</span>
              </div>

              <div className="kr-process-card">
                <div className="kr-process-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;