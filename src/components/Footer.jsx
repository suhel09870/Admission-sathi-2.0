import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logo from "./illustrations/Logo";

export default function Footer() {
  const isHome = useLocation().pathname === "/";

  return (
    <footer className={`site-footer${isHome ? " home-footer" : ""}`}>
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-mark"><Logo size={36} /></span>

            <span className="footer-logo-text">
              <strong>Admission Saathi</strong>
              <small>Your journey. Your future.</small>
            </span>
          </Link>

          <p>
            {isHome
              ? "Your trusted partner in finding the right college, course and career path."
              : "Your trusted companion for discovering colleges, courses and admission opportunities."}
          </p>
        </div>

        {isHome ? (
          <>
            <div className="footer-column">
              <h3>Quick Links</h3>
              <Link to="/">Home</Link>
              <Link to="/colleges">Colleges</Link>
              <Link to="/courses">Courses</Link>
              <Link to="/exams">Exams</Link>
              <Link to="/scholarships">Scholarships</Link>
              <Link to="/compare">Compare</Link>
            </div>
            <div className="footer-column">
              <h3>Resources</h3>
              <span>Blog</span>
              <span>Help Center</span>
              <span>FAQs</span>
              <span>Contact Us</span>
            </div>
            <div className="footer-column footer-connect">
              <h3>Stay Connected</h3>
              <p>Guidance and updates for your higher education journey.</p>
              <div className="footer-social-links" aria-label="Social media links">
                <a href="https://www.facebook.com/" aria-label="Facebook" target="_blank" rel="noreferrer">f</a>
                <a href="https://www.instagram.com/" aria-label="Instagram" target="_blank" rel="noreferrer">◎</a>
                <a href="https://www.youtube.com/" aria-label="YouTube" target="_blank" rel="noreferrer">▶</a>
                <a href="https://x.com/" aria-label="X" target="_blank" rel="noreferrer">𝕏</a>
                <a href="https://www.linkedin.com/" aria-label="LinkedIn" target="_blank" rel="noreferrer">in</a>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="footer-column">
              <h3>Explore</h3>
              <Link to="/colleges">Colleges</Link>
              <Link to="/courses">Courses</Link>
              <Link to="/exams">Entrance Exams</Link>
              <Link to="/scholarships">Scholarships</Link>
              <Link to="/compare">Compare Colleges</Link>
            </div>
            <div className="footer-column">
              <h3>Student</h3>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/profile">My Profile</Link>
              <Link to="/saved-colleges">Saved Colleges</Link>
              <Link to="/my-applications">My Applications</Link>
              <Link to="/important-dates">Important Dates</Link>
            </div>
            <div className="footer-column">
              <h3>Support</h3>
              <Link to="/login">Login</Link>
              <Link to="/signup">Create Account</Link>
              <Link to="/forgot-password">Forgot Password</Link>
              <p className="footer-support-text">We're here to help you through your admission journey.</p>
            </div>
          </>
        )}

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div>
          © 2025 Admission Saathi. All rights reserved.
        </div>

        <div className="footer-legal">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}