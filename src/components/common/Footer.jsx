import { Link, useLocation } from "react-router-dom";
import Logo from "../illustrations/Logo";

const navigation = [
  ["Home", "/"],
  ["Colleges", "/colleges"],
  ["Courses", "/courses"],
  ["Exams", "/exams"],
  ["Scholarships", "/scholarships"],
  ["Compare", "/compare"],
];

const socialLinks = [
  ["Facebook", "https://www.facebook.com/", "f"],
  ["Instagram", "https://www.instagram.com/", "◎"],
  ["YouTube", "https://www.youtube.com/", "▶"],
  ["X", "https://x.com/", "𝕏"],
  ["LinkedIn", "https://www.linkedin.com/", "in"],
];

export default function Footer() {
  const isHome = useLocation().pathname === "/";

  return (
    <footer className="site-footer home-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-mark"><Logo size={38} /></span>
            <span className="footer-logo-text">
              <strong>Admission Saathi</strong>
              <small>Your journey. Your future.</small>
            </span>
          </Link>
          <p>Your trusted partner in finding the right college, course and career path.</p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          {navigation.map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}
        </div>

        <div className="footer-column">
          <h3>Student Resources</h3>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/saved-colleges">Saved Colleges</Link>
          <Link to="/my-applications">My Applications</Link>
          <Link to="/important-dates">Important Dates</Link>
        </div>

        <div className="footer-column footer-connect">
          <h3>Stay Connected</h3>
          <p>Guidance and updates for your higher education journey.</p>
          <div className="footer-social-links" aria-label="Social media links">
            {socialLinks.map(([label, href, glyph]) => (
              <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer">{glyph}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© 2025 Admission Saathi. All rights reserved.</div>
        <div className="footer-legal">
          {isHome && <Link to="/login">Login</Link>}
        </div>
      </div>
    </footer>
  );
}