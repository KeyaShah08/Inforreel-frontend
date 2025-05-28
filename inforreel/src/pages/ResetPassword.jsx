import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const initialEmail = location.state?.email || "";

  const [email, setEmail] = useState(initialEmail);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*~]).{8,}$/.test(password);

  useEffect(() => {
    setApiError("");
    setSuccessMessage("");
  }, [email, newPassword, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    setApiError("");
    setSuccessMessage("");

    if (!email) {
      newErrors.email = "Email is missing.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!newPassword) newErrors.newPassword = "Please enter a new password.";
    else if (!validatePassword(newPassword))
      newErrors.newPassword =
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.";

    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else if (newPassword !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      const response = await fetch("http://54.193.54.116:8000/api/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.code === 200) {
        setSuccessMessage(data.message || "Password reset successfully!");
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        setApiError(data.message || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      setApiError("An error occurred while resetting password. Please try again.");
      console.error("Password Reset API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "'Source Sans Pro', sans-serif",
        backgroundColor: "#141414",
        color: "#ffffff",
      }}
    >
      <Header />

      <main style={{ flex: 1 }}>
        <div style={{ textAlign: "center", padding: "3.5rem 1rem", maxWidth: "800px", margin: "auto" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginTop: "2rem", marginBottom: "2rem" }}>
            Reset Your Password
          </h2>

          {apiError && <p style={{ color: "#ff4d4d", marginBottom: "1rem" }}>{apiError}</p>}
          {successMessage && <p style={{ color: "#4CAF50", marginBottom: "1rem" }}>{successMessage}</p>}

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              maxWidth: "400px",
              margin: "2rem auto 0",
              textAlign: "left",
            }}
          >
            {/* Email Input */}
            <div>
              <label style={{ fontSize: "0.95rem", marginBottom: "0.4rem", display: "block" }}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: "10px",
                  border: "1px solid #444",
                  backgroundColor: "#141414",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  width: "100%",
                  color: "#fff",
                  cursor: initialEmail ? "not-allowed" : "text",
                }}
                disabled={!!initialEmail}
              />
              {errors.email && (
                <span style={{ color: "#ff4d4d", fontSize: "0.85rem", marginTop: "0.3rem" }}>
                  {errors.email}
                </span>
              )}
            </div>

            {/* New Password */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: "0.95rem", marginBottom: "0.4rem" }}>New Password</label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{
                    padding: "10px",
                    border: `1px solid ${errors.newPassword ? '#ff4d4d' : '#444'}`,
                    backgroundColor: "#141414",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    width: "100%",
                    color: "#fff",
                  }}
                  disabled={loading}
                />
                <span
                  style={{ position: "absolute", right: 10, cursor: loading ? "not-allowed" : "pointer", color: "#aaa" }}
                  onMouseDown={() => !loading && setShowPassword(true)}
                  onMouseUp={() => !loading && setShowPassword(false)}
                  onMouseLeave={() => !loading && setShowPassword(false)}
                >
                  {showPassword ? <EyeSlashIcon style={{ width: 20, height: 20 }} /> : <EyeIcon style={{ width: 20, height: 20 }} />}
                </span>
              </div>
              <small style={{ fontSize: "0.75rem", color: "#888", marginTop: "0.3rem" }}>
                Use 8 or more characters with a mix of uppercase, lowercase, numbers & symbols
              </small>
              {errors.newPassword && (
                <span style={{ color: "#ff4d4d", fontSize: "0.85rem", marginTop: "0.3rem" }}>
                  {errors.newPassword}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: "0.95rem", marginBottom: "0.4rem" }}>Confirm Password</label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    padding: "10px",
                    border: `1px solid ${errors.confirmPassword ? '#ff4d4d' : '#444'}`,
                    backgroundColor: "#141414",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    width: "100%",
                    color: "#fff",
                  }}
                  disabled={loading}
                />
                <span
                  style={{ position: "absolute", right: 10, cursor: loading ? "not-allowed" : "pointer", color: "#aaa" }}
                  onMouseDown={() => !loading && setShowConfirm(true)}
                  onMouseUp={() => !loading && setShowConfirm(false)}
                  onMouseLeave={() => !loading && setShowConfirm(false)}
                >
                  {showConfirm ? <EyeSlashIcon style={{ width: 20, height: 20 }} /> : <EyeIcon style={{ width: 20, height: 20 }} />}
                </span>
              </div>
              {errors.confirmPassword && (
                <span style={{ color: "#ff4d4d", fontSize: "0.85rem", marginTop: "0.3rem" }}>
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={
                loading ||
                !!errors.email ||
                !!errors.newPassword ||
                !!errors.confirmPassword ||
                (!!initialEmail && (!newPassword || !confirmPassword))
              }
              style={{
                backgroundColor:
                  loading ||
                  !!errors.email ||
                  !!errors.newPassword ||
                  !!errors.confirmPassword ||
                  (!!initialEmail && (!newPassword || !confirmPassword))
                    ? "#444"
                    : "#96105E",
                color:
                  loading ||
                  !!errors.email ||
                  !!errors.newPassword ||
                  !!errors.confirmPassword ||
                  (!!initialEmail && (!newPassword || !confirmPassword))
                    ? "#aaa"
                    : "white",
                fontSize: "1rem",
                fontWeight: 600,
                padding: "12px",
                border: "none",
                borderRadius: "6px",
                cursor:
                  loading ||
                  !!errors.email ||
                  !!errors.newPassword ||
                  !!errors.confirmPassword ||
                  (!!initialEmail && (!newPassword || !confirmPassword))
                    ? "not-allowed"
                    : "pointer",
                marginTop: "1rem",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ResetPassword;
