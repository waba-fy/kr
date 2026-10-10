import { NavLink } from "react-router-dom";
import {
  FaEnvelope,
  FaExclamationTriangle,
  FaExternalLinkAlt,
} from "react-icons/fa";

const LEGAL_PAGES = [
  {
    label: "Terms & Conditions",
    path: "/terms",
  },
  {
    label: "Privacy Policy",
    path: "/privacy-policy",
  },
  {
    label: "Cookies Policy",
    path: "/cookies-policy",
  },
];

const LegalLayout = ({
  eyebrow = "KEYROUTES LEGAL",
  title,
  description,
  effectiveDate = "24 July 2026",
  updatedDate = "24 July 2026",
  children,
  onReportProblem,
}) => {
  return (
    <main className="kr-legal-page">
      {/* ==========================================
          HERO
      ========================================== */}

      <header className="kr-legal-hero">
        <div className="kr-legal-container">
          <span className="kr-legal-eyebrow">
            {eyebrow}
          </span>

          <h1>{title}</h1>

          {description && (
            <p className="kr-legal-hero-description">
              {description}
            </p>
          )}

          <div className="kr-legal-dates">
            <span>
              <strong>Effective:</strong>{" "}
              {effectiveDate}
            </span>

            <span>
              <strong>Last updated:</strong>{" "}
              {updatedDate}
            </span>
          </div>
        </div>
      </header>

      {/* ==========================================
          CONTENT LAYOUT
      ========================================== */}

      <div className="kr-legal-container kr-legal-layout">
        {/* ========================================
            STICKY LEFT SIDEBAR
        ======================================== */}

        <aside
          className="kr-legal-sidebar"
          aria-label="Legal navigation"
        >
          <div className="kr-legal-sidebar-inner">
            <span className="kr-legal-sidebar-label">
              LEGAL DOCUMENTS
            </span>

            <nav aria-label="Legal pages">
              {LEGAL_PAGES.map((page) => (
                <NavLink
                  key={page.path}
                  to={page.path}
                  className={({ isActive }) =>
                    isActive
                      ? "kr-legal-nav-link is-active"
                      : "kr-legal-nav-link"
                  }
                >
                  <span>{page.label}</span>

                  <FaExternalLinkAlt
                    aria-hidden="true"
                  />
                </NavLink>
              ))}
            </nav>

            {/* ====================================
                SIDEBAR HELP
            ==================================== */}

            <div className="kr-legal-sidebar-help">
              <FaExclamationTriangle
                aria-hidden="true"
              />

              <strong>
                Need assistance?
              </strong>

              <p>
                Report a privacy, content, data,
                accessibility, security or website
                concern.
              </p>

              {typeof onReportProblem ===
                "function" && (
                <button
                  type="button"
                  onClick={onReportProblem}
                >
                  Report a Problem
                </button>
              )}

              <a href="mailto:hello@keyroutes.co">
                <FaEnvelope aria-hidden="true" />

                <span>
                  hello@keyroutes.co
                </span>
              </a>
            </div>
          </div>
        </aside>

        {/* ========================================
            RIGHT LEGAL CONTENT
        ======================================== */}

        <article className="kr-legal-content">
          {children}

          {/* ======================================
              SUPPORT CARD
          ====================================== */}

          <section className="kr-legal-support-card">
            <div className="kr-legal-support-icon">
              <FaExclamationTriangle
                aria-hidden="true"
              />
            </div>

            <div>
              <span className="kr-legal-section-label">
                QUESTIONS, REQUESTS OR CONCERNS
              </span>

              <h2>
                Report a legal or website issue
              </h2>

              <p>
                Contact us to request access,
                correction or deletion of personal
                data, withdraw consent, report
                inaccurate content, or raise a
                privacy, cookie, security,
                accessibility, copyright or
                technical concern.
              </p>

              <div className="kr-legal-support-actions">
                {typeof onReportProblem ===
                  "function" && (
                  <button
                    type="button"
                    onClick={onReportProblem}
                  >
                    Report a Problem
                  </button>
                )}

                <a href="mailto:hello@keyroutes.co">
                  <FaEnvelope aria-hidden="true" />

                  <span>
                    hello@keyroutes.co
                  </span>
                </a>
              </div>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
};

export default LegalLayout;