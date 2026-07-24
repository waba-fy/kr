import "../../styles/case-study-template.css";

const CaseStudyTemplate = ({ data }) => {
  return (
    <div className="cs-doc">
      {/* COVER */}
      <section className="cs-page cs-cover">
        <div>
          <h4>KEYROUTES</h4>
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
          <span>{data.category}</span>
        </div>

        <div className="cs-cover-card">
          <h3>{data.projectName}</h3>
          <p>{data.location}</p>
          <strong>{data.result}</strong>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="cs-page">
        <h5>PROJECT OVERVIEW</h5>
        <h2>{data.overviewTitle}</h2>
        <p>{data.overview}</p>

        <div className="cs-kpi-grid">
          {data.kpis.map((item, i) => (
            <div className="cs-kpi" key={i}>
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CHALLENGES */}
      <section className="cs-page cs-light">
        <h5>CHALLENGES</h5>
        <h2>Before KeyRoutes</h2>

        <div className="cs-card-grid">
          {data.challenges.map((item, i) => (
            <div className="cs-card" key={i}>
              <span>✕</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STRATEGY */}
      <section className="cs-page">
        <h5>KEYROUTES STRATEGY</h5>
        <h2>Digital Growth Framework</h2>

        <div className="cs-timeline">
          {data.strategy.map((item, i) => (
            <div className="cs-step" key={i}>
              <span>0{i + 1}</span>
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* SEO */}
      <section className="cs-page cs-dark">
        <h5>SEO + GEO</h5>
        <h2>Built for Google & AI Search</h2>

        <div className="cs-check-list">
          {data.seo.map((item, i) => (
            <p key={i}>✓ {item}</p>
          ))}
        </div>
      </section>

      {/* FUNNEL */}
      <section className="cs-page">
        <h5>CAMPAIGN FUNNEL</h5>
        <h2>From Visibility to Enquiries</h2>

        <div className="cs-flow">
          {data.funnel.map((item, i) => (
            <div className="cs-flow-item" key={i}>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* TECH */}
      <section className="cs-page cs-light">
        <h5>TECHNOLOGY STACK</h5>
        <h2>Tools Used</h2>

        <div className="cs-tags">
          {data.technologies.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cs-page cs-final">
        <h2>Ready to Build Your Success Story?</h2>
        <p>
          KeyRoutes helps real estate brands build growth systems with websites,
          SEO, GEO, campaigns, CRM and automation.
        </p>
        <strong>WhatsApp: 83094 36998</strong>
      </section>
    </div>
  );
};

export default CaseStudyTemplate;