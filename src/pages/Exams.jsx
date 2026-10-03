import { useNavigate } from "react-router-dom";
import Card from "../components/common/Card";

export default function Exams() {
  const navigate = useNavigate();

  const examCategories = [
    {
      icon: "🎓",
      category: "ENGINEERING",
      title: "Engineering Entrance Exams",
      text: "Explore exams used for admission to engineering programs across India.",
      slug: "engineering",
    },
    {
      icon: "🩺",
      category: "MEDICAL",
      title: "Medical Entrance Exams",
      text: "Discover medical entrance exams and admission opportunities.",
      slug: "medical",
    },
    {
      icon: "📚",
      category: "UNIVERSITY",
      title: "University Entrance Exams",
      text: "Find university-level entrance exams for different undergraduate and postgraduate courses.",
      slug: "university",
    },
  ];

  return (
    <main className="exams-page">
      <section className="exams-hero">
        <div>
          <span className="page-eyebrow">ENTRANCE EXAMS</span>

          <h1>
            Find the right exam
            <br />
            for your future.
          </h1>

          <p>
            Explore entrance exams, eligibility requirements and
            admission information to plan your next step.
          </p>
        </div>

        <div className="exams-hero-card">
          <span>EXAM DISCOVERY</span>

          <strong>Prepare smarter.</strong>

          <p>
            Discover important entrance exams in one place.
          </p>
        </div>
      </section>

      <section className="exams-content">
        <div className="section-heading">
          <span>EXPLORE EXAMS</span>

          <h2>Entrance exams made simpler.</h2>

          <p>
            Find exams related to different courses and understand
            the admission journey.
          </p>
        </div>

        <div className="exam-grid">
          {examCategories.map((exam) => (
            <Card
              as="article"
              className="exam-card"
              key={exam.slug}
            >
              <div className="exam-icon">
                {exam.icon}
              </div>

              <span>{exam.category}</span>

              <h3>{exam.title}</h3>

              <p>{exam.text}</p>

              <button
                type="button"
                onClick={() =>
                  navigate(`/exams/${exam.slug}`)
                }
              >
                Explore Exams →
              </button>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}