import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null); // State for API errors
  const [isLoading, setIsLoading] = useState(false); // State for loading state
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear API error when user starts typing again
    if (apiError) {
        setApiError(null);
    }
  };

  // Basic email format validation (client-side)
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const resendOtp = async (email) => {
  try {
    await fetch("http://54.224.59.39:8000/api/users/resend-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    console.log("OTP resent successfully");
  } catch (err) {
    console.error("Could not resend OTP:", err);
    // optional: surface a toast/snackbar, but don't block navigation
  }
};


   // Password validation (client-side - you might rely solely on backend for real auth)
   // const validatePassword = (password) => {
   //   const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*~]).{8,}$/;
   //   return regex.test(password);
   // };


  const handleSubmit = async (e) => { // Made function async to use await
    e.preventDefault();
    setApiError(null); // Clear previous API errors
    setIsLoading(true); // Set loading state

    const newErrors = {};

    // Client-side validation
    if (!formData.email) {
      newErrors.email = "Please enter your email address.";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Please enter your password.";
    }
    // Note: Keeping client-side password format validation, but real auth relies on backend check
    // else if (!validatePassword(formData.password)) {
    //    newErrors.password = "Please enter a valid password.";
    // }


    setErrors(newErrors);

    // Proceed with API call only if client-side validation passes
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://54.224.59.39:8000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Send email and password
        });

        const data = await response.json(); // Parse JSON response

        if (response.ok && data.code === 200) {
          // API call successful
          console.log("Login API Response:", data);

          // Ensure data, data.data, and required properties exist before accessing
          if (data.data && typeof data.data.isVerified !== 'undefined' && typeof data.data.isProfileSetup !== 'undefined') {
             const { isVerified, isProfileSetup, email: userEmail, userType: userUserType, token } = data.data; // Extract email and userType

             // You might want to store the token (e.g., in localStorage or context) here
             // localStorage.setItem('authToken', token); // Store the token for authenticated requests

             // ----------------------------------------------
// Decide where to go after a successful /login
// ----------------------------------------------
if (isVerified === true && isProfileSetup === true) {
  // ✅ Everything complete → straight to dashboard
  console.log("Login successful, navigating to /dashboard");

  // Optionally persist the token before navigating
  // localStorage.setItem('authToken', token);

  navigate("/dashboard", {
    state: { authToken: token, userType: userUserType }
  });

} else {
  // ❗User still needs e‑mail verification or profile setup
  console.log(
    "User needs verification or profile setup → resending OTP, then navigating to /verify"
  );

  // 1️⃣   Fire ONE resend‑otp request
  await resendOtp(userEmail);

  // 2️⃣   Head to the VerifyAccount flow
  navigate("/verify", {
    state: {
      email: userEmail,          // for VerifyAccount screen
      userType: userUserType,    // general / influencer / vendor
      source: "login",           // helps VerifyAccount logic
      otpAlreadySent: true       // tells it not to auto‑resend
      // authToken: token        // (optional) pass token if needed
    }
  });
}

          } else {
              // Handle case where response data is missing expected fields
              console.error("Login API response missing required data fields:", data);
              setApiError("Login successful, but response data is incomplete. Please try logging in again.");
          }

        } else {
          // API call failed or returned non-200 code
          console.error("Login API Error:", data.error || "Login failed");
          setApiError(data.error || "An error occurred during login. Please check your email and password."); // Display API error message
        }
      } catch (error) {
        // Network errors or other unexpected issues
        console.error("Fetch Error:", error);
        setApiError("Failed to connect to the server or an unexpected error occurred.");
      } finally {
        setIsLoading(false); // Always turn off loading state
      }
    } else {
        setIsLoading(false); // Turn off loading if client-side validation fails
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
            Sign In
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
             {/* Display API error message if it exists */}
             {apiError && (
              <div style={{ color: "#ff4d4d", textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem' }}>
                {apiError}
              </div>
            )}

            {["email", "password"].map((field) => (
              <div key={field} style={{ display: "flex", flexDirection: "column" }}>
                <input
                  type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  style={{
                    padding: "12px",
                    border: errors[field] ? "1px solid #ff4d4d" : "1px solid #888", // Highlight error fields
                    backgroundColor: "#141414",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    color: "#fff",
                  }}
                  disabled={isLoading} // Disable inputs while loading
                />
                {errors[field] && (
                  <span style={{ color: "#ff4d4d", fontSize: "0.85rem", marginTop: "0.3rem" }}>
                    {errors[field]}
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
                cursor: isLoading ? "not-allowed" : "pointer", // Change cursor while loading
                opacity: isLoading ? 0.7 : 1, // Reduce opacity while loading
                transition: "all 0.3s ease", // Add transition for smoother effect
              }}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? "Signing In..." : "Sign In"} {/* Button text changes while loading */}
            </button>

            {/* Forgot password */}
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <span
                onClick={() => !isLoading && navigate("/forgot-password")} // Prevent navigation while loading
                style={{
                    color: "#fff",
                    textDecoration: "underline",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    fontWeight: 500,
                    opacity: isLoading ? 0.7 : 1
                }}
              >
                Forgot Password?
              </span>
            </div>

            {/* Remember me */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ width: "16px", height: "16px", accentColor: "#96105E", cursor: isLoading ? "not-allowed" : "pointer" }}
                disabled={isLoading} // Disable checkbox while loading
              />
              <label htmlFor="rememberMe" style={{ fontSize: "0.95rem", color: "#fff", opacity: isLoading ? 0.7 : 1 }}>
                Remember me
              </label>
            </div>

            {/* Sign up link */}
            <p style={{ fontSize: "0.9rem", color: "#888888", marginTop: "2rem", textAlign: "center", opacity: isLoading ? 0.7 : 1 }}>
              New to InforReel?
              <span
                onClick={() => !isLoading && navigate("/welcome")} // Prevent navigation while loading
                style={{
                    color: "#96105E",
                    textDecoration: "underline",
                    cursor: isLoading ? "not-allowed" : "pointer"
                }}
              >
                Sign up now.
              </span>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SignIn;