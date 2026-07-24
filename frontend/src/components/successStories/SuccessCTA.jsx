import "../../styles/success-stories.css";

const SuccessCTA = () => {
  const whatsappMessage = encodeURIComponent(
    `Hi KeyRoutes,

I came across your Success Stories page and would like to discuss digital marketing for our real estate project.

We are interested in:
• Website Development
• SEO / GEO Optimization
• Google & Meta Ads
• CRM & WhatsApp Automation

Please contact me to schedule a consultation.

Thank you.`
  );

  return (
    <section className="kr-success-cta">
      <div className="kr-success-stories-container">
        <h2>
          Want Your Project to Become Our Next
          <strong> Success Story?</strong>
        </h2>

        <p>
          Whether you're launching a premium villa community, gated apartments,
          plotted development or commercial project, KeyRoutes can build a
          complete digital growth system including project websites, SEO, GEO,
          paid campaigns, CRM, analytics and automation.
        </p>

        <a
          href={`https://wa.me/918309436998?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book Free Consultation ›
        </a>
      </div>
    </section>
  );
};

export default SuccessCTA;