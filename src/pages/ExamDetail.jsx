import { Link, useParams } from "react-router-dom";

const examData = {
  engineering: {
    title: "Engineering Entrance Exams",
    description:
      "Explore major entrance exams for admission to engineering programs across India.",
    exams: [
      {
        slug: "jee-main",
        name: "JEE Main",
        fullName: "Joint Entrance Examination Main",
        level: "National",
        description:
          "A national-level entrance examination for admission to undergraduate engineering programs.",
        eligibility:
          "Eligibility depends on the applicable year and official examination rules.",
      },
      {
        slug: "jee-advanced",
        name: "JEE Advanced",
        fullName: "Joint Entrance Examination Advanced",
        level: "National",
        description:
          "An entrance examination used for admission to participating IIT undergraduate programs.",
        eligibility:
          "Eligibility is based on the official examination rules and qualifying requirements.",
      },
      {
        slug: "bitsat",
        name: "BITSAT",
        fullName:
          "Birla Institute of Technology and Science Admission Test",
        level: "University",
        description:
          "An entrance examination for admission to undergraduate programs at participating BITS campuses.",
        eligibility:
          "Eligibility depends on the official BITS admission requirements.",
      },
    ],
  },

  medical: {
    title: "Medical Entrance Exams",
    description:
      "Discover major entrance examinations used for medical and healthcare admissions.",
    exams: [
      {
        slug: "neet-ug",
        name: "NEET UG",
        fullName:
          "National Eligibility cum Entrance Test Undergraduate",
        level: "National",
        description:
          "The national entrance examination used for undergraduate medical admissions in India.",
        eligibility:
          "Eligibility depends on the applicable year and official examination rules.",
      },
      {
        slug: "neet-pg",
        name: "NEET PG",
        fullName:
          "National Eligibility cum Entrance Test Postgraduate",
        level: "Postgraduate",
        description:
          "An entrance examination route associated with postgraduate medical admissions.",
        eligibility:
          "Eligibility depends on the applicable examination and admission regulations.",
      },
    ],
  },

  university: {
    title: "University Entrance Exams",
    description:
      "Explore entrance examinations conducted or accepted for university-level admissions.",
    exams: [
      {
        slug: "cuet-ug",
        name: "CUET UG",
        fullName:
          "Common University Entrance Test Undergraduate",
        level: "National",
        description:
          "A common entrance examination used by participating universities for undergraduate admissions.",
        eligibility:
          "Eligibility depends on the participating university, program and official rules.",
      },
      {
        slug: "cuet-pg",
        name: "CUET PG",
        fullName:
          "Common University Entrance Test Postgraduate",
        level: "Postgraduate",
        description:
          "A common entrance examination for postgraduate admissions at participating universities.",
        eligibility:
          "Eligibility depends on the participating university, program and official rules.",
      },
    ],
  },
};

export default function ExamDetail() {
  const { category } = useParams();

  const categoryData =
    examData[category?.toLowerCase()];

  if (!categoryData) {
    return (
      <main className="exam-detail-page">
        <section className="exam-detail-empty">
          <span className="page-eyebrow">
            EXAM DISCOVERY
          </span>

          <h1>Exam category not found.</h1>

          <p>
            The exam category you are looking for does not exist.
          </p>

          <Link
            to="/exams"
            className="exam-back-button"
          >
            ← Back to Exams
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="exam-detail-page">
      <section className="exam-detail-hero">
        <Link
          to="/exams"
          className="exam-back-link"
        >
          ← Back to Exams
        </Link>

        <span className="page-eyebrow">
          ENTRANCE EXAMS
        </span>

        <h1>{categoryData.title}</h1>

        <p>{categoryData.description}</p>
      </section>

      <section className="exam-detail-content">
        <div className="exam-detail-heading">
          <span>AVAILABLE EXAMS</span>

          <h2>Explore entrance exams.</h2>

          <p>
            Select an exam to understand its purpose,
            level and basic eligibility information.
          </p>
        </div>

        <div className="exam-detail-list">
          {categoryData.exams.map((exam) => (
            <article
              className="exam-detail-card"
              key={exam.name}
            >
              <div className="exam-detail-icon">
                🎓
              </div>

              <div className="exam-detail-info">
                <div className="exam-detail-topline">
                  <span>{exam.level}</span>
                </div>

                <h3>{exam.name}</h3>

                <p className="exam-full-name">
                  {exam.fullName}
                </p>

                <p>{exam.description}</p>

                <div className="exam-eligibility">
                  <strong>Eligibility</strong>

                  <span>
                    {exam.eligibility}
                  </span>
                </div>
              </div>
                <div className="exam-detail-action">
                  <Link
                    to={`/exams/${category}/${exam.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="exam-view-details"
                 >
                  View Details →
                 </Link>
                 </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}