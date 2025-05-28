import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => { // Make handleSubmit async
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!email) {
      setError("Please enter your email.");
      return;
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true); // Set loading to true before API call

    try {
      const response = await fetch("http://34.229.245.56:8000/api/users/request-password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();

      if (response.ok && data.code === 200) {
        // API call successful, navigate to VerifyAccount page with email
        navigate("/verify", { state: { email: email, source: 'forgot-password' } }); // Pass email and source
      } else {
        // API call failed, display error message from response
        setError(data.message || "Failed to request password reset. Please try again.");
      }
    } catch (error) {
      // Network error or other exceptions
      setError("An error occurred. Please check your network and try again.");
      console.error("API Error:", error);
    } finally {
      setLoading(false); // Set loading to false after API call
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
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "2rem", marginTop: "2rem" }}>
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
              Enter your email address and we’ll send a One Time Password (OTP) to reset password <br />
              <br />
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
                backgroundColor: "#141414",
                borderRadius: "6px",
                fontSize: "1rem",
                color: "#fff",
              }}
              disabled={loading} // Disable input while loading
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
                cursor: loading ? "not-allowed" : "pointer", // Change cursor while loading
                opacity: loading ? 0.7 : 1, // Reduce opacity while loading
              }}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Processing..." : "Continue"} {/* Change button text while loading */}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ForgotPassword;