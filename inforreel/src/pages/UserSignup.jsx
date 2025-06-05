import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function UserSignup() {
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
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [apiError, setApiError] = useState(""); // State for API error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear API error when user starts typing again
    if (apiError) {
      setApiError("");
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => { // Made function async to use await
    e.preventDefault();
    const newErrors = {};
    setApiError(""); // Clear previous API errors

    // Client-side validation
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
      newErrors.password = "Use 8 or more characters with a mix of uppercase, lowercase, numbers & symbols";
    }

    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!agreed) {
      newErrors.agreed = "You must agree to the terms to continue.";
    }

    setErrors(newErrors);

    // If client-side validation passes, proceed with API call
    if (Object.keys(newErrors).length === 0) {
      setLoading(true); // Set loading state

      try {
        const userTypeToSend = "general"; // Define the user type to send

        const response = await fetch("http://54.173.98.4:8000/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers required by your API, e.g., Authorization if needed
          },
          body: JSON.stringify({
            name: formData.fullName, // Map fullName to name for the API
            username: formData.username,
            email: formData.email,
            password: formData.password,
            userType: userTypeToSend, // Use the defined user type
          }),
        });

        const data = await response.json();

        // Check API response status or data structure
        if (response.ok && data.code === 200) { // Assuming code 200 in response data indicates success
          console.log("Registration successful:", data);
          // Navigate to verification page on success, passing userType in state
          navigate("/verify", {
            state: { email: formData.email, next: "usersetup", userType: userTypeToSend }, // Pass userType here
          });
        } else {
          // Handle API errors (e.g., validation errors from backend)
          console.error("Registration failed:", data);
          setApiError(data.message || "Registration failed. Please try again."); // Display API error message
        }
      } catch (error) {
        console.error("Network error or unexpected issue:", error);
        setApiError("An error occurred. Please try again later."); // Display generic error for network issues
      } finally {
        setLoading(false); // Reset loading state
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
        backgroundColor: "#141414", // ✅ pure black background
        color: "#ffffff",
      }}
    >
      <Header />

      <main style={{ flex: 1 }}>
        <div
          style={{
            textAlign: "center",
            padding: "3.5rem 1rem",
            maxWidth: "800px",
            margin: "auto",
          }}
        >
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem", marginTop:"2rem" }}>
            Create your user account
          </h2>
          <p style={{ fontSize: "1rem", color: "#cccccc", marginBottom: "2rem", fontWeight: 400 }}>
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
                    border: "1px solid #444",
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
                      border: "1px solid #444",
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

            {/* Display API error message */}
            {apiError && (
              <span style={{ color: "#ff4d4d", fontSize: "0.9rem", textAlign: "center" }}>
                {apiError}
              </span>
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
                cursor: loading ? "not-allowed" : "pointer", // Change cursor when loading
                marginTop: "1rem",
                opacity: loading ? 0.7 : 1, // Reduce opacity when loading
              }}
              disabled={loading} // Disable button when loading
            >
              {loading ? "Processing..." : "Next"} {/* Button text changes based on loading state */}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default UserSignup;
