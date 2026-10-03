
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = useLocation().pathname === "/";

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`site-header${isHome ? " home-header" : ""}`}>
      <Link to="/" className="site-brand" onClick={closeMenu}>
        <span className="brand-mark">A+S</span>

        <span className="brand-text">
          <strong>Admission Saathi</strong>
          <small>Your journey. Your future.</small>
        </span>
      </Link>

      <nav className="site-nav">
        {isHome && <Link to="/" aria-current="page">Home</Link>}
        <Link to="/colleges">Colleges</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/exams">Exams</Link>
        <Link to="/scholarships">Scholarships</Link>
        <Link to="/compare">Compare</Link>
      </nav>

      <div className="auth-links">
        <Link to="/login" className="login-link">
          Login
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
        {isHome && <Link to="/" onClick={closeMenu}>Home</Link>}
        <Link to="/colleges" onClick={closeMenu}>
          Colleges
        </Link>

        <Link to="/courses" onClick={closeMenu}>
          Courses
        </Link>

        <Link to="/exams" onClick={closeMenu}>
          Exams
        </Link>

        <Link to="/scholarships" onClick={closeMenu}>
          Scholarships
        </Link>

        <Link to="/compare" onClick={closeMenu}>
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
