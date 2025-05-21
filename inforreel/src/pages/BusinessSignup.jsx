import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function BusinessSignup() {
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
  const [usEligible, setUsEligible] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [apiError, setApiError] = useState(""); // Add API error state

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*~]).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Clear previous API errors
    setApiError("");

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

    if (formData.password && !passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.";
    }

    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!agreed) {
      newErrors.agreed = "You must agree to the terms to continue.";
    }

    if (!usEligible) {
      newErrors.usEligible = "Eligibility confirmation is required to proceed.";
    }

    setErrors(newErrors);

    // If there are errors, stop the submission
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // If no validation errors and eligible, proceed with API call
    if (Object.keys(newErrors).length === 0 && usEligible && agreed) {
      setLoading(true); // Set loading to true

      const apiPayload = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        username: formData.username,
        userType: "vendor", // As specified in the API
      };

      try {
        const response = await fetch("http://54.193.54.116:8000/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiPayload),
        });

        const result = await response.json();

        if (response.ok) {
          // API call successful

          // ADDED: Save fullName to sessionStorage
          sessionStorage.setItem("businessFullName", formData.fullName);

          // Navigate to verify page, passing email, next step, and importantly, the userType
          navigate("/verify", {
            state: {
              email: formData.email,
              next: "business-info", // This 'next' might not be directly used in VerifyAccount anymore if userType dictates navigation
              userType: "vendor", // <--- Add userType here as "vendor"
              // ADDED: Pass username in state to VerifyAccount
              username: formData.username,
            },
          });
        } else {
          // API call failed
          // Handle different types of errors from the API
          const errorMessage = result.message || "An error occurred during registration.";
          setApiError(errorMessage);
        }
      } catch (error) {
        // Handle network errors or other exceptions
        setApiError("Network error or unable to connect to the server.");
        console.error("API Call Error:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "'Source Sans Pro', sans-serif",
        backgroundColor: "#000000",
        color: "#ffffff",
      }}
    >
      <Header />
      <main style={{ flex: 1 }}>
        <div
          style={{
            textAlign: "center",
            padding: "3rem 1rem",
            maxWidth: "800px",
            margin: "auto",
          }}
        >
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              marginBottom: "0.5rem",
            }}
          >
            Create your business account
          </h2>
          <p style={{ fontSize: "1rem", color: "#ccc", marginBottom: "2rem" }}>
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
            {["fullName", "username", "email"].map((field) => (
              <div key={field} style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: "0.95rem", marginBottom: "0.4rem" }}>
                  {field === "fullName"
                    ? "Full name"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={`Enter your ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                  value={formData[field]}
                  onChange={handleChange}
                  style={{
                    padding: "10px",
                    border: `1px solid ${errors[field] ? '#ff4d4f' : '#444'}`,
                    backgroundColor: "#1d1d1d",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    color: "#fff",
                  }}
                />
                {errors[field] && (
                  <span style={{ color: "#ff4d4f", fontSize: "0.85rem", marginTop: "0.3rem" }}>
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
                    type={
                      field === "password"
                        ? showPassword ? "text" : "password"
                        : showConfirm ? "text" : "password"
                    }
                    name={field}
                    placeholder={field === "confirmPassword" ? "Confirm password" : "Password"}
                    value={formData[field]}
                    onChange={handleChange}
                    style={{
                      padding: "10px",
                      border: `1px solid ${errors[field] ? '#ff4d4f' : '#444'}`,
                      backgroundColor: "#1d1d1d",
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
                  <span style={{ color: "#ff4d4f", fontSize: "0.85rem", marginTop: "0.3rem" }}>
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
                By creating an account, I agree to our <a href="#" style={{ color: "#96105E", textDecoration: "underline" }}>Terms of use</a> and <a href="#" style={{ color: "#96105E", textDecoration: "underline" }}>Privacy Policy</a>.
              </span>
            </div>
            {errors.agreed && (
              <span style={{ color: "#ff4d4f", fontSize: "0.85rem" }}>{errors.agreed}</span>
            )}

            <div style={{ display: "flex", alignItems: "center", fontSize: "0.85rem", gap: "0.5rem", lineHeight: "1.4" }}>
              <input
                type="checkbox"
                checked={usEligible}
                onChange={(e) => setUsEligible(e.target.checked)}
                style={{ accentColor: "#96105E", marginTop: "2px", cursor: "pointer" }}
              />
              <span style={{ color: "#ccc" }}>
                Are you a U.S. citizen or lawful permanent resident (green card holder)?
              </span>
            </div>
            {errors.usEligible && (
              <span style={{ color: "#ff4d4d", fontSize: "0.85rem" }}>
                {errors.usEligible}
              </span>
            )}

            {apiError && (
              <span style={{ color: "#ff4d4f", fontSize: "0.85rem", textAlign: "center" }}>
                {apiError}
              </span>
            )}

            <button
              type="submit"
              disabled={loading} // Disable button while loading
              style={{
                backgroundColor: "#96105E",
                color: "white",
                fontSize: "1rem",
                fontWeight: 600,
                padding: "12px",
                border: "none",
                borderRadius: "6px",
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: "1rem",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Signing Up..." : "Next"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default BusinessSignup;
