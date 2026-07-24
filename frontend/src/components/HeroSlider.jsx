import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/hero-slider.css";

const slides = [
  {
    tag: "STRATEGY CONSULTING",
    title: "Unlock Business Growth With Winning Strategies.",
    highlight: "Business Growth",
    desc: "We help startups and growing businesses build clear strategies, improve market positioning, and scale with confidence.",
    primary: "Get FREE Consultation",
    secondary: "Explore Strategy",
    link: "/strategy",
  },
  {
    tag: "DIGITAL MARKETING",
    title: "Accelerate Digital Success With Smarter Campaigns.",
    highlight: "Digital Success",
    desc: "We build SEO, PPC, social media and analytics systems that help brands grow faster with measurable results.",
    primary: "View Services",
    secondary: "Talk to Expert",
    link: "/services",
  },
  {
    tag: "BUSINESS AUTOMATION",
    title: "Automate Customer Engagement With Powerful Tools.",
    highlight: "Customer Engagement",
    desc: "Use WhatsApp API, CRM, Google Sheet, IVR and email automation to improve response time and business efficiency.",
    primary: "Explore Products",
    secondary: "Request Demo",
    link: "/products",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const renderTitle = () => {
    const parts = slide.title.split(slide.highlight);

    return (
      <>
        {parts[0]}
        <span>{slide.highlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="kr-hero">
      <div className="kr-hero-network"></div>

      <div className="kr-hero-shape pyramid">
        <span></span>
      </div>

      <div className="kr-arrow-growth"></div>

      <div className="kr-mini-shape triangle-one"></div>
      <div className="kr-mini-shape triangle-two"></div>
      <div className="kr-mini-shape triangle-three"></div>
      <div className="kr-mini-dots dots-one"></div>
      <div className="kr-mini-dots dots-two"></div>

      <div className="kr-bottom-wave black-wave"></div>
      <div className="kr-bottom-wave red-wave"></div>

      <div className="kr-hero-content">
        <div className="kr-hero-text">
          <div className="kr-hero-tag">
            <span>▥</span>
            {slide.tag}
          </div>

          <h1>{renderTitle()}</h1>

          <p className="kr-hero-desc">{slide.desc}</p>

          <div className="kr-hero-actions">
            <Link to={slide.link} className="kr-hero-primary">
              {slide.primary}
              <span>›</span>
            </Link>

            <a
              href="https://wa.me/918309436998"
              target="_blank"
              rel="noreferrer"
              className="kr-hero-secondary"
            >
              {slide.secondary}
              <span>›</span>
            </a>
          </div>
        </div>
      </div>

      <div className="kr-hero-dots">
        <span className="dot-line"></span>
        {slides.map((_, index) => (
          <button
            key={index}
            className={current === index ? "active" : ""}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
        <span className="dot-line"></span>
      </div>
    </section>
  );
};

export default HeroSlider;