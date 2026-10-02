
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function SavedColleges() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    async function loadSavedColleges() {
      setLoading(true);
      setError("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError("Please log in to view your saved colleges.");
        setLoading(false);
        return;
      }

      const {
        data: savedData,
        error: savedError,
      } = await supabase
        .from("saved_colleges")
        .select("college_id, created_at")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (savedError) {
        console.error(savedError);
        setError(savedError.message);
        setLoading(false);
        return;
      }

      if (!savedData || savedData.length === 0) {
        setColleges([]);
        setLoading(false);
        return;
      }

      const collegeIds = savedData.map(
        (item) => item.college_id
      );

      const {
        data: collegeData,
        error: collegeError,
      } = await supabase
        .from("colleges")
        .select("*")
        .in("id", collegeIds);

      if (collegeError) {
        console.error(collegeError);
        setError(collegeError.message);
        setLoading(false);
        return;
      }

      const savedOrder = new Map(
        savedData.map((item, index) => [
          item.college_id,
          index,
        ])
      );

      const sortedColleges = [
        ...(collegeData || []),
      ].sort(
        (a, b) =>
          (savedOrder.get(a.id) ?? 9999) -
          (savedOrder.get(b.id) ?? 9999)
      );

      setColleges(sortedColleges);
      setLoading(false);
    }

    loadSavedColleges();
  }, []);

  async function removeCollege(collegeId) {
    setRemovingId(collegeId);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Please log in first.");
      setRemovingId(null);
      return;
    }

    const { error: removeError } = await supabase
      .from("saved_colleges")
      .delete()
      .eq("user_id", user.id)
      .eq("college_id", collegeId);

    if (removeError) {
      console.error(removeError);
      setError(removeError.message);
      setRemovingId(null);
      return;
    }

    setColleges((previous) =>
      previous.filter(
        (college) => college.id !== collegeId
      )
    );

    setRemovingId(null);
  }

  if (loading) {
    return (
      <main className="colleges-page saved-colleges-page">
        <section className="college-hero">
          <span className="page-eyebrow">
            SAVED COLLEGES
          </span>

          <h1>Loading your saved colleges...</h1>

          <p>
            Getting your saved colleges from Admission
            Saathi.
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
            SAVED COLLEGES
          </span>

          <h1>Your saved colleges.</h1>

          <p>
            Keep the colleges you are interested in one
            place.
          </p>
        </div>

        <div className="saved-colleges-count">
          {colleges.length} saved
        </div>
      </section>

      <section className="college-content">
        <div className="college-results saved-colleges-results">
          {error && (
            <p className="saved-colleges-error">
              {error}
            </p>
          )}

          {colleges.length === 0 ? (
            <div className="no-results saved-colleges-empty">
              <div className="saved-colleges-empty-icon">
                ♡
              </div>

              <h3>No saved colleges yet</h3>

              <p>
                Explore colleges and save the ones you
                want to consider later.
              </p>

              <Link
                to="/colleges"
                className="view-college saved-colleges-explore"
              >
                Explore Colleges →
              </Link>
            </div>
          ) : (
            <>
              <div className="results-header">
                <div>
                  <span>YOUR COLLECTION</span>

                  <h2>
                    {colleges.length} Saved{" "}
                    {colleges.length === 1
                      ? "College"
                      : "Colleges"}
                  </h2>
                </div>
              </div>

              <div className="college-list">
                {colleges.map((college) => (
                  <article
                    className="college-card saved-colleges-card"
                    key={college.id}
                  >
                    <div className="college-logo">
                      A+
                    </div>

                    <div className="college-info">
                      <div className="college-topline">
                        <span className="college-type">
                          {college.institution_type ||
                            college.category ||
                            "Institution"}
                        </span>

                        <span className="verified-badge">
                          ✓ Verified
                        </span>
                      </div>

                      <h3>{college.name}</h3>

                      <p className="college-location">
                        📍 {college.city || "India"}
                        {college.state
                          ? ", " + college.state
                          : ""}
                      </p>

                      <div className="college-meta">
                        {college.ownership && (
                          <span>
                            {college.ownership}
                          </span>
                        )}

                        {college.established_year && (
                          <span>
                            Est.{" "}
                            {college.established_year}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="college-actions">
                      <button
                        type="button"
                        className="saved-college-remove"
                        onClick={() =>
                          removeCollege(college.id)
                        }
                        disabled={
                          removingId === college.id
                        }
                      >
                        {removingId === college.id
                          ? "Removing..."
                          : "♥ Remove"}
                      </button>

                      <Link
                        to={`/colleges/${college.id}`}
                        className="view-college"
                      >
                        View College →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
