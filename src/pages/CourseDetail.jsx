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

function getCourseTopics(courseName) {
  if (
    courseName === "BCA" ||
    courseName === "B.Sc Computer Science" ||
    courseName === "B.Tech Computer Science" ||
    courseName === "B.Tech Information Technology" ||
    courseName === "MCA" ||
    courseName === "M.Sc Computer Science"
  ) {
    return [
      {
        icon: "⌨️",
        title: "Programming",
        text: "Build foundations in programming and software development.",
      },
      {
        icon: "🗄️",
        title: "Databases",
        text: "Understand how information is stored, managed and accessed.",
      },
      {
        icon: "🌐",
        title: "Technology",
        text: "Explore modern computing systems and digital technologies.",
      },
      {
        icon: "🧩",
        title: "Problem Solving",
        text: "Develop logical thinking and computational problem-solving skills.",
      },
    ];
  }

  return [
    {
      icon: "📚",
      title: "Core Subjects",
      text: "Build a strong foundation in the key subjects of the program.",
    },
    {
      icon: "🎯",
      title: "Specialization",
      text: "Explore concepts and areas connected to your chosen field.",
    },
    {
      icon: "💡",
      title: "Practical Learning",
      text: "Apply concepts through projects, assignments and practical work.",
    },
    {
      icon: "🚀",
      title: "Career Preparation",
      text: "Develop knowledge and skills relevant to further study and careers.",
    },
  ];
}

function getCareerPaths(courseName) {
  if (
    courseName === "BCA" ||
    courseName === "B.Sc Computer Science" ||
    courseName === "B.Tech Computer Science" ||
    courseName === "B.Tech Information Technology" ||
    courseName === "MCA" ||
    courseName === "M.Sc Computer Science"
  ) {
    return [
      "Software Development",
      "Web Development",
      "Database & IT",
      "Technology Support",
      "Further Studies",
    ];
  }

  return [
    "Industry Roles",
    "Professional Practice",
    "Further Studies",
    "Specialized Careers",
    "Public & Private Sector",
  ];
}

export default function CourseDetail() {
  const { category, course } = useParams();

  const title = decodeURIComponent(category || "");
  const data = courseData[title];

  if (!data) {
    return (
      <main
        style={{
          minHeight: "70vh",
          padding: "80px 24px",
          background: "#f6f8fc",
        }}
      >
        <section
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <span
            style={{
              color: "#78c043",
              fontSize: "11px",
              fontWeight: "800",
              letterSpacing: "1.5px",
            }}
          >
            COURSE DISCOVERY
          </span>

          <h1
            style={{
              color: "#111827",
              fontSize: "42px",
              margin: "12px 0",
            }}
          >
            Course category not found
          </h1>

          <p style={{ color: "#6b7280" }}>
            The requested course category could not be found.
          </p>

          <Link
            to="/courses"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "13px 20px",
              background: "#111827",
              color: "#fff",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "700",
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
        item.name.toLowerCase() === courseTitle.toLowerCase()
    );

    if (!selectedCourse) {
      return (
        <main
          style={{
            minHeight: "70vh",
            padding: "80px 24px",
            background: "#f6f8fc",
          }}
        >
          <section
            style={{
              maxWidth: "1180px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <span
              style={{
                color: "#78c043",
                fontSize: "11px",
                fontWeight: "800",
                letterSpacing: "1.5px",
              }}
            >
              COURSE DISCOVERY
            </span>

            <h1
              style={{
                color: "#111827",
                fontSize: "42px",
                margin: "12px 0",
              }}
            >
              Course not found
            </h1>

            <p style={{ color: "#6b7280" }}>
              The requested course could not be found in this category.
            </p>

            <Link
              to={`/courses/${encodeURIComponent(title)}`}
              style={{
                display: "inline-block",
                marginTop: "20px",
                padding: "13px 20px",
                background: "#111827",
                color: "#fff",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              ← Back to {title}
            </Link>
          </section>
        </main>
      );
    }

    const topics = getCourseTopics(selectedCourse.name);
    const careerPaths = getCareerPaths(selectedCourse.name);

    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#f6f8fc",
          paddingBottom: "90px",
        }}
      >
        {/* Breadcrumb */}
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            padding: "28px 24px 18px",
            color: "#6b7280",
            fontSize: "13px",
          }}
        >
          <Link
            to="/courses"
            style={{
              color: "#6b7280",
              textDecoration: "none",
            }}
          >
            Courses
          </Link>

          <span style={{ margin: "0 9px" }}>›</span>

          <Link
            to={`/courses/${encodeURIComponent(title)}`}
            style={{
              color: "#6b7280",
              textDecoration: "none",
            }}
          >
            {title}
          </Link>

          <span style={{ margin: "0 9px" }}>›</span>

          <strong style={{ color: "#111827" }}>
            {selectedCourse.name}
          </strong>
        </div>

        {/* Hero */}
        <section
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "28px",
              padding: "52px",
              background:
                "linear-gradient(135deg, #101827 0%, #182337 60%, #202d42 100%)",
              color: "#fff",
              boxShadow: "0 20px 50px rgba(17,24,39,0.16)",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "260px",
                height: "260px",
                borderRadius: "50%",
                background: "rgba(120,192,67,0.10)",
                right: "-80px",
                top: "-100px",
              }}
            />

            <div
              style={{
                position: "absolute",
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.08)",
                right: "90px",
                bottom: "-110px",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 1,
                maxWidth: "760px",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#9ee66c",
                  fontSize: "11px",
                  fontWeight: "800",
                  letterSpacing: "1.6px",
                  marginBottom: "22px",
                }}
              >
                <span>✦</span>
                COURSE DETAILS
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "68px",
                    height: "68px",
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.10)",
                    border:
                      "1px solid rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "34px",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {data.icon}
                </div>

                <div>
                  <div
                    style={{
                      color: "#aab4c4",
                      fontSize: "13px",
                      marginBottom: "5px",
                    }}
                  >
                    {title}
                  </div>

                  <h1
                    style={{
                      margin: 0,
                      fontSize: "clamp(38px, 5vw, 58px)",
                      lineHeight: 1,
                      letterSpacing: "-2px",
                    }}
                  >
                    {selectedCourse.name}
                  </h1>
                </div>
              </div>

              <p
                style={{
                  color: "#c7cfdb",
                  lineHeight: 1.8,
                  fontSize: "16px",
                  maxWidth: "700px",
                  margin: 0,
                }}
              >
                {selectedCourse.description}
              </p>
            </div>
          </div>
        </section>

        {/* Quick facts */}
        <section
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            padding: "22px 24px 0",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(210px, 1fr))",
              gap: "14px",
            }}
          >
            {[
              {
                icon: "🎓",
                label: "Study Level",
                value: selectedCourse.level,
              },
              {
                icon: "⏱️",
                label: "Duration",
                value: selectedCourse.duration,
              },
              {
                icon: "📚",
                label: "Category",
                value: title,
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "18px",
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  boxShadow:
                    "0 5px 20px rgba(17,24,39,0.04)",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "13px",
                    background: "#f1f8ea",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>

                <div>
                  <span
                    style={{
                      display: "block",
                      color: "#8a94a3",
                      fontSize: "11px",
                      fontWeight: "800",
                      letterSpacing: "0.8px",
                      textTransform: "uppercase",
                      marginBottom: "5px",
                    }}
                  >
                    {item.label}
                  </span>

                  <strong
                    style={{
                      color: "#111827",
                      fontSize: "14px",
                    }}
                  >
                    {item.value}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Main content */}
        <section
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            padding: "55px 24px 0",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(0, 1.5fr) minmax(280px, 0.7fr)",
              gap: "24px",
              alignItems: "start",
            }}
          >
            {/* Left */}
            <div>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "22px",
                  padding: "30px",
                  marginBottom: "24px",
                }}
              >
                <span
                  style={{
                    color: "#78c043",
                    fontSize: "11px",
                    fontWeight: "800",
                    letterSpacing: "1.3px",
                  }}
                >
                  OVERVIEW
                </span>

                <h2
                  style={{
                    color: "#111827",
                    fontSize: "28px",
                    margin: "8px 0 14px",
                  }}
                >
                  About {selectedCourse.name}
                </h2>

                <p
                  style={{
                    color: "#667085",
                    lineHeight: 1.8,
                    margin: 0,
                    fontSize: "15px",
                  }}
                >
                  {selectedCourse.description}
                </p>

                <p
                  style={{
                    color: "#667085",
                    lineHeight: 1.8,
                    margin: "14px 0 0",
                    fontSize: "15px",
                  }}
                >
                  This course can help students build academic
                  foundations, practical knowledge and skills related
                  to the chosen field. Course structure, subjects and
                  admission requirements can vary by institution.
                </p>
              </div>

              {/* What you'll explore */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "22px",
                  padding: "30px",
                }}
              >
                <span
                  style={{
                    color: "#78c043",
                    fontSize: "11px",
                    fontWeight: "800",
                    letterSpacing: "1.3px",
                  }}
                >
                  LEARNING AREAS
                </span>

                <h2
                  style={{
                    color: "#111827",
                    fontSize: "28px",
                    margin: "8px 0 24px",
                  }}
                >
                  What you’ll explore
                </h2>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(210px, 1fr))",
                    gap: "14px",
                  }}
                >
                  {topics.map((topic) => (
                    <div
                      key={topic.title}
                      style={{
                        padding: "20px",
                        borderRadius: "16px",
                        background: "#f8fafc",
                        border: "1px solid #edf0f4",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "24px",
                          marginBottom: "12px",
                        }}
                      >
                        {topic.icon}
                      </div>

                      <h3
                        style={{
                          margin: "0 0 7px",
                          color: "#111827",
                          fontSize: "16px",
                        }}
                      >
                        {topic.title}
                      </h3>

                      <p
                        style={{
                          margin: 0,
                          color: "#737d8c",
                          fontSize: "13px",
                          lineHeight: 1.65,
                        }}
                      >
                        {topic.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <aside>
              <div
                style={{
                  background: "#111827",
                  color: "#fff",
                  borderRadius: "22px",
                  padding: "28px",
                  marginBottom: "20px",
                  boxShadow:
                    "0 14px 35px rgba(17,24,39,0.13)",
                }}
              >
                <span
                  style={{
                    color: "#9ee66c",
                    fontSize: "11px",
                    fontWeight: "800",
                    letterSpacing: "1.2px",
                  }}
                >
                  START EXPLORING
                </span>

                <h3
                  style={{
                    fontSize: "23px",
                    lineHeight: 1.25,
                    margin: "10px 0",
                  }}
                >
                  Find colleges offering {selectedCourse.name}
                </h3>

                <p
                  style={{
                    color: "#aeb8c7",
                    fontSize: "13px",
                    lineHeight: 1.7,
                    marginBottom: "22px",
                  }}
                >
                  Explore colleges and universities where you can
                  search for relevant programs.
                </p>

                <Link
                  to={`/colleges?search=${encodeURIComponent(
                    selectedCourse.name
                  )}`}
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: "#78c043",
                    color: "#111827",
                    textDecoration: "none",
                    padding: "13px 16px",
                    borderRadius: "11px",
                    fontWeight: "800",
                    fontSize: "13px",
                  }}
                >
                  Find Colleges →
                </Link>
              </div>

              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "22px",
                  padding: "26px",
                }}
              >
                <span
                  style={{
                    color: "#78c043",
                    fontSize: "11px",
                    fontWeight: "800",
                    letterSpacing: "1.2px",
                  }}
                >
                  POSSIBLE PATHS
                </span>

                <h3
                  style={{
                    color: "#111827",
                    fontSize: "21px",
                    margin: "8px 0 18px",
                  }}
                >
                  Career directions
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {careerPaths.map((path) => (
                    <div
                      key={path}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "11px 12px",
                        borderRadius: "10px",
                        background: "#f8fafc",
                        color: "#374151",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      <span
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          background: "#78c043",
                          flexShrink: 0,
                        }}
                      />

                      {path}
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Bottom navigation */}
        <section
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            padding: "35px 24px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "15px",
              flexWrap: "wrap",
              paddingTop: "25px",
              borderTop: "1px solid #e1e5eb",
            }}
          >
            <Link
              to={`/courses/${encodeURIComponent(title)}`}
              style={{
                color: "#374151",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: "700",
              }}
            >
              ← Back to {title}
            </Link>

            <Link
              to="/courses"
              style={{
                color: "#6b7280",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              Explore all courses
            </Link>
          </div>
        </section>
      </main>
    );
  }

  // Category page
  return (
    <main
      className="simple-page"
      style={{
        background: "#f6f8fc",
        minHeight: "100vh",
        paddingBottom: "80px",
      }}
    >
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