import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Card from "../components/common/Card";

export default function Courses() {
  const [searchParams] = useSearchParams();
  const searchTerm = (searchParams.get("course") || searchParams.get("search") || "")
    .trim()
    .toLowerCase();

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

  const categorySearchTerms = {
    "Computer & IT": ["bca", "b.tech", "btech", "mca", "computer", "technology", "it"],
    "Medical & Health": ["mbbs", "bds", "medical", "health", "pharmacy"],
    Law: ["llb", "law", "ba llb", "bba llb"],
    Management: ["bba", "mba", "business", "management"],
    Science: ["b.sc", "m.sc", "science"],
    "Arts & Humanities": ["arts", "humanities", "social science"],
  };

  const visibleCategories = searchTerm
    ? courseCategories.filter((category) => {
      const terms = [category.title, ...(categorySearchTerms[category.title] || [])];
      return terms.some((term) => term.toLowerCase().includes(searchTerm) ||
        searchTerm.includes(term.toLowerCase()));
    })
    : courseCategories;

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
        {visibleCategories.map((category) => (
          <Card
            as={Link}
            key={category.title}
            to={`/courses/${encodeURIComponent(category.title)}`}
            className="simple-page-card"
            style={{ cursor: "pointer", height: "100%", boxSizing: "border-box", color: "inherit", textDecoration: "none" }}
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
          </Card>
        ))}

        {visibleCategories.length === 0 && (
          <div className="no-results course-search-empty">
            <h3>No course categories match “{searchTerm}”</h3>
            <p>Try another course or clear the search on the home page.</p>
          </div>
        )}
      </section>
    </main>
  );
}