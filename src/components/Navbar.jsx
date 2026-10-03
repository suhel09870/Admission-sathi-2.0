import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="site-header">
      <Link to="/" className="site-brand">
        <span className="brand-mark">A+S</span>

        <span className="brand-text">
          <strong>Admission Saathi</strong>
          <small>Your journey. Your future.</small>
        </span>
      </Link>

      <nav className="site-nav">
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
    </header>
  );
}