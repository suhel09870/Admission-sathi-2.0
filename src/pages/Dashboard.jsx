import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [savedCount, setSavedCount] = useState(0);
  const [loggingOut, setLoggingOut] = useState(false);

  const [applicationStats, setApplicationStats] = useState({
    total: 0,
    planning: 0,
    applied: 0,
    accepted: 0,
    rejected: 0,
  });

  useEffect(() => {
    async function loadDashboard() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (!user) {
        setSavedCount(0);
        return;
      }

      // Saved colleges
      const {
        count: savedCollegeCount,
        error: savedError,
      } = await supabase
        .from("saved_colleges")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id);

      if (savedError) {
        console.error(
          "Saved college count error:",
          savedError
        );
      } else {
        setSavedCount(savedCollegeCount || 0);
      }

      // Applications
      const {
        data: applications,
        error: applicationsError,
      } = await supabase
        .from("applications")
        .select("id, status")
        .eq("user_id", user.id);

      if (applicationsError) {
        console.error(
          "Application stats error:",
          applicationsError
        );
        return;
      }

      const stats = {
        total: applications?.length || 0,
        planning: 0,
        applied: 0,
        accepted: 0,
        rejected: 0,
      };

      (applications || []).forEach((application) => {
        const status = (
          application.status || "Planning"
        ).toLowerCase();

        if (
          status === "planning" ||
          status === "preparing"
        ) {
          stats.planning++;
        } else if (
          status === "applied" ||
          status === "submitted" ||
          status === "under review"
        ) {
          stats.applied++;
        } else if (status === "accepted") {
          stats.accepted++;
        } else if (status === "rejected") {
          stats.rejected++;
        }
      });

      setApplicationStats(stats);
    }

    loadDashboard();
  }, []);

  async function handleLogout() {
    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      setLoggingOut(false);
      return;
    }

    navigate("/login", { replace: true });
  }

  const email = user?.email || "Student";

  return (
    <main className="dashboard-page">
      <section className="dashboard-container">

        <div className="dashboard-welcome">
          <div>
            <span className="page-eyebrow">
              STUDENT DASHBOARD
            </span>

            <h1>Welcome back 👋</h1>

            <p>
              Manage your admission journey from one place.
            </p>

            <span className="dashboard-email">
              {email}
            </span>
          </div>

          <div className="dashboard-profile">
            <div className="dashboard-avatar">
              {email.charAt(0).toUpperCase()}
            </div>

            <span>Student</span>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              style={{
                marginTop: "10px",
                padding: "9px 16px",
                border: "1px solid #e5e7eb",
                borderRadius: "9px",
                background: "#ffffff",
                color: "#111827",
                cursor: loggingOut
                  ? "not-allowed"
                  : "pointer",
                fontWeight: "600",
                fontSize: "13px",
                opacity: loggingOut ? 0.6 : 1,
              }}
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>

        {/* Application Progress */}
        <section
          style={{
            marginBottom: "30px",
            padding: "24px",
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <span className="page-eyebrow">
                APPLICATION PROGRESS
              </span>

              <h2
                style={{
                  margin: "7px 0 4px",
                  color: "#111827",
                }}
              >
                Your admission progress
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#6b7280",
                }}
              >
                Track the current status of your
                applications.
              </p>
            </div>

            <Link
              to="/my-applications"
              className="view-college"
            >
              View Applications →
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "12px",
              marginTop: "22px",
            }}
          >
            <div
              style={{
                padding: "16px",
                background: "#f8fafc",
                borderRadius: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  fontWeight: "700",
                }}
              >
                TOTAL
              </span>

              <strong
                style={{
                  display: "block",
                  fontSize: "25px",
                  marginTop: "5px",
                  color: "#111827",
                }}
              >
                {applicationStats.total}
              </strong>
            </div>

            <div
              style={{
                padding: "16px",
                background: "#fffbeb",
                borderRadius: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#92400e",
                  fontWeight: "700",
                }}
              >
                PLANNING
              </span>

              <strong
                style={{
                  display: "block",
                  fontSize: "25px",
                  marginTop: "5px",
                  color: "#92400e",
                }}
              >
                {applicationStats.planning}
              </strong>
            </div>

            <div
              style={{
                padding: "16px",
                background: "#eff6ff",
                borderRadius: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#1d4ed8",
                  fontWeight: "700",
                }}
              >
                APPLIED
              </span>

              <strong
                style={{
                  display: "block",
                  fontSize: "25px",
                  marginTop: "5px",
                  color: "#1d4ed8",
                }}
              >
                {applicationStats.applied}
              </strong>
            </div>

            <div
              style={{
                padding: "16px",
                background: "#f0fdf4",
                borderRadius: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#15803d",
                  fontWeight: "700",
                }}
              >
                ACCEPTED
              </span>

              <strong
                style={{
                  display: "block",
                  fontSize: "25px",
                  marginTop: "5px",
                  color: "#15803d",
                }}
              >
                {applicationStats.accepted}
              </strong>
            </div>

            <div
              style={{
                padding: "16px",
                background: "#fef2f2",
                borderRadius: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#b91c1c",
                  fontWeight: "700",
                }}
              >
                REJECTED
              </span>

              <strong
                style={{
                  display: "block",
                  fontSize: "25px",
                  marginTop: "5px",
                  color: "#b91c1c",
                }}
              >
                {applicationStats.rejected}
              </strong>
            </div>
          </div>
        </section>

        <div className="dashboard-grid">

          {/* My Profile */}
          <Link
            to="/profile"
            className="dashboard-card"
          >
            <div className="dashboard-icon">👤</div>

            <h2>My Profile</h2>

            <p>
              Manage your personal information and
              admission preferences.
            </p>

            <span>
              View Profile →
            </span>
          </Link>

          {/* Explore Colleges */}
          <Link
            to="/colleges"
            className="dashboard-card"
          >
            <div className="dashboard-icon">🎓</div>

            <h2>Explore Colleges</h2>

            <p>
              Find colleges and universities that match
              your goals.
            </p>

            <span>
              Explore →
            </span>
          </Link>

          {/* Explore Courses */}
          <Link
            to="/courses"
            className="dashboard-card"
          >
            <div className="dashboard-icon">📚</div>

            <h2>Explore Courses</h2>

            <p>
              Discover courses, programs and admission
              information.
            </p>

            <span>
              View Courses →
            </span>
          </Link>

          {/* Explore Exams */}
          <Link
            to="/exams"
            className="dashboard-card"
          >
            <div className="dashboard-icon">📝</div>

            <h2>Explore Exams</h2>

            <p>
              Discover entrance exams, eligibility and
              admission-related information.
            </p>

            <span>
              Explore Exams →
            </span>
          </Link>

          {/* Explore Scholarships */}
          <Link
            to="/scholarships"
            className="dashboard-card"
          >
            <div className="dashboard-icon">🎓</div>

            <h2>Explore Scholarships</h2>

            <p>
              Discover scholarships, eligibility, benefits
              and application opportunities.
            </p>

            <span>
              Explore Scholarships →
            </span>
          </Link>

          {/* Compare Colleges */}
          <Link
            to="/compare"
            className="dashboard-card"
          >
            <div className="dashboard-icon">⚖️</div>

            <h2>Compare Colleges</h2>

            <p>
              Compare colleges before making your
              admission decision.
            </p>

            <span>
              Compare →
            </span>
          </Link>

          {/* Saved Colleges */}
          <Link
            to="/saved-colleges"
            className="dashboard-card"
          >
            <div className="dashboard-icon">❤️</div>

            <h2>Saved Colleges</h2>

            <p>
              {savedCount === 0
                ? "Save colleges you want to consider later."
                : `${savedCount} ${
                    savedCount === 1
                      ? "college"
                      : "colleges"
                  } saved in your collection.`}
            </p>

            <span>
              {savedCount === 0
                ? "Explore Colleges →"
                : "View Saved Colleges →"}
            </span>
          </Link>

          {/* My Applications */}
          <Link
            to="/my-applications"
            className="dashboard-card"
          >
            <div className="dashboard-icon">📝</div>

            <h2>My Applications</h2>

            <p>
              {applicationStats.total === 0
                ? "Track your admission applications in one place."
                : `${applicationStats.total} ${
                    applicationStats.total === 1
                      ? "application"
                      : "applications"
                  } currently being tracked.`}
            </p>

            <span>
              {applicationStats.total === 0
                ? "Add Application →"
                : "View Applications →"}
            </span>
          </Link>

          {/* Important Dates */}
          <Link
            to="/important-dates"
            className="dashboard-card"
          >
            <div className="dashboard-icon">📅</div>

            <h2>Important Dates</h2>

            <p>
              Keep track of application deadlines and
              admission dates.
            </p>

            <span>
              View Important Dates →
            </span>
          </Link>

        </div>

        <section className="dashboard-next">

          <span className="page-eyebrow">
            YOUR ADMISSION JOURNEY
          </span>

          <h2>
            Everything you need, in one place.
          </h2>

          <p>
            Admission Saathi will help you discover
            colleges, compare options and keep track of
            your admission journey.
          </p>

          <div className="dashboard-actions">

            <Link
              to="/colleges"
              className="dashboard-primary"
            >
              Find Colleges
            </Link>

            <Link
              to="/compare"
              className="dashboard-secondary"
            >
              Compare Colleges
            </Link>

          </div>

        </section>

      </section>
    </main>
  );
}