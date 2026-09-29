import { Link, useParams } from "react-router-dom";

export default function CourseDetail() {
  const { category } = useParams();

  const title = decodeURIComponent(category || "");

  const courseData = {
    "Computer & IT": {
      icon: "💻",
      description:
        "Explore computer science, software, information technology and related programs.",
      courses: [
        "BCA",
        "B.Sc Computer Science",
        "B.Tech Computer Science",
        "B.Tech Information Technology",
        "MCA",
        "M.Sc Computer Science",
      ],
    },

    "Medical & Health": {
      icon: "⚕️",
      description:
        "Explore medical, healthcare and allied health programs.",
      courses: [
        "MBBS",
        "BDS",
        "B.Pharm",
        "B.Sc Nursing",
        "BPT",
        "B.Sc Medical Laboratory Technology",
      ],
    },

    Law: {
      icon: "⚖️",
      description:
        "Explore undergraduate and postgraduate law programs.",
      courses: [
        "LLB",
        "BA LLB",
        "BBA LLB",
        "LLM",
        "B.Com LLB",
      ],
    },

    Management: {
      icon: "📊",
      description:
        "Explore business, management and administration programs.",
      courses: [
        "BBA",
        "BMS",
        "MBA",
        "PGDM",
        "M.Com",
      ],
    },

    Science: {
      icon: "🔬",
      description:
        "Explore science programs across different specializations.",
      courses: [
        "B.Sc",
        "B.Sc Mathematics",
        "B.Sc Physics",
        "B.Sc Chemistry",
        "M.Sc",
      ],
    },

    "Arts & Humanities": {
      icon: "🎨",
      description:
        "Explore arts, humanities and social science programs.",
      courses: [
        "BA",
        "BA English",
        "BA History",
        "BA Political Science",
        "MA",
      ],
    },
  };

  const data = courseData[title];

  if (!data) {
    return (
      <main className="simple-page">
        <section className="simple-page-hero">
          <span className="page-eyebrow">
            COURSE DISCOVERY
          </span>

          <h1>Course category not found</h1>

          <p>
            The requested course category could not be found.
          </p>

          <Link
            to="/courses"
            className="view-college"
            style={{
              display: "inline-block",
              marginTop: "20px",
            }}
          >
            ← Back to Courses
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="simple-page">
      <section className="simple-page-hero">
        <span className="page-eyebrow">
          COURSE DISCOVERY
        </span>

        <div
          style={{
            fontSize: "46px",
            marginBottom: "15px",
          }}
        >
          {data.icon}
        </div>

        <h1>{title}</h1>

        <p>{data.description}</p>
      </section>

      <section className="simple-page-content">
        {data.courses.map((course) => (
          <article
            className="simple-page-card"
            key={course}
          >
            <h3>{course}</h3>

            <p>
              Explore colleges, eligibility, admission
              information and available programs.
            </p>

            <Link
              to="/colleges"
              className="view-college"
              style={{
                display: "inline-block",
                marginTop: "10px",
              }}
            >
              Find Colleges →
            </Link>
          </article>
        ))}
      </section>

      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        <Link
          to="/courses"
          className="official-link"
        >
          ← Back to all courses
        </Link>
      </div>
    </main>
  );
}