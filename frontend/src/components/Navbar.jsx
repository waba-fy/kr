import { useEffect, useRef, useState } from "react";
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

  const navbarRef = useRef(null);
  const mobileDrawerRef = useRef(null);

  const closeAll = () => {
    setActiveMega(null);
    setMobileOpen(false);
    setMobileLevel(null);
  };

  /*
  |--------------------------------------------------------------------------
  | Close desktop mega menu when clicking outside
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    const handleOutsidePointerDown = (event) => {
      if (!activeMega) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const clickedInsideNavbar =
        navbarRef.current?.contains(target);

      const clickedInsideMegaMenu =
        target.closest(".mega-wrapper");

      if (!clickedInsideNavbar && !clickedInsideMegaMenu) {
        setActiveMega(null);
      }
    };

    /*
     * Capture phase is important.
     * It runs before child components can stop propagation.
     */
    document.addEventListener(
      "pointerdown",
      handleOutsidePointerDown,
      true
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleOutsidePointerDown,
        true
      );
    };
  }, [activeMega]);

  /*
  |--------------------------------------------------------------------------
  | Escape key
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeAll();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Prevent page scrolling while mobile drawer is open
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    if (!mobileOpen) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [mobileOpen]);

  const handleDesktopMenuClick = (menuKey) => {
    setMobileOpen(false);
    setMobileLevel(null);

    setActiveMega((currentMenu) =>
      currentMenu === menuKey ? null : menuKey
    );
  };

  const handleMobileMenuOpen = () => {
    setActiveMega(null);
    setMobileLevel(null);
    setMobileOpen(true);
  };

  const handleConsultationClick = () => {
    closeAll();

    if (typeof onConsultationClick === "function") {
      onConsultationClick();
    }
  };

  const activeMobileMenu = mobileLevel
    ? menuData[mobileLevel]
    : null;

  return (
    <>
      <header
        ref={navbarRef}
        className="kr-navbar"
      >
        <div className="kr-navbar-inner">
          <NavLink
            to="/"
            className="kr-logo"
            onClick={closeAll}
            aria-label="Go to KeyRoutes homepage"
          >
            <img
              src="/key-routes-logo.png"
              alt="KeyRoutes"
            />
          </NavLink>

          <nav
            className="kr-nav-links"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => {
              const isOpen =
                activeMega === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  className={isOpen ? "active" : ""}
                  aria-expanded={isOpen}
                  aria-controls={`mega-menu-${item.key}`}
                  onClick={() =>
                    handleDesktopMenuClick(item.key)
                  }
                >
                  {item.label}

                  <span
                    className="kr-chevron"
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="kr-nav-actions">
            <a
              href="https://wa.me/918309436998"
              target="_blank"
              rel="noopener noreferrer"
              className="kr-whatsapp-btn"
              onClick={() => setActiveMega(null)}
            >
              +91 8309436998 ›
            </a>

            <button
              type="button"
              className="kr-book-btn"
              onClick={handleConsultationClick}
            >
              FREE Consultation ›
            </button>

            <a
              href="https://wa.me/918309436998"
              target="_blank"
              rel="noopener noreferrer"
              className="kr-mobile-call"
              onClick={closeAll}
            >
              +91 8309436998 ›
            </a>

            <button
              type="button"
              className="kr-mobile-btn"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="kr-mobile-navigation"
              onClick={handleMobileMenuOpen}
            >
              ☰
            </button>
          </div>
        </div>

        {activeMega && (
          <MegaMenu
            id={`mega-menu-${activeMega}`}
            type={activeMega}
            onItemClick={closeAll}
          />
        )}
      </header>

      <div
        className={`kr-mobile-overlay ${
          mobileOpen ? "active" : ""
        }`}
        aria-hidden="true"
        onClick={closeAll}
      />

      <aside
        ref={mobileDrawerRef}
        id="kr-mobile-navigation"
        className={`kr-mobile-drawer ${
          mobileOpen ? "active" : ""
        }`}
        aria-hidden={!mobileOpen}
        aria-label="Mobile navigation"
      >
        <div className="kr-mobile-head">
          <NavLink
            to="/"
            className="kr-logo"
            onClick={closeAll}
            aria-label="Go to KeyRoutes homepage"
          >
            <img
              src="/key-routes-logo.png"
              alt="KeyRoutes"
            />
          </NavLink>

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeAll}
          >
            ✕
          </button>
        </div>

        {!mobileLevel && (
          <>
            <div className="kr-mobile-highlight">
              <strong>
                Accelerate Your Growth
              </strong>

              <p>
                Strategy, marketing and automation built
                for business scale.
              </p>

              <a
                href="https://wa.me/918309436998"
                target="_blank"
                rel="noopener noreferrer"
                className="kr-mobile-whatsapp"
                onClick={closeAll}
              >
                WhatsApp: +91 8309436998 ›
              </a>

              <button
                type="button"
                className="kr-book-btn mobile"
                onClick={handleConsultationClick}
              >
                FREE Consultation ›
              </button>
            </div>

            <nav
              className="kr-mobile-main"
              aria-label="Mobile primary navigation"
            >
              {navItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() =>
                    setMobileLevel(item.key)
                  }
                >
                  {item.label}
                  <span aria-hidden="true">›</span>
                </button>
              ))}
            </nav>
          </>
        )}

        {mobileLevel && activeMobileMenu && (
          <div className="kr-mobile-subpanel">
            <button
              type="button"
              className="kr-mobile-back"
              onClick={() => setMobileLevel(null)}
            >
              ‹ Back
            </button>

            <h4>{activeMobileMenu.title}</h4>

            {activeMobileMenu.items.map(
              (item, index) => (
                <NavLink
                  key={`${item.title}-${index}`}
                  to={item.link}
                  onClick={closeAll}
                >
                  {item.title}
                  <span aria-hidden="true">›</span>
                </NavLink>
              )
            )}

            <div className="kr-mobile-cta">
              <strong>
                What's Your Growth Score?
              </strong>

              <p>
                Get quick strategic insights for your
                business.
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
    </>
  );
};

export default Navbar;