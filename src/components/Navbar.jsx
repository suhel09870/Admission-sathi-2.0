import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="site-header">
      {/* BRAND */}
      <Link to="/" className="site-brand">
        <span className="brand-logo">
          <span className="brand-a">A</span>
          <span className="brand-plus">+</span>
          <span className="brand-s">S</span>
        </span>

        <span className="brand-copy">
          <strong>Admission Saathi</strong>
          <span>Your journey. Your future.</span>
        </span>
      </Link>

      {/* CENTER NAV */}
      <nav className="site-nav">
        <Link to="/colleges">Colleges</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/exams">Exams</Link>
        <Link to="/scholarships">Scholarships</Link>
        <Link to="/compare">Compare</Link>
      </nav>

      {/* AUTH */}
      <div className="header-auth">
        <Link to="/login" className="login-link">
          Login
        </Link>

        <Link to="/signup" className="signup-link">
          Sign Up <span>→</span>
        </Link>
      </div>
    </header>
  );
}