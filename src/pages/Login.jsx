import { useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    const { data, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError) {
      console.error("Login error:", loginError);
      setError(loginError.message);
      setLoading(false);
      return;
    }

    if (!data?.session) {
      setError("Login completed, but no session was created.");
      setLoading(false);
      return;
    }

    setSuccess("Login successful.");
    setLoading(false);
    setLoggedIn(true);
  }

  if (loggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <div className="login-logo">A+</div>

          <div>
            <strong>Admission Saathi</strong>
            <span>Your journey. Your future.</span>
          </div>
        </div>

        <div className="login-heading">
          <span className="page-eyebrow">WELCOME BACK</span>

          <h1>Sign in to your account.</h1>

          <p>
            Continue your admission journey with Admission Saathi.
          </p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <label>
            Email address

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
            />
          </label>

          <label>
            Password

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
          </label>

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In →"}
          </button>
        </form>

        <div
          style={{
            width: "100%",
            marginTop: "12px",
            marginBottom: "4px",
            textAlign: "right",
          }}
        >
          <a
            href="/forgot-password"
            style={{
              display: "inline-block",
              color: "#111827",
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "600",
              pointerEvents: "auto",
            }}
          >
            Forgot your password?
          </a>
        </div>

        {error && (
          <p className="login-error">
            {error}
          </p>
        )}

        {success && (
          <p className="login-success">
            {success}
          </p>
        )}

        <p className="login-note">
          Don't have an account?{" "}
          <a
            href="/signup"
            style={{
              cursor: "pointer",
              pointerEvents: "auto",
              position: "relative",
              zIndex: 10,
            }}
          >
            Create an account
          </a>
        </p>
      </section>
    </main>
  );
}