import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Card from "../components/common/Card";
import Logo from "../components/illustrations/Logo";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleReset(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    const { error: resetError } =
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}reset-password`,
      });

    if (resetError) {
      console.error("Password reset error:", resetError);
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setSuccess(
      "Password reset email sent. Please check your email."
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
          <span className="page-eyebrow">ACCOUNT RECOVERY</span>

          <h1>Reset your password.</h1>

          <p>
            Enter your email address and we’ll send you a
            password reset link.
          </p>
        </div>

        <form className="login-form" onSubmit={handleReset}>
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

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link →"}
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
          Remember your password?{" "}
          <Link to="/login">Back to Login</Link>
        </p>
      </Card>
    </main>
  );
}