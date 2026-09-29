import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Compare() {
  const [colleges, setColleges] = useState([]);
  const [collegeOne, setCollegeOne] = useState("");
  const [collegeTwo, setCollegeTwo] = useState("");

  const [firstPrograms, setFirstPrograms] = useState([]);
  const [secondPrograms, setSecondPrograms] = useState([]);

  const [loading, setLoading] = useState(true);
  const [programLoading, setProgramLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadColleges() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("colleges")
        .select(
          "id, name, city, state, category, institution_type, ownership, affiliation, established_year, address, official_website"
        )
        .order("name", { ascending: true });

      if (error) {
        console.error(
          "Compare college loading error:",
          error
        );

        setError("Colleges could not be loaded.");
        setColleges([]);
        setLoading(false);
        return;
      }

      setColleges(data || []);
      setLoading(false);
    }

    loadColleges();
  }, []);

  useEffect(() => {
    async function loadPrograms() {
      if (!collegeOne || !collegeTwo) {
        setFirstPrograms([]);
        setSecondPrograms([]);
        return;
      }

      setProgramLoading(true);

      const [firstResult, secondResult] =
        await Promise.all([
          supabase
            .from("programs")
            .select(
              "id, program_name, duration, fees, eligibility, admission_status, application_url, academic_data_verified_at, source_url"
            )
            .eq("college_id", Number(collegeOne))
            .order("program_name", {
              ascending: true,
            }),

          supabase
            .from("programs")
            .select(
              "id, program_name, duration, fees, eligibility, admission_status, application_url, academic_data_verified_at, source_url"
            )
            .eq("college_id", Number(collegeTwo))
            .order("program_name", {
              ascending: true,
            }),
        ]);

      if (firstResult.error) {
        console.error(
          "First college programs error:",
          firstResult.error
        );
      }

      if (secondResult.error) {
        console.error(
          "Second college programs error:",
          secondResult.error
        );
      }

      setFirstPrograms(firstResult.data || []);
      setSecondPrograms(secondResult.data || []);

      setProgramLoading(false);
    }

    loadPrograms();
  }, [collegeOne, collegeTwo]);

  const firstCollege = colleges.find(
    (college) => String(college.id) === collegeOne
  );

  const secondCollege = colleges.find(
    (college) => String(college.id) === collegeTwo
  );

  function handleFirstCollegeChange(event) {
    const value = event.target.value;

    setCollegeOne(value);

    if (value === collegeTwo) {
      setCollegeTwo("");
    }
  }

  function handleSecondCollegeChange(event) {
    const value = event.target.value;

    setCollegeTwo(value);

    if (value === collegeOne) {
      setCollegeOne("");
    }
  }

  return (
    <main className="compare-page">
      <section className="compare-hero">
        <div className="compare-hero-content">
          <span className="page-eyebrow">
            COLLEGE COMPARISON
          </span>

          <h1>
            Compare colleges.
            <br />
            <span>Choose with confidence.</span>
          </h1>

          <p>
            Compare colleges side by side using verified
            information available in Admission Saathi.
          </p>
        </div>
      </section>

      <section className="compare-content">

        {/* College Selector */}
        <div className="compare-selector-card">
          <span className="compare-label">
            SELECT COLLEGES
          </span>

          <h2>Choose two colleges to compare</h2>

          <div className="compare-selectors">

            <label>
              College 1

              <select
                value={collegeOne}
                onChange={handleFirstCollegeChange}
              >
                <option value="">
                  Select first college
                </option>

                {colleges.map((college) => (
                  <option
                    key={college.id}
                    value={college.id}
                    disabled={
                      String(college.id) === collegeTwo
                    }
                  >
                    {college.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="compare-vs">
              VS
            </div>

            <label>
              College 2

              <select
                value={collegeTwo}
                onChange={handleSecondCollegeChange}
              >
                <option value="">
                  Select second college
                </option>

                {colleges.map((college) => (
                  <option
                    key={college.id}
                    value={college.id}
                    disabled={
                      String(college.id) === collegeOne
                    }
                  >
                    {college.name}
                  </option>
                ))}
              </select>
            </label>

          </div>

          {loading && (
            <p className="compare-status">
              Loading colleges...
            </p>
          )}

          {error && (
            <p className="compare-error">
              {error}
            </p>
          )}
        </div>

        {/* Empty State */}
        {!loading &&
          (!firstCollege || !secondCollege) && (
            <div className="compare-empty-card">
              <div className="compare-icon">
                ⚖️
              </div>

              <span className="compare-label">
                SMART COMPARISON
              </span>

              <h2>
                Start comparing colleges
              </h2>

              <p>
                Select two colleges above to see
                their verified information side by
                side.
              </p>

              <Link
                to="/colleges"
                className="view-college"
              >
                Explore Colleges →
              </Link>
            </div>
          )}

        {/* Comparison */}
        {firstCollege && secondCollege && (
          <div className="comparison-table-card">

            {/* College Headers */}
            <div className="comparison-columns">

              <div className="comparison-column">
                <div className="comparison-logo">
                  A+
                </div>

                <h2>
                  {firstCollege.name}
                </h2>

                <p>
                  {firstCollege.city ||
                    "India"}

                  {firstCollege.state
                    ? `, ${firstCollege.state}`
                    : ""}
                </p>
              </div>

              <div className="comparison-column">
                <div className="comparison-logo">
                  A+
                </div>

                <h2>
                  {secondCollege.name}
                </h2>

                <p>
                  {secondCollege.city ||
                    "India"}

                  {secondCollege.state
                    ? `, ${secondCollege.state}`
                    : ""}
                </p>
              </div>

            </div>

            {/* College Overview */}
            <ComparisonSection
              title="COLLEGE OVERVIEW"
            >

              <ComparisonRow
                label="Location"
                first={formatLocation(firstCollege)}
                second={formatLocation(secondCollege)}
              />

              <ComparisonRow
                label="Institution Type"
                first={firstCollege.institution_type}
                second={secondCollege.institution_type}
              />

              <ComparisonRow
                label="Ownership"
                first={firstCollege.ownership}
                second={secondCollege.ownership}
              />

              <ComparisonRow
                label="Category"
                first={firstCollege.category}
                second={secondCollege.category}
              />

              <ComparisonRow
                label="Affiliation"
                first={firstCollege.affiliation}
                second={secondCollege.affiliation}
              />

              <ComparisonRow
                label="Established"
                first={firstCollege.established_year}
                second={secondCollege.established_year}
              />

              <ComparisonRow
                label="Address"
                first={firstCollege.address}
                second={secondCollege.address}
              />

            </ComparisonSection>

            {/* Programs */}
            <ComparisonSection
              title="ACADEMIC PROGRAMS"
            >

              {programLoading ? (
                <div
                  style={{
                    padding: "30px",
                    textAlign: "center",
                  }}
                >
                  Loading academic programs...
                </div>
              ) : (
                <div className="program-comparison-grid">

                  <ProgramList
                    title={firstCollege.name}
                    programs={firstPrograms}
                  />

                  <ProgramList
                    title={secondCollege.name}
                    programs={secondPrograms}
                  />

                </div>
              )}

            </ComparisonSection>

            {/* Academic Details */}
            <ComparisonSection
              title="ADMISSION & ACADEMICS"
            >

              <ComparisonRow
                label="Fees"
                first={getCommonProgramValue(
                  firstPrograms,
                  "fees"
                )}
                second={getCommonProgramValue(
                  secondPrograms,
                  "fees"
                )}
              />

              <ComparisonRow
                label="Eligibility"
                first={getCommonProgramValue(
                  firstPrograms,
                  "eligibility"
                )}
                second={getCommonProgramValue(
                  secondPrograms,
                  "eligibility"
                )}
              />

              <ComparisonRow
                label="Admission Status"
                first={getCommonProgramValue(
                  firstPrograms,
                  "admission_status"
                )}
                second={getCommonProgramValue(
                  secondPrograms,
                  "admission_status"
                )}
              />

            </ComparisonSection>

            {/* Official Websites */}
            <ComparisonSection
              title="OFFICIAL INFORMATION"
            >

              <div className="official-comparison-grid">

                <div>
                  <span className="comparison-mini-label">
                    {firstCollege.name}
                  </span>

                  {firstCollege.official_website ? (
                    <a
                      href={
                        firstCollege.official_website
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="official-link"
                    >
                      Visit Official Website ↗
                    </a>
                  ) : (
                    <p>
                      Not available
                    </p>
                  )}
                </div>

                <div>
                  <span className="comparison-mini-label">
                    {secondCollege.name}
                  </span>

                  {secondCollege.official_website ? (
                    <a
                      href={
                        secondCollege.official_website
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="official-link"
                    >
                      Visit Official Website ↗
                    </a>
                  ) : (
                    <p>
                      Not available
                    </p>
                  )}
                </div>

              </div>

            </ComparisonSection>

            {/* Bottom Actions */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                flexWrap: "wrap",
                padding: "28px 20px",
              }}
            >
              <Link
                to="/compare"
                className="view-college"
              >
                Compare Other Colleges
              </Link>

              <Link
                to="/colleges"
                className="official-link"
              >
                Explore Colleges →
              </Link>
            </div>

          </div>
        )}

      </section>
    </main>
  );
}


/* -----------------------------
   Comparison Section
----------------------------- */

function ComparisonSection({
  title,
  children,
}) {
  return (
    <section
      style={{
        marginTop: "30px",
      }}
    >
      <div
        style={{
          padding: "18px 20px",
          borderBottom:
            "1px solid #e5e7eb",
        }}
      >
        <span
          className="compare-label"
        >
          {title}
        </span>
      </div>

      {children}
    </section>
  );
}


/* -----------------------------
   Comparison Row
----------------------------- */

function ComparisonRow({
  label,
  first,
  second,
}) {
  return (
    <div className="comparison-row">

      <div className="comparison-value">
        {first || "Not available"}
      </div>

      <div className="comparison-label">
        {label}
      </div>

      <div className="comparison-value">
        {second || "Not available"}
      </div>

    </div>
  );
}


/* -----------------------------
   Program List
----------------------------- */

function ProgramList({
  title,
  programs,
}) {
  return (
    <div className="program-list">

      <h3>{title}</h3>

      {programs.length === 0 ? (
        <p>
          No verified programs available.
        </p>
      ) : (
        programs.map((program) => (
          <div
            key={program.id}
            className="program-item"
          >

            <strong>
              {program.program_name}
            </strong>

            {program.duration && (
              <span>
                Duration: {program.duration}
              </span>
            )}

            {program.fees && (
              <span>
                Fees: {program.fees}
              </span>
            )}

            {program.eligibility && (
              <span>
                Eligibility:{" "}
                {program.eligibility}
              </span>
            )}

            {program.admission_status && (
              <span>
                Admission:{" "}
                {program.admission_status}
              </span>
            )}

            {program.application_url && (
              <a
                href={
                  program.application_url
                }
                target="_blank"
                rel="noopener noreferrer"
                className="official-link"
              >
                Application ↗
              </a>
            )}

          </div>
        ))
      )}

    </div>
  );
}


/* -----------------------------
   Helpers
----------------------------- */

function formatLocation(college) {
  const parts = [
    college.city,
    college.state,
  ].filter(Boolean);

  return parts.length
    ? parts.join(", ")
    : "Not available";
}


function getCommonProgramValue(
  programs,
  field
) {
  const values = programs
    .map((program) => program[field])
    .filter(Boolean);

  if (values.length === 0) {
    return "Not available";
  }

  const uniqueValues = [
    ...new Set(values),
  ];

  if (uniqueValues.length === 1) {
    return uniqueValues[0];
  }

  return `${uniqueValues.length} verified values available`;
}