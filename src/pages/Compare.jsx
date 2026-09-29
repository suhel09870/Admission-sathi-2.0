import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Compare() {
  const [colleges, setColleges] = useState([]);
  const [collegeOne, setCollegeOne] = useState("");
  const [collegeTwo, setCollegeTwo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadColleges() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("colleges")
        .select(`
          id,
          name,
          city,
          state,
          category,
          institution_type,
          ownership,
          affiliation,
          established_year,
          address,
          course,
          fees,
          eligibility,
          admission_status,
          description,
          official_website,
          application_url
        `)
        .order("name", { ascending: true });

      if (error) {
        console.error("Compare college loading error:", error);
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

  const firstCollege = colleges.find(
    (college) => String(college.id) === collegeOne
  );

  const secondCollege = colleges.find(
    (college) => String(college.id) === collegeTwo
  );

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
            Compare colleges side by side using the information
            that matters most for your admission journey.
          </p>
        </div>
      </section>

      <section className="compare-content">

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
                onChange={(event) =>
                  setCollegeOne(event.target.value)
                }
              >
                <option value="">
                  Select first college
                </option>

                {colleges.map((college) => (
                  <option
                    key={college.id}
                    value={college.id}
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
                onChange={(event) =>
                  setCollegeTwo(event.target.value)
                }
              >
                <option value="">
                  Select second college
                </option>

                {colleges.map((college) => (
                  <option
                    key={college.id}
                    value={college.id}
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

        {firstCollege && secondCollege ? (

          <div className="comparison-table-card">

            {/* College Header */}
            <div className="comparison-columns">

              <div className="comparison-column">
                <div className="comparison-logo">
                  🎓
                </div>

                <h2>{firstCollege.name}</h2>

                <p>
                  {firstCollege.city || "India"}
                  {firstCollege.state
                    ? `, ${firstCollege.state}`
                    : ""}
                </p>
              </div>

              <div className="comparison-column">
                <div className="comparison-logo">
                  🎓
                </div>

                <h2>{secondCollege.name}</h2>

                <p>
                  {secondCollege.city || "India"}
                  {secondCollege.state
                    ? `, ${secondCollege.state}`
                    : ""}
                </p>
              </div>

            </div>

            {/* COLLEGE OVERVIEW */}
            <ComparisonSection title="COLLEGE OVERVIEW">

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

            {/* ADMISSION & ACADEMICS */}
            <ComparisonSection title="ADMISSION & ACADEMICS">

              <ComparisonRow
                label="Courses"
                first={firstCollege.course}
                second={secondCollege.course}
              />

              <ComparisonRow
                label="Fees"
                first={firstCollege.fees}
                second={secondCollege.fees}
              />

              <ComparisonRow
                label="Eligibility"
                first={firstCollege.eligibility}
                second={secondCollege.eligibility}
              />

              <ComparisonRow
                label="Admission Status"
                first={firstCollege.admission_status}
                second={secondCollege.admission_status}
              />

              <ComparisonRow
                label="Description"
                first={firstCollege.description}
                second={secondCollege.description}
              />

            </ComparisonSection>

            {/* OFFICIAL INFORMATION */}
            <ComparisonSection title="OFFICIAL INFORMATION">

              <ComparisonLinkRow
                label="Official Website"
                first={firstCollege.official_website}
                second={secondCollege.official_website}
              />

              <ComparisonLinkRow
                label="Application / Admission"
                first={firstCollege.application_url}
                second={secondCollege.application_url}
              />

            </ComparisonSection>

          </div>

        ) : (

          !loading && (
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
                Select two colleges above to see their
                available information side by side.
              </p>

              <Link
                to="/colleges"
                className="view-college"
              >
                Explore Colleges →
              </Link>

            </div>
          )
        )}

      </section>
    </main>
  );
}


/* -------------------------------- */
/* Comparison Section               */
/* -------------------------------- */

function ComparisonSection({ title, children }) {
  return (
    <section className="comparison-section">

      <div className="comparison-section-title">
        {title}
      </div>

      <div className="comparison-rows">
        {children}
      </div>

    </section>
  );
}


/* -------------------------------- */
/* Normal Comparison Row            */
/* -------------------------------- */

function ComparisonRow({ label, first, second }) {
  return (
    <div className="comparison-row">

      <div className="comparison-value">
        {formatValue(first)}
      </div>

      <div className="comparison-label">
        {label}
      </div>

      <div className="comparison-value">
        {formatValue(second)}
      </div>

    </div>
  );
}


/* -------------------------------- */
/* Website / Application Row        */
/* -------------------------------- */

function ComparisonLinkRow({ label, first, second }) {
  return (
    <div className="comparison-row">

      <div className="comparison-value">
        {first ? (
          <a
            href={first}
            target="_blank"
            rel="noopener noreferrer"
            className="official-link"
          >
            Visit Official Website ↗
          </a>
        ) : (
          "Not available"
        )}
      </div>

      <div className="comparison-label">
        {label}
      </div>

      <div className="comparison-value">
        {second ? (
          <a
            href={second}
            target="_blank"
            rel="noopener noreferrer"
            className="official-link"
          >
            Visit Official Website ↗
          </a>
        ) : (
          "Not available"
        )}
      </div>

    </div>
  );
}


/* -------------------------------- */
/* Helpers                          */
/* -------------------------------- */

function formatValue(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "Not available";
  }

  return String(value);
}

function formatLocation(college) {
  const parts = [
    college.city,
    college.state,
  ].filter(Boolean);

  return parts.length > 0
    ? parts.join(", ")
    : "Not available";
}