import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function ResetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*~]).{8,}$/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) newErrors.email = "Please enter your email.";
    else if (!validateEmail(email)) newErrors.email = "Please enter a valid email address.";

    if (!newPassword) newErrors.newPassword = "Please enter a new password.";
    else if (!validatePassword(newPassword)) newErrors.newPassword = "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.";

    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else if (newPassword !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate("/signin");
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      fontFamily: "'Source Sans Pro', sans-serif",
      backgroundColor: "#000000",      color: "#ffffff"
    }}>
      <Header />

      <main style={{ flex: 1 }}>
        <div style={{ textAlign: "center", padding: "3.5rem 1rem", maxWidth: "800px", margin: "auto" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1.5rem" }}>
            Reset Your Password
          </h2>

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
                }}
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
                      border: "1px solid #444",
                      backgroundColor: "#1d1d1d",
                      borderRadius: "6px",
                      fontSize: "1rem",
                      width: "100%",
                      color: "#fff",
                    }}
                  />
                  <span
                    style={{ position: "absolute", right: 10, cursor: "pointer", color: "#aaa" }}
                    onMouseDown={() => setShow(true)}
                    onMouseUp={() => setShow(false)}
                    onMouseLeave={() => setShow(false)}
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
              style={{
                backgroundColor: "#96105E",
                color: "white",
                fontSize: "1rem",
                fontWeight: 600,
                padding: "12px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                marginTop: "1rem",
              }}
            >
              Reset Password
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ResetPassword;
