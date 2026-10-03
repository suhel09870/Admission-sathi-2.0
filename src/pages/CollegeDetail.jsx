import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export default function CollegeDetail() {
  const { id } = useParams();

  const [college, setCollege] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [applicationProgramId, setApplicationProgramId] =
    useState(null);

  const [applicationStatus, setApplicationStatus] =
    useState("Planning");

  const [applicationDate, setApplicationDate] =
    useState("");

  const [applicationNotes, setApplicationNotes] =
    useState("");

  const [savingApplication, setSavingApplication] =
    useState(false);

  const [applicationMessage, setApplicationMessage] =
    useState("");

  useEffect(() => {
    async function loadCollege() {
      setLoading(true);
      setError("");

      const collegeId = Number(id);

      if (!Number.isInteger(collegeId)) {
        setError("Invalid college ID.");
        setLoading(false);
        return;
      }

      const { data: collegeData, error: collegeError } =
        await supabase
          .from("colleges")
          .select("*")
          .eq("id", collegeId)
          .maybeSingle();

      if (collegeError) {
        console.error(
          "College loading error:",
          collegeError
        );

        setError("College could not be loaded.");
        setLoading(false);
        return;
      }

      if (!collegeData) {
        setError("College not found.");
        setLoading(false);
        return;
      }

      const { data: programData, error: programError } =
        await supabase
          .from("programs")
          .select(
            "id, college_id, program_name, duration, fees, eligibility, admission_status, application_url, academic_data_verified_at, source_url"
          )
          .eq("college_id", collegeId)
          .order("program_name", {
            ascending: true,
          });

      if (programError) {
        console.error(
          "Program loading error:",
          programError
        );

        setCollege(collegeData);
        setPrograms([]);
        setError("Programs could not be loaded.");
        setLoading(false);
        return;
      }

      setCollege(collegeData);
      setPrograms(programData || []);
      setLoading(false);
    }

    loadCollege();
  }, [id]);

  function openApplicationForm(programId) {
    setApplicationProgramId(programId);
    setApplicationStatus("Planning");
    setApplicationDate("");
    setApplicationNotes("");
    setApplicationMessage("");
  }

  function closeApplicationForm() {
    setApplicationProgramId(null);
    setApplicationMessage("");
  }

  async function handleAddApplication(event) {
    event.preventDefault();

    if (!applicationProgramId) {
      return;
    }

    setSavingApplication(true);
    setApplicationMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setApplicationMessage(
        "Please log in to add an application."
      );

      setSavingApplication(false);
      return;
    }

    const { data: existingApplication } =
      await supabase
        .from("applications")
        .select("id")
        .eq("user_id", user.id)
        .eq("college_id", college.id)
        .eq("program_id", applicationProgramId)
        .maybeSingle();

    if (existingApplication) {
      setApplicationMessage(
        "This program is already in My Applications."
      );

      setSavingApplication(false);
      return;
    }

    const { error: insertError } =
      await supabase
        .from("applications")
        .insert({
          user_id: user.id,
          college_id: college.id,
          program_id: applicationProgramId,
          status: applicationStatus,
          notes: applicationNotes.trim() || null,
          application_date:
            applicationDate || null,
        });

    if (insertError) {
      console.error(
        "Application save error:",
        insertError
      );

      setApplicationMessage(
        insertError.message
      );

      setSavingApplication(false);
      return;
    }

    setApplicationMessage(
      "Application added successfully."
    );

    setSavingApplication(false);
  }

  if (loading) {
    return (
      <main className="college-detail-page">
        <div className="no-results">
          <div>⏳</div>
          <h2>Loading college...</h2>
          <p>
            Fetching verified college information...
          </p>
        </div>
      </main>
    );
  }

  if (error && !college) {
    return (
      <main className="college-detail-page">
        <div className="no-results">
          <div>⚠️</div>

          <h2>Unable to load college</h2>

          <p>{error}</p>

          <Link
            to="/colleges"
            className="view-college"
          >
            Back to Colleges
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="college-detail-page">
      <section className="college-detail-hero">
        <div className="college-detail-logo">
          A+
        </div>

        <div className="college-detail-heading">
          <span className="page-eyebrow">
            {isSupabaseConfigured ? "VERIFIED INSTITUTION" : "SAMPLE INSTITUTION"}
          </span>

          <h1>{college.name}</h1>

          <p>
            📍 {college.city || "India"}
            {college.state
              ? `, ${college.state}`
              : ""}
          </p>

          <div className="college-detail-badges">
            {college.institution_type && (
              <span>
                {college.institution_type}
              </span>
            )}

            {college.ownership && (
              <span>
                {college.ownership}
              </span>
            )}

            <span>{isSupabaseConfigured ? "✓ Verified" : "Demo data"}</span>
          </div>
        </div>

        {college.official_website && (
          <a
            href={college.official_website}
            target="_blank"
            rel="noopener noreferrer"
            className="official-link"
          >
            Official Website ↗
          </a>
        )}
      </section>

      <section className="college-detail-content">
        <div className="college-detail-main">

          <div className="detail-section">
            <div className="detail-section-heading">
              <span>INSTITUTION</span>

              <h2>College information</h2>
            </div>

            {college.description ? (
              <p>{college.description}</p>
            ) : (
              <p>
                Verified information for{" "}
                {college.name} is available on
                Admission Saathi.
              </p>
            )}

            <div className="college-facts">
              {college.established_year && (
                <div className="college-fact">
                  <span>Established</span>

                  <strong>
                    {college.established_year}
                  </strong>
                </div>
              )}

              {college.institution_type && (
                <div className="college-fact">
                  <span>Institution Type</span>

                  <strong>
                    {college.institution_type}
                  </strong>
                </div>
              )}

              {college.ownership && (
                <div className="college-fact">
                  <span>Ownership</span>

                  <strong>
                    {college.ownership}
                  </strong>
                </div>
              )}

              {college.affiliation && (
                <div className="college-fact">
                  <span>Affiliation</span>

                  <strong>
                    {college.affiliation}
                  </strong>
                </div>
              )}
            </div>
          </div>

          <div className="detail-section">
            <div className="detail-section-heading">
              <span>ACADEMIC PROGRAMS</span>

              <h2>
                {programs.length}{" "}
                {programs.length === 1
                  ? "Program"
                  : "Programs"}
              </h2>
            </div>

            {programs.length === 0 ? (
              <div className="no-results">
                <div>🎓</div>

                <h3>No programs available</h3>

                <p>
                  Verified program information is not
                  currently available.
                </p>
              </div>
            ) : (
              <div className="program-list">
                {programs.map((program) => (
                  <article
                    className="program-card"
                    key={program.id}
                  >
                    <div className="program-card-content">
                      <span className="program-label">
                        VERIFIED PROGRAM
                      </span>

                      <h3>
                        {program.program_name ||
                          "Program information"}
                      </h3>

                      {program.duration && (
                        <p>
                          <strong>
                            Duration:
                          </strong>{" "}
                          {program.duration}
                        </p>
                      )}

                      {program.fees && (
                        <p>
                          <strong>Fees:</strong>{" "}
                          {program.fees}
                        </p>
                      )}

                      {program.eligibility && (
                        <p>
                          <strong>
                            Eligibility:
                          </strong>{" "}
                          {program.eligibility}
                        </p>
                      )}

                      {program.admission_status && (
                        <p>
                          <strong>
                            Status:
                          </strong>{" "}
                          {program.admission_status}
                        </p>
                      )}

                      {program.academic_data_verified_at && (
                        <p className="program-verified-date">
                          Verified:{" "}
                          {
                            program.academic_data_verified_at
                          }
                        </p>
                      )}
                    </div>

                    <div className="program-actions">

                      <button
                        type="button"
                        onClick={() =>
                          openApplicationForm(
                            program.id
                          )
                        }
                        className="view-college"
                      >
                        Add to My Applications
                      </button>

                      {program.application_url && (
                        <a
                          href={
                            program.application_url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="official-link"
                        >
                          Apply / Admission ↗
                        </a>
                      )}

                      {program.source_url && (
                        <a
                          href={program.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="official-link"
                        >
                          Verified Source ↗
                        </a>
                      )}

                      {!program.application_url &&
                        !program.source_url && (
                          <span className="program-no-link">
                            Application link not available
                          </span>
                        )}
                    </div>

                    {applicationProgramId ===
                      program.id && (
                      <form
                        onSubmit={
                          handleAddApplication
                        }
                        style={{
                          width: "100%",
                          marginTop: "20px",
                          padding: "20px",
                          background:
                            "#f8fafc",
                          border:
                            "1px solid #e5e7eb",
                          borderRadius: "14px",
                          boxSizing:
                            "border-box",
                        }}
                      >
                        <h4
                          style={{
                            marginTop: 0,
                            color: "#111827",
                          }}
                        >
                          Add to My Applications
                        </h4>

                        <label
                          style={{
                            display: "block",
                            marginBottom: "14px",
                          }}
                        >
                          Status

                          <select
                            value={
                              applicationStatus
                            }
                            onChange={(event) =>
                              setApplicationStatus(
                                event.target.value
                              )
                            }
                            style={{
                              display:
                                "block",
                              width: "100%",
                              marginTop: "7px",
                              padding:
                                "11px",
                              boxSizing:
                                "border-box",
                              border:
                                "1px solid #d1d5db",
                              borderRadius:
                                "8px",
                            }}
                          >
                            <option>
                              Planning
                            </option>

                            <option>
                              Preparing
                            </option>

                            <option>
                              Applied
                            </option>

                            <option>
                              Shortlisted
                            </option>

                            <option>
                              Accepted
                            </option>

                            <option>
                              Rejected
                            </option>
                          </select>
                        </label>

                        <label
                          style={{
                            display: "block",
                            marginBottom: "14px",
                          }}
                        >
                          Application date

                          <input
                            type="date"
                            value={
                              applicationDate
                            }
                            onChange={(event) =>
                              setApplicationDate(
                                event.target.value
                              )
                            }
                            style={{
                              display:
                                "block",
                              width: "100%",
                              marginTop: "7px",
                              padding:
                                "11px",
                              boxSizing:
                                "border-box",
                              border:
                                "1px solid #d1d5db",
                              borderRadius:
                                "8px",
                            }}
                          />
                        </label>

                        <label
                          style={{
                            display: "block",
                            marginBottom: "14px",
                          }}
                        >
                          Notes

                          <textarea
                            value={
                              applicationNotes
                            }
                            onChange={(event) =>
                              setApplicationNotes(
                                event.target.value
                              )
                            }
                            placeholder="Add any notes..."
                            rows="3"
                            style={{
                              display:
                                "block",
                              width: "100%",
                              marginTop: "7px",
                              padding:
                                "11px",
                              boxSizing:
                                "border-box",
                              border:
                                "1px solid #d1d5db",
                              borderRadius:
                                "8px",
                              resize:
                                "vertical",
                            }}
                          />
                        </label>

                        {applicationMessage && (
                          <p
                            style={{
                              color:
                                applicationMessage.includes(
                                  "successfully"
                                )
                                  ? "#15803d"
                                  : "#dc2626",
                              fontWeight:
                                "600",
                            }}
                          >
                            {
                              applicationMessage
                            }
                          </p>
                        )}

                        <div
                          style={{
                            display:
                              "flex",
                            gap: "10px",
                            flexWrap:
                              "wrap",
                          }}
                        >
                          <button
                            type="submit"
                            disabled={
                              savingApplication
                            }
                            className="view-college"
                            style={{
                              border: "none",
                              cursor:
                                savingApplication
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                          >
                            {savingApplication
                              ? "Adding..."
                              : "Add Application →"}
                          </button>

                          <button
                            type="button"
                            onClick={
                              closeApplicationForm
                            }
                            style={{
                              padding:
                                "10px 16px",
                              border:
                                "1px solid #d1d5db",
                              background:
                                "#fff",
                              borderRadius:
                                "8px",
                              cursor:
                                "pointer",
                              fontWeight:
                                "600",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>

        <aside className="college-detail-sidebar">
          <div className="detail-sidebar-card">
            <span>PROGRAMS</span>

            <strong>
              {programs.length}
            </strong>

            <p>Verified programs</p>
          </div>

          {college.last_verified_at && (
            <div className="detail-sidebar-card">
              <span>LAST VERIFIED</span>

              <strong>
                {college.last_verified_at}
              </strong>

              <p>
                Database verification date
              </p>
            </div>
          )}

          {college.address && (
            <div className="detail-sidebar-card">
              <span>ADDRESS</span>

              <p>{college.address}</p>
            </div>
          )}

          <Link
            to="/colleges"
            className="back-to-colleges"
          >
            ← Back to all colleges
          </Link>
        </aside>
      </section>
    </main>
  );
}