import { useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [updated, setUpdated] = useState(false);

  async function handleReset(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error: updateError } =
      await supabase.auth.updateUser({
        password,
      });

    if (updateError) {
      console.error("Password update error:", updateError);
      setError(updateError.message);
      setLoading(false);
      return;
    }

    setSuccess("Password updated successfully.");
    setLoading(false);
    setUpdated(true);
  }

  if (updated) {
    return <Navigate to="/login" replace />;
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
          <span className="page-eyebrow">ACCOUNT RECOVERY</span>

          <h1>Set a new password.</h1>

          <p>
            Create a new password for your Admission Saathi account.
          </p>
        </div>

        <form className="login-form" onSubmit={handleReset}>
          <label>
            New password

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter new password"
              required
            />
          </label>

          <label>
            Confirm password

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              placeholder="Confirm new password"
              required
            />
          </label>

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password →"}
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
      </section>
    </main>
  );
}