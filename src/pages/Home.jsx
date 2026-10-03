
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [location, setLocation] = useState("");

  const features = [
    {
      icon: "▦",
      title: "Colleges",
      text: "Explore top colleges, compare and find your best fit.",
      link: "/colleges",
      color: "green",
    },
    {
      icon: "▤",
      title: "Courses",
      text: "Discover courses, check eligibility and duration.",
      link: "/courses",
      color: "blue",
    },
    {
      icon: "◷",
      title: "Exams",
      text: "Stay updated with exam dates, patterns and notifications.",
      link: "/exams",
      color: "orange",
    },
    {
      icon: "✧",
      title: "Scholarships",
      text: "Find the best scholarships and save on your education.",
      link: "/scholarships",
      color: "pink",
    },
    {
      icon: "⇄",
      title: "Compare",
      text: "Compare colleges, courses and make informed choices.",
      link: "/compare",
      color: "purple",
    },
  ];

  const highlights = [
    { icon: "✓", title: "Verified Colleges", text: "Only trusted & verified info" },
    { icon: "▤", title: "Multiple Courses", text: "Find the right course for you" },
    { icon: "◷", title: "Exam Details", text: "Dates, patterns & updates" },
    { icon: "✧", title: "Scholarships", text: "Get financial support" },
    { icon: "⇄", title: "Compare Options", text: "Make better decisions" },
  ];

  const courseSearchMap = {
    bca: "bca",
    "b.tech": "btech",
    btech: "btech",
    "b.tech computer science": "btech-computer-science",
    "b.tech information technology": "btech-information-technology",
    "b.sc computer science": "bsc-computer-science",
    mca: "mca",
    "m.sc computer science": "msc-computer-science",
    bba: "bba",
    mba: "mba",
    mbbs: "mbbs",
    bds: "bds",
    "b.pharm": "bpharm",
    llb: "llb",
    "ba llb": "ba-llb",
    "bba llb": "bba-llb",
    "b.com": "bcom",
    "b.com llb": "bcom-llb",
    bms: "bms",
    pgdm: "pgdm",
  };

  const handleSearch = () => {
    const selectedSearch = searchQuery.trim() || course ||
      [college, location].filter(Boolean).join(" ");
    const originalQuery = selectedSearch.trim();
    const query = originalQuery.toLowerCase();

    if (!query) {
      navigate("/colleges");
      return;
    }

    const exactCourseSlug = courseSearchMap[query];

    if (exactCourseSlug) {
      navigate(`/courses/${exactCourseSlug}`);
      return;
    }

    if (
      query === "computer & it" ||
      query === "computer and it" ||
      query === "computer" ||
      query === "it" ||
      query === "technology"
    ) {
      navigate("/courses/Computer%20%26%20IT");
      return;
    }

    if (
      query === "medical" ||
      query === "medical & health" ||
      query === "medical and health" ||
      query === "health"
    ) {
      navigate("/courses/Medical%20%26%20Health");
      return;
    }

    if (
      query === "law" ||
      query === "management" ||
      query === "science" ||
      query === "arts" ||
      query === "arts & humanities"
    ) {
      navigate(`/courses/${encodeURIComponent(originalQuery)}`);
      return;
    }

    if (
      query.includes("exam") ||
      query.includes("jee") ||
      query.includes("neet") ||
      query.includes("cuet") ||
      query.includes("gate") ||
      query.includes("cat")
    ) {
      navigate(
        `/exams?search=${encodeURIComponent(originalQuery)}`
      );
      return;
    }

    navigate(
      `/colleges?search=${encodeURIComponent(originalQuery)}`
    );
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <span className="home-hero-badge"><i></i>Your Future Starts Here</span>
          <h1>Find Your Perfect<br /><span>College &amp; Course</span></h1>
          <p className="home-hero-description">
            Discover top colleges, explore courses, check exams and scholarships – all in one place.
          </p>

          <form
            className="home-search"
            onSubmit={(event) => {
              event.preventDefault();
              handleSearch();
            }}
          >
            <label>
              <span>Select College</span>
              <select value={college} onChange={(event) => setCollege(event.target.value)}>
                <option value="">Any college type</option>
                <option value="Engineering">Engineering</option>
                <option value="Medical">Medical</option>
                <option value="Management">Management</option>
                <option value="Science">Science</option>
                <option value="Arts & Humanities">Arts &amp; Humanities</option>
              </select>
            </label>
            <label>
              <span>Select Course</span>
              <select value={course} onChange={(event) => setCourse(event.target.value)}>
                <option value="">Any course</option>
                <option value="bca">BCA</option>
                <option value="b.tech">B.Tech</option>
                <option value="bba">BBA</option>
                <option value="mba">MBA</option>
                <option value="mbbs">MBBS</option>
                <option value="llb">LLB</option>
              </select>
            </label>
            <label>
              <span>Select Location</span>
              <select value={location} onChange={(event) => setLocation(event.target.value)}>
                <option value="">Anywhere in India</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Chennai">Chennai</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
              </select>
            </label>
            <label className="home-keyword-search">
              <span>Search by keyword</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="College, course or exam"
                aria-label="Search colleges, courses or exams"
              />
            </label>
            <button type="submit" className="home-search-button">Search <span>→</span></button>
          </form>

          <div className="home-hero-actions">
            <Link to="/colleges" className="home-primary-action">Explore Colleges <span>→</span></Link>
            <Link to="/courses" className="home-secondary-action">Explore Courses</Link>
          </div>
        </div>

        <div className="home-hero-art" aria-hidden="true">
          <div className="home-art-sun"></div>
          <div className="home-art-campus">
            <div className="home-campus-roof"></div>
            <div className="home-campus-columns"><i></i><i></i><i></i></div>
            <div className="home-campus-base"></div>
          </div>
          <div className="home-art-student">
            <div className="home-student-head"><i></i></div>
            <div className="home-student-neck"></div>
            <div className="home-student-body"></div>
            <div className="home-student-arm"></div>
            <div className="home-student-book">A</div>
          </div>
          <div className="home-art-leaf leaf-one"></div>
          <div className="home-art-leaf leaf-two"></div>
          <div className="home-art-card home-art-card-top"><span>✦</span><div><strong>Make your next move</strong><small>One step at a time</small></div></div>
          <div className="home-art-card home-art-card-bottom"><span>✓</span><div><strong>Find your fit</strong><small>Explore new possibilities</small></div></div>
        </div>
      </section>

      <section className="home-highlights" aria-label="Admission Sathi features">
        {highlights.map((highlight) => (
          <div className="home-highlight" key={highlight.title}>
            <span className="home-highlight-icon">{highlight.icon}</span>
            <div><strong>{highlight.title}</strong><small>{highlight.text}</small></div>
          </div>
        ))}
      </section>

      <section className="home-explore">
        <div className="home-section-heading">
          <span className="home-eyebrow">YOUR NEXT STEP STARTS HERE</span>
          <h2>Find What You’re Looking For</h2>
          <p>Everything you need for your higher education journey,<br className="desktop-break" /> right at your fingertips.</p>
        </div>

        <div className="home-card-grid">
          {features.map((feature) => (
            <Link
              to={feature.link}
              className="home-explore-card"
              key={feature.title}
            >
              <span className={`home-card-icon ${feature.color}`}>
                {feature.icon}
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
              <span className="home-card-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-statistics" aria-label="Admission Sathi statistics">
        <div><strong>10K+</strong><span>Verified Colleges</span></div>
        <div><strong>500+</strong><span>Courses</span></div>
        <div><strong>50+</strong><span>Exams</span></div>
        <div><strong>20+</strong><span>Scholarships</span></div>
      </section>
    </main>
  );
}
