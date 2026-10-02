
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  const [editStatus, setEditStatus] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editNotes, setEditNotes] = useState("");

  async function loadApplications() {
    setLoading(true);
    setError("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError("Please log in to view your applications.");
      setLoading(false);
      return;
    }

    const { data, error: applicationError } =
      await supabase
        .from("applications")
        .select(`
          id,
          college_id,
          program_id,
          status,
          notes,
          application_date,
          created_at,
          updated_at,
          colleges (
            id,
            name,
            city,
            state,
            institution_type,
            ownership,
            official_website
          ),
          programs (
            id,
            program_name,
            duration,
            fees
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

    if (applicationError) {
      console.error(
        "Applications loading error:",
        applicationError
      );

      setError(applicationError.message);
      setLoading(false);
      return;
    }

    setApplications(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadApplications();
  }, []);

  function startEditing(application) {
    setEditingId(application.id);

    setEditStatus(
      application.status || "Planning"
    );

    setEditDate(
      application.application_date || ""
    );

    setEditNotes(
      application.notes || ""
    );

    setError("");
  }

  function cancelEditing() {
    setEditingId(null);
    setEditStatus("");
    setEditDate("");
    setEditNotes("");
  }

  async function saveApplication(applicationId) {
    setSavingId(applicationId);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Please log in first.");
      setSavingId(null);
      return;
    }

    const { data, error: updateError } =
      await supabase
        .from("applications")
        .update({
          status: editStatus,
          application_date: editDate || null,
          notes: editNotes.trim() || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", applicationId)
        .eq("user_id", user.id)
        .select(`
          id,
          college_id,
          program_id,
          status,
          notes,
          application_date,
          created_at,
          updated_at,
          colleges (
            id,
            name,
            city,
            state,
            institution_type,
            ownership,
            official_website
          ),
          programs (
            id,
            program_name,
            duration,
            fees
          )
        `)
        .single();

    if (updateError) {
      console.error(
        "Application update error:",
        updateError
      );

      setError(updateError.message);
      setSavingId(null);
      return;
    }

    setApplications((previous) =>
      previous.map((application) =>
        application.id === applicationId
          ? data
          : application
      )
    );

    cancelEditing();
    setSavingId(null);
  }

  async function removeApplication(applicationId) {
    setRemovingId(applicationId);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Please log in first.");
      setRemovingId(null);
      return;
    }

    const { error: removeError } =
      await supabase
        .from("applications")
        .delete()
        .eq("id", applicationId)
        .eq("user_id", user.id);

    if (removeError) {
      console.error(
        "Application removal error:",
        removeError
      );

      setError(removeError.message);
      setRemovingId(null);
      return;
    }

    setApplications((previous) =>
      previous.filter(
        (application) =>
          application.id !== applicationId
      )
    );

    setRemovingId(null);
  }

  function getStatusClass(status) {
    const value = (status || "")
      .toLowerCase()
      .replace(/\s+/g, "-");

    return `application-status ${value}`;
  }

  if (loading) {
    return (
      <main className="colleges-page">
        <section className="college-hero">
          <span className="page-eyebrow">
            MY APPLICATIONS
          </span>

          <h1>Loading your applications...</h1>

          <p>
            Getting your admission applications.
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
            MY APPLICATIONS
          </span>

          <h1>Track your applications.</h1>

          <p>
            Keep your college applications organised
            in one place.
          </p>
        </div>

        <div
          style={{
            fontSize: "14px",
            fontWeight: "700",
            color: "#111827",
          }}
        >
          {applications.length}{" "}
          {applications.length === 1
            ? "application"
            : "applications"}
        </div>
      </section>

      <section className="college-content">
        <div
          className="college-results"
          style={{
            width: "100%",
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

          {applications.length === 0 ? (
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
                📝
              </div>

              <h3>No applications yet</h3>

              <p>
                Add a program to My Applications from
                any college detail page.
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
                    YOUR APPLICATION JOURNEY
                  </span>

                  <h2>
                    {applications.length}{" "}
                    {applications.length === 1
                      ? "Application"
                      : "Applications"}
                  </h2>
                </div>
              </div>

              <div className="college-list">
                {applications.map((application) => {
                  const college =
                    application.colleges;

                  const program =
                    application.programs;

                  const isEditing =
                    editingId === application.id;

                  return (
                    <article
                      className="college-card"
                      key={application.id}
                    >
                      <div className="college-logo">
                        A+
                      </div>

                      <div className="college-info">
                        <div className="college-topline">
                          <span className="college-type">
                            {college?.institution_type ||
                              "Institution"}
                          </span>

                          {!isEditing && (
                            <span
                              className={getStatusClass(
                                application.status
                              )}
                            >
                              {application.status ||
                                "Planning"}
                            </span>
                          )}
                        </div>

                        <h3>
                          {program?.program_name ||
                            "Program"}
                        </h3>

                        <p className="college-location">
                          📍{" "}
                          {college?.name ||
                            "College"}
                          {college?.city
                            ? ` • ${college.city}`
                            : ""}
                          {college?.state
                            ? `, ${college.state}`
                            : ""}
                        </p>

                        {isEditing ? (
                          <div
                            style={{
                              marginTop: "18px",
                              display: "grid",
                              gap: "14px",
                            }}
                          >
                            <label
                              style={{
                                display: "grid",
                                gap: "6px",
                                fontWeight: "700",
                                fontSize: "13px",
                              }}
                            >
                              Application status

                              <select
                                value={editStatus}
                                onChange={(e) =>
                                  setEditStatus(
                                    e.target.value
                                  )
                                }
                                style={{
                                  padding: "11px",
                                  borderRadius: "9px",
                                  border:
                                    "1px solid #d1d5db",
                                  background: "#fff",
                                }}
                              >
                                <option value="Planning">
                                  Planning
                                </option>

                                <option value="Preparing">
                                  Preparing
                                </option>

                                <option value="Applied">
                                  Applied
                                </option>

                                <option value="Submitted">
                                  Submitted
                                </option>

                                <option value="Under Review">
                                  Under Review
                                </option>

                                <option value="Accepted">
                                  Accepted
                                </option>

                                <option value="Rejected">
                                  Rejected
                                </option>
                              </select>
                            </label>

                            <label
                              style={{
                                display: "grid",
                                gap: "6px",
                                fontWeight: "700",
                                fontSize: "13px",
                              }}
                            >
                              Application date

                              <input
                                type="date"
                                value={editDate}
                                onChange={(e) =>
                                  setEditDate(
                                    e.target.value
                                  )
                                }
                                style={{
                                  padding: "11px",
                                  borderRadius: "9px",
                                  border:
                                    "1px solid #d1d5db",
                                }}
                              />
                            </label>

                            <label
                              style={{
                                display: "grid",
                                gap: "6px",
                                fontWeight: "700",
                                fontSize: "13px",
                              }}
                            >
                              Notes

                              <textarea
                                value={editNotes}
                                onChange={(e) =>
                                  setEditNotes(
                                    e.target.value
                                  )
                                }
                                placeholder="Add notes about this application..."
                                rows="3"
                                style={{
                                  padding: "11px",
                                  borderRadius: "9px",
                                  border:
                                    "1px solid #d1d5db",
                                  resize: "vertical",
                                }}
                              />
                            </label>
                          </div>
                        ) : (
                          <>
                            <div className="college-meta">
                              {program?.duration && (
                                <span>
                                  Duration:{" "}
                                  {program.duration}
                                </span>
                              )}

                              {program?.fees && (
                                <span>
                                  Fees:{" "}
                                  {program.fees}
                                </span>
                              )}

                              {application.application_date && (
                                <span>
                                  Applied:{" "}
                                  {
                                    application.application_date
                                  }
                                </span>
                              )}
                            </div>

                            {application.notes && (
                              <p
                                style={{
                                  marginTop: "10px",
                                  color: "#6b7280",
                                }}
                              >
                                <strong>
                                  Notes:
                                </strong>{" "}
                                {application.notes}
                              </p>
                            )}
                          </>
                        )}
                      </div>

                      <div className="college-actions">
                        {!isEditing &&
                          college?.official_website && (
                            <a
                              href={
                                college.official_website
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="official-link"
                            >
                              Official Website ↗
                            </a>
                          )}

                        {!isEditing &&
                          college?.id && (
                            <Link
                              to={
                                "/colleges/" +
                                college.id
                              }
                              className="view-college"
                            >
                              View College →
                            </Link>
                          )}

                        {isEditing ? (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                saveApplication(
                                  application.id
                                )
                              }
                              disabled={
                                savingId ===
                                application.id
                              }
                              style={{
                                border: "none",
                                background: "#111827",
                                color: "#fff",
                                borderRadius: "10px",
                                padding: "10px 14px",
                                cursor:
                                  savingId ===
                                  application.id
                                    ? "not-allowed"
                                    : "pointer",
                                fontWeight: "700",
                                opacity:
                                  savingId ===
                                  application.id
                                    ? 0.6
                                    : 1,
                              }}
                            >
                              {savingId ===
                              application.id
                                ? "Saving..."
                                : "Save Changes"}
                            </button>

                            <button
                              type="button"
                              onClick={
                                cancelEditing
                              }
                              style={{
                                border:
                                  "1px solid #e5e7eb",
                                background: "#fff",
                                color: "#111827",
                                borderRadius: "10px",
                                padding: "10px 14px",
                                cursor: "pointer",
                                fontWeight: "700",
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                startEditing(
                                  application
                                )
                              }
                              style={{
                                border:
                                  "1px solid #e5e7eb",
                                background: "#fff",
                                color: "#111827",
                                borderRadius: "10px",
                                padding: "10px 14px",
                                cursor: "pointer",
                                fontWeight: "700",
                              }}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                removeApplication(
                                  application.id
                                )
                              }
                              disabled={
                                removingId ===
                                application.id
                              }
                              style={{
                                border:
                                  "1px solid #e5e7eb",
                                background: "#fff",
                                color: "#dc2626",
                                borderRadius: "10px",
                                padding: "10px 14px",
                                cursor:
                                  removingId ===
                                  application.id
                                    ? "not-allowed"
                                    : "pointer",
                                fontWeight: "700",
                                opacity:
                                  removingId ===
                                  application.id
                                    ? 0.6
                                    : 1,
                              }}
                            >
                              {removingId ===
                              application.id
                                ? "Removing..."
                                : "Remove"}
                            </button>
                          </>
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
    </main>
  );
}