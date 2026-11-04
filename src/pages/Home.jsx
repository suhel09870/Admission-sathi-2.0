
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LineIcon from "../components/LineIcon";
import Button from "../components/common/Button";
import heroStudent from "../assets/hero-student-reference.png";
import { supabase } from "../lib/supabase";

const HOME_FEATURES = [
  {
    icon: "zap",
    title: "Smart Search",
    text: "Find colleges, courses and exams with useful discovery filters.",
    link: "/colleges",
    color: "green",
  },
  {
    icon: "chart",
    title: "Compare Options",
    text: "Compare colleges side by side before you decide.",
    link: "/compare",
    color: "purple",
  },
  {
    icon: "bell",
    title: "Get Alerts",
    text: "Keep track of important admission dates and deadlines.",
    link: "/important-dates",
    color: "orange",
  },
  {
    icon: "award",
    title: "Scholarship Guide",
    text: "Explore financial support for your education journey.",
    link: "/scholarships",
    color: "blue",
  },
  {
    icon: "shield",
    title: "Secure & Trusted",
    text: "Save your choices and keep your application plan organised.",
    link: "/signup",
    color: "teal",
  },
];

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
  const [directoryStats, setDirectoryStats] = useState({
    colleges: null,
    programs: null,
    scholarships: null,
    dates: null,
  });
  const [collegeTypes, setCollegeTypes] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
  const [locations, setLocations] = useState([]);
  const [directoryError, setDirectoryError] = useState("");
  const [updates, setUpdates] = useState([]);
  const [updatesError, setUpdatesError] = useState("");

  const collegeCount = useCountUp(directoryStats.colleges ?? 0, statsVisible);
  const programCount = useCountUp(directoryStats.programs ?? 0, statsVisible);
  const scholarshipCount = useCountUp(
    directoryStats.scholarships ?? 0,
    statsVisible
  );
  const dateCount = useCountUp(directoryStats.dates ?? 0, statsVisible);
  const featureCount = useCountUp(HOME_FEATURES.length, statsVisible);

  useEffect(() => {
    let isMounted = true;

    async function loadDirectoryData() {
      try {
        const [collegeResult, programResult, scholarshipResult, datesResult] =
          await Promise.all([
          supabase
            .from("colleges")
            .select("id, city, state, institution_type, category", {
              count: "exact",
            }),
          supabase
            .from("programs")
            .select("id, program_name", { count: "exact" }),
          supabase
            .from("scholarships")
            .select("id", { count: "exact" }),
          supabase
            .from("important_dates")
            .select("id, title, date, description, verification_status", {
              count: "exact",
            })
            .order("date", { ascending: true }),
          ]);

        if (!isMounted) return;

        const errors = [];

        if (collegeResult.error) {
          console.error("Home college data error:", collegeResult.error);
          errors.push("College filters and counts could not be loaded.");
        } else {
          const collegeRows = collegeResult.data || [];
          const types = collegeRows
            .flatMap((item) => [item.institution_type, item.category])
            .filter(Boolean);
          const availableLocations = collegeRows
            .flatMap((item) => [item.city, item.state])
            .filter(Boolean);

          setCollegeTypes(
            [...new Set(types)].sort((left, right) =>
              left.localeCompare(right)
            )
          );
          setLocations(
            [...new Set(availableLocations)].sort((left, right) =>
              left.localeCompare(right)
            )
          );
        }

        if (programResult.error) {
          console.error("Home program data error:", programResult.error);
          errors.push("Course filters and counts could not be loaded.");
        } else {
          const names = (programResult.data || [])
            .map((item) => item.program_name)
            .filter(Boolean);

          setCourseOptions(
            [...new Set(names)].sort((left, right) =>
              left.localeCompare(right)
            )
          );
        }

        if (scholarshipResult.error) {
          console.error(
            "Home scholarship data error:",
            scholarshipResult.error
          );
          errors.push("Scholarship totals could not be loaded.");
        }

        if (datesResult.error) {
          console.error("Home update data error:", datesResult.error);
          setUpdates([]);
          setUpdatesError("Admission date updates could not be loaded.");
          errors.push("Admission date updates could not be loaded.");
        } else {
          setUpdates(datesResult.data || []);
          setUpdatesError("");
        }

        setDirectoryStats({
          colleges: collegeResult.error
            ? null
            : collegeResult.count ?? collegeResult.data?.length ?? null,
          programs: programResult.error
            ? null
            : programResult.count ?? programResult.data?.length ?? null,
          scholarships: scholarshipResult.error
            ? null
            : scholarshipResult.count ??
              scholarshipResult.data?.length ??
              null,
          dates: datesResult.error
            ? null
            : datesResult.count ?? datesResult.data?.length ?? null,
        });
        setDirectoryError(errors.join(" "));
      } catch (loadError) {
        console.error("Home directory data error:", loadError);
        if (isMounted) {
          setDirectoryError("Directory filters and counts could not be loaded.");
          setUpdatesError("Admission date updates could not be loaded.");
        }
      }
    }

    loadDirectoryData();
    return () => {
      isMounted = false;
    };
  }, []);

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

      navigate(`/colleges?${filters.toString()}`);
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
                {collegeTypes.map((type) => (
                  <option value={type} key={type}>
                    {type}
                  </option>
                ))}
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
                {courseOptions.map((programName) => (
                  <option value={programName} key={programName}>
                    {programName}
                  </option>
                ))}
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
                {locations.map((cityOrState) => (
                  <option value={cityOrState} key={cityOrState}>
                    {cityOrState}
                  </option>
                ))}
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

          {directoryError && (
            <p className="home-directory-error" role="status">
              {directoryError}
            </p>
          )}

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

        <div className="home-hero-art">
          <img
            src={heroStudent}
            alt=""
            className="student-illustration"
          />
          <div className="home-art-message">
            <span>Dream big</span>
            <strong>Achieve more</strong>
          </div>
        </div>
      </section>

      <section
        ref={statsRef}
        className="home-statistics"
        aria-label="Admission Saathi directory statistics"
      >
        <div className="home-stat-item">
          <span className="home-stat-icon"><LineIcon name="building" size={21} /></span>
          <strong>{directoryStats.colleges === null ? "—" : `${collegeCount.toLocaleString("en-IN")}+`}</strong>
          <span>Colleges</span>
        </div>
        <div className="home-stat-item">
          <span className="home-stat-icon"><LineIcon name="book" size={21} /></span>
          <strong>{directoryStats.programs === null ? "—" : `${programCount.toLocaleString("en-IN")}+`}</strong>
          <span>Programs</span>
        </div>
        <div className="home-stat-item">
          <span className="home-stat-icon"><LineIcon name="award" size={21} /></span>
          <strong>{directoryStats.scholarships === null ? "—" : `${scholarshipCount.toLocaleString("en-IN")}+`}</strong>
          <span>Scholarships</span>
        </div>
        <div className="home-stat-item">
          <span className="home-stat-icon"><LineIcon name="file" size={21} /></span>
          <strong>{directoryStats.dates === null ? "—" : `${dateCount.toLocaleString("en-IN")}+`}</strong>
          <span>Admission Dates</span>
        </div>
        <div className="home-stat-item">
          <span className="home-stat-icon"><LineIcon name="graduation" size={21} /></span>
          <strong>{featureCount.toLocaleString("en-IN")}</strong>
          <span>Ways to explore</span>
        </div>
      </section>

      <section className="home-benefits" aria-labelledby="home-benefits-title">
        <div className="home-benefits-intro">
          <span className="home-eyebrow">WHY CHOOSE US</span>
          <h2 id="home-benefits-title">Why Choose<br />Admission Saathi?</h2>
          <p>
            Everything you need to make confident decisions about your
            higher education journey.
          </p>
          <Link to="/colleges" className="home-learn-more">
            Learn More <LineIcon name="arrow" size={16} />
          </Link>
        </div>

        <div className="home-benefits-grid">
          {HOME_FEATURES.map((feature) => (
            <Link
              to={feature.link}
              className="home-benefit-card"
              key={feature.title}
            >
              <span className={`home-benefit-icon ${feature.color}`}>
                <LineIcon name={feature.icon} size={23} />
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
              <span className="home-benefit-arrow" aria-hidden="true">
                <LineIcon name="arrow" size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-updates" aria-labelledby="home-updates-title">
        <div className="home-updates-heading">
          <span className="home-updates-megaphone" aria-hidden="true">
            <LineIcon name="bell" size={24} />
          </span>
          <div>
            <h2 id="home-updates-title">Latest Updates</h2>
            <p>Stay informed with the latest admission news</p>
          </div>
        </div>

        {updatesError ? (
          <p className="home-updates-message" role="status">{updatesError}</p>
        ) : updates.length ? (
          <div className="home-updates-list">
            {updates.slice(0, 3).map((update) => (
              <Link
                to="/important-dates"
                className="home-update-item"
                key={update.id}
              >
                <span className="home-update-icon">
                  <LineIcon name="calendar" size={21} />
                </span>
                <span className="home-update-copy">
                  <strong>{update.title}</strong>
                  <small>
                    {update.verification_status === "sample" && "Sample · "}
                    {update.date || "Date to be announced"}
                  </small>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="home-updates-message">
            Admission date updates will appear here when available.
          </p>
        )}

        <Link to="/important-dates" className="home-updates-all">
          View All Updates <LineIcon name="arrow" size={16} />
        </Link>
      </section>
    </main>
  );
}
