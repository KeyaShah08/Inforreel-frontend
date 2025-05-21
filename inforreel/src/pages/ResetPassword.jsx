import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  // Access email from location state, default to empty string if not present
  const initialEmail = location.state?.email || "";

  const [email, setEmail] = useState(initialEmail); // Initialize email state with the passed email
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state
  const [apiError, setApiError] = useState(""); // Add API error state
  const [successMessage, setSuccessMessage] = useState(""); // Add success message state


  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*~]).{8,}$/.test(password);

   // Effect to clear API error/success messages when inputs change
   useEffect(() => {
    setApiError("");
    setSuccessMessage("");
   }, [email, newPassword, confirmPassword]);


  const handleSubmit = async (e) => { // Make handleSubmit async
    e.preventDefault();
    const newErrors = {};
    setApiError(""); // Clear previous API errors
    setSuccessMessage(""); // Clear previous success messages


    // Email validation (optional but good practice even if disabled)
    if (!email) {
        newErrors.email = "Email is missing."; // Should not happen if pre-filled, but as a fallback
    } else if (!validateEmail(email)) {
        newErrors.email = "Please enter a valid email address."; // Should not happen if pre-filled
    }


    if (!newPassword) newErrors.newPassword = "Please enter a new password.";
    else if (!validatePassword(newPassword)) newErrors.newPassword = "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.";

    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else if (newPassword !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
        // If there are client-side validation errors, stop here
        return;
    }

    setLoading(true); // Set loading to true before API call

    try {
      // *** API Call to Reset Password ***
      const response = await fetch("http://54.193.54.116:8000/api/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.code === 200) {
        // Password reset successful
        setSuccessMessage(data.message || "Password reset successfully!");
        // Redirect to sign-in page after a short delay to show success message
        setTimeout(() => {
          navigate("/signin");
        }, 2000); // Redirect after 2 seconds (adjust delay as needed)
      } else {
        // API call failed, display error message from response
        setApiError(data.message || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      // Network error or other exceptions
      setApiError("An error occurred while resetting password. Please try again.");
      console.error("Password Reset API Error:", error);
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      fontFamily: "'Source Sans Pro', sans-serif",
      backgroundColor: "#000000",
      color: "#ffffff"
    }}>
      <Header />

      <main style={{ flex: 1 }}>
        <div style={{ textAlign: "center", padding: "3.5rem 1rem", maxWidth: "800px", margin: "auto" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1.5rem" }}>
            Reset Your Password
          </h2>

           {/* Display API error or success message */}
          {apiError && (
            <p style={{ color: "#ff4d4d", marginBottom: "1rem" }}>{apiError}</p>
          )}
          {successMessage && (
            <p style={{ color: "#4CAF50", marginBottom: "1rem" }}>{successMessage}</p>
          )}


          <form onSubmit={handleSubmit} style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            maxWidth: "400px",
            margin: "2rem auto 0",
            textAlign: "left",
          }}>
            {/* Email input */}
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
                  backgroundColor: "#1d1d1d",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  width: "100%",
                  color: "#fff",
                  cursor: initialEmail ? "not-allowed" : "text", // Indicate if disabled
                }}
                disabled={!!initialEmail} // Disable if email was pre-filled
              />
              {errors.email && (
                <span style={{ color: "#ff4d4d", fontSize: "0.85rem", marginTop: "0.3rem" }}>
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password input with toggle */}
            {[
              { label: "New Password", value: newPassword, setValue: setNewPassword, show: showPassword, setShow: setShowPassword, name: "newPassword" },
              { label: "Confirm Password", value: confirmPassword, setValue: setConfirmPassword, show: showConfirm, setShow: setShowConfirm, name: "confirmPassword" }
            ].map(({ label, value, setValue, show, setShow, name }) => (
              <div key={name} style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: "0.95rem", marginBottom: "0.4rem" }}>{label}</label>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <input
                    type={show ? "text" : "password"}
                    placeholder={label}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    style={{
                      padding: "10px",
                      border: `1px solid ${errors[name] ? '#ff4d4d' : '#444'}`, // Highlight if error
                      backgroundColor: "#1d1d1d",
                      borderRadius: "6px",
                      fontSize: "1rem",
                      width: "100%",
                      color: "#fff",
                    }}
                    // REMOVED: disabled={loading || !!initialEmail && (!newPassword || !confirmPassword)}
                    // Keep password fields enabled for typing
                    disabled={loading} // Still disable while API call is in progress
                  />
                  <span
                    style={{ position: "absolute", right: 10, cursor: loading ? "not-allowed" : "pointer", color: "#aaa" }}
                    onMouseDown={() => !loading && setShow(true)} // Prevent toggle while loading
                    onMouseUp={() => !loading && setShow(false)} // Prevent toggle while loading
                    onMouseLeave={() => !loading && setShow(false)} // Prevent toggle while loading
                  >
                    {show ? <EyeSlashIcon style={{ width: 20, height: 20 }} /> : <EyeIcon style={{ width: 20, height: 20 }} />}
                  </span>
                </div>
                {name === "newPassword" && (
                  <small style={{ fontSize: "0.75rem", color: "#888", marginTop: "0.3rem" }}>
                    Use 8 or more characters with a mix of uppercase, lowercase, numbers & symbols
                  </small>
                )}
                {errors[name] && (
                  <span style={{ color: "#ff4d4d", fontSize: "0.85rem", marginTop: "0.3rem" }}>
                    {errors[name]}
                  </span>
                )}
              </div>
            ))}

            <button
              type="submit"
               // Button is disabled if loading, if there are validation errors, or if email is pre-filled but passwords aren't entered
               disabled={loading || !!errors.email || !!errors.newPassword || !!errors.confirmPassword || (!!initialEmail && (!newPassword || !confirmPassword)) }
              style={{
                backgroundColor: loading || !!errors.email || !!errors.newPassword || !!errors.confirmPassword || (!!initialEmail && (!newPassword || !confirmPassword)) ? "#444" : "#96105E", // Change color if disabled
                color: loading || !!errors.email || !!errors.newPassword || !!errors.confirmPassword || (!!initialEmail && (!newPassword || !confirmPassword)) ? "#aaa" : "white", // Change text color if disabled
                fontSize: "1rem",
                fontWeight: 600,
                padding: "12px",
                border: "none",
                borderRadius: "6px",
                cursor: loading || !!errors.email || !!errors.newPassword || !!errors.confirmPassword || (!!initialEmail && (!newPassword || !confirmPassword)) ? "not-allowed" : "pointer",
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