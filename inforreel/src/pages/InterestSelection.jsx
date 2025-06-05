import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function InterestSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [loading, setLoading] = useState(false); // State for API loading
  const [apiError, setApiError] = useState(""); // State for API error messages

  // Use state to hold the token and profile data received from location state
  // Initialize as null or undefined
  const [userToken, setUserToken] = useState(undefined);
  const [profileData, setProfileData] = useState(undefined); // This holds { country: label, state: label, gender: label, dob: YYYY-MM-DD }


  // Get profile data object and authToken from the previous page's state using useLocation
  // Use distinct variable names for received state
  const { profileData: profileDataFromState, authToken: tokenFromState } = location.state || {};


  // Use useEffect to process the state received from navigation when the component mounts
  useEffect(() => {
    // Check if BOTH token and profileData were successfully received (check against undefined)
    if (tokenFromState !== undefined && profileDataFromState !== undefined) {
      // Store the received token and profile data in the component's state
      setUserToken(tokenFromState);
      setProfileData(profileDataFromState);
      console.log("Successfully received profile data and token in InterestSelection.", { token: tokenFromState, profileData: profileDataFromState });
      // Optionally store the token in localStorage if needed globally
      // localStorage.setItem('authToken', tokenFromState);
    } else {
      // Handle case where token or profile data is not received
      console.error("Authentication token or profile data missing in InterestSelection state. Redirecting to signup.");
      setApiError("Missing required information. Please restart the profile setup process.");
      // *** Redirect the user to login or an appropriate starting page ***
      navigate("/signup", { replace: true }); // Redirect and replace history entry
    }
     // useEffect should only re-run if the received state variables change, or navigate changes
  }, [tokenFromState, profileDataFromState, navigate]);


  // Log current state values to verify they were set correctly by useEffect
  console.log("Current profile data state:", profileData);
  console.log("Current user token state:", userToken);


  const handleCheckboxChange = (interest) => {
    setApiError(""); // Clear API error when interests change
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(""); // Clear previous API errors

    // Basic validation: ensure at least one interest is selected
    if (selectedInterests.length === 0) {
      setApiError("Please select at least one interest.");
      return;
    }

    // Ensure profile data and token were successfully stored in state from useEffect
    // Check against undefined, as they are initialized as undefined
    if (profileData === undefined) {
      setApiError("Profile data missing. Please restart the profile setup.");
      console.error("Profile data missing from component state when submitting.");
      return;
    }

    if (userToken === undefined) {
      setApiError("Authentication token missing. Please log in again.");
      console.error("Authentication token missing from component state when submitting.");
      return;
    }

    setLoading(true); // Set loading state

    // *** Construct the profile data object to be stringified and sent as the 'profile' value ***
    const profileJsonValue = {
      // Use the profile data labels received from UserProfileSetup state
      country: profileData.country, // Should be full name (e.g., "United States")
      state: profileData.state,     // Should be full name (e.g., "California") or null
      gender: profileData.gender,   // Should be capitalized label (e.g., "Male")
      dob: profileData.dob,         // YYYY-MM-DD format
      interests: selectedInterests, // Array of strings (e.g., ["Vlogging & Storytelling", ...])
      // Add any other fields here if the backend expects them within the 'profile' JSON string
      // based on the Postman screenshot or backend documentation.
      // e.g., niche, about, brandStatement, workedWithBrands, socialLinks
      // For now, we'll include just the fields you have data for:
    };

    console.log("Preparing Profile Data for JSON string value:", profileJsonValue); // Check this log

    // *** Create FormData and append the JSON string under the key 'profile' ***
    const formData = new FormData();
    formData.append("profile", JSON.stringify(profileJsonValue)); // Key must be exactly 'profile'

    console.log("Sending FormData with 'profile' key to API"); // Log that you're sending form data
    console.log("Token being sent in fetch header:", userToken); // Log the token being used

    try {
      const response = await fetch("http://54.173.98.4:8000/api/users/profile", {
        method: "POST",
        headers: {
          // *** IMPORTANT: DO NOT set Content-Type manually for FormData ***
          // The browser will set it automatically to multipart/form-data and include the boundary.
          "Authorization": `Bearer ${userToken}`, // Use the token from state
        },
        body: formData, // Send the FormData object directly
      });

      // The API might return JSON even on error, so parse it
      const data = await response.json();

      console.log("Profile Setup API Response Status:", response.status);
      console.log("Profile Setup API Response Data:", data); // Check this log for backend error details on 400

      // Check API response for success (typically status 2xx)
      if (response.ok) {
        console.log("Profile setup successful:", data);
        // Navigate to dashboard on success
        navigate("/dashboard");
      } else {
        // Handle API errors (backend validation, authentication failure, etc.)
        console.error("Profile setup failed:", data);
        // Display a more informative error if the backend provides one
        // This is where the error message from the 400 response object will be displayed
        setApiError(data.message || data.error || `Profile setup failed. Status: ${response.status}. Please try again.`);
      }
    } catch (error) {
      // Handle network errors or issues with the fetch request itself
      console.error("Network error or unexpected issue during profile setup:", error);
      setApiError("An error occurred during profile setup. Please try again later."); // Display generic error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const categories = [
    {
      title: "Social Engagement & Content Creation",
      items: [
        "Vlogging & Storytelling",
        "Product Reviews & Hauls",
        "Live Shopping",
        "Brand Collabs",
        "Giveaways & Audience Interaction",
      ],
    },
    {
      title: "Entertainment",
      items: [
        "Music (Afrobeats, Hip-Hop, Pop, EDM, etc.)",
        "Comedy & Skits",
        "Dance & Choreography",
        "Short Films & Series",
        "Celebrity Lifestyle",
        "Behind-the-Scenes Content",
      ],
    },
    {
      title: "Business & Growth",
      items: [
        "Becoming a Seller",
        "Becoming a Brand Ambassador",
        "Growing as an Influencer",
        "Partnering with Brands",
        "Launching a Collection",
        "Earning from Social Commerce",
      ],
    },
    {
      title: "Lifestyle & Shopping",
      items: [
        "Fashion (Men’s / Women’s / Streetwear / Luxury)",
        "Beauty & Skincare",
        "Health & Wellness",
        "Fitness & Workout Gear",
        "Sportswear & Athleisure",
        "Tech & Gadgets",
        "Home & Living",
        "Accessories & Jewelry",
      ],
    },
  ];

  const boxStyle = {
  flex: "1 1 auto",
  border: "1px solid #333",
  borderRadius: "10px",
  padding: "1.2rem",
  backgroundColor: "#1D1D1D",
  textAlign: "left",
  width: "100%",           // Stretch to fit column
  minWidth: "300px",
  maxWidth: "400px",
  height: "300px",         // Set a fixed height
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
};


  // Determine if the submit button should be disabled
  // It should be disabled if loading, no interests are selected, or if the token/profileData are missing from state (initially undefined)
  const isButtonDisabled = loading || selectedInterests.length === 0 || userToken === undefined || profileData === undefined;


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
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "3rem 1rem",
            maxWidth: "1000px",
            margin: "auto",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "1.75rem", marginBottom: "2.5rem", fontWeight: 700 , marginTop:"3rem"}}>
            Select your interest
          </h2>

          {/* Display error message if token or profile data is missing before trying to submit */}
          {(userToken === undefined || profileData === undefined) && apiError && (
            <p style={{ color: "#ff4d4d", fontSize: "1rem", textAlign: "center", marginBottom: "1rem" }}>
              {apiError}
            </p>
          )}


          <div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr", // force 2 columns
    gap: "2rem",
    justifyContent: "center",
    alignItems: "start",
  }}
>
            {categories.map(({ title, items }) => (
              <div key={title} style={boxStyle}>
                <h4
                  style={{
                    marginBottom: "1rem",
                    textAlign: "center",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                  }}
                >
                  {title}
                </h4>
                {items.map((interest) => (
                  <label
                    key={interest}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.4rem 0",
                      fontSize: "0.95rem",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    {interest}
                    <input
                      type="checkbox"
                      checked={selectedInterests.includes(interest)}
                      onChange={() => handleCheckboxChange(interest)}
                      style={{
                        accentColor: "#96105E",
                        transform: "scale(1.2)",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                      // Disable checkboxes if necessary data/token is missing or submitting
                      disabled={userToken === undefined || profileData === undefined || loading}
                    />
                  </label>
                ))}
              </div>
            ))}
          </div>

          {/* Display API submission error message */}
          {apiError && userToken !== undefined && profileData !== undefined && (
            <span style={{ color: "#ff4d4d", fontSize: "0.9rem", textAlign: "center", marginTop: "1rem" }}>
              {apiError}
            </span>
          )}

          <button
            type="submit"
            disabled={isButtonDisabled}
            style={{
              backgroundColor: isButtonDisabled ? "#444" : "#96105E",
              color: isButtonDisabled ? "#aaa" : "white",
              fontSize: "1rem",
              fontWeight: 600,
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              cursor: isButtonDisabled ? "not-allowed" : "pointer",
              marginTop: "2rem",
              width: "100%",
              maxWidth: "400px",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Saving Profile..." : "Finish"}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default InterestSelection;