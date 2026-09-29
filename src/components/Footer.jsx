import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-mark">A+</span>

            <span className="footer-logo-text">
              <strong>Admission Saathi</strong>
              <small>Your journey. Your future.</small>
            </span>
          </Link>

          <p>
            Your trusted companion for discovering colleges,
            courses and admission opportunities.
          </p>
        </div>

        {/* Explore */}
        <div className="footer-column">
          <h3>Explore</h3>

          <Link to="/colleges">Colleges</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/exams">Entrance Exams</Link>
          <Link to="/scholarships">Scholarships</Link>
          <Link to="/compare">Compare Colleges</Link>
        </div>

        {/* Student */}
        <div className="footer-column">
          <h3>Student</h3>

          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">My Profile</Link>
          <Link to="/saved-colleges">Saved Colleges</Link>
          <Link to="/my-applications">My Applications</Link>
          <Link to="/important-dates">Important Dates</Link>
        </div>

        {/* Support */}
        <div className="footer-column">
          <h3>Support</h3>

          <Link to="/login">Login</Link>
          <Link to="/signup">Create Account</Link>
          <Link to="/forgot-password">Forgot Password</Link>

          <p className="footer-support-text">
            We're here to help you through your admission
            journey.
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div>
          © 2026 Admission Saathi. All rights reserved.
        </div>

        <div className="footer-legal">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}