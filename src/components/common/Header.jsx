import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LineIcon from "../LineIcon";
import Logo from "../illustrations/Logo";
import Button from "./Button";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isActive = (path) => path === "/"
    ? isHome
    : pathname === path || pathname.startsWith(`${path}/`);

  const closeMenu = () => setMenuOpen(false);
  const navItems = [
    ["Home", "/"],
    ["Colleges", "/colleges"],
    ["Courses", "/courses"],
    ["Exams", "/exams"],
    ["Scholarships", "/scholarships"],
    ["Compare", "/compare"],
  ];

  return (
    <header className={`site-header site-header-global${isHome ? " home-header" : ""}`}>
      <Link to="/" className="site-brand" onClick={closeMenu} aria-label="Admission Saathi home">
        <span className="brand-mark"><Logo size={36} /></span>
        <span className="brand-text">
          <strong>Admission Saathi</strong>
          <small>Your journey. Your future.</small>
        </span>
      </Link>

      <nav className="site-nav" aria-label="Main navigation">
        {navItems.map(([label, path]) => (
          <Link key={path} to={path} aria-current={isActive(path) ? "page" : undefined}>
            {label}
          </Link>
        ))}
      </nav>

      <div className="auth-links">
        <Button to="/login" className="login-link" pill>
          <LineIcon name="user" size={16} /> Login
        </Button>
      </div>

      <button
        type="button"
        className={`mobile-menu-button ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen((previous) => !previous)}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="global-mobile-menu"
      >
        <span></span><span></span><span></span>
      </button>

      <nav id="global-mobile-menu" className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-label="Mobile navigation">
        {navItems.map(([label, path]) => (
          <Link
            key={path}
            to={path}
            onClick={closeMenu}
            aria-current={isActive(path) ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
        <div className="mobile-menu-divider"></div>
        <Link to="/login" className="mobile-login" onClick={closeMenu}>Login</Link>
      </nav>
    </header>
  );
}