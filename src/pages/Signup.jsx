import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Card from "../components/common/Card";
import Logo from "../components/illustrations/Logo";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSignup(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    const { data, error: signupError } =
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

    if (signupError) {
      console.error("Signup error:", signupError);
      setError(signupError.message);
      setLoading(false);
      return;
    }

    if (data?.session) {
      setSuccess("Account created successfully.");
      setLoading(false);
      navigate("/", { replace: true });
      return;
    }

    setSuccess(
      "Account created. Please check your email to confirm your account."
    );
    setLoading(false);
  }

  return (
    <main className="login-page">
      <Card as="section" className="login-card">
        <div className="login-brand">
          <div className="login-logo"><Logo size={36} /></div>

          <div>
            <strong>Admission Saathi</strong>
            <span>Your journey. Your future.</span>
          </div>
        </div>

        <div className="login-heading">
          <span className="page-eyebrow">CREATE ACCOUNT</span>

          <h1>Start your admission journey.</h1>

          <p>
            Create your Admission Saathi account to continue.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSignup}>
          <label>
            Full name

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your full name"
              required
            />
          </label>

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
              placeholder="Create a password"
              minLength={6}
              required
            />
          </label>

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account →"}
          </button>
        </form>

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
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>
      </Card>
    </main>
  );
}