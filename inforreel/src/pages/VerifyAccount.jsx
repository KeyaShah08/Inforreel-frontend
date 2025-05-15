import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

// Define the specific message to hide
const MESSAGE_TO_HIDE = "OTP resent successfully";

function VerifyAccount() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(""); // Client-side validation error for OTP
  const [verifyLoading, setVerifyLoading] = useState(false); // State for OTP verification loading
  const [resendLoading, setResendLoading] = useState(false); // State for resend loading indicator
  const [verifyApiError, setVerifyApiError] = useState(""); // State for OTP verification API error messages
  const [resendError, setResendError] = useState(""); // State for resend API error messages
  // Removed the resendSuccess state variable

  // New states for the initial Registration API call (if coming from signup)
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  const [registrationSuccessMessage, setRegistrationSuccessMessage] = useState(null);


  const navigate = useNavigate();
  const location = useLocation();

  const { name, email, password, userType, username, source, next } = location.state || {
    name: null,
    email: null,
    password: null,
    userType: null,
    username: null,
    source: null, // 'signup' or 'login'
    next: null
  };

  // --- useEffect to handle initial API calls based on source ---
  useEffect(() => {
    // Function to handle the initial Registration API call (if coming from signup)
    const handleInitialRegistration = async () => {
        setRegistrationLoading(true);
        setRegistrationError(null);
        setRegistrationSuccessMessage(null);

        try {
          console.log("Attempting initial registration API call from VerifyAccount...");
          const response = await fetch("http://54.236.192.13:8000/api/users/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
              userType,
              username,
            }),
          });

          const data = await response.json();

          console.log("Registration API Response Status:", response.status);
          console.log("Registration API Response Data:", data);


          if (response.ok && data.code === 200) {
            console.log("Initial Registration successful:", data);
             setRegistrationSuccessMessage("Registration successful! Please check your email for OTP.");
          } else {
            console.error("Initial Registration failed:", data);
            setRegistrationError(data.error || data.message || "Registration failed. Please try again.");
          }
        } catch (error) {
          console.error("Network error during initial registration:", error);
          setRegistrationError("An error occurred during registration. Please check your connection.");
        } finally {
          setRegistrationLoading(false);
        }
    };

    // Function to handle the initial Resend OTP call (if coming from login)
    const handleInitialResend = async () => {
        setResendLoading(true);
        setResendError("");

        try {
            console.log("Attempting initial resend OTP API call from VerifyAccount (from login)...");
            const resendApiUrl = "http://54.236.192.13:8000/api/users/resend-otp";

            const response = await fetch(resendApiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email }),
            });

            const data = await response.json();

            console.log("Initial Resend OTP API Response Status:", response.status);
            console.log("Initial Resend OTP API Response Data:", data);

            if (response.ok && data.code === 200 && data.message === "OTP sent to your email for verification") {
                console.log("Initial Resend OTP successful:", data);
                 setOtp(""); // Clear previous OTP input field
            } else if (response.status === 400 && data.error === "User already verified") {
                console.log("User already verified on initial resend attempt. Navigating.");
                const authToken = data.data?.token || null;
                const verifiedUserType = data.data?.userType || userType;
                handleSuccessfulNavigation(authToken, verifiedUserType); // Navigate if already verified
            }
             else {
                console.error("Initial Resend OTP failed:", data);
                setResendError(data.message || `Failed to send OTP. Status: ${response.status}. Please try again.`);
            }
        } catch (error) {
            console.error("Network error during initial resend:", error);
            setResendError("An error occurred while sending OTP. Please try again.");
        } finally {
            setResendLoading(false);
        }
    };


    // --- Decision logic based on 'source' and email availability ---

    if (!email) {
         setError("Email address is missing. Cannot proceed.");
         console.error("Email is missing in location state on page load.");
         return;
    }

    if (source === 'signup' && password && userType && name && username) {
        console.log("Source is 'signup'. Initiating registration.");
        handleInitialRegistration();
    }
    else if (source === 'login') {
         console.log("Source is 'login'. Initiating OTP resend.");
         handleInitialResend();
    }
    else if (!source) {
         console.warn("Source not specified in location state.");
         setError("Navigation source is missing. Cannot determine flow.");
    } else {
        console.error(`Source is '${source}' but required data is incomplete.`);
         setError(`Missing required data for the '${source}' flow.`);
    }


  }, [email, password, userType, name, username, source, navigate]);


  const handleChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "");
    if (digits.length <= 6) {
      setOtp(digits);
      setError("");
      setVerifyApiError("");
      setResendError("");
       setRegistrationError(null);
       setRegistrationSuccessMessage(null);
    }
  };

   const handleSuccessfulNavigation = (token, verifiedUserType) => {
    console.log("Navigating based on userType from verified response:", verifiedUserType);

    const stateToPass = {
      userType: verifiedUserType,
      authToken: token
    };
    console.log("Navigating with state:", stateToPass);

    if (verifiedUserType === "general") {
      console.log("UserType is 'general'. Navigating to UserProfileSetup.");
      navigate("/signup/user/UserProfileSetup", { state: stateToPass });
    } else if (verifiedUserType === "influencer") {
      console.log("UserType is 'influencer'. Navigating to influencer profile setup.");
      navigate("/signup/influencer/profile", { state: stateToPass });
    } else if (verifiedUserType === "vendor") {
      console.log("UserType is 'vendor'. Navigating to verification intro page (BusinessInfo).");
      navigate("/policy", { state: stateToPass });
    } else {
      console.log("Unknown userType or no specific navigation defined for:", verifiedUserType);
      navigate("/dashboard", { state: stateToPass });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setVerifyApiError("");

    if (!email) {
      setError("Email address is missing. Cannot verify.");
      console.error("Email is missing in location state for verification submission.");
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter 6 digit OTP.");
      return;
    }

    setVerifyLoading(true);

    try {
      console.log("Attempting OTP verification API call...");
      const response = await fetch("http://54.236.192.13:8000/api/users/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
      });

      const data = await response.json();

      console.log("OTP Verification API Response Status:", response.status);
      console.log("OTP Verification API Response Data:", data);


      if (response.ok && data.code === 200) {
        console.log("OTP verification successful:", data);
        const authToken = data.data?.token;
        const verifiedUserType = data.data?.userType || userType;

        if (authToken) {
           console.log("Successfully extracted Auth Token:", authToken);
           handleSuccessfulNavigation(authToken, verifiedUserType);
        } else {
           console.error("OTP verification successful, but no token found in response data.", data);
           setVerifyApiError("Verification successful, but failed to get authentication token. Please log in.");
        }

      } else {
        console.error("OTP verification failed:", data);
        setVerifyApiError(data.message || "OTP verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Network error or unexpected issue during verification:", error);
      setVerifyApiError("An error occurred during verification. Please try again later.");
    } finally {
      setVerifyLoading(false);
    }
  };

  // Function to handle resending OTP (manual click)
  const handleResendOtp = async () => {
     // Prevent resend if email is missing or any loading state is active
    if (!email || overallLoading) {
      if (!email) setResendError("Email address not available to resend OTP.");
      console.error("Preventing resend: Email missing or busy.");
      return;
    }

    setResendLoading(true);
    setResendError("");
    setVerifyApiError("");

    try {
      const resendApiUrl = "http://54.236.192.13:8000/api/users/resend-otp";

      console.log("Attempting manual resend OTP to email:", email);
      console.log("Resend API URL:", resendApiUrl);

      const response = await fetch(resendApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();

      console.log("Manual Resend OTP API Response Status:", response.status);
      console.log("Manual Resend OTP API Response Data:", data);


      if (response.ok && data.code === 200 && data.message === "OTP sent to your email for verification") {
        console.log("Manual Resend OTP successful:", data);
        setOtp("");
      } else if (response.status === 400 && data.error === "User already verified") {
           console.log("User already verified on manual resend attempt. Navigating.");
           const authToken = data.data?.token || null;
           const verifiedUserType = data.data?.userType || userType;
           handleSuccessfulNavigation(authToken, verifiedUserType);
      }
      else {
        console.error("Manual Resend OTP failed:", data);
        setResendError(data.message || `Failed to resend OTP. Status: ${response.status}. Please try again.`);
      }
    } catch (error) {
      console.error("Network error or unexpected issue during manual resend:", error);
      setResendError("An error occurred while resending OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };


  // Check if OTP is exactly 6 digits for button state
  const isOtpValid = otp.length === 6;
  // Check if email is available to enable submission/resend
  const isEmailAvailable = !!email;


  // Determine overall loading state to disable inputs/buttons
  const overallLoading = verifyLoading || resendLoading || registrationLoading;

  // Filter out the specific message we don't want to show from errors
  const filteredVerifyApiError = verifyApiError === MESSAGE_TO_HIDE ? "" : verifyApiError;
  const filteredResendError = resendError === MESSAGE_TO_HIDE ? "" : resendError;

  // Determine overall error state for highlighting fields etc.
  const overallError = error || filteredVerifyApiError || filteredResendError;


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#000000",
        color: "#ffffff",
      }}
    >
      <Header />

      <main style={{ flex: 1 }}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "400px",
            margin: "4rem auto 0",
            padding: "0 1rem",
          }}
        >
          <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "0.5rem" }}>
            Verify your account
          </h2>

           {/* Display error if email is missing (critical error) */}
           {!isEmailAvailable && !overallLoading && !registrationLoading && (
             <p style={{ fontSize: "1rem", color: "#ff4d4d", textAlign: "center", marginBottom: "1rem" }}>
               Error: Email address is missing. Please return to the signup or login page.
             </p>
           )}

           {/* Unified Top Status Message Area */}
           {/* This div will always be rendered to maintain spacing */}
           <div style={{ textAlign: "center", marginBottom: "1rem", minHeight: "1.5em", color: "#ff4d4d" }}> {/* Added minHeight and default error color */}
               {/* Registration messages (Signup Flow) */}
               {source === 'signup' && registrationLoading && <p style={{ color: "#64b5f6" }}>Registering and sending OTP...</p>}
               {source === 'signup' && registrationError && <p>{registrationError}</p>} {/* Inherits red color from parent div */}
               {source === 'signup' && registrationSuccessMessage && !registrationLoading && !registrationError && (
                 <p style={{ color: "#4CAF50" }}>{registrationSuccessMessage}</p>
               )}
               {/* Specific message for email exists error in signup flow (rendered here or below the main message) */}
               {registrationError && registrationError.includes("Email already exists") && (
                   <p style={{ fontSize: "0.9rem", color: "#ccc", marginTop: "0.5rem" }}>
                       Already registered? <span onClick={() => navigate('/signin')} style={{ color: "#96105E", textDecoration: "underline", cursor: "pointer" }}>Sign in here.</span>
                   </p>
               )}

               {/* Resend/Initial Load messages (Login Flow) */}
               {/* Removed "Sending OTP..." message here */}
               {source === 'login' && filteredResendError && !resendLoading && <p>{filteredResendError}</p>} {/* Inherits red color */}

                {/* If none of the above messages are showing, render a space to maintain minHeight */}
               {!( (source === 'signup' && (registrationLoading || registrationError || registrationSuccessMessage)) || (source === 'login' && (resendLoading || filteredResendError)) ) && (
                   <p>&nbsp;</p> // Non-breaking space to help maintain height
               )}
           </div>


          <p style={{ fontSize: "1rem", color: "#ccc", textAlign: "center", marginBottom: "1rem" }}>
            To verify your account, we’ve sent a One Time Password (OTP) to{" "}
            <strong>{email || "your email"}</strong>
          </p>

          <label style={{ fontSize: "0.95rem", display: "flex", flexDirection: "column" }}>
            Enter OTP
            <input
              type="text"
              placeholder="Enter 6 digit OTP"
              value={otp}
              onChange={handleChange}
              maxLength={6}
              inputMode="numeric"
              style={{
                marginTop: "0.3rem",
                padding: "10px",
                border: `1px solid ${overallError ? '#ff4d4d' : '#444'}`, // Use overallError for border
                borderRadius: "6px",
                fontSize: "1rem",
                backgroundColor: "#1d1d1d",
                color: "#fff",
              }}
              disabled={!isEmailAvailable || overallLoading}
            />
            {/* Display client-side OTP error or main verification API error */}
            {(error || filteredVerifyApiError) && ( // Check filtered error
              <span style={{ color: "#ff4d4d", fontSize: "0.9rem", textAlign: "center", marginTop: "0.3rem" }}>
                {error || filteredVerifyApiError}
              </span>
            )}
          </label>

          <button
            type="submit"
            disabled={!isOtpValid || overallLoading || !isEmailAvailable}
            style={{
              backgroundColor: (isOtpValid && !overallLoading && isEmailAvailable) ? "#96105E" : "#444",
              color: (isOtpValid && !overallLoading && isEmailAvailable) ? "white" : "#aaa",
              fontSize: "1rem",
              fontWeight: 600,
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              cursor: (isOtpValid && !overallLoading && isEmailAvailable) ? "pointer" : "not-allowed",
              marginTop: "1rem",
              transition: "all 0.3s ease",
              opacity: overallLoading ? 0.7 : 1,
            }}
          >
            {verifyLoading ? "Verifying..." : "Submit"}
          </button>

          {/* Resend OTP functionality */}
          <p style={{ fontSize: "0.95rem", color: "#ccc", textAlign: "center", marginTop: "1rem" }}>
            Didn’t receive the email?{" "}
            <span
              role="button"
              onClick={isEmailAvailable && !overallLoading ? handleResendOtp : undefined}
              style={{
                color: (!isEmailAvailable || overallLoading) ? "#888" : "#96105E",
                fontWeight: "600",
                textDecoration: "underline",
                cursor: (!isEmailAvailable || overallLoading) ? "not-allowed" : "pointer",
              }}
            >
              {resendLoading ? "Resending..." : "Click to resend"}
            </span>
          </p>
             {resendError && resendError !== MESSAGE_TO_HIDE && ( // Display resendError only if not the hidden message
               <span style={{ color: "#ff4d4d", fontSize: "0.9rem", textAlign: "center", marginTop: "0.5rem" }}>
                 {resendError}
               </span>
             )}
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default VerifyAccount;