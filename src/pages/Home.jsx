
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LineIcon from "../components/LineIcon";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import StudentIllustration from "../components/illustrations/StudentIllustration";
import BooksIllustration from "../components/illustrations/BooksIllustration";

function useCountUp(target, enabled) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return undefined;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      const frameId = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(frameId);
    }

    let frameId;
    const startTime = performance.now();

    const update = (time) => {
      const progress = Math.min((time - startTime) / 1100, 1);
      const easedProgress = 1 - (1 - progress) ** 3;

      setValue(Math.round(target * easedProgress));

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      }
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [enabled, target]);

  return value;
}

export default function Home() {
  const navigate = useNavigate();
  const statsRef = useRef(null);

  const [statsVisible, setStatsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [location, setLocation] = useState("");

  const collegeCount = useCountUp(100, statsVisible);
  const courseCount = useCountUp(1000, statsVisible);
  const examCount = useCountUp(50, statsVisible);
  const scholarshipCount = useCountUp(20, statsVisible);

  useEffect(() => {
    const statsElement = statsRef.current;
    if (!statsElement) return undefined;

    if (!("IntersectionObserver" in window)) {
      const frameId = requestAnimationFrame(() =>
        setStatsVisible(true)
      );
      return () => cancelAnimationFrame(frameId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(statsElement);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: "building",
      title: "Colleges",
      text: "Explore colleges and discover the right place for your future.",
      link: "/colleges",
      color: "green",
    },
    {
      icon: "book",
      title: "Courses",
      text: "Explore courses, eligibility criteria and study options.",
      link: "/courses",
      color: "blue",
    },
    {
      icon: "file",
      title: "Exams",
      text: "Discover entrance exams, patterns and important updates.",
      link: "/exams",
      color: "purple",
    },
    {
      icon: "award",
      title: "Scholarships",
      text: "Explore financial aid and scholarship opportunities.",
      link: "/scholarships",
      color: "orange",
    },
    {
      icon: "scale",
      title: "Compare",
      text: "Compare your options and make informed decisions.",
      link: "/compare",
      color: "teal",
    },
  ];

  const highlights = [
    {
      icon: "check",
      title: "Verified Colleges",
      text: "Find information from verified sources",
    },
    {
      icon: "book",
      title: "Course Discovery",
      text: "Explore different study options",
    },
    {
      icon: "file",
      title: "Entrance Exams",
      text: "Find exam information and updates",
    },
    {
      icon: "award",
      title: "Scholarships",
      text: "Discover financial support options",
    },
    {
      icon: "scale",
      title: "Compare Options",
      text: "Make informed education choices",
    },
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
    const keyword = searchQuery.trim();
    const query = keyword.toLowerCase();

    if (college || course || location) {
      const filters = new URLSearchParams();

      if (keyword) filters.set("search", keyword);
      if (college) filters.set("college", college);
      if (course) filters.set("course", course);
      if (location) filters.set("location", location);

      const route =
        course && !college && !location
          ? "/courses"
          : "/colleges";

      navigate(`${route}?${filters.toString()}`);
      return;
    }

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
      ["computer & it", "computer and it", "computer", "it", "technology"].includes(query)
    ) {
      navigate("/courses/Computer%20%26%20IT");
      return;
    }

    if (
      ["medical", "medical & health", "medical and health", "health"].includes(query)
    ) {
      navigate("/courses/Medical%20%26%20Health");
      return;
    }

    if (
      ["law", "management", "science", "arts", "arts & humanities"].includes(query)
    ) {
      navigate(`/courses/${encodeURIComponent(keyword)}`);
      return;
    }

    if (
      ["exam", "jee", "neet", "cuet", "gate", "cat"].some((term) =>
        query.includes(term)
      )
    ) {
      navigate(`/exams?search=${encodeURIComponent(keyword)}`);
      return;
    }

    navigate(`/colleges?search=${encodeURIComponent(keyword)}`);
  };

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <span className="home-hero-badge">
            <LineIcon name="graduation" size={16} />
            Your Future Starts Here
          </span>

          <h1>
            Find Your Perfect
            <br />
            <span>College &amp; Course</span>
          </h1>

          <p className="home-hero-description">
            Your higher education journey starts here. Explore colleges,
            discover courses, find entrance exams and scholarships—all
            in one place.
          </p>

          <form
            className="home-search"
            onSubmit={(event) => {
              event.preventDefault();
              handleSearch();
            }}
          >
            <label>
              <span className="home-field-label">
                <LineIcon name="building" size={15} />
                Select College
              </span>
              <select
                value={college}
                onChange={(event) => setCollege(event.target.value)}
              >
                <option value="">Any college type</option>
                <option value="Engineering">Engineering</option>
                <option value="Medical">Medical</option>
                <option value="Management">Management</option>
                <option value="Science">Science</option>
                <option value="Arts & Humanities">Arts &amp; Humanities</option>
              </select>
            </label>

            <label>
              <span className="home-field-label">
                <LineIcon name="book" size={15} />
                Select Course
              </span>
              <select
                value={course}
                onChange={(event) => setCourse(event.target.value)}
              >
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
              <span className="home-field-label">
                <LineIcon name="pin" size={15} />
                Select Location
              </span>
              <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              >
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
                placeholder="College, course or exam"
                aria-label="Search colleges, courses or exams"
              />
            </label>

            <Button type="submit" className="home-search-button">
              <LineIcon name="search" size={17} />
              Search
            </Button>
          </form>

          <div className="home-hero-actions">
            <Button to="/colleges" className="home-primary-action">
              Explore Colleges
              <LineIcon name="arrow" size={17} />
            </Button>

            <Button to="/courses" variant="outline" className="home-secondary-action">
              Explore Courses
            </Button>
          </div>
        </div>

        <div className="home-hero-art" aria-hidden="true">
          <StudentIllustration />
        </div>
      </section>

      <section className="home-highlights" aria-label="Admission Saathi features">
        {highlights.map((highlight) => (
          <div className="home-highlight" key={highlight.title}>
            <span className="home-highlight-icon">
              <LineIcon name={highlight.icon} size={19} />
            </span>
            <div>
              <strong>{highlight.title}</strong>
              <small>{highlight.text}</small>
            </div>
          </div>
        ))}
      </section>

      <section className="home-explore">
        <div className="home-section-heading-row">
          <div className="home-section-heading">
            <span className="home-eyebrow">EXPLORE</span>
            <h2>Everything You Need to Plan Your Future</h2>
            <p>
              Explore your options, make confident decisions and take
              the next step towards your education goals.
            </p>
          </div>

          <Link to="/colleges" className="home-view-all">
            View All
            <LineIcon name="arrow" size={17} />
          </Link>
        </div>

        <div className="home-card-grid">
          {features.map((feature) => (
            <Card
              as={Link}
              to={feature.link}
              className="home-explore-card"
              key={feature.title}
            >
              <span className={`home-card-icon ${feature.color}`}>
                <LineIcon name={feature.icon} size={21} />
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
              <span className="home-card-arrow" aria-hidden="true">
                <LineIcon name="arrow" size={16} />
              </span>
            </Card>
          ))}
        </div>
      </section>

      <section
        ref={statsRef}
        className="home-statistics"
        aria-label="Admission Saathi statistics"
      >
        <div className="home-stat-illustration" aria-hidden="true">
          <BooksIllustration />
        </div>

        <div className="home-stat-item">
          <span className="home-stat-icon">
            <LineIcon name="building" size={19} />
          </span>
          <strong>{collegeCount.toLocaleString("en-IN")}+</strong>
          <span>Verified Colleges</span>
        </div>

        <div className="home-stat-item">
          <span className="home-stat-icon">
            <LineIcon name="book" size={19} />
          </span>
          <strong>{courseCount.toLocaleString("en-IN")}+</strong>
          <span>Courses</span>
        </div>

        <div className="home-stat-item">
          <span className="home-stat-icon">
            <LineIcon name="file" size={19} />
          </span>
          <strong>{examCount.toLocaleString("en-IN")}+</strong>
          <span>Exams</span>
        </div>

        <div className="home-stat-item">
          <span className="home-stat-icon">
            <LineIcon name="award" size={19} />
          </span>
          <strong>{scholarshipCount.toLocaleString("en-IN")}+</strong>
          <span>Scholarships</span>
        </div>
      </section>
    </main>
  );
}
