import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

// Define specific messages to handle
const MESSAGE_TO_HIDE = "OTP resent successfully";
// Define the specific message to exclude from errors and display
const MESSAGE_TO_EXCLUDE_FROM_ERROR = "Navigation source is missing. Cannot determine flow.";

function VerifyAccount() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [verifyApiError, setVerifyApiError] = useState("");
  const [resendError, setResendError] = useState("");
  const hasSentOtpRef = useRef(false); // UseRef instead of useState
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
    source: null,
    next: null
  };

  useEffect(() => {
    const handleInitialRegistration = async () => {
      setRegistrationLoading(true);
      setRegistrationError(null);
      setRegistrationSuccessMessage(null);

      try {
        const response = await fetch("http://34.229.245.56:8000/api/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, userType, username }),
        });

        const data = await response.json();

        if (response.ok && data.code === 200) {
          setRegistrationSuccessMessage("Registration successful! Please check your email for OTP.");
        } else {
          setRegistrationError(data.error || data.message || "Registration failed. Please try again.");
        }
      } catch (error) {
        setRegistrationError("An error occurred during registration. Please check your connection.");
      } finally {
        setRegistrationLoading(false);
      }
    };

    const handleInitialResend = async () => {
      setResendLoading(true);
      setResendError("");

      try {
        const response = await fetch("http://34.229.245.56:8000/api/users/resend-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok && data.code === 200 && data.message === "OTP sent to your email for verification") {
          setOtp("");
        } else if (response.status === 400 && data.error === "User already verified") {
          const authToken = data.data?.token || null;
          if (authToken) localStorage.setItem('authToken', authToken);
          const verifiedUserType = data.data?.userType || userType;
          handleSuccessfulNavigation(authToken, verifiedUserType);
        } else {
          setResendError(data.message || `Failed to send OTP. Status: ${response.status}. Please try again.`);
        }
      } catch (error) {
        setResendError("An error occurred while resending OTP. Please try again.");
      } finally {
        setResendLoading(false);
      }
    };

    if (!email || hasSentOtpRef.current) return;

    const sendOtpOnce = async () => {
      switch (source) {
        case 'signup':
          await handleInitialRegistration();
          break;
        case 'forgot-password':
          await handleInitialResend();
          break;
        default:
          console.warn("Unknown or missing source. Skipping automatic OTP resend.");
          break;
      }
      hasSentOtpRef.current = true;
    };

    sendOtpOnce();
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

    // --- ADDED LOGIC FOR FORGOT PASSWORD REDIRECTION ---
    if (source === 'forgot-password') {
        console.log("Source is 'forgot-password'. Navigating to reset password page.");
        // Pass email in state to the reset password page
        navigate("/reset-password", { state: { email: email } });
        return; // Stop here if coming from forgot password
    }
    // --- END OF ADDED LOGIC ---

    const stateToPass = {
      userType: verifiedUserType,
      authToken: token // Pass the token via state to the next page if needed immediately (though local storage is for future)
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
      navigate("/policy", { state: stateToPass }); // This might be where you redirect before BusinessInfoDetails1
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
      const response = await fetch("http://34.229.245.56:8000/api/users/verify-otp", {
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
        if (authToken) { // Check if token is not null before storing
             localStorage.setItem('authToken', authToken); // <-- ADDED THIS LINE
        }
        const verifiedUserType = data.data?.userType || userType; // Use userType from state as fallback

        // Call the navigation handler (which now includes the forgot password check)
        handleSuccessfulNavigation(authToken, verifiedUserType);


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
      const resendApiUrl = "http://34.229.245.56:8000/api/users/resend-otp";

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
        // No success message needed for resend
      } else if (response.status === 400 && data.error === "User already verified") {
           console.log("User already verified on manual resend attempt. Navigating.");
           const authToken = data.data?.token || null;
           if (authToken) { // Check if token is not null before storing
                localStorage.setItem('authToken', authToken); // <-- ADDED THIS LINE
           }
           const verifiedUserType = data.data?.userType || userType;
           handleSuccessfulNavigation(authToken, verifiedUserType); // Navigate if already verified
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

  // Determine overall error state for highlighting fields etc., excluding the specific message
  // This is kept to control other error message displays if needed, but is no longer used for the border
  const overallError = (error && error !== MESSAGE_TO_EXCLUDE_FROM_ERROR) ||
                       (verifyApiError && verifyApiError !== MESSAGE_TO_EXCLUDE_FROM_ERROR) ||
                       (resendError && resendError !== MESSAGE_TO_EXCLUDE_FROM_ERROR) ||
                       (registrationError && registrationError !== MESSAGE_TO_EXCLUDE_FROM_ERROR);


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#141414",
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
          <h2 style={{ textAlign: "center", fontSize: "2rem",  marginTop: "2rem" }}>
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
               {source === 'signup' && registrationError && registrationError !== MESSAGE_TO_EXCLUDE_FROM_ERROR && <p>{registrationError}</p>} {/* Inherits red color from parent div and excludes the specific message */}
               {source === 'signup' && registrationSuccessMessage && !registrationLoading && !registrationError && (
                 <p style={{ color: "#4CAF50" }}>{registrationSuccessMessage}</p>
               )}
               {/* Specific message for email exists error in signup flow (rendered here or below the main message) */}
               {registrationError && registrationError.includes("Email already exists") && (registrationError !== MESSAGE_TO_EXCLUDE_FROM_ERROR) && ( // Excludes the specific message
                   <p style={{ fontSize: "0.9rem", color: "#ccc", marginTop: "0.5rem" }}>
                       Already registered? <span onClick={() => navigate('/signin')} style={{ color: "#96105E", textDecoration: "underline", cursor: "pointer" }}>Sign in here.</span>
                   </p>
               )}

               {/* Resend/Initial Load messages (Login/Forgot Password Flow) */}
               {/* Removed "Sending OTP..." message here */}
                {(source === 'login' || source === 'forgot-password') && filteredResendError && filteredResendError !== MESSAGE_TO_EXCLUDE_FROM_ERROR && !resendLoading && <p>{filteredResendError}</p>} {/* Inherits red color and excludes the specific message */}

                {/* If none of the above messages are showing, render a space to maintain minHeight */}
               {!( (source === 'signup' && (registrationLoading || (registrationError && registrationError !== MESSAGE_TO_EXCLUDE_FROM_ERROR) || registrationSuccessMessage)) || ((source === 'login' || source === 'forgot-password') && (resendLoading || (filteredResendError && filteredResendError !== MESSAGE_TO_EXCLUDE_FROM_ERROR))) ) && ( // Adjusted condition to exclude the specific message
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
                border: `1px solid #444`, // Changed to a fixed border color
                borderRadius: "6px",
                fontSize: "1rem",
                backgroundColor: "#141414",
                color: "#fff",
              }}
              disabled={!isEmailAvailable || overallLoading}
            />
            {/* Display client-side OTP error or main verification API error, excluding the specific message */}
            {((error && error !== MESSAGE_TO_EXCLUDE_FROM_ERROR) || (filteredVerifyApiError && filteredVerifyApiError !== MESSAGE_TO_EXCLUDE_FROM_ERROR)) ? (
              <span style={{ color: "#ff4d4d", fontSize: "0.9rem", textAlign: "center", marginTop: "0.3rem" }}>
                {(error && error !== MESSAGE_TO_EXCLUDE_FROM_ERROR) ? error : filteredVerifyApiError}
              </span>
            ) : null}
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
             {/* Display resendError only if not the hidden message and not the message to exclude */}
             {resendError && resendError !== MESSAGE_TO_HIDE && resendError !== MESSAGE_TO_EXCLUDE_FROM_ERROR && (
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