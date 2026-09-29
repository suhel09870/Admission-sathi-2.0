import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            A+
          </Link>

          <div>
            <strong>Admission Saathi</strong>

            <p>
              Your journey. Your future.
            </p>
          </div>

          <span>
            Your trusted companion for discovering
            colleges, courses and admission opportunities.
          </span>
        </div>


        {/* Explore */}
        <div className="footer-column">
          <h3>Explore</h3>

          <Link to="/colleges">
            Colleges
          </Link>

          <Link to="/courses">
            Courses
          </Link>

          <Link to="/exams">
            Exams
          </Link>

          <Link to="/scholarships">
            Scholarships
          </Link>

          <Link to="/compare">
            Compare Colleges
          </Link>
        </div>


        {/* Student */}
        <div className="footer-column">
          <h3>Student</h3>

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/profile">
            My Profile
          </Link>

          <Link to="/saved-colleges">
            Saved Colleges
          </Link>

          <Link to="/my-applications">
            My Applications
          </Link>

          <Link to="/important-dates">
            Important Dates
          </Link>
        </div>


        {/* Support */}
        <div className="footer-column">
          <h3>Support</h3>

          <Link to="/login">
            Login
          </Link>

          <Link to="/signup">
            Create Account
          </Link>

          <a href="mailto:support@admissionsaathi.org">
            Contact Support
          </a>

          <span>
            We're here to help you
            through your admission journey.
          </span>
        </div>

      </div>


      {/* Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">

          <span>
            © {new Date().getFullYear()} Admission Saathi.
            All rights reserved.
          </span>

          <div className="footer-legal">
            <span>
              Privacy Policy
            </span>

            <span>
              Terms of Use
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}