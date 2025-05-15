import { State } from "country-state-city";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";
import "../App.css"; // Assuming this contains necessary styles
import Footer from "../components/Footer";
import Header from "../components/Header";

// Helper function to format DOB to YYYY-MM-DD for API
const formatDOBForAPI = (dob) => {
  if (!dob) return null;
  const parts = dob.split("/");
  if (parts.length === 3) {
    const [month, day, year] = parts.map(Number);
    // Basic check for valid parts before creating Date object
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31 && year >= 1900 && year <= 2099) { // Added basic year range check
      const dateObject = new Date(year, month - 1, day);
      // Check for invalid date components (e.g., Feb 30th)
      if (dateObject.getFullYear() === year && dateObject.getMonth() === month - 1 && dateObject.getDate() === day) {
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      }
    }
  }
  return null; // Return null for invalid or incomplete dates
};


// Validate format + ensure not future date
const isValidDOB = (dob) => {
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/;
  if (!regex.test(dob)) return false;
  const [month, day, year] = dob.split("/").map(Number);
  const enteredDate = new Date(year, month - 1, day);
  const today = new Date();

  // Check for invalid date components (e.g., Feb 30th)
  const dateObject = new Date(year, month - 1, day);
  if (dateObject.getFullYear() !== year || dateObject.getMonth() !== month - 1 || dateObject.getDate() !== day) {
     return false;
  }

  return enteredDate <= today;
};

// Custom styles for react-select (kept the improved dark theme)
const customSelectStyles = {
  container: (base) => ({
    ...base,
    marginTop: "0.5rem", // Adjust margin for better spacing
  }),
  control: (base, state) => ({
    ...base,
    backgroundColor: "#1d1d1d",
    borderColor: state.isFocused ? "#96105E" : "#444", // Use brand color on focus
    color: "#ffffff",
    boxShadow: state.isFocused ? "0 0 0 1px #96105E" : "none", // Add focus ring
    borderRadius: "6px", // Match input border radius
    padding: "2px",
    minHeight: "40px", // Slightly smaller height
    "&:hover": {
      borderColor: "#555", // Subtle hover effect
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "#ffffff",
  }),
  input: (base) => ({
    ...base,
    color: "#ffffff",
  }),
  placeholder: (base) => ({
    ...base,
    color: '#aaa', // Placeholder color
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#fff", // White dropdown background
    color: "#000", // Black text
    borderRadius: "6px", // Match form border radius
    zIndex: 9999, // Ensure dropdown is above other content
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected ? "#96105E" : isFocused ? "#f0f0f0" : "#fff", // Brand color for selected, light grey for focused
    color: isSelected ? "white" : "#000", // White text on brand color, black otherwise
    cursor: "pointer",
    "&:active": { // Active state for click
      backgroundColor: "#96105E",
      color: "white",
    },
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#444", // Darker background for selected multi-values
    color: "#fff", // White text
    borderRadius: "4px",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#fff", // White label text
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#aaa", // Lighter color for remove icon
    ":hover": {
      backgroundColor: "#ff4d4d", // Error red on hover
      color: "#fff",
    },
  }),
  indicatorSeparator: (base) => ({
     ...base,
     backgroundColor: '#444', // Dark separator
  }),
  dropdownIndicator: (base) => ({
     ...base,
     color: '#aaa', // Light color for dropdown arrow
     "&:hover": {
       color: '#ccc',
     }
  }),
};


function InfluencerProfileSetup() {
  const navigate = useNavigate();
  const location = useLocation(); // Get location to access state

  // Receive authToken and userType from location.state
  const { authToken, userType } = location.state || {};

  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(""); // Keep dob as string in MM/DD/YYYY format
  const [niche, setNiche] = useState([]);
  const [about, setAbout] = useState("");
  const [brandStatement, setBrandStatement] = useState("");
  const [socialPlatforms, setSocialPlatforms] = useState([]);
  const [socialLinks, setSocialLinks] = useState({}); // Store links as { platformValue: url }
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state
  const [apiError, setApiError] = useState(""); // Add API error state


  // Check for token on mount and redirect if missing
  useEffect(() => {
      if (!authToken) {
          console.warn("Auth token missing in InfluencerProfileSetup state. Redirecting to signup.");
          navigate('/signup/influencer', { replace: true }); // Redirect to influencer signup
      } else {
          console.log("Auth Token received in InfluencerProfileSetup:", authToken);
          console.log("User Type received in InfluencerProfileSetup:", userType);
      }
  }, [authToken, navigate, userType]); // Depend on authToken, navigate, and userType


  const countryOptions = useMemo(() => countryList().getData(), []);
  const stateOptions = country
    ? State.getStatesOfCountry(country.value).map((s) => ({
        label: s.name,
        value: s.isoCode,
      }))
    : [];

  const nicheOptions = [
    { label: "Beauty & Skincare", value: "beauty-skincare" },
    { label: "Fashion & Style", value: "fashion-style" },
    { label: "Fitness & Wellness", value: "fitness-wellness" },
    { label: "Lifestyle & Daily Vlogs", value: "lifestyle-vlogs" },
    { label: "Sports & Athleisure", value: "sports-athleisure" },
    { label: "Music & Entertainment", value: "music-entertainment" },
    { label: "Parenting & Family", value: "parenting-family" },
    { label: "Travel & Experience", value: "travel-experience" },
    { label: "Business & Motivation", value: "business-motivation" },
    { label: "Home & Interior", value: "home-interior" },
  ];

  const platformOptions = [
    { label: "Instagram", value: "instagram" },
    { label: "Facebook", value: "facebook" },
    { label: "TikTok", value: "tiktok" },
    // No 'Other' in the Postman example for socialLinks keys, stick to specific platforms if required
    // { label: "Other", value: "other" },
  ];

  // --- New handler for DOB input ---
  const handleDobChange = (e) => {
    const value = e.target.value;
    // Allow digits and '/'
    const cleanedValue = value.replace(/[^\d/]/g, "");

    // Apply formatting MM/DD/YYYY as user types
    let formattedValue = cleanedValue;
    if (cleanedValue.length > 2 && cleanedValue[2] !== '/') {
      formattedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2)}`;
    }
    if (cleanedValue.length > 5 && cleanedValue[5] !== '/') { // Corrected index for the second slash
      formattedValue = `${formattedValue.slice(0, 5)}/${formattedValue.slice(5)}`;
    }

    // Limit length and update state
    if (formattedValue.length <= 10) {
      setDob(formattedValue);
      // Clear DOB specific error when typing
      setErrors(prev => {
        const { dob, ...rest } = prev;
        return rest;
      });
      setApiError(""); // Clear general API error
    }
  };
  // --- End new handler ---


  const handleSubmit = async (e) => { // Make function async
    e.preventDefault();
    const newErrors = {};
    setApiError(""); // Clear previous API errors

    // --- Client-side Validation ---
    if (!country) newErrors.country = "Country is required";
    // Check if state is required for the selected country and is missing
    if (country && stateOptions.length > 0 && !state) {
      newErrors.state = "State is required";
    }
    if (!gender) newErrors.gender = "Gender is required";
    if (!dob) {
      newErrors.dob = "Date of Birth is required";
    } else if (!isValidDOB(dob)) {
      newErrors.dob = "Please enter a valid date (MM/DD/YYYY) and ensure it's not in the future.";
    }
    if (niche.length === 0) newErrors.niche = "Please select at least one niche";
    const wordCount = about.trim().split(/\s+/).filter(word => word.length > 0).length; // Filter out empty strings from split
    if (wordCount < 10) newErrors.about = "Please enter minimum 10 words";
    if (wordCount > 200) newErrors.about = "Maximum 200 words allowed";
    if (!brandStatement.trim()) newErrors.brandStatement = "Please enter brand statement";
    // --- End Client-side Validation ---

    setErrors(newErrors); // Update validation errors

    // If client-side validation failed, stop here
    if (Object.keys(newErrors).length > 0) {
      console.log("Client-side validation failed.", newErrors);
      return;
    }

    // Check if token is available before making API call
    if (!authToken) {
        console.error("Auth token is missing, cannot submit profile.");
        setApiError("Authentication token missing. Please restart the process.");
        // Optionally redirect the user
        // navigate('/signup/influencer', { replace: true });
        return;
    }


    // If client-side validation passes and token is available, proceed with API call
    setLoading(true); // Set loading state

    // --- Construct the JSON object to be stringified and sent as the 'profile' value ---
    // Map frontend state to the expected backend JSON structure (based on Postman)
    const profileJsonValue = {
      // NOTE: Fields like brandName, website, industry, businessType, gstNumber, ssn
      // are in the Postman example but NOT collected in this form.
      // If they are mandatory, the API will return a 400 validation error.
      // Assuming they might be optional for this specific influencer flow or collected elsewhere.

      // Mapping fields from your form:
      gender: gender ? gender.charAt(0).toUpperCase() + gender.slice(1).replace(/-/g, " ") : null, // Map value ('female') to label ('Female')
      dob: formatDOBForAPI(dob), // Format DOB to YYYY-MM-DD

      // Mapping niche to categories
      categories: niche.map(n => n.label), // Send array of niche labels

      description: about, // Map 'about' to 'description' as per a possible interpretation
      brandStatement: brandStatement, // Include brandStatement

      // Mapping country/state into the nested address object
      // Note: Street, city, zip are in Postman but not collected here
      address: {
        // street: "", // Not collected
        // city: "", // Not collected
        state: state ? state.label : null, // Map state label
        country: country ? country.label : null, // Map country label
      },

      // Mapping social links - need to convert from { value: url } to { label: url }
      // And only include platforms present in platformOptions (Instagram, Facebook, TikTok)
      socialLinks: platformOptions.reduce((acc, platform) => {
        if (socialLinks[platform.value] && socialLinks[platform.value].trim()) {
          // Use lowercase label as key, trim whitespace
          acc[platform.label.toLowerCase()] = socialLinks[platform.value].trim();
        }
        return acc;
      }, {}),
      // The Postman had 'instagram' and 'linkedin'. You collect 'instagram', 'facebook', 'tiktok', 'other'.
      // The mapping above will include instagram, facebook, tiktok if links are provided.
      // If the API expects 'linkedin' and doesn't like other keys, you might need to adjust platformOptions/mapping.
      // Let's map to lowercase labels as keys (instagram, facebook, tiktok). Check backend docs/api spec.
      // If backend expects PascalCase like Instagram, Facebook, change `platform.label.toLowerCase()` to `platform.label`.
    };

    console.log("Preparing Influencer Profile Data for JSON string value:", profileJsonValue); // Log the object before stringifying

    // *** Create FormData and append the JSON string under the key 'profile' ***
    const formData = new FormData();
    formData.append("profile", JSON.stringify(profileJsonValue)); // Key must be exactly 'profile'

    console.log("Sending FormData with 'profile' key to API");
    console.log("Auth Token used:", authToken); // Log the token being used


    try {
      const response = await fetch("http://54.236.192.13:8000/api/users/profile", {
        method: "POST", // Or PUT/PATCH if profile updates use a different method - check API docs!
        headers: {
          // *** IMPORTANT: DO NOT set Content-Type manually for FormData ***
          // The browser will set it automatically to multipart/form-data and include the boundary.
          "Authorization": `Bearer ${authToken}`, // Use the received token
        },
        body: formData, // Send the FormData object directly
      });

      // The API might return JSON even on error, so parse it
      const data = await response.json();

      console.log("Profile Setup API Response Status:", response.status);
      console.log("Profile Setup API Response Data:", data); // Check this log for backend error details on 400

      // Check API response for success (typically status 2xx)
      if (response.ok) {
        console.log("Influencer profile setup successful:", data);
        // Navigate to dashboard on success
        navigate("/dashboard");
      } else {
        // Handle API errors (backend validation, authentication failure, etc.)
        console.error("Influencer profile setup failed:", data);
        // Display a more informative error if the backend provides one
        setApiError(data.message || data.error || `Profile setup failed. Status: ${response.status}. Please try again.`);
        // You might want to parse 'data.errors' if the backend returns field-specific errors for 400 status
      }
    } catch (error) {
      // Handle network errors or issues with the fetch request itself
      console.error("Network error or unexpected issue during profile setup:", error);
      setApiError("An error occurred during profile setup. Please try again later."); // Display generic error
    } finally {
      setLoading(false); // Reset loading state
    }
  };


  const handleLinkChange = (platformValue, value) => {
    setSocialLinks((prev) => ({ ...prev, [platformValue]: value }));
  };

  const handleRemovePlatform = (platformValue) => {
    setSocialPlatforms((prev) => prev.filter((p) => p.value !== platformValue));
    setSocialLinks((prev) => {
      const updated = { ...prev };
      delete updated[platformValue];
      return updated;
    });
  };

  // Determine if the submit button should be disabled
  // Check required fields and if auth token is available
  const isFormValid = country && (countryOptions.length === 0 || state) && gender && dob && isValidDOB(dob) && niche.length > 0 && about.trim().split(/\s+/).filter(word => word.length > 0).length >= 10 && about.trim().split(/\s+/).filter(word => word.length > 0).length <= 200 && brandStatement.trim();
  const isButtonDisabled = loading || !isFormValid || !authToken;


  return (
    <div className="app-wrapper" style={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}>
      <Header />
      <main className="main-content">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2 className="text-center" style={{ color: "#fff" }}>Continue your profile setup</h2>

          {/* API Error Message Display */}
          {apiError && (
            <span style={{ color: "#ff4d4d", fontSize: "0.9rem", textAlign: "center", marginBottom: "1rem", display: "block" }}>
              {apiError}
            </span>
          )}

          {/* Auth Token Missing Error Display */}
          {!authToken && (
            <span style={{ color: "#ff4d4d", fontSize: "0.9rem", textAlign: "center", marginBottom: "1rem", display: "block" }}>
              Authentication token missing. Please restart the process.
            </span>
          )}


          <div className="row">
            <label className="select-label" style={{ color: "#fff" }}>
              Country
              <Select
                options={countryOptions}
                value={country}
                onChange={(val) => {
                  setCountry(val);
                  setState(null);
                }}
                styles={customSelectStyles}
                disabled={!authToken || loading} // Disable if no token or loading
              />
              {errors.country && (
                <span style={{ color: "#ff4d4d", fontSize: "0.9rem", display: "block", marginTop: "0.2rem" }}>
                  {errors.country}
                </span>
              )}
            </label>

            <label className="select-label" style={{ color: "#fff" }}>
              State
              <Select
                options={stateOptions}
                value={state}
                onChange={setState}
                isDisabled={!country || stateOptions.length === 0 || !authToken || loading} // Disable if no country, no states, no token, or loading
                styles={customSelectStyles}
              />
              {errors.state && (
                <span style={{ color: "#ff4d4d", fontSize: "0.9rem", display: "block", marginTop: "0.2rem" }}>
                  {errors.state}
                </span>
              )}
            </label>
          </div>

          <label style={{ color: "#fff", fontSize: "1rem", display: "block" }}>
            Gender
            <Select
              options={[
                { label: "Female", value: "female" },
                { label: "Male", value: "male" },
                { label: "Non-binary", value: "non-binary" },
                { label: "Prefer not to say", value: "prefer-not-to-say" },
              ]}
              value={
                gender
                  ? {
                      label: gender.charAt(0).toUpperCase() + gender.slice(1).replace(/-/g, " "),
                      value: gender,
                    }
                  : null
              }
              onChange={(val) => setGender(val?.value || "")}
              styles={customSelectStyles}
              disabled={!authToken || loading} // Disable if no token or loading
            />
            {errors.gender && (
              <span style={{ color: "#ff4d4d", fontSize: "0.9rem", display: "block", marginTop: "0.2rem" }}>
                {errors.gender}
                </span>
            )}
          </label>

          <label style={{ color: "#fff", fontSize: "1rem", display: "block" }}>
            Date of Birth
            <input
              type="text"
              placeholder="MM/DD/YYYY"
              maxLength="10"
              value={dob}
              onChange={handleDobChange} // Use the new handler
              inputMode="numeric" // Hint mobile keyboards to show numeric layout
              style={{
                marginTop: "0.5rem",
                padding: "10px",
                border: `1px solid ${errors.dob ? '#ff4d4d' : '#444'}`,
                borderRadius: "6px",
                fontSize: "1rem",
                backgroundColor: "#1d1d1d",
                color: "#fff",
                width: "100%",
              }}
              disabled={!authToken || loading} // Disable if no token or loading
            />
            {errors.dob && (
              <span style={{ color: "#ff4d4d", fontSize: "0.9rem", display: "block", marginTop: "0.2rem" }}>
                {errors.dob}
              </span>
            )}
          </label>

          <label className="select-label" style={{ color: "#fff" }}>
            Niche
            <Select
              isMulti
              options={nicheOptions}
              value={niche}
              onChange={setNiche}
              styles={customSelectStyles}
              disabled={!authToken || loading} // Disable if no token or loading
            />
            {errors.niche && (
              <span style={{ color: "#ff4d4d", fontSize: "0.9rem", display: "block", marginTop: "0.2rem" }}>
                {errors.niche}
              </span>
            )}
          </label>

          <label style={{ color: "#fff" }}>
            About
            <textarea
              placeholder="Tell us about yourself (max 200 words)"
              value={about}
              onChange={(e) => {
                setAbout(e.target.value);
                // Clear about specific error when typing
                setErrors(prev => {
                  const { about, ...rest } = prev;
                  return rest;
                });
                setApiError(""); // Clear general API error
              }}
              style={{
                backgroundColor: "#1d1d1d",
                border: `1px solid ${errors.about ? '#ff4d4d' : '#444'}`,
                borderRadius: "6px",
                color: "#fff",
                padding: "10px",
                minHeight: "90px",
                fontSize: "1rem",
              }}
              disabled={!authToken || loading} // Disable if no token or loading
            />
            {errors.about && (
              <span style={{ color: "#ff4d4d", fontSize: "0.9rem", display: "block", marginTop: "0.2rem" }}>
                {errors.about}
              </span>
            )}
          </label>

          <label style={{ color: "#fff" }}>
            Brand Statement
            <textarea
              placeholder="Personal brand statement"
              value={brandStatement}
              onChange={(e) => {
                setBrandStatement(e.target.value);
                // Clear brandStatement specific error when typing
                setErrors(prev => {
                  const { brandStatement, ...rest } = prev;
                  return rest;
                });
                setApiError(""); // Clear general API error
              }}
              style={{
                backgroundColor: "#1d1d1d",
                border: `1px solid ${errors.brandStatement ? '#ff4d4d' : '#444'}`,
                borderRadius: "6px",
                color: "#fff",
                padding: "10px",
                minHeight: "90px",
                fontSize: "1rem",
              }}
              disabled={!authToken || loading} // Disable if no token or loading
            />
            {errors.brandStatement && (
              <span style={{ color: "#ff4d4d", fontSize: "0.9rem", display: "block", marginTop: "0.2rem" }}>
                {errors.brandStatement}
              </span>
            )}
          </label>

          <label className="select-label" style={{ color: "#fff" }}>
            Social media links (optional)
            <Select
              isMulti
              options={platformOptions}
              value={socialPlatforms}
              onChange={setSocialPlatforms}
              styles={customSelectStyles}
              disabled={!authToken || loading} // Disable if no token or loading
            />
          </label>

          {socialPlatforms.map((platform) => (
            <div key={platform.value} style={{ position: "relative", marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.4rem", color: "#fff" }}>{platform.label}</label>
              <input
                type="text"
                placeholder={`Enter ${platform.label} profile URL`}
                value={socialLinks[platform.value] || ""}
                onChange={(e) => handleLinkChange(platform.value, e.target.value)}
                className="social-link-input"
                style={{
                  backgroundColor: "#1d1d1d",
                  border: "1px solid #444",
                  borderRadius: "6px",
                  padding: "10px",
                  width: "100%",
                  color: "#fff",
                  fontSize: "1rem",
                }}
                disabled={!authToken || loading} // Disable if no token or loading
              />
              <span
                onClick={() => handleRemovePlatform(platform.value)}
                className="remove-icon"
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "10px",
                  color: "#aaa",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              >
                &minus;
              </span>
            </div>
          ))}

          <button type="submit" className="black-btn" style={{
            backgroundColor: isButtonDisabled ? "#444" : "#96105E",
            color: isButtonDisabled ? "#aaa" : "#fff",
            padding: "12px",
            borderRadius: "6px",
            fontSize: "1rem",
            fontWeight: "600",
            marginTop: "1rem",
            border: "none",
            cursor: isButtonDisabled ? "not-allowed" : "pointer",
            opacity: loading || !authToken ? 0.7 : 1,
          }}
          disabled={isButtonDisabled}
          >
            {loading ? "Saving Profile..." : "Finish"}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default InfluencerProfileSetup;
