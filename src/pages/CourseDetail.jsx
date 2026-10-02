
import { Link, useParams } from "react-router-dom";

const courseData = {
  "Computer & IT": {
    icon: "💻",
    description:
      "Explore computer science, software, information technology and related programs.",
    courses: [
      {
        name: "BCA",
        description:
          "Bachelor of Computer Applications is an undergraduate program focused on computer applications, programming and information technology.",
        duration: "3 Years",
        level: "Undergraduate",
      },
      {
        name: "B.Sc Computer Science",
        description:
          "An undergraduate science program covering computer science, programming, algorithms and computing concepts.",
        duration: "3 Years",
        level: "Undergraduate",
      },
      {
        name: "B.Tech Computer Science",
        description:
          "An undergraduate engineering program focused on computer science, software development and computing technologies.",
        duration: "4 Years",
        level: "Undergraduate",
      },
      {
        name: "B.Tech Information Technology",
        description:
          "An undergraduate engineering program focused on information technology, software and digital systems.",
        duration: "4 Years",
        level: "Undergraduate",
      },
      {
        name: "MCA",
        description:
          "A postgraduate computer applications program designed to build advanced knowledge in software and computing.",
        duration: "2 Years",
        level: "Postgraduate",
      },
      {
        name: "M.Sc Computer Science",
        description:
          "A postgraduate science program focused on advanced computer science concepts and applications.",
        duration: "2 Years",
        level: "Postgraduate",
      },
    ],
  },

  "Medical & Health": {
    icon: "⚕️",
    description:
      "Explore medical, healthcare and allied health programs.",
    courses: [
      {
        name: "MBBS",
        description:
          "An undergraduate medical program covering the foundations of medicine and clinical practice.",
        duration: "Varies by applicable regulations",
        level: "Undergraduate",
      },
      {
        name: "BDS",
        description:
          "An undergraduate dental program focused on oral health, dentistry and clinical dental practice.",
        duration: "Varies by applicable regulations",
        level: "Undergraduate",
      },
      {
        name: "B.Pharm",
        description:
          "An undergraduate pharmacy program covering medicines, pharmaceutical sciences and related practices.",
        duration: "4 Years",
        level: "Undergraduate",
      },
      {
        name: "B.Sc Nursing",
        description:
          "An undergraduate nursing program focused on healthcare, nursing practice and patient care.",
        duration: "4 Years",
        level: "Undergraduate",
      },
      {
        name: "BPT",
        description:
          "An undergraduate physiotherapy program focused on movement, rehabilitation and physical healthcare.",
        duration: "Varies by institution",
        level: "Undergraduate",
      },
      {
        name: "B.Sc Medical Laboratory Technology",
        description:
          "An allied health program focused on laboratory testing, diagnostics and medical laboratory practices.",
        duration: "Varies by institution",
        level: "Undergraduate",
      },
    ],
  },

  Law: {
    icon: "⚖️",
    description:
      "Explore undergraduate and postgraduate law programs.",
    courses: [
      {
        name: "LLB",
        description:
          "A law degree designed to provide foundational knowledge of legal principles, systems and practice.",
        duration: "Varies by program structure",
        level: "Undergraduate",
      },
      {
        name: "BA LLB",
        description:
          "An integrated undergraduate program combining arts subjects with legal education.",
        duration: "5 Years",
        level: "Undergraduate",
      },
      {
        name: "BBA LLB",
        description:
          "An integrated program combining business administration with legal education.",
        duration: "5 Years",
        level: "Undergraduate",
      },
      {
        name: "LLM",
        description:
          "A postgraduate law program offering advanced study in legal subjects and specializations.",
        duration: "Varies by institution",
        level: "Postgraduate",
      },
      {
        name: "B.Com LLB",
        description:
          "An integrated program combining commerce education with legal studies.",
        duration: "5 Years",
        level: "Undergraduate",
      },
    ],
  },

  Management: {
    icon: "📊",
    description:
      "Explore business, management and administration programs.",
    courses: [
      {
        name: "BBA",
        description:
          "An undergraduate business program covering management, business operations and administration.",
        duration: "3 Years",
        level: "Undergraduate",
      },
      {
        name: "BMS",
        description:
          "An undergraduate management program focused on business and management principles.",
        duration: "3 Years",
        level: "Undergraduate",
      },
      {
        name: "MBA",
        description:
          "A postgraduate management program covering business strategy, management and organizational practices.",
        duration: "Typically 2 Years",
        level: "Postgraduate",
      },
      {
        name: "PGDM",
        description:
          "A postgraduate management diploma program covering business and management disciplines.",
        duration: "Typically 2 Years",
        level: "Postgraduate",
      },
      {
        name: "M.Com",
        description:
          "A postgraduate commerce program covering advanced commerce, accounting and business subjects.",
        duration: "Typically 2 Years",
        level: "Postgraduate",
      },
    ],
  },

  Science: {
    icon: "🔬",
    description:
      "Explore science programs across different specializations.",
    courses: [
      {
        name: "B.Sc",
        description:
          "An undergraduate science program offering study across a range of scientific disciplines.",
        duration: "Typically 3 Years",
        level: "Undergraduate",
      },
      {
        name: "B.Sc Mathematics",
        description:
          "An undergraduate program focused on mathematics, analytical methods and mathematical concepts.",
        duration: "Typically 3 Years",
        level: "Undergraduate",
      },
      {
        name: "B.Sc Physics",
        description:
          "An undergraduate science program focused on physics and the study of physical phenomena.",
        duration: "Typically 3 Years",
        level: "Undergraduate",
      },
      {
        name: "B.Sc Chemistry",
        description:
          "An undergraduate science program focused on chemistry, substances, reactions and laboratory study.",
        duration: "Typically 3 Years",
        level: "Undergraduate",
      },
      {
        name: "M.Sc",
        description:
          "A postgraduate science program offering advanced study in a chosen scientific specialization.",
        duration: "Typically 2 Years",
        level: "Postgraduate",
      },
    ],
  },

  "Arts & Humanities": {
    icon: "🎨",
    description:
      "Explore arts, humanities and social science programs.",
    courses: [
      {
        name: "BA",
        description:
          "An undergraduate program covering subjects across arts, humanities and social sciences.",
        duration: "Typically 3 Years",
        level: "Undergraduate",
      },
      {
        name: "BA English",
        description:
          "An undergraduate program focused on English language, literature and related studies.",
        duration: "Typically 3 Years",
        level: "Undergraduate",
      },
      {
        name: "BA History",
        description:
          "An undergraduate program focused on historical periods, societies and historical analysis.",
        duration: "Typically 3 Years",
        level: "Undergraduate",
      },
      {
        name: "BA Political Science",
        description:
          "An undergraduate program focused on political systems, institutions, governance and political thought.",
        duration: "Typically 3 Years",
        level: "Undergraduate",
      },
      {
        name: "MA",
        description:
          "A postgraduate humanities program offering advanced study in a chosen arts or humanities discipline.",
        duration: "Typically 2 Years",
        level: "Postgraduate",
      },
    ],
  },
};

export default function CourseDetail() {
  const { category, course } = useParams();

  const title = decodeURIComponent(category || "");

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

  if (course) {
    const courseTitle = decodeURIComponent(course);

    const selectedCourse = data.courses.find(
      (item) =>
        item.name.toLowerCase() ===
        courseTitle.toLowerCase()
    );

    if (!selectedCourse) {
      return (
        <main className="simple-page">
          <section className="simple-page-hero">
            <span className="page-eyebrow">
              COURSE DISCOVERY
            </span>

            <h1>Course not found</h1>

            <p>
              The requested course could not be found in
              this category.
            </p>

            <Link
              to={`/courses/${encodeURIComponent(title)}`}
              className="view-college"
              style={{
                display: "inline-block",
                marginTop: "20px",
              }}
            >
              ← Back to {title}
            </Link>
          </section>
        </main>
      );
    }

    return (
      <main className="simple-page">
        <section className="simple-page-hero">
          <span className="page-eyebrow">
            COURSE DETAILS
          </span>

          <div
            style={{
              fontSize: "46px",
              marginBottom: "15px",
            }}
          >
            {data.icon}
          </div>

          <h1>{selectedCourse.name}</h1>

          <p>{selectedCourse.description}</p>
        </section>

        <section className="simple-page-content">
          <article
            className="simple-page-card"
            style={{
              maxWidth: "850px",
              margin: "0 auto",
            }}
          >
            <h3>About this course</h3>

            <p>{selectedCourse.description}</p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "16px",
                marginTop: "25px",
              }}
            >
              <div
                style={{
                  padding: "18px",
                  borderRadius: "14px",
                  background: "#f6f8fc",
                  border: "1px solid #e5e7eb",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    color: "#111827",
                    marginBottom: "6px",
                  }}
                >
                  Level
                </strong>

                <span style={{ color: "#6b7280" }}>
                  {selectedCourse.level}
                </span>
              </div>

              <div
                style={{
                  padding: "18px",
                  borderRadius: "14px",
                  background: "#f6f8fc",
                  border: "1px solid #e5e7eb",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    color: "#111827",
                    marginBottom: "6px",
                  }}
                >
                  Duration
                </strong>

                <span style={{ color: "#6b7280" }}>
                  {selectedCourse.duration}
                </span>
              </div>

              <div
                style={{
                  padding: "18px",
                  borderRadius: "14px",
                  background: "#f6f8fc",
                  border: "1px solid #e5e7eb",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    color: "#111827",
                    marginBottom: "6px",
                  }}
                >
                  Category
                </strong>

                <span style={{ color: "#6b7280" }}>
                  {title}
                </span>
              </div>
            </div>

            <div
              style={{
                marginTop: "30px",
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <Link
                to={`/colleges?search=${encodeURIComponent(
                  selectedCourse.name
                )}`}
                className="view-college"
              >
                Find Colleges →
              </Link>

              <Link
                to={`/courses/${encodeURIComponent(title)}`}
                className="official-link"
              >
                ← Back to {title}
              </Link>
            </div>
          </article>
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
        {data.courses.map((courseItem) => (
          <Link
            key={courseItem.name}
            to={`/courses/${encodeURIComponent(
              title
            )}/${encodeURIComponent(courseItem.name)}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <article
              className="simple-page-card"
              style={{
                cursor: "pointer",
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              <h3>{courseItem.name}</h3>

              <p>{courseItem.description}</p>

              <span
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  color: "#111827",
                  fontSize: "12px",
                  fontWeight: "800",
                }}
              >
                View Course Details →
              </span>
            </article>
          </Link>
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
