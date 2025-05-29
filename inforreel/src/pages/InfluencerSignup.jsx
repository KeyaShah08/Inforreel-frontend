import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function InfluencerSignup() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state for API call
  const [apiError, setApiError] = useState(""); // Add state for API error messages

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({}); // Clear errors when user starts typing
    setApiError(""); // Clear API error when user starts typing
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => { // Make handleSubmit async
    e.preventDefault();
    const newErrors = {};

    // --- Client-side Validation (Keep existing logic) ---
    ["fullName", "username", "email", "password", "confirmPassword"].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] =
          field === "confirmPassword"
            ? "Please enter confirm password"
            : field === "email"
            ? "Please enter email address"
            : `Please enter ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`;
      }
    });

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*~]).{8,}$/;
    if (formData.password && !passwordRegex.test(formData.password)) {
      newErrors.password = "Use 8+ characters with uppercase, lowercase, number & symbol.";
    }

    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!agreed) {
      newErrors.agreed = "You must agree to the terms to continue.";
    }
    // --- End Client-side Validation ---


    setErrors(newErrors); // Update validation errors
    setApiError(""); // Clear previous API errors before attempting new submission

    // If there are any client-side validation errors, stop here
    if (Object.keys(newErrors).length > 0) {
      console.log("Client-side validation failed.", newErrors);
      return;
    }

    // If client-side validation passed, proceed with API call
    setLoading(true); // Set loading state

    // Prepare data for the API call
    const dataToSend = {
      name: formData.fullName, // API expects 'name', using 'fullName' from form
      username: formData.username,
      email: formData.email,
      password: formData.password,
      userType: "influencer", // Hardcode userType as 'influencer'
    };

    console.log("Sending registration data to API:", dataToSend);

    try {
      const response = await fetch("http://54.224.59.39:8000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      // Attempt to parse JSON response even on errors
      const data = await response.json();

      console.log("Registration API Response Status:", response.status);
      console.log("Registration API Response Data:", data);


      // Check if the API response indicates success (typically status 2xx)
      if (response.ok) {
        console.log("Registration successful:", data);
        // On success, navigate to the verification page
        navigate("/verify", {
          state: {
            email: formData.email,
            userType: "influencer", // Explicitly pass userType
            // You can remove 'next' if userType handles navigation in VerifyAccount
            // next: "influencer-profile",
          },
        });
      } else {
        // Handle API errors (e.g., email already exists, username taken, backend validation)
        console.error("Registration failed:", data);
        // Display a more informative error if the backend provides one
        setApiError(data.message || data.error || `Registration failed. Status: ${response.status}. Please try again.`);
        // Optionally update specific field errors if API sends them back in a structured way
        // e.g., if data.errors existed and mapped to form fields
      }
    } catch (error) {
      // Handle network errors or issues with the fetch request itself
      console.error("Network error or unexpected issue:", error);
      setApiError("An error occurred during registration. Please try again later."); // Display generic error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Check if form is valid for button state (excluding agreed error which is handled separately)
  const isFormValid = Object.keys(errors).length === 0 && agreed && Object.values(formData).every(field => field !== "");

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      fontFamily: "'Source Sans Pro', sans-serif",
      backgroundColor: "#141414",
      color: "#ffffff"
    }}>
      <Header />
      <main style={{ flex: 1 }}>
        <div style={{ textAlign: "center", padding: "3.5rem 1rem", maxWidth: "800px", margin: "auto" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem" , marginTop: "2rem"}}>
            Create your influencer account
          </h2>
          <p style={{ fontSize: "1rem", color: "#ccc", marginBottom: "2rem", fontWeight: 400 }}>
            Just a few steps and you're done!
          </p>

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
            {/* API Error Message Display */}
            {apiError && (
              <span style={{ color: "#ff4d4d", fontSize: "0.9rem", textAlign: "center" }}>
                {apiError}
              </span>
            )}

            {["fullName", "username", "email"].map((field) => (
              <div key={field} style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: "0.95rem", marginBottom: "0.4rem" }}>
                  {field === "fullName" ? "Full name" : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={`Enter your ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                  value={formData[field]}
                  onChange={handleChange}
                  style={{
                    padding: "10px",
                    border: `1px solid ${(errors[field] || (apiError && field === 'email')) ? '#ff4d4d' : '#444'}`, // Highlight on client or potential API email error
                    backgroundColor: "#141414",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    color: "#fff",
                  }}
                />
                {errors[field] && (
                  <span style={{ color: "#ff4d4d", fontSize: "0.85rem", marginTop: "0.3rem" }}>
                    {errors[field]}
                  </span>
                )}
              </div>
            ))}

            {["password", "confirmPassword"].map((field) => (
              <div key={field} style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: "0.95rem", marginBottom: "0.4rem" }}>
                  {field === "confirmPassword" ? "Confirm password" : "Password"}
                </label>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <input
                    type={field === "password" ? (showPassword ? "text" : "password") : (showConfirm ? "text" : "password")}
                    name={field}
                    placeholder={field === "confirmPassword" ? "Confirm password" : "Password"}
                    value={formData[field]}
                    onChange={handleChange}
                    style={{
                      padding: "10px",
                      border: `1px solid ${(errors[field] || (apiError && (field === 'password' || field === 'confirmPassword'))) ? '#ff4d4d' : '#444'}`, // Highlight on client or potential API password error
                      backgroundColor: "#141414",
                      borderRadius: "6px",
                      fontSize: "1rem",
                      width: "100%",
                      color: "#fff",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      right: 10,
                      cursor: "pointer",
                      height: "20px",
                      width: "20px",
                      color: "#aaa",
                    }}
                    onMouseDown={() => field === "password" ? setShowPassword(true) : setShowConfirm(true)}
                    onMouseUp={() => field === "password" ? setShowPassword(false) : setShowConfirm(false)}
                    onMouseLeave={() => field === "password" ? setShowPassword(false) : setShowConfirm(false)}
                  >
                    {field === "password"
                      ? showPassword
                        ? <EyeSlashIcon style={{ width: "20px", height: "20px" }} />
                        : <EyeIcon style={{ width: "20px", height: "20px" }} />
                      : showConfirm
                        ? <EyeSlashIcon style={{ width: "20px", height: "20px" }} />
                        : <EyeIcon style={{ width: "20px", height: "20px" }} />}
                  </span>
                </div>
                {field === "password" && (
                  <small style={{ fontSize: "0.75rem", color: "#888", marginTop: "0.3rem" }}>
                    Use 8 or more characters with a mix of uppercase, lowercase, numbers & symbols
                  </small>
                )}
                {errors[field] && (
                  <span style={{ color: "#ff4d4d", fontSize: "0.85rem", marginTop: "0.3rem" }}>
                    {errors[field]}
                  </span>
                )}
              </div>
            ))}

            <div style={{ display: "flex", alignItems: "center", fontSize: "0.85rem", gap: "0.5rem", lineHeight: "1.4" }}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{ accentColor: "#96105E", marginTop: "2px", cursor: "pointer" }}
              />
              <span style={{ color: "#ccc" }}>
                By creating an account, I agree to our{" "}
                <a href="#" style={{ color: "#96105E", textDecoration: "underline" }}>Terms of use</a> and{" "}
                <a href="#" style={{ color: "#96105E", textDecoration: "underline" }}>Privacy Policy</a>.
              </span>
            </div>
            {errors.agreed && (
              <span style={{ color: "#ff4d4d", fontSize: "0.85rem" }}>{errors.agreed}</span>
            )}

            <button
              type="submit"
              disabled={loading || Object.keys(errors).length > 0 || !agreed || Object.values(formData).some(field => field === "")}
              style={{
                // Disable button styling
                backgroundColor: (loading || Object.keys(errors).length > 0 || !agreed || Object.values(formData).some(field => field === "")) ? "#444" : "#96105E",
                color: (loading || Object.keys(errors).length > 0 || !agreed || Object.values(formData).some(field => field === "")) ? "#aaa" : "white",
                fontSize: "1rem",
                fontWeight: 600,
                padding: "12px",
                border: "none",
                borderRadius: "6px",
                cursor: (loading || Object.keys(errors).length > 0 || !agreed || Object.values(formData).some(field => field === "")) ? "not-allowed" : "pointer",
                marginTop: "1rem",
                transition: "all 0.3s ease",
                opacity: loading ? 0.7 : 1, // Reduce opacity when loading
              }}
            >
              {loading ? "Signing Up..." : "Next"} {/* Button text changes based on loading state */}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default InfluencerSignup;