import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

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

      const { data, error: collegeError } = await supabase
        .from("colleges")
        .select(
          "id, name, city, state, category, institution_type, ownership, affiliation, established_year, address, official_website"
        )
        .order("name", { ascending: true });

      if (collegeError) {
        console.error(
          "Compare college loading error:",
          collegeError
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

      const programFields =
        "id, program_name, duration, fees, eligibility, admission_status, application_url, academic_data_verified_at, source_url";

      const [firstResult, secondResult] =
        await Promise.all([
          supabase
            .from("programs")
            .select(programFields)
            .eq("college_id", Number(collegeOne))
            .order("program_name", {
              ascending: true,
            }),

          supabase
            .from("programs")
            .select(programFields)
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
    <main className="compare-page premium-compare-page">
      <section className="compare-hero premium-compare-hero">
        <div className="compare-hero-content premium-compare-hero-content">
          <div className="premium-compare-eyebrow">
            <span>✦</span>
            SMART COLLEGE COMPARISON
          </div>

          <h1>
            Compare.
            <br />
            <span>Understand. Decide.</span>
          </h1>

          <p>
            Put two colleges side by side and explore
            verified academic, institutional and admission
            information in one clear view.
          </p>

          <div className="premium-compare-hero-stats">
            <div>
              <strong>{colleges.length || "—"}</strong>
              <span>{isSupabaseConfigured ? "Verified colleges" : "Sample colleges"}</span>
            </div>

            <div>
              <strong>2</strong>
              <span>Colleges at a time</span>
            </div>

            <div>
              <strong>✓</strong>
              <span>{isSupabaseConfigured ? "Verified information" : "Demo information"}</span>
            </div>
          </div>
        </div>

        <div className="premium-compare-visual">
          <div className="premium-orbit premium-orbit-one" />
          <div className="premium-orbit premium-orbit-two" />

          <div className="premium-compare-floating-card">
            <span>COMPARE</span>

            <div className="premium-mini-colleges">
              <div>A+</div>
              <span>VS</span>
              <div>A+</div>
            </div>

            <strong>Make the differences clear.</strong>
          </div>
        </div>
      </section>

      <section className="compare-content premium-compare-content">
        <div className="compare-selector-card premium-selector-card">
          <div className="premium-selector-heading">
            <div>
              <span className="compare-label">
                STEP 01
              </span>

              <h2>Choose your colleges</h2>

              <p>
                Select two colleges to unlock the full
                comparison.
              </p>
            </div>

            <div className="premium-selector-icon">
              ⇄
            </div>
          </div>

          <div className="compare-selectors premium-selectors">
            <label className="premium-select-box">
              <span className="premium-select-number">
                01
              </span>

              <div>
                <small>FIRST COLLEGE</small>

                <select
                  value={collegeOne}
                  onChange={handleFirstCollegeChange}
                  disabled={loading}
                >
                  <option value="">
                    {loading
                      ? "Loading colleges..."
                      : "Select first college"}
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
              </div>
            </label>

            <div className="compare-vs premium-vs">
              <span>VS</span>
            </div>

            <label className="premium-select-box">
              <span className="premium-select-number">
                02
              </span>

              <div>
                <small>SECOND COLLEGE</small>

                <select
                  value={collegeTwo}
                  onChange={handleSecondCollegeChange}
                  disabled={loading}
                >
                  <option value="">
                    {loading
                      ? "Loading colleges..."
                      : "Select second college"}
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
              </div>
            </label>
          </div>

          {loading && (
            <div className="premium-compare-status">
              <span className="premium-status-dot" />
              Loading verified colleges...
            </div>
          )}

          {error && (
            <p className="compare-error">
              {error}
            </p>
          )}
        </div>

        {!loading &&
          (!firstCollege || !secondCollege) && (
            <div className="compare-empty-card premium-empty-card">
              <div className="premium-empty-icon">
                <span>⇄</span>
              </div>

              <span className="compare-label">
                YOUR COMPARISON SPACE
              </span>

              <h2>
                Your comparison starts here.
              </h2>

              <p>
                Choose two colleges above and we will
                organize their verified information into
                an easy side-by-side view.
              </p>

              <div className="premium-empty-points">
                <span>✓ College overview</span>
                <span>✓ Academic programs</span>
                <span>✓ Admission information</span>
              </div>

              <Link
                to="/colleges"
                className="view-college"
              >
                Explore Colleges →
              </Link>
            </div>
          )}

        {firstCollege && secondCollege && (
          <div className="comparison-table-card premium-comparison-card">
            <div className="premium-comparison-intro">
              <div>
                <span className="compare-label">
                  STEP 02
                </span>

                <h2>Side-by-side comparison</h2>

                <p>
                  Explore the available verified
                  information for both institutions.
                </p>
              </div>

              <div className="premium-verified-pill">
                <span>✓</span>
                {isSupabaseConfigured ? "Verified data" : "Demo data"}
              </div>
            </div>

            <div className="comparison-columns premium-comparison-columns">
              <CollegeComparisonHeader
                college={firstCollege}
                position="01"
              />

              <div className="premium-header-divider">
                <span>VS</span>
              </div>

              <CollegeComparisonHeader
                college={secondCollege}
                position="02"
              />
            </div>

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

            <ComparisonSection title="ACADEMIC PROGRAMS">
              {programLoading ? (
                <div className="premium-program-loading">
                  <div className="premium-loading-circle">
                    ↻
                  </div>

                  <strong>
                    Loading academic programs
                  </strong>

                  <span>
                    Fetching verified program information...
                  </span>
                </div>
              ) : (
                <div className="program-comparison-grid premium-program-grid">
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

            <ComparisonSection title="ADMISSION & ACADEMICS">
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

            <ComparisonSection title="OFFICIAL INFORMATION">
              <div className="official-comparison-grid premium-official-grid">
                <OfficialCollegeCard
                  college={firstCollege}
                />

                <OfficialCollegeCard
                  college={secondCollege}
                />
              </div>
            </ComparisonSection>

            <div className="premium-comparison-footer">
              <div>
                <span className="compare-label">
                  KEEP EXPLORING
                </span>

                <strong>
                  Want to compare different colleges?
                </strong>
              </div>

              <div className="premium-footer-actions">
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
          </div>
        )}
      </section>

      <style>{`
        .premium-compare-page {
          background:
            radial-gradient(
              circle at 10% 0%,
              rgba(120, 192, 67, 0.08),
              transparent 30%
            ),
            #f7f9fc;
          min-height: 100vh;
        }

        .premium-compare-hero {
          position: relative;
          overflow: hidden;
          min-height: 480px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
          padding: 80px max(40px, calc((100vw - 1180px) / 2));
          box-sizing: border-box;
          background:
            linear-gradient(
              135deg,
              #111827 0%,
              #182235 55%,
              #0f172a 100%
            );
          color: #fff;
        }

        .premium-compare-hero::after {
          content: "";
          position: absolute;
          width: 500px;
          height: 500px;
          right: -180px;
          top: -250px;
          border-radius: 50%;
          background: rgba(120, 192, 67, 0.12);
          filter: blur(10px);
        }

        .premium-compare-hero-content {
          position: relative;
          z-index: 2;
          max-width: 680px;
        }

        .premium-compare-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 13px;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          color: #d9e6d1;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.4px;
        }

        .premium-compare-eyebrow span {
          color: #78c043;
        }

        .premium-compare-hero h1 {
          margin: 22px 0 18px;
          font-size: clamp(44px, 6vw, 72px);
          line-height: 0.98;
          letter-spacing: -3px;
        }

        .premium-compare-hero h1 span {
          color: #a7d77f;
        }

        .premium-compare-hero p {
          max-width: 610px;
          margin: 0;
          color: #b9c3d2;
          font-size: 16px;
          line-height: 1.8;
        }

        .premium-compare-hero-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 34px;
          margin-top: 38px;
        }

        .premium-compare-hero-stats div {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .premium-compare-hero-stats strong {
          font-size: 23px;
          color: #fff;
        }

        .premium-compare-hero-stats span {
          color: #8f9bad;
          font-size: 12px;
        }

        .premium-compare-visual {
          position: relative;
          width: 390px;
          height: 330px;
          flex: 0 0 390px;
        }

        .premium-orbit {
          position: absolute;
          border: 1px solid rgba(167,215,127,0.18);
          border-radius: 50%;
        }

        .premium-orbit-one {
          width: 320px;
          height: 320px;
          top: 0;
          left: 35px;
        }

        .premium-orbit-two {
          width: 220px;
          height: 220px;
          top: 50px;
          left: 85px;
        }

        .premium-compare-floating-card {
          position: absolute;
          top: 72px;
          left: 72px;
          width: 245px;
          padding: 26px;
          box-sizing: border-box;
          border-radius: 24px;
          background: rgba(255,255,255,0.09);
          border: 1px solid rgba(255,255,255,0.13);
          backdrop-filter: blur(18px);
          box-shadow: 0 30px 70px rgba(0,0,0,0.25);
        }

        .premium-compare-floating-card > span {
          color: #a7d77f;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .premium-mini-colleges {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 13px;
          margin: 25px 0;
        }

        .premium-mini-colleges div {
          width: 58px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 17px;
          background: #fff;
          color: #111827;
          font-size: 18px;
          font-weight: 900;
        }

        .premium-mini-colleges span {
          color: #9aa6b7;
          font-size: 11px;
          font-weight: 900;
        }

        .premium-compare-floating-card strong {
          display: block;
          color: #fff;
          line-height: 1.4;
        }

        .premium-compare-content {
          position: relative;
          max-width: 1180px;
          margin: -55px auto 0;
          z-index: 5;
        }

        .premium-selector-card {
          padding: 32px;
          border-radius: 26px;
          background: #fff;
          border: 1px solid #e8ebf0;
          box-shadow: 0 25px 70px rgba(15,23,42,0.10);
        }

        .premium-selector-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
        }

        .premium-selector-heading h2 {
          margin: 7px 0 6px;
          color: #111827;
          font-size: 26px;
        }

        .premium-selector-heading p {
          margin: 0;
          color: #7b8494;
          font-size: 14px;
        }

        .premium-selector-icon {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          background: #f1f8eb;
          color: #65a632;
          font-size: 24px;
          font-weight: 800;
        }

        .premium-selectors {
          display: grid;
          grid-template-columns: 1fr 70px 1fr;
          align-items: center;
          gap: 18px;
          margin-top: 28px;
        }

        .premium-select-box {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 16px;
          border: 1px solid #e3e7ed;
          border-radius: 17px;
          background: #fbfcfd;
          transition: 0.2s ease;
        }

        .premium-select-box:focus-within {
          border-color: #9bcf72;
          box-shadow: 0 0 0 4px rgba(120,192,67,0.10);
          background: #fff;
        }

        .premium-select-number {
          width: 39px;
          height: 39px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 39px;
          border-radius: 12px;
          background: #111827;
          color: #fff;
          font-size: 11px;
          font-weight: 800;
        }

        .premium-select-box > div {
          flex: 1;
          min-width: 0;
        }

        .premium-select-box small {
          display: block;
          margin-bottom: 5px;
          color: #8992a1;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .premium-select-box select {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: #111827;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }

        .premium-vs {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .premium-vs span,
        .premium-header-divider span {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #111827;
          color: #fff;
          font-size: 10px;
          font-weight: 900;
          box-shadow: 0 8px 20px rgba(17,24,39,0.18);
        }

        .premium-compare-status {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-top: 18px;
          color: #7b8494;
          font-size: 13px;
        }

        .premium-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #78c043;
          animation: premiumPulse 1.2s infinite;
        }

        @keyframes premiumPulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .premium-empty-card {
          margin-top: 24px;
          padding: 60px 30px;
          border-radius: 26px;
          border: 1px solid #e8ebf0;
          background: #fff;
          text-align: center;
          box-shadow: 0 20px 50px rgba(15,23,42,0.06);
        }

        .premium-empty-icon {
          width: 72px;
          height: 72px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 22px;
          background: #f1f8eb;
          color: #65a632;
          font-size: 29px;
          font-weight: 800;
        }

        .premium-empty-card h2 {
          margin: 8px 0 10px;
          color: #111827;
          font-size: 30px;
        }

        .premium-empty-card p {
          max-width: 560px;
          margin: 0 auto;
          color: #7b8494;
          line-height: 1.7;
        }

        .premium-empty-points {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin: 24px 0;
        }

        .premium-empty-points span {
          padding: 9px 12px;
          border-radius: 999px;
          background: #f7f9fc;
          color: #5f6877;
          font-size: 11px;
          font-weight: 700;
        }

        .premium-comparison-card {
          margin-top: 24px;
          overflow: hidden;
          border-radius: 28px;
          background: #fff;
          border: 1px solid #e7ebf0;
          box-shadow: 0 25px 70px rgba(15,23,42,0.08);
        }

        .premium-comparison-intro {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 30px 32px 22px;
        }

        .premium-comparison-intro h2 {
          margin: 7px 0 5px;
          color: #111827;
          font-size: 26px;
        }

        .premium-comparison-intro p {
          margin: 0;
          color: #7b8494;
          font-size: 13px;
        }

        .premium-verified-pill {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 13px;
          border-radius: 999px;
          background: #f0fdf4;
          color: #15803d;
          font-size: 11px;
          font-weight: 800;
          white-space: nowrap;
        }

        .premium-comparison-columns {
          display: grid;
          grid-template-columns: 1fr 70px 1fr;
          align-items: stretch;
          margin: 10px 20px 0;
          gap: 0;
        }

        .premium-comparison-columns .comparison-column {
          padding: 28px;
          border-radius: 22px;
          background: #f8fafc;
          border: 1px solid #e9edf2;
        }

        .premium-comparison-columns .comparison-logo {
          width: 58px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          border-radius: 17px;
          background: #111827;
          color: #fff;
          font-weight: 900;
        }

        .premium-comparison-columns .comparison-column h2 {
          margin: 0 0 8px;
          color: #111827;
          font-size: 21px;
          line-height: 1.25;
        }

        .premium-comparison-columns .comparison-column p {
          margin: 0;
          color: #7b8494;
          font-size: 13px;
        }

        .premium-header-divider {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .premium-program-loading {
          min-height: 190px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 7px;
          color: #7b8494;
        }

        .premium-program-loading strong {
          color: #374151;
          font-size: 14px;
        }

        .premium-program-loading span {
          font-size: 12px;
        }

        .premium-loading-circle {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 6px;
          border-radius: 50%;
          background: #f1f8eb;
          color: #65a632;
          font-size: 20px;
        }

        .premium-program-grid {
          gap: 18px;
          padding: 20px;
        }

        .premium-program-grid .program-list {
          padding: 20px;
          border-radius: 20px;
          background: #f8fafc;
          border: 1px solid #e7ebf0;
        }

        .premium-program-grid .program-list h3 {
          margin: 0 0 15px;
          color: #111827;
          font-size: 15px;
          line-height: 1.4;
        }

        .premium-program-grid .program-item {
          padding: 15px;
          margin-top: 10px;
          border-radius: 14px;
          background: #fff;
          border: 1px solid #e8ebef;
          box-shadow: 0 5px 15px rgba(15,23,42,0.03);
        }

        .premium-program-grid .program-item strong {
          display: block;
          margin-bottom: 9px;
          color: #111827;
          font-size: 14px;
        }

        .premium-program-grid .program-item span {
          display: block;
          margin-top: 5px;
          color: #737d8c;
          font-size: 11px;
          line-height: 1.5;
        }

        .premium-program-grid .program-item .official-link {
          display: inline-block;
          margin-top: 10px;
        }

        .premium-official-grid {
          gap: 18px;
          padding: 20px;
        }

        .premium-official-grid > div {
          padding: 22px;
          border-radius: 18px;
          background: #f8fafc;
          border: 1px solid #e7ebf0;
        }

        .premium-official-grid .comparison-mini-label {
          display: block;
          margin-bottom: 13px;
          color: #111827;
          font-size: 14px;
          font-weight: 800;
          line-height: 1.4;
        }

        .premium-comparison-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-top: 30px;
          padding: 28px 32px;
          background: #111827;
          color: #fff;
        }

        .premium-comparison-footer .compare-label {
          color: #91a0b4;
        }

        .premium-comparison-footer strong {
          display: block;
          margin-top: 5px;
          font-size: 15px;
        }

        .premium-footer-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .premium-footer-actions .view-college {
          background: #78c043;
          color: #10200a;
        }

        .premium-footer-actions .official-link {
          color: #fff;
        }

        @media (max-width: 900px) {
          .premium-compare-hero {
            min-height: auto;
            padding: 70px 28px 130px;
          }

          .premium-compare-visual {
            display: none;
          }

          .premium-compare-content {
            margin: -70px 20px 0;
          }

          .premium-selectors {
            grid-template-columns: 1fr;
          }

          .premium-vs {
            height: 20px;
          }

          .premium-vs span {
            width: 38px;
            height: 38px;
          }

          .premium-comparison-columns {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .premium-header-divider {
            height: 20px;
          }

          .premium-header-divider span {
            width: 38px;
            height: 38px;
          }
        }

        @media (max-width: 640px) {
          .premium-compare-hero {
            padding: 55px 20px 110px;
          }

          .premium-compare-hero h1 {
            font-size: 46px;
            letter-spacing: -2px;
          }

          .premium-compare-hero-stats {
            gap: 20px;
          }

          .premium-compare-content {
            margin-left: 12px;
            margin-right: 12px;
          }

          .premium-selector-card {
            padding: 20px;
            border-radius: 20px;
          }

          .premium-selector-heading {
            gap: 10px;
          }

          .premium-selector-icon {
            width: 44px;
            height: 44px;
            flex: 0 0 44px;
          }

          .premium-selector-heading h2 {
            font-size: 21px;
          }

          .premium-comparison-intro {
            padding: 24px 20px 18px;
            align-items: flex-start;
            flex-direction: column;
          }

          .premium-comparison-intro h2 {
            font-size: 22px;
          }

          .premium-comparison-columns {
            margin: 5px 12px 0;
          }

          .premium-comparison-columns .comparison-column {
            padding: 20px;
          }

          .premium-comparison-columns .comparison-column h2 {
            font-size: 18px;
          }

          .premium-comparison-card {
            border-radius: 22px;
          }

          .premium-program-grid,
          .premium-official-grid {
            grid-template-columns: 1fr;
            padding: 12px;
          }

          .premium-comparison-footer {
            align-items: flex-start;
            flex-direction: column;
            padding: 24px 20px;
          }

          .premium-footer-actions {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}


/* --------------------------------
   College Comparison Header
-------------------------------- */

function CollegeComparisonHeader({
  college,
  position,
}) {
  return (
    <div className="comparison-column">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "18px",
        }}
      >
        <span
          style={{
            color: "#8b95a5",
            fontSize: "10px",
            fontWeight: "900",
            letterSpacing: "1px",
          }}
        >
          COLLEGE {position}
        </span>

        <span
          style={{
            padding: "5px 9px",
            borderRadius: "999px",
            background: "#f0fdf4",
            color: "#15803d",
            fontSize: "9px",
            fontWeight: "800",
          }}
        >
          ✓ VERIFIED
        </span>
      </div>

      <div className="comparison-logo">
        A+
      </div>

      <h2>{college.name}</h2>

      <p>
        📍 {formatLocation(college)}
      </p>
    </div>
  );
}


/* --------------------------------
   Comparison Section
-------------------------------- */

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
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <span className="compare-label">
          {title}
        </span>
      </div>

      {children}
    </section>
  );
}


/* --------------------------------
   Comparison Row
-------------------------------- */

function ComparisonRow({
  label,
  first,
  second,
}) {
  return (
    <div className="comparison-row">
      <div
        className="comparison-value"
        style={{
          padding: "18px 20px",
          background: "#fff",
          color: "#374151",
          lineHeight: "1.55",
        }}
      >
        {first || "Not available"}
      </div>

      <div
        className="comparison-label"
        style={{
          padding: "18px 12px",
          color: "#8b95a5",
          fontSize: "10px",
          fontWeight: "900",
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {label}
      </div>

      <div
        className="comparison-value"
        style={{
          padding: "18px 20px",
          background: "#fff",
          color: "#374151",
          lineHeight: "1.55",
        }}
      >
        {second || "Not available"}
      </div>
    </div>
  );
}


/* --------------------------------
   Program List
-------------------------------- */

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
                Eligibility: {program.eligibility}
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
                href={program.application_url}
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


/* --------------------------------
   Official College Card
-------------------------------- */

function OfficialCollegeCard({
  college,
}) {
  return (
    <div>
      <span className="comparison-mini-label">
        {college.name}
      </span>

      <p
        style={{
          margin: "0 0 15px",
          color: "#7b8494",
          fontSize: "12px",
          lineHeight: "1.6",
        }}
      >
        Official institutional information
        and website.
      </p>

      {college.official_website ? (
        <a
          href={college.official_website}
          target="_blank"
          rel="noopener noreferrer"
          className="official-link"
        >
          Visit Official Website ↗
        </a>
      ) : (
        <p
          style={{
            margin: 0,
            color: "#8b95a5",
            fontSize: "12px",
          }}
        >
          Official website not available
        </p>
      )}
    </div>
  );
}


/* --------------------------------
   Helpers
-------------------------------- */

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