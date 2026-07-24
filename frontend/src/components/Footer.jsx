import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaWhatsapp,
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

import hyderabadImage from "../assets/hyderabad.png";
import londonImage from "../assets/london-uk.png";
import googlePartnerImage from "../assets/google-partner-key-routes.png";
import msmeImage from "../assets/msme-telagana-key-routes.png";
import metaPartnerImage from "../assets/meta-partner.png";
import whatsappPartnerImage from "../assets/whatsapp-solution-partner.png";
import ReportProblemModal from "./common/ReportProblemModal";

import "../styles/footer.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

  

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState({
    type: "",
    message: "",
  });
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [isProblemModalOpen, setIsProblemModalOpen] = useState(false);
  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();

    const email = newsletterEmail.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!email) {
      setNewsletterStatus({
        type: "error",
        message: "Please enter your email address.",
      });
      return;
    }

    if (!emailPattern.test(email)) {
      setNewsletterStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    try {
      setNewsletterLoading(true);
      setNewsletterStatus({
        type: "",
        message: "",
      });

      const response = await fetch(
        `${API_BASE_URL}/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            pageUrl: window.location.href,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to complete your subscription."
        );
      }

      setNewsletterStatus({
        type: "success",
        message:
          result.message ||
          "Thank you for subscribing to the KeyRoutes newsletter.",
      });

      setNewsletterEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);

      setNewsletterStatus({
        type: "error",
        message:
          error.message ||
          "Unable to subscribe right now. Please try again.",
      });
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <footer className="kr-footer">
      <div className="kr-footer-shell">
        <div className="kr-footer-head">
          <Link to="/" className="kr-footer-logo" aria-label="KeyRoutes home">
            <img src="/key-routes-logo.png" alt="KeyRoutes" />
          </Link>

          <p>Growth Starts With The Right Route</p>
        </div>

        <div className="kr-footer-nav-grid">
          <div className="kr-footer-card">
            <h4>Strategy</h4>

            <Link to="/strategy-consulting#brand-strategy">
              01 Brand Strategy
            </Link>

            <Link to="/strategy-consulting#digital-strategy">
              02 Digital Strategy
            </Link>

            <Link to="/strategy-consulting#marketing-sales">
              03 Marketing &amp; Sales
            </Link>
          </div>

          <div className="kr-footer-card">
            <h4>Services</h4>

            <Link to="/supporting-services#market-research-audits">
              01 Market Research
            </Link>

            <Link to="/supporting-services#seo-geo-performance">
              02 SEO, GEO &amp; PPC
            </Link>

            <Link to="/supporting-services#website-crm-automation">
              03 Websites &amp; Automation
            </Link>
          </div>

          <div className="kr-footer-card">
            <h4>Products</h4>

            <Link to="/product-solutions#whatsapp-business-api">
              01 WhatsApp API
            </Link>

            <Link to="/product-solutions#email-marketing">
              02 Email Marketing
            </Link>

            <Link to="/product-solutions#ivr-voice">
              03 IVR &amp; Toll-Free
            </Link>
          </div>

          <div className="kr-footer-card">
  <h4>Company</h4>

  <Link to="/terms">
    01 Terms &amp; Conditions
  </Link>

  <Link to="/privacy-policy">
    02 Privacy Policy
  </Link>

  <Link to="/cookies-policy">
    03 Cookies Policy
  </Link>
</div>

          <div className="kr-footer-card">
  <h4>Resources</h4>

  <Link to="/success-stories">
    01 Case Studies
  </Link>

  <Link to="/market-reports">
    02 Marketing Reports
  </Link>

  <Link to="/reviews-feedback">
    03 Reviews &amp; Feedback
  </Link>
</div>
        </div>

        <div className="kr-footer-info-grid">
          <div className="kr-footer-panel kr-footer-offices">
            <h4>Our Offices</h4>

            <div className="kr-footer-office-row">
              <div className="kr-footer-office">
                <div className="kr-footer-office-content">
                  <div className="kr-footer-office-text">
                    <strong>India</strong>

                    <p>24-202/1/B, Shamshabad HQ</p>
                    <p>Hyderabad, Ranga Reddy District</p>
                    <p>Telangana, India - 501218</p>

                    <a
                      href="https://wa.me/918309436998"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="kr-footer-office-whatsapp"
                    >
                      <FaWhatsapp />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>

                  <div className="kr-footer-office-photo">
                    <img
                      src={hyderabadImage}
                      alt="KeyRoutes Hyderabad office"
                      className="kr-footer-office-image"
                    />
                  </div>
                </div>
              </div>

              <div className="kr-footer-office">
                <div className="kr-footer-office-content">
                  <div className="kr-footer-office-text">
                    <strong>United Kingdom</strong>

                    <p>34 St Agathas Road</p>
                    <p>Coventry, West Midlands</p>
                    <p>CV2 4DX, United Kingdom</p>

                    <a
                      href="https://wa.me/447394734343"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="kr-footer-office-whatsapp"
                    >
                      <FaWhatsapp />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>

                  <div className="kr-footer-office-photo">
                    <img
                      src={londonImage}
                      alt="KeyRoutes United Kingdom office"
                      className="kr-footer-office-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="kr-footer-panel kr-footer-connect">
            <h4>Start a Conversation</h4>

            
            <div className="kr-footer-newsletter">
             <p>
                Stay updated with our latest products, services and business
                insights.
              </p>

              <form
                className="kr-footer-newsletter-form"
                onSubmit={handleNewsletterSubmit}
                noValidate
              >
                <label
                  htmlFor="footer-newsletter-email"
                  className="kr-footer-sr-only"
                >
                  Email address
                </label>

                <div className="kr-footer-newsletter-control">
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    value={newsletterEmail}
                    onChange={(event) => {
                      setNewsletterEmail(event.target.value);

                      if (newsletterStatus.message) {
                        setNewsletterStatus({
                          type: "",
                          message: "",
                        });
                      }
                    }}
                    placeholder="Enter your email address"
                    autoComplete="email"
                    disabled={newsletterLoading}
                  />

                  <button
                    type="submit"
                    disabled={newsletterLoading}
                  >
                    {newsletterLoading ? "Subscribing..." : "Subscribe"}
                  </button>
                </div>

                {newsletterStatus.message && (
                  <div
                    className={`kr-footer-newsletter-message ${
                      newsletterStatus.type === "success"
                        ? "is-success"
                        : "is-error"
                    }`}
                    role={
                      newsletterStatus.type === "error"
                        ? "alert"
                        : "status"
                    }
                    aria-live="polite"
                  >
                    {newsletterStatus.message}
                  </div>
                )}
              </form>

              <small className="kr-footer-newsletter-note">
                No spam. You can unsubscribe at any time.
              </small>
            </div>

            <div className="kr-footer-social">
              <a
                href="https://www.linkedin.com/company/keyroutes"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://www.instagram.com/keyroutes.co"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.facebook.com/keyroutes"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.youtube.com/@KeyRoutes"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="kr-footer-trust">
          <p>Trusted • Verified • Certified</p>

          <div className="kr-footer-certifications">
            <img
              src={msmeImage}
              alt="MSME registered"
            />

            <img
              src={googlePartnerImage}
              alt="Google Partner"
            />

            <img
              src={metaPartnerImage}
              alt="Meta Partner"
            />

            <img
              src={whatsappPartnerImage}
              alt="WhatsApp Solution Partner"
            />
          </div>
        </div>

       <div className="kr-footer-bottom">
  <p>
    © {new Date().getFullYear()} KeyRoutes. All rights
    reserved.
  </p>

  <button
    type="button"
    className="kr-footer-report-problem"
    onClick={() => setIsProblemModalOpen(true)}
  >
    Report a Problem
  </button>

  <p>A Product by Sixedge Innovations</p>
</div>
      </div>

      <ReportProblemModal
  isOpen={isProblemModalOpen}
  onClose={() => setIsProblemModalOpen(false)}
/>
    </footer>
  );
};

export default Footer;