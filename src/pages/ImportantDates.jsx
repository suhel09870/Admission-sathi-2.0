import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function ImportantDates() {
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadImportantDates() {
    setLoading(true);
    setError("");

    const { data, error: datesError } = await supabase
      .from("important_dates")
      .select(`
        id,
        college_id,
        title,
        date,
        description,
        source_url,
        verification_status,
        colleges (
          id,
          name,
          city,
          state,
          institution_type,
          ownership
        )
      `)
      .order("date", { ascending: true });

    if (datesError) {
      console.error(
        "Important dates loading error:",
        datesError
      );

      setError(datesError.message);
      setDates([]);
      setLoading(false);
      return;
    }

    setDates(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadImportantDates();
  }, []);

  function formatDate(dateValue) {
    if (!dateValue) {
      return "Date not available";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function getStatusClass(status) {
    const value = (status || "Verified")
      .toLowerCase()
      .replace(/\s+/g, "-");

    return `application-status ${value}`;
  }

  if (loading) {
    return (
      <main className="colleges-page">
        <section className="college-hero">
          <span className="page-eyebrow">
            IMPORTANT DATES
          </span>

          <h1>Loading important dates...</h1>

          <p>
            Fetching verified admission deadlines and
            dates.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="colleges-page">
      <section className="college-hero">
        <div>
          <span className="page-eyebrow">
            IMPORTANT DATES
          </span>

          <h1>
            Stay ahead of admission deadlines.
          </h1>

          <p>
            Keep track of important application and
            admission dates in one place.
          </p>
        </div>

        <Link
          to="/dashboard"
          className="view-college"
        >
          ← Dashboard
        </Link>
      </section>

      {/* Important Dates Content */}
      <section
        className="college-content"
        style={{
          display: "block",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px 50px",
          boxSizing: "border-box",
        }}
      >
        <div
          className="college-results"
          style={{
            width: "100%",
            maxWidth: "100%",
            minWidth: 0,
            boxSizing: "border-box",
          }}
        >
          {error && (
            <p
              style={{
                color: "#dc2626",
                background: "#fef2f2",
                padding: "12px 14px",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              {error}
            </p>
          )}

          {dates.length === 0 ? (
            <div
              className="no-results"
              style={{
                padding: "70px 25px",
              }}
            >
              <div
                style={{
                  fontSize: "42px",
                  marginBottom: "15px",
                }}
              >
                📅
              </div>

              <h3>
                No important dates available yet
              </h3>

              <p>
                Verified admission dates will appear
                here when they are added to the database.
              </p>

              <Link
                to="/colleges"
                className="view-college"
                style={{
                  display: "inline-block",
                  marginTop: "15px",
                }}
              >
                Explore Colleges →
              </Link>
            </div>
          ) : (
            <>
              <div className="results-header">
                <div>
                  <span>
                    ADMISSION CALENDAR
                  </span>

                  <h2>
                    Important Dates
                  </h2>
                </div>

                <span>
                  {dates.length}{" "}
                  {dates.length === 1
                    ? "date"
                    : "dates"}
                </span>
              </div>

              {/* DATE CARDS */}
              <div
                className="college-list"
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(2, minmax(0, 1fr))",
                  gap: "20px",
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                }}
              >
                {dates.map((item) => {
                  const college = item.colleges;

                  return (
                    <article
                      className="college-card"
                      key={item.id}
                      style={{
                        width: "100%",
                        minWidth: 0,
                        boxSizing: "border-box",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "18px",
                        padding: "22px",
                      }}
                    >
                      <div
                        className="college-logo"
                        style={{
                          flex: "0 0 48px",
                          width: "48px",
                          height: "48px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        📅
                      </div>

                      <div
                        className="college-info"
                        style={{
                          flex: "1 1 auto",
                          minWidth: 0,
                        }}
                      >
                        <div className="college-topline">
                          <span className="college-type">
                            {college?.institution_type ||
                              "Admission Date"}
                          </span>

                          <span
                            className={getStatusClass(
                              item.verification_status
                            )}
                          >
                            {item.verification_status ||
                              "Verified"}
                          </span>
                        </div>

                        <h3
                          style={{
                            margin: "8px 0",
                            lineHeight: "1.35",
                            wordBreak: "normal",
                            overflowWrap: "break-word",
                          }}
                        >
                          {item.title ||
                            "Important Admission Date"}
                        </h3>

                        {college?.name && (
                          <p
                            className="college-location"
                            style={{
                              lineHeight: "1.5",
                              wordBreak: "normal",
                              overflowWrap: "break-word",
                            }}
                          >
                            🎓 {college.name}
                            {college.city
                              ? ` • ${college.city}`
                              : ""}
                            {college.state
                              ? `, ${college.state}`
                              : ""}
                          </p>
                        )}

                        <div className="college-meta">
                          <span>
                            Date:{" "}
                            {formatDate(item.date)}
                          </span>
                        </div>

                        {item.description && (
                          <p
                            style={{
                              marginTop: "10px",
                              color: "#6b7280",
                              lineHeight: "1.6",
                              wordBreak: "normal",
                              overflowWrap: "break-word",
                            }}
                          >
                            {item.description}
                          </p>
                        )}
                      </div>

                      <div
                        className="college-actions"
                        style={{
                          flex: "0 0 auto",
                          minWidth: "120px",
                        }}
                      >
                        {college?.id && (
                          <Link
                            to={`/colleges/${college.id}`}
                            className="view-college"
                          >
                            View College →
                          </Link>
                        )}

                        {item.source_url && (
                          <a
                            href={item.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="official-link"
                          >
                            Verified Source ↗
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 900px) {
          .college-list {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 650px) {
          .college-content {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          .college-card {
            flex-direction: column !important;
          }

          .college-actions {
            width: 100% !important;
            min-width: 0 !important;
          }
        }
      `}</style>
    </main>
  );
}