import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    {
      icon: "🏫",
      title: "Find Colleges",
      text: "Explore colleges and universities across India.",
      link: "/colleges",
    },
    {
      icon: "📚",
      title: "Explore Courses",
      text: "Discover courses and understand your career options.",
      link: "/courses",
    },
    {
      icon: "⚖️",
      title: "Compare Colleges",
      text: "Compare colleges on the factors that matter to you.",
      link: "/compare",
    },
    {
      icon: "🎯",
      title: "College Predictor",
      text: "Explore possible college options based on your profile.",
      link: "/predictor",
    },
    {
      icon: "📝",
      title: "Entrance Exams",
      text: "Discover entrance exams and important admission information.",
      link: "/exams",
    },
    {
      icon: "🎓",
      title: "Scholarships",
      text: "Explore scholarship opportunities for students.",
      link: "/scholarships",
    },
    {
      icon: "🤖",
      title: "AI Admission Saathi",
      text: "Get personalized guidance throughout your admission journey.",
      link: "/ai",
    },
    {
      icon: "🔔",
      title: "Admission Alerts",
      text: "Stay updated with important admission announcements.",
      link: "/alerts",
    },
  ];

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span>✦</span>
            Your smarter admission journey
          </div>

          <h1>
            Find the right
            <span> college.</span>
            <br />
            Build your future.
          </h1>

          <p className="hero-description">
            Discover colleges, courses, entrance exams, scholarships and
            admission opportunities — all in one simple place.
          </p>

          <div className="hero-search">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search colleges, courses or exams..."
            />

            <button>Search</button>
          </div>

          <div className="hero-actions">
            <Link to="/colleges">Explore Colleges →</Link>
            <Link to="/compare">Compare Colleges</Link>
            <Link to="/predictor">College Predictor</Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-orbit orbit-one"></div>
          <div className="hero-orbit orbit-two"></div>

          <div className="hero-main-card">
            <div className="hero-card-top">
              <span>ADMISSION SAATHI</span>
              <span>2026</span>
            </div>

            <div className="hero-card-icon">🎓</div>

            <h3>Your college journey starts here.</h3>

            <p>Search. Compare. Discover. Decide.</p>
          </div>

          <div className="hero-floating-card floating-top">
            <strong>10K+</strong>
            <span>Colleges</span>
          </div>

          <div className="hero-floating-card floating-bottom">
            <strong>500+</strong>
            <span>Courses</span>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div>
          <strong>College discovery</strong>
          <span>Explore opportunities across India</span>
        </div>

        <div>
          <strong>Smart comparison</strong>
          <span>Make informed decisions</span>
        </div>

        <div>
          <strong>Admission guidance</strong>
          <span>Get help at every step</span>
        </div>
      </section>

      <section className="explore-section">
        <div className="section-heading">
          <span>EXPLORE ADMISSION SAATHI</span>

          <h2>
            Everything you need,
            <br />
            in one place.
          </h2>

          <p>
            From discovering a college to planning your admission journey,
            find the tools you need without the confusion.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <Link
              to={feature.link}
              className="feature-card"
              key={feature.title}
            >
              <div className="feature-icon">{feature.icon}</div>

              <h3>{feature.title}</h3>

              <p>{feature.text}</p>

              <span className="feature-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}