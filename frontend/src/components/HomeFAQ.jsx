import { useState } from "react";
import "../styles/home-faq.css";

const faqs = [
  {
    q: "Do you work only with real estate businesses?",
    a: "Our primary focus is real estate projects such as apartments, villas, plots, layouts and builder launches. This helps us build stronger strategies for real estate lead generation and conversions.",
  },
  {
    q: "Can KeyRoutes develop project websites and landing pages?",
    a: "Yes. We develop SEO-ready project websites and conversion-focused landing pages with lead forms, WhatsApp CTA, tracking, location content and campaign integration.",
  },
  {
    q: "Do you handle Google Ads and Meta Ads?",
    a: "Yes. We plan, run and optimize Google Search, Performance Max, Facebook, Instagram and retargeting campaigns for real estate enquiries.",
  },
  {
    q: "Can you integrate CRM and WhatsApp automation?",
    a: "Yes. We connect websites, forms, Google Sheets, WhatsApp alerts, CRM status tracking and automated follow-ups to reduce missed leads.",
  },
  {
    q: "Do you provide SEO and GEO-based content?",
    a: "Yes. We structure pages with project keywords, location relevance, nearby landmarks, schema basics and search-friendly content to support Google visibility.",
  },
  {
    q: "How do we get started?",
    a: "You can book a free consultation. We will review your project, target audience, location, current campaigns and lead follow-up process.",
  },
];

const HomeFAQ = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className="kr-faq-section">
      <div className="kr-faq-container">
        <div className="kr-faq-head">
          <span>FAQS</span>
          <h2>
            Questions Builders Usually <strong>Ask Us</strong>
          </h2>
          <p>
            Clear answers about our real estate growth, website, campaign and
            automation services.
          </p>
        </div>

        <div className="kr-faq-list">
          {faqs.map((item, index) => (
            <div
              className={`kr-faq-item ${open === index ? "active" : ""}`}
              key={index}
            >
              <button onClick={() => setOpen(open === index ? null : index)}>
                {item.q}
                <span>{open === index ? "−" : "+"}</span>
              </button>

              <div className="kr-faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;