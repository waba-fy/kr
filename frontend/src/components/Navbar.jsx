import { useState } from "react";
import { NavLink } from "react-router-dom";
import MegaMenu, { menuData } from "./MegaMenu";
import "../styles/navbar.css";

const navItems = [
  { key: "strategy", label: "Strategy" },
  { key: "services", label: "Services" },
  { key: "products", label: "Products" },
  { key: "about", label: "About" },
  { key: "careers", label: "Careers" },
];

const Navbar = ({ onConsultationClick }) => {
  const [activeMega, setActiveMega] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileLevel, setMobileLevel] = useState(null);

  const closeAll = () => {
    setActiveMega(null);
    setMobileOpen(false);
    setMobileLevel(null);
  };

  return (
    <header className="kr-navbar">
      <div className="kr-navbar-inner">
        <NavLink to="/" className="kr-logo" onClick={closeAll}>
          <img src="/key-routes-logo.png" alt="KeyRoutes" />
        </NavLink>

        <nav className="kr-nav-links">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={activeMega === item.key ? "active" : ""}
              onClick={() =>
                setActiveMega(activeMega === item.key ? null : item.key)
              }
            >
              {item.label}
              <span className="kr-chevron">▾</span>
            </button>
          ))}
        </nav>

        <div className="kr-nav-actions">

          <a
            href="https://wa.me/918309436998"
            target="_blank"
            rel="noreferrer"
            className="kr-whatsapp-btn"
          >
            +91 8309436998 ›
          </a>

          <button
            type="button"
            className="kr-book-btn"
            onClick={onConsultationClick}
          >
            FREE Consultation ›
          </button>

          <a
            href="https://wa.me/918309436998"
            target="_blank"
            rel="noreferrer"
            className="kr-mobile-call"
          >
            +91 8309436998 ›
          </a>

          <button
            type="button"
            className="kr-mobile-btn"
            onClick={() => {
              setMobileOpen(true);
              setMobileLevel(null);
            }}
          >
            ☰
          </button>
        </div>
      </div>

      {activeMega && (
        <MegaMenu
          type={activeMega}
          onItemClick={() => setActiveMega(null)}
        />
      )}

      <div
        className={`kr-mobile-overlay ${mobileOpen ? "active" : ""}`}
        onClick={closeAll}
      />

      <aside className={`kr-mobile-drawer ${mobileOpen ? "active" : ""}`}>
        <div className="kr-mobile-head">
          <NavLink to="/" className="kr-logo" onClick={closeAll}>
            <span>K</span>EYROUTES
          </NavLink>

          <button type="button" onClick={closeAll}>
            ✕
          </button>
        </div>

        {!mobileLevel && (
          <>
            <div className="kr-mobile-highlight">
              <strong>Accelerate Your Growth</strong>

              <p>
                Strategy, marketing and automation built for business scale.
              </p>

              <a
                href="https://wa.me/918309436998"
                target="_blank"
                rel="noreferrer"
                className="kr-mobile-whatsapp"
                onClick={closeAll}
              >
                WhatsApp: +91 8309436998 ›
              </a>

              <button
                type="button"
                className="kr-book-btn mobile"
                onClick={() => {
                  closeAll();
                  onConsultationClick();
                }}
              >
                FREE Consultation ›
              </button>
            </div>

            <nav className="kr-mobile-main">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setMobileLevel(item.key)}
                >
                  {item.label}
                  <span>›</span>
                </button>
              ))}
            </nav>
          </>
        )}

        {mobileLevel && (
          <div className="kr-mobile-subpanel">
            <button
              type="button"
              className="kr-mobile-back"
              onClick={() => setMobileLevel(null)}
            >
              ‹ {menuData[mobileLevel].title}
            </button>

            <h4>{menuData[mobileLevel].title}</h4>

            {menuData[mobileLevel].items.map((item, index) => (
              <NavLink
                key={index}
                to={item.link}
                onClick={closeAll}
              >
                {item.title}
                <span>›</span>
              </NavLink>
            ))}

            <div className="kr-mobile-cta">
              <strong>What's Your Growth Score?</strong>

              <p>
                Get quick strategic insights for your business.
              </p>

              <NavLink
                to="/strategy-assessment"
                onClick={closeAll}
              >
                Start Assessment
              </NavLink>
            </div>
          </div>
        )}
      </aside>
    </header>
  );
};

export default Navbar;