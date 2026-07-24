import {
  FaChartLine,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";

const SuccessStoryHero = ({
  totalStories = 0,
  featuredStories = 0,
  totalClients = 0,
}) => {
  return (
    <section className="kr-success-stories-hero">
      <div className="kr-success-stories-hero-bg" />

      <div className="kr-success-stories-container">
        <div className="kr-success-stories-hero-content">
          <span className="kr-success-stories-eyebrow">
            CLIENT SUCCESS STORIES
          </span>

          <h1>
            Real Strategies.
            <br />
            <strong>Measurable Business Growth.</strong>
          </h1>

          <p>
            Explore how KeyRoutes helps businesses improve
            visibility, generate qualified enquiries, strengthen
            digital experiences, and build scalable growth systems
            through strategy, technology, marketing, CRM, and
            automation.
          </p>

          <div className="kr-success-stories-hero-stats">
            <div>
              <FaTrophy />

              <span>
                <strong>{totalStories}</strong>
                Success Stories
              </span>
            </div>

            <div>
              <FaChartLine />

              <span>
                <strong>{featuredStories}</strong>
                Featured Results
              </span>
            </div>

            <div>
              <FaUsers />

              <span>
                <strong>{totalClients}</strong>
                Clients Featured
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoryHero;