
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LineIcon from "./LineIcon";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isActive = (path) => path === "/"
    ? isHome
    : pathname === path || pathname.startsWith(`${path}/`);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`site-header${isHome ? " home-header" : ""}`}>
      <Link to="/" className="site-brand" onClick={closeMenu}>
        <span className="brand-mark"><LineIcon name="graduation" size={17} /><b>AS</b></span>

        <span className="brand-text">
          <strong>Admission Saathi</strong>
          <small>Your journey. Your future.</small>
        </span>
      </Link>

      <nav className="site-nav">
        <Link to="/" aria-current={isActive("/") ? "page" : undefined}>Home</Link>
        <Link to="/colleges" aria-current={isActive("/colleges") ? "page" : undefined}>Colleges</Link>
        <Link to="/courses" aria-current={isActive("/courses") ? "page" : undefined}>Courses</Link>
        <Link to="/exams" aria-current={isActive("/exams") ? "page" : undefined}>Exams</Link>
        <Link to="/scholarships" aria-current={isActive("/scholarships") ? "page" : undefined}>Scholarships</Link>
        <Link to="/compare" aria-current={isActive("/compare") ? "page" : undefined}>Compare</Link>
      </nav>

      <div className="auth-links">
        <Link to="/login" className="login-link">
          <LineIcon name="user" size={16} /> Login
        </Link>

        <Link to="/signup" className="signup-link">
          Sign Up <span>→</span>
        </Link>
      </div>

      <button
        type="button"
        className={`mobile-menu-button ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu} aria-current={isActive("/") ? "page" : undefined}>Home</Link>
        <Link to="/colleges" onClick={closeMenu} aria-current={isActive("/colleges") ? "page" : undefined}>
          Colleges
        </Link>

        <Link to="/courses" onClick={closeMenu} aria-current={isActive("/courses") ? "page" : undefined}>
          Courses
        </Link>

        <Link to="/exams" onClick={closeMenu} aria-current={isActive("/exams") ? "page" : undefined}>
          Exams
        </Link>

        <Link to="/scholarships" onClick={closeMenu} aria-current={isActive("/scholarships") ? "page" : undefined}>
          Scholarships
        </Link>

        <Link to="/compare" onClick={closeMenu} aria-current={isActive("/compare") ? "page" : undefined}>
          Compare
        </Link>

        <div className="mobile-menu-divider"></div>

        <Link to="/login" className="mobile-login" onClick={closeMenu}>
          Login
        </Link>

        <Link to="/signup" className="mobile-signup" onClick={closeMenu}>
          Sign Up <span>→</span>
        </Link>
      </div>
    </header>
  );
}
