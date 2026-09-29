import ExamDetail from "./pages/ExamDetail";
import ExamInfo from "./pages/ExamInfo";
import CourseDetail from "./pages/CourseDetail";
import ScholarshipDetail from "./pages/ScholarshipDetail.jsx";
import ImportantDates from "./pages/ImportantDates";
import MyApplications from "./pages/MyApplications";
import SavedColleges from "./pages/SavedColleges";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import "./App.css";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Colleges from "./pages/Colleges";
import CollegeDetail from "./pages/CollegeDetail";
import Courses from "./pages/Courses";
import Exams from "./pages/Exams";
import Scholarships from "./pages/Scholarships";
import Compare from "./pages/Compare";
import Login from "./pages/login";
import ForgotPassword from "./pages/ForgotPassword";
import Signup from "./pages/signup";

import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";

import { supabase } from "./lib/supabase";


function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user || null);
      setLoading(false);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f6f8fc",
          color: "#6b7280",
        }}
      >
        Checking your session...
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


function ProfilePage() {
  const [user, setUser] = useState(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [preferredCourse, setPreferredCourse] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    loadProfile();
  }, []);


  async function loadProfile() {
    setLoading(true);
    setError("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError("Please log in to view your profile.");
      setLoading(false);
      return;
    }

    setUser(user);

    const { data, error: profileError } = await supabase
      .from("profiles")
      .select(
        "id, full_name, phone, city, preferred_course, created_at, updated_at"
      )
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("Profile load error:", profileError);
      setError(profileError.message);
      setLoading(false);
      return;
    }

    setFullName(
      data?.full_name ||
        user.user_metadata?.full_name ||
        ""
    );

    setPhone(data?.phone || "");
    setCity(data?.city || "");
    setPreferredCourse(data?.preferred_course || "");

    setLoading(false);
  }


  async function handleSave(event) {
    event.preventDefault();

    if (!user) return;

    setSaving(true);
    setMessage("");
    setError("");

    const { error: saveError } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          full_name: fullName.trim(),
          phone: phone.trim() || null,
          city: city.trim() || null,
          preferred_course:
            preferredCourse.trim() || null,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "id",
        }
      );

    if (saveError) {
      console.error("Profile save error:", saveError);
      setError(saveError.message);
      setSaving(false);
      return;
    }


    const { error: authUpdateError } =
      await supabase.auth.updateUser({
        data: {
          full_name: fullName.trim(),
        },
      });

    if (authUpdateError) {
      console.error(
        "Auth metadata update error:",
        authUpdateError
      );
    }

    setMessage("Profile updated successfully.");
    setSaving(false);
  }


  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          padding: "80px 24px",
          background: "#f6f8fc",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          Loading profile...
        </div>
      </main>
    );
  }


  if (!user) {
    return (
      <main
        style={{
          minHeight: "100vh",
          padding: "80px 24px",
          background: "#f6f8fc",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background: "#fff",
            padding: "35px",
            borderRadius: "20px",
            border: "1px solid #e5e7eb",
          }}
        >
          <h1>Please log in</h1>

          <p>
            You need to log in before managing your profile.
          </p>
        </div>
      </main>
    );
  }


  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "60px 24px",
        background: "#f6f8fc",
      }}
    >
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >

        <div
          style={{
            marginBottom: "28px",
          }}
        >
          <span
            style={{
              color: "#78c043",
              fontSize: "11px",
              fontWeight: "800",
              letterSpacing: "1.5px",
            }}
          >
            MY PROFILE
          </span>

          <h1
            style={{
              color: "#111827",
              margin: "10px 0",
              fontSize: "36px",
            }}
          >
            Manage your profile
          </h1>

          <p
            style={{
              color: "#6b7280",
              margin: 0,
            }}
          >
            Keep your personal information and
            admission preferences up to date.
          </p>
        </div>


        <div
          style={{
            background: "#fff",
            padding: "32px",
            borderRadius: "20px",
            border: "1px solid #e5e7eb",
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginBottom: "30px",
              paddingBottom: "24px",
              borderBottom: "1px solid #e5e7eb",
            }}
          >

            <div
              style={{
                width: "58px",
                height: "58px",
                borderRadius: "50%",
                background: "#111827",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: "700",
              }}
            >
              {(fullName || user.email || "S")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <strong
                style={{
                  display: "block",
                  color: "#111827",
                  fontSize: "17px",
                }}
              >
                {fullName || "Student"}
              </strong>

              <span
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                {user.email}
              </span>
            </div>

          </div>


          <form onSubmit={handleSave}>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, minmax(0, 1fr))",
                gap: "22px",
              }}
            >

              <label
                style={{
                  color: "#111827",
                  fontWeight: "600",
                }}
              >
                Full name

                <input
                  type="text"
                  value={fullName}
                  onChange={(event) =>
                    setFullName(event.target.value)
                  }
                  placeholder="Enter your full name"
                  required
                  style={{
                    display: "block",
                    width: "100%",
                    boxSizing: "border-box",
                    marginTop: "8px",
                    padding: "13px 14px",
                    border:
                      "1px solid #dfe3ea",
                    borderRadius: "11px",
                    outline: "none",
                    color: "#111827",
                    background: "#fff",
                  }}
                />
              </label>


              <label
                style={{
                  color: "#111827",
                  fontWeight: "600",
                }}
              >
                Phone number

                <input
                  type="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value)
                  }
                  placeholder="Enter your phone number"
                  style={{
                    display: "block",
                    width: "100%",
                    boxSizing: "border-box",
                    marginTop: "8px",
                    padding: "13px 14px",
                    border:
                      "1px solid #dfe3ea",
                    borderRadius: "11px",
                    outline: "none",
                    color: "#111827",
                    background: "#fff",
                  }}
                />
              </label>


              <label
                style={{
                  color: "#111827",
                  fontWeight: "600",
                }}
              >
                City

                <input
                  type="text"
                  value={city}
                  onChange={(event) =>
                    setCity(event.target.value)
                  }
                  placeholder="Enter your city"
                  style={{
                    display: "block",
                    width: "100%",
                    boxSizing: "border-box",
                    marginTop: "8px",
                    padding: "13px 14px",
                    border:
                      "1px solid #dfe3ea",
                    borderRadius: "11px",
                    outline: "none",
                    color: "#111827",
                    background: "#fff",
                  }}
                />
              </label>


              <label
                style={{
                  color: "#111827",
                  fontWeight: "600",
                }}
              >
                Preferred course

                <input
                  type="text"
                  value={preferredCourse}
                  onChange={(event) =>
                    setPreferredCourse(
                      event.target.value
                    )
                  }
                  placeholder="Example: B.Tech, BCA, B.Com"
                  style={{
                    display: "block",
                    width: "100%",
                    boxSizing: "border-box",
                    marginTop: "8px",
                    padding: "13px 14px",
                    border:
                      "1px solid #dfe3ea",
                    borderRadius: "11px",
                    outline: "none",
                    color: "#111827",
                    background: "#fff",
                  }}
                />
              </label>

            </div>


            {error && (
              <p
                style={{
                  marginTop: "20px",
                  color: "#dc2626",
                  background: "#fef2f2",
                  padding: "12px 14px",
                  borderRadius: "10px",
                }}
              >
                {error}
              </p>
            )}


            {message && (
              <p
                style={{
                  marginTop: "20px",
                  color: "#15803d",
                  background: "#f0fdf4",
                  padding: "12px 14px",
                  borderRadius: "10px",
                }}
              >
                {message}
              </p>
            )}


            <button
              type="submit"
              disabled={saving}
              style={{
                marginTop: "25px",
                padding: "13px 22px",
                background: "#111827",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                fontWeight: "700",
                cursor: saving
                  ? "not-allowed"
                  : "pointer",
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving
                ? "Saving..."
                : "Save Profile →"}
            </button>

          </form>

        </div>

      </section>
    </main>
  );
}


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setIsLoggedIn(!!session);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="app">
      {!isLoggedIn && <Navbar />}

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/colleges"
          element={<Colleges />}
        />

        <Route
          path="/colleges/:id"
          element={<CollegeDetail />}
        />

        <Route
          path="/courses"
          element={<Courses />}
        />

        <Route
          path="/courses/:category"
          element={<CourseDetail />}
        />

        <Route
          path="/exams"
          element={<Exams />}
        />

        <Route
          path="/exams/:category"
          element={<ExamDetail />}
        />

        <Route
          path="/exams/:category/:examId"
          element={<ExamInfo />}
        />

        <Route
          path="/scholarships"
          element={<Scholarships />}
        />

        <Route
          path="/compare"
          element={<Compare />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/saved-colleges"
          element={
            <ProtectedRoute>
              <SavedColleges />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/important-dates"
          element={
            <ProtectedRoute>
              <ImportantDates />
            </ProtectedRoute>
          }
        />

        <Route
          path="/scholarships/:id"
          element={<ScholarshipDetail />}
        />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;