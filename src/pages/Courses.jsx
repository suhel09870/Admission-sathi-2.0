import { Link } from "react-router-dom";

export default function Courses() {
  const courseCategories = [
    {
      icon: "💻",
      title: "Computer & IT",
      text: "Explore technology, computer science and information technology courses.",
    },
    {
      icon: "⚕️",
      title: "Medical & Health",
      text: "Discover medical, healthcare and allied health study options.",
    },
    {
      icon: "⚖️",
      title: "Law",
      text: "Explore undergraduate and postgraduate law programs.",
    },
    {
      icon: "📊",
      title: "Management",
      text: "Find business, management and administration courses.",
    },
    {
      icon: "🔬",
      title: "Science",
      text: "Explore science programs across different specializations.",
    },
    {
      icon: "🎨",
      title: "Arts & Humanities",
      text: "Discover courses in arts, humanities and social sciences.",
    },
  ];

  return (
    <main className="simple-page">
      <section className="simple-page-hero">
        <span className="page-eyebrow">
          COURSE DISCOVERY
        </span>

        <h1>
          Explore courses that shape your future.
        </h1>

        <p>
          Discover undergraduate and postgraduate courses across
          different fields and understand where each path can take you.
        </p>
      </section>

      <section className="simple-page-content">
        {courseCategories.map((category) => (
          <Link
            key={category.title}
            to={`/courses/${encodeURIComponent(category.title)}`}
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
              <div className="simple-page-card-icon">
                {category.icon}
              </div>

              <h3>{category.title}</h3>

              <p>{category.text}</p>

              <span
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  color: "#111827",
                  fontSize: "12px",
                  fontWeight: "800",
                }}
              >
                Explore {category.title} →
              </span>
            </article>
          </Link>
        ))}
      </section>
    </main>
  );
}