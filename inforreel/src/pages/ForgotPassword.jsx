import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email.");
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
      navigate("/reset-password", { state: { email } });
    }
  };
  

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "'Source Sans Pro', sans-serif",
        backgroundColor: "#000",
        color: "#fff",
      }}
    >
      <Header />

      <main style={{ flex: 1 }}>
        <div
          style={{
            textAlign: "center",
            padding: "4rem 1rem",
            maxWidth: "800px",
            margin: "auto",
          }}
        >
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "2rem" }}>
            Forgot Password
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              maxWidth: "400px",
              margin: "0 auto",
              textAlign: "left",
            }}
          >
            <label style={{ fontSize: "0.95rem", marginBottom: "-0.5rem" }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "12px",
                border: "1px solid #444",
                backgroundColor: "#1d1d1d",
                borderRadius: "6px",
                fontSize: "1rem",
                color: "#fff",
              }}
            />
            {error && (
              <span style={{ color: "#ff4d4d", fontSize: "0.85rem" }}>{error}</span>
            )}

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
              }}
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ForgotPassword;
