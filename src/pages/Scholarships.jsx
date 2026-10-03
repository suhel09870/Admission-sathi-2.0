import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import Card from "../components/common/Card";

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadScholarships() {
      setLoading(true);
      setError("");

      const { data, error: scholarshipError } =
        await supabase
          .from("scholarships")
          .select(
            "id, title, provider, description, eligibility, amount, application_deadline, application_url, source_url, verification_status"
          )
          .order("application_deadline", {
            ascending: true,
            nullsFirst: false,
          });

      if (scholarshipError) {
        console.error(
          "Scholarships loading error:",
          scholarshipError
        );

        setError("Scholarships could not be loaded.");
        setLoading(false);
        return;
      }

      setScholarships(data || []);
      setLoading(false);
    }

    loadScholarships();
  }, []);

  if (loading) {
    return (
      <main className="simple-page">
        <section className="simple-page-hero">
          <span className="page-eyebrow">
            SCHOLARSHIP DISCOVERY
          </span>

          <h1>Loading scholarships...</h1>

          <p>
            Fetching verified scholarship opportunities.
          </p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="simple-page">
        <section className="simple-page-hero">
          <span className="page-eyebrow">
            SCHOLARSHIP DISCOVERY
          </span>

          <h1>Unable to load scholarships.</h1>

          <p>{error}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="simple-page">
      <section className="simple-page-hero">
        <span className="page-eyebrow">
          SCHOLARSHIP DISCOVERY
        </span>

        <h1>
          Find support for your education journey.
        </h1>

        <p>
          Explore verified scholarship opportunities and
          discover financial support options that can help
          you continue your education.
        </p>
      </section>

      <section
        className="simple-page-content"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {scholarships.length === 0 ? (
          <div className="no-results">
            <div>🎓</div>

            <h3>No scholarships available</h3>

            <p>
              Verified scholarship information is not
              currently available.
            </p>
          </div>
        ) : (
          scholarships.map((scholarship) => (
            <Card
              as="article"
              className="simple-page-card"
              key={scholarship.id}
              style={{
                width: "100%",
                boxSizing: "border-box",
                cursor: "pointer",
              }}
            >
              <div className="simple-page-card-icon">
                🎓
              </div>

              <span className="page-eyebrow">
                {isSupabaseConfigured ? "VERIFIED SCHOLARSHIP" : "DEMO SCHOLARSHIP"}
              </span>

              <h3>{scholarship.title}</h3>

              {scholarship.provider && (
                <p>
                  <strong>Provider:</strong>{" "}
                  {scholarship.provider}
                </p>
              )}

              {scholarship.description && (
                <p>
                  {scholarship.description}
                </p>
              )}

              {scholarship.amount && (
                <p>
                  <strong>Amount:</strong>{" "}
                  {scholarship.amount}
                </p>
              )}

              {scholarship.application_deadline && (
                <p>
                  <strong>Deadline:</strong>{" "}
                  {scholarship.application_deadline}
                </p>
              )}

              {scholarship.eligibility && (
                <p>
                  <strong>Eligibility:</strong>{" "}
                  {scholarship.eligibility}
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginTop: "18px",
                }}
              >
                <Link
                  to={`/scholarships/${scholarship.id}`}
                  className="view-college"
                >
                  View Scholarship →
                </Link>

                {scholarship.application_url && (
                  <a
                    href={scholarship.application_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="official-link"
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                  >
                    Apply ↗
                  </a>
                )}
              </div>
            </Card>
          ))
        )}
      </section>
    </main>
  );
}