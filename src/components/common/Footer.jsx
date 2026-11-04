
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../illustrations/Logo";

const navigation = [
  ["Home", "/"],
  ["Colleges", "/colleges"],
  ["Courses", "/courses"],
  ["Exams", "/exams"],
  ["Scholarships", "/scholarships"],
  ["Compare", "/compare"],
];

const resources = [
  ["Dashboard", "/dashboard"],
  ["Saved Colleges", "/saved-colleges"],
  ["My Applications", "/my-applications"],
  ["Important Dates", "/important-dates"],
];

const socialLinks = [
  ["Facebook", "https://www.facebook.com/", "f"],
  ["Instagram", "https://www.instagram.com/", "◎"],
  ["YouTube", "https://www.youtube.com/", "▶"],
  ["X", "https://x.com/", "𝕏"],
  ["LinkedIn", "https://www.linkedin.com/", "in"],
];

export default function Footer() {
  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  return (
    <footer className="site-footer home-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-mark">
              <Logo size={48} variant="light" />
            </span>
            <span className="footer-logo-text">
              <strong>Admission</strong>
              <span>Saathi</span>
            </span>
          </Link>

          <p>
            Your trusted partner in finding the right college, course and
            career path.
          </p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          {navigation.map(([label, path]) => (
            <Link key={path} to={path}>
              {label}
            </Link>
          ))}
        </div>

        <div className="footer-column">
          <h3>Student Resources</h3>
          {resources.map(([label, path]) => (
            <Link key={path} to={path}>
              {label}
            </Link>
          ))}
        </div>

        <div className="footer-column footer-connect">
          <h3>Stay Connected</h3>
          <p>Guidance and updates for your higher education journey.</p>

          <div className="footer-social-links" aria-label="Social media links">
            {socialLinks.map(([label, href, glyph]) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
              >
                {glyph}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-column footer-subscribe">
          <h3>Subscribe for Updates</h3>
          <p>Get the latest admission news and helpful reminders.</p>

          <form
            className="footer-subscribe-form"
            onSubmit={(event) => {
              event.preventDefault();
              setSubscriptionMessage(
                "Email subscriptions are not configured yet. You can create an account to manage your admission journey."
              );
            }}
          >
            <label
              className="visually-hidden"
              htmlFor="footer-subscribe-email"
            >
              Email address
            </label>

            <input
              id="footer-subscribe-email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
            />

            <button type="submit">Subscribe</button>
          </form>

          {subscriptionMessage && (
            <p className="footer-subscribe-message" role="status">
              {subscriptionMessage} <Link to="/signup">Create an account</Link>
            </p>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          © {new Date().getFullYear()} Admission Saathi. All rights reserved.
        </div>

        <div className="footer-legal">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </footer>
  );
}
