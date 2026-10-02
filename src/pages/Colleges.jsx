
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Colleges() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [colleges, setColleges] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [savedCollegeIds, setSavedCollegeIds] = useState(new Set());

  const [search, setSearch] = useState(
    () => searchParams.get("search") || ""
  );

  const [stateFilter, setStateFilter] =
    useState("All States");

  const [ownershipFilter, setOwnershipFilter] =
    useState("All Ownership");

  const [typeFilter, setTypeFilter] =
    useState("All Types");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingCollegeId, setSavingCollegeId] =
    useState(null);

  useEffect(() => {
    async function loadColleges() {
      setLoading(true);
      setError("");

      const collegeResult = await supabase
        .from("colleges")
        .select("*")
        .order("name", { ascending: true });

      if (collegeResult.error) {
        console.error(
          "College loading error:",
          collegeResult.error
        );

        setError("Colleges could not be loaded.");
        setColleges([]);
        setLoading(false);
        return;
      }

      const programResult = await supabase
        .from("programs")
        .select("college_id, program_name");

      if (programResult.error) {
        console.error(
          "Program loading error:",
          programResult.error
        );

        setError(
          "Program information could not be loaded."
        );

        setColleges([]);
        setPrograms([]);
        setLoading(false);
        return;
      }

      const programData = programResult.data || [];

      setPrograms(programData);

      const programCounts = {};

      programData.forEach((program) => {
        const collegeId = program.college_id;

        if (
          collegeId !== null &&
          collegeId !== undefined
        ) {
          programCounts[collegeId] =
            (programCounts[collegeId] || 0) + 1;
        }
      });

      const formattedColleges = (
        collegeResult.data || []
      ).map((college) => ({
        ...college,
        programCount:
          programCounts[college.id] || 0,
      }));

      setColleges(formattedColleges);

      await loadSavedColleges();

      setLoading(false);
    }

    async function loadSavedColleges() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setSavedCollegeIds(new Set());
        return;
      }

      const { data, error: savedError } =
        await supabase
          .from("saved_colleges")
          .select("college_id")
          .eq("user_id", user.id);

      if (savedError) {
        console.error(
          "Saved colleges loading error:",
          savedError
        );
        return;
      }

      const ids = new Set(
        (data || []).map((item) => item.college_id)
      );

      setSavedCollegeIds(ids);
    }

    loadColleges();
  }, []);

  async function toggleSavedCollege(collegeId) {
    setSavingCollegeId(collegeId);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError(
        "Please log in to save colleges."
      );
      setSavingCollegeId(null);
      return;
    }

    const isSaved =
      savedCollegeIds.has(collegeId);

    if (isSaved) {
      const { error: deleteError } =
        await supabase
          .from("saved_colleges")
          .delete()
          .eq("user_id", user.id)
          .eq("college_id", collegeId);

      if (deleteError) {
        console.error(
          "Remove saved college error:",
          deleteError
        );

        setError(
          "Could not remove this college."
        );

        setSavingCollegeId(null);
        return;
      }

      setSavedCollegeIds((previous) => {
        const next = new Set(previous);
        next.delete(collegeId);
        return next;
      });
    } else {
      const { error: insertError } =
        await supabase
          .from("saved_colleges")
          .insert({
            user_id: user.id,
            college_id: collegeId,
          });

      if (insertError) {
        console.error(
          "Save college error:",
          insertError
        );

        setError(
          "Could not save this college."
        );

        setSavingCollegeId(null);
        return;
      }

      setSavedCollegeIds((previous) => {
        const next = new Set(previous);
        next.add(collegeId);
        return next;
      });
    }

    setSavingCollegeId(null);
  }

  const states = useMemo(() => {
    const values = colleges
      .map((college) => college.state)
      .filter(Boolean);

    return [
      "All States",
      ...Array.from(new Set(values)).sort(),
    ];
  }, [colleges]);

  const ownerships = useMemo(() => {
    const values = colleges
      .map((college) => college.ownership)
      .filter(Boolean);

    return [
      "All Ownership",
      ...Array.from(new Set(values)).sort(),
    ];
  }, [colleges]);

  const institutionTypes = useMemo(() => {
    const values = colleges
      .map((college) => college.institution_type)
      .filter(Boolean);

    return [
      "All Types",
      ...Array.from(new Set(values)).sort(),
    ];
  }, [colleges]);

  const programsByCollege = useMemo(() => {
    const groupedPrograms = {};

    programs.forEach((program) => {
      const collegeId = program.college_id;

      if (
        collegeId === null ||
        collegeId === undefined
      ) {
        return;
      }

      if (!groupedPrograms[collegeId]) {
        groupedPrograms[collegeId] = [];
      }

      if (program.program_name) {
        groupedPrograms[collegeId].push(
          program.program_name
        );
      }
    });

    return groupedPrograms;
  }, [programs]);

  const handleSearchChange = (event) => {
    const value = event.target.value;

    setSearch(value);

    const trimmedValue = value.trim();

    if (trimmedValue) {
      setSearchParams(
        { search: trimmedValue },
        { replace: true }
      );
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const filteredColleges = useMemo(() => {
    const query = search.trim().toLowerCase();

    return colleges.filter((college) => {
      const collegePrograms =
        programsByCollege[college.id] || [];

      const searchableText = [
        college.name,
        college.city,
        college.state,
        college.course,
        college.institution_type,
        college.ownership,
        college.affiliation,
        college.category,
        ...collegePrograms,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const searchMatch =
        query === "" ||
        searchableText.includes(query);

      const stateMatch =
        stateFilter === "All States" ||
        college.state === stateFilter;

      const ownershipMatch =
        ownershipFilter === "All Ownership" ||
        college.ownership === ownershipFilter;

      const typeMatch =
        typeFilter === "All Types" ||
        college.institution_type === typeFilter;

      return (
        searchMatch &&
        stateMatch &&
        ownershipMatch &&
        typeMatch
      );
    });
  }, [
    colleges,
    programsByCollege,
    search,
    stateFilter,
    ownershipFilter,
    typeFilter,
  ]);

  if (loading) {
    return (
      <main className="colleges-page">
        <section className="college-hero">
          <span className="page-eyebrow">
            COLLEGE DISCOVERY
          </span>

          <h1>Loading colleges...</h1>

          <p>
            Connecting to Admission Saathi database...
          </p>
        </section>
      </main>
    );
  }

  if (error && colleges.length === 0) {
    return (
      <main className="colleges-page">
        <section className="college-hero">
          <span className="page-eyebrow">
            COLLEGE DISCOVERY
          </span>

          <h1>Unable to load colleges</h1>

          <p>{error}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="colleges-page">
      <section className="college-hero">
        <div>
          <span className="page-eyebrow">
            COLLEGE DISCOVERY
          </span>

          <h1>
            Find a college that fits your future.
          </h1>

          <p>
            Explore verified colleges and universities
            across India.
          </p>
        </div>

        <div className="college-search">
          <span>⌕</span>

          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search college, city, course..."
          />
        </div>
      </section>

      <section className="college-content">
        <aside className="college-filters">
          <div className="filter-title">
            FILTER COLLEGES
          </div>

          <label>
            State

            <select
              value={stateFilter}
              onChange={(event) => {
                setStateFilter(event.target.value);
              }}
            >
              {states.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            Ownership

            <select
              value={ownershipFilter}
              onChange={(event) => {
                setOwnershipFilter(
                  event.target.value
                );
              }}
            >
              {ownerships.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            Institution Type

            <select
              value={typeFilter}
              onChange={(event) => {
                setTypeFilter(event.target.value);
              }}
            >
              {institutionTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </aside>

        <div className="college-results">
          <div className="results-header">
            <div>
              <span>VERIFIED RESULTS</span>

              <h2>
                {filteredColleges.length} Colleges found
              </h2>
            </div>

            <span className="results-count">
              {colleges.length} verified
            </span>
          </div>

          {error && (
            <p
              style={{
                color: "#dc2626",
                marginBottom: "15px",
              }}
            >
              {error}
            </p>
          )}

          {filteredColleges.length === 0 ? (
            <div className="no-results">
              <div>⌕</div>

              <h3>No colleges found</h3>

              <p>
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <div className="college-list">
              {filteredColleges.map((college) => {
                const isSaved =
                  savedCollegeIds.has(college.id);

                const isSaving =
                  savingCollegeId === college.id;

                return (
                  <article
                    className="college-card"
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

                        <span>
                          🎓 {college.programCount}{" "}
                          {college.programCount === 1
                            ? "Program"
                            : "Programs"}
                        </span>

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
                        onClick={() =>
                          toggleSavedCollege(
                            college.id
                          )
                        }
                        disabled={isSaving}
                        className="save-college-button"
                        style={{
                          border: "1px solid #e5e7eb",
                          background: isSaved
                            ? "#fff1f2"
                            : "#ffffff",
                          color: isSaved
                            ? "#e11d48"
                            : "#111827",
                          borderRadius: "10px",
                          padding: "10px 14px",
                          cursor: isSaving
                            ? "not-allowed"
                            : "pointer",
                          fontWeight: "700",
                          opacity: isSaving ? 0.6 : 1,
                        }}
                      >
                        {isSaved
                          ? "♥ Saved"
                          : "♡ Save"}
                      </button>

                      {college.official_website && (
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

                      <Link
                        to={
                          "/colleges/" + college.id
                        }
                        className="view-college"
                      >
                        View College →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
