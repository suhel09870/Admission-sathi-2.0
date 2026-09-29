import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function ScholarshipDetail() {
  const { id } = useParams();

  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadScholarship() {
      setLoading(true);
      setError("");

      const scholarshipId = Number(id);

      if (!Number.isInteger(scholarshipId)) {
        setError("Invalid scholarship ID.");
        setLoading(false);
        return;
      }

      const { data, error: scholarshipError } =
        await supabase
          .from("scholarships")
          .select("*")
          .eq("id", scholarshipId)
          .maybeSingle();

      if (scholarshipError) {
        console.error(
          "Scholarship loading error:",
          scholarshipError
        );

        setError("Scholarship could not be loaded.");
        setLoading(false);
        return;
      }

      if (!data) {
        setError("Scholarship not found.");
        setLoading(false);
        return;
      }

      setScholarship(data);
      setLoading(false);
    }

    loadScholarship();
  }, [id]);

  if (loading) {
    return (
      <main className="simple-page">
        <section className="simple-page-hero">
          <span className="page-eyebrow">
            SCHOLARSHIP
          </span>

          <h1>Loading scholarship...</h1>

          <p>
            Fetching verified scholarship information.
          </p>
        </section>
      </main>
    );
  }

  if (error || !scholarship) {
    return (
      <main className="simple-page">
        <section className="simple-page-hero">
          <span className="page-eyebrow">
            SCHOLARSHIP
          </span>

          <h1>Scholarship not found</h1>

          <p>
            {error ||
              "The requested scholarship could not be found."}
          </p>

          <Link
            to="/scholarships"
            className="view-college"
            style={{
              display: "inline-block",
              marginTop: "20px",
            }}
          >
            ← Back to Scholarships
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="simple-page">
      <section
        className="simple-page-hero"
        style={{
          textAlign: "left",
          maxWidth: "1000px",
        }}
      >
        <span className="page-eyebrow">
          VERIFIED SCHOLARSHIP
        </span>

        <h1>{scholarship.title}</h1>

        <p>
          {scholarship.description ||
            "Verified scholarship information available on Admission Saathi."}
        </p>
      </section>

      <section
        className="simple-page-content"
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <article
          className="simple-page-card"
          style={{
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div className="simple-page-card-icon">
            🎓
          </div>

          <h3>
            Scholarship Information
          </h3>

          {scholarship.provider && (
            <p>
              <strong>Provider:</strong>{" "}
              {scholarship.provider}
            </p>
          )}

          {scholarship.eligibility && (
            <p>
              <strong>Eligibility:</strong>{" "}
              {scholarship.eligibility}
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
              <strong>Application Deadline:</strong>{" "}
              {scholarship.application_deadline}
            </p>
          )}

          {scholarship.verification_status && (
            <p>
              <strong>Verification:</strong>{" "}
              {scholarship.verification_status}
            </p>
          )}

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "25px",
            }}
          >
            {scholarship.application_url && (
              <a
                href={scholarship.application_url}
                target="_blank"
                rel="noopener noreferrer"
                className="view-college"
              >
                Apply / Official Page ↗
              </a>
            )}

            {scholarship.source_url && (
              <a
                href={scholarship.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="official-link"
              >
                Verified Source ↗
              </a>
            )}

            <Link
              to="/scholarships"
              className="official-link"
            >
              ← Back to Scholarships
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}