import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="site-header">
      <Link to="/" className="site-brand">
        <strong>Admission Saathi</strong>
        <span>Your journey. Your future.</span>
      </Link>

      <Link to="/login" className="login-link">
        Login
      </Link>

      <nav className="site-nav">
        <Link to="/colleges">Colleges</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/exams">Exams</Link>
        <Link to="/scholarships">Scholarships</Link>
        <Link to="/compare">Compare</Link>
      </nav>
    </header>
  );
}