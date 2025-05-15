import { State } from "country-state-city";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select"; // Make sure this import is present
import countryList from "react-select-country-list";
import Footer from "../components/Footer"; // Assuming correct path
import Header from "../components/Header"; // Assuming correct path

const formatDOB = (value) => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 4) return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
};

const isValidDOB = (dob) => {
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/;
  if (!regex.test(dob)) return false;

  const [month, day, year] = dob.split("/").map(Number);
  const enteredDate = new Date(year, month - 1, day);

  if (
    enteredDate.getFullYear() !== year ||
    enteredDate.getMonth() !== month - 1 ||
    enteredDate.getDate() !== day
  ) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return enteredDate <= today;
};

const isValidSSN = (ssn) => {
  const regex = /^(?!000|666|9\d{2})\d{3}[- ]?(?!00)\d{2}[- ]?(?!0000)\d{4}$/;
  return regex.test(ssn);
};

// Options for the Gender react-select component
const genderOptions = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not", label: "Prefer not to say" },
];

const customSelectStyles = {
  container: (base) => ({ ...base, marginTop: "0.3rem" }),
  control: (base, state) => ({ // Added state parameter
    ...base,
    backgroundColor: "#1d1d1d",
    borderColor: state.isFocused ? "#555" : "#444", // Add focus border
    color: "#fff",
    boxShadow: state.isFocused ? '0 0 0 1px #555' : 'none', // Add subtle focus ring
    "&:hover": { borderColor: "#555" },
    fontSize: "1rem", // To match inputStyle fontSize
    minHeight: "auto", // Allow height to be determined by padding & font
    padding: "2px 0px", // Adjust padding to better match input field height (inputStyle has padding: "10px")
    // react-select control has its own internal padding, this is an adjustment
  }),
  singleValue: (base) => ({ ...base, color: "#fff" }),
  menu: (base) => ({ ...base, backgroundColor: "#fff", color: "#000", zIndex: 9999 }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? "#f0f0f0" : "#fff",
    color: "#000",
    cursor: "pointer",
  }),
  placeholder: (base) => ({ // Style for the placeholder text
    ...base,
    color: "#a0a0a0", // Light gray placeholder text, adjust as needed
  }),
};

const inputStyle = {
  marginTop: "0.3rem",
  padding: "10px",
  border: "1px solid #444",
  backgroundColor: "#1d1d1d",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "1rem",
  width: "100%",
};

export default function BusinessInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: null, // Changed initial state for react-select
    ssn: "",
    address1: "",
    address2: "",
    city: "",
    state: null, // Store state as object { label, value }
    country: countryList().getData().find((c) => c.label === "United States"), // Store country as object
    zip: "",
    idFile: null, // Storing the File object
  });
  const [errors, setErrors] = useState({});
  const [verificationMessage, setVerificationMessage] = useState(null); // State to store the user-friendly message
  const [isCheckingStatus, setIsCheckingStatus] = useState(false); // State for loading indicator
  const [idCheckInitiated, setIdCheckInitiated] = useState(false); // State to track if the check has been clicked and successful
  const [sessionId, setSessionId] = useState(null); // State to store the sessionId from the API

  const countryOptions = useMemo(() => countryList().getData().filter((c) => c.label === "United States"), []);

  const stateOptions = useMemo(() => {
    return formData.country
      ? State.getStatesOfCountry(formData.country.value).map((s) => ({
          label: s.name,
          value: s.isoCode,
        }))
      : [];
  }, [formData.country]);

  useEffect(() => {
    const savedName = sessionStorage.getItem("businessFullName");
    if (savedName) {
      setFormData((prev) => ({ ...prev, fullName: savedName }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "dob" ? formatDOB(value) : value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  // Handles change for react-select fields (gender, country, state)
  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // If country changes, reset state
    if (field === "country") {
      setFormData((prev) => ({ ...prev, state: null }));
    }
    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, idFile: file }));
    if (errors.idFile) {
      setErrors((prevErrors) => ({ ...prevErrors, idFile: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent submission if ID check has not been initiated and completed successfully
    if (!idCheckInitiated || !sessionId) {
        alert("Please perform the ID verification status check first.");
        return;
    }

    const newErrors = {};
    const fieldNames = {
      fullName: "Full Name",
      dob: "Date of Birth",
      gender: "Gender",
      ssn: "SSN",
      address1: "Address Line 1",
      city: "City",
      state: "State",
      country: "Country",
      zip: "ZIP / Postal code",
      idFile: "Government Issued ID",
    };

    if (!formData.fullName?.trim()) newErrors.fullName = `Please enter ${fieldNames.fullName}.`;

    if (!formData.dob?.trim()) {
      newErrors.dob = `Please enter ${fieldNames.dob}.`;
    } else if (!isValidDOB(formData.dob)) {
      newErrors.dob = `Please enter a valid ${fieldNames.dob} (MM/DD/YYYY).`;
    }

    if (!formData.gender || !formData.gender.value) {
      newErrors.gender = `Please select ${fieldNames.gender}.`;
    }

    if (!formData.ssn?.trim()) {
      newErrors.ssn = `Please enter ${fieldNames.ssn}.`;
    } else if (!isValidSSN(formData.ssn)) {
      newErrors.ssn = `Please enter a valid ${fieldNames.ssn}.`;
    }

    if (!formData.address1?.trim()) newErrors.address1 = `Please enter ${fieldNames.address1}.`;
    if (!formData.city?.trim()) newErrors.city = `Please enter ${fieldNames.city}.`;

    if (!formData.country || !formData.country.value) {
      newErrors.country = `Please select ${fieldNames.country}.`;
    }
    if (!formData.state || !formData.state.value) {
      newErrors.state = `Please select ${fieldNames.state}.`;
    }

    if (!formData.zip?.trim()) newErrors.zip = `Please enter ${fieldNames.zip}.`;
    if (!formData.idFile) newErrors.idFile = `Please upload your ${fieldNames.idFile}.`;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Data Submitted:", formData);

      // Prepare the data to pass to the next page
      const dataToPass = {
        profile: {
          fullName: formData.fullName,
          dob: formData.dob,
          gender: formData.gender?.label, // Pass the label for clarity
          ssn: formData.ssn,
          address: {
            addressLine1: formData.address1,
            addressLine2: formData.address2,
            city: formData.city,
            state: formData.state?.value, // Pass just the value (ISO code)
            country: formData.country?.label, // Pass the label (e.g., "United States")
            zipCode: formData.zip,
          },
          // Include file details if a file was uploaded
          ...(formData.idFile && {
            documents: [
              {
                fileName: formData.idFile.name,
                category: "Government issued ID", // Hardcoded as per requirement
                fileType: formData.idFile.name.split('.').pop() || '', // Extract file extension
              }
            ]
          }),
        },
        // Pass the sessionId obtained from the API check
        sessionId: sessionId,
        // Manually add the "status": "Success" key-value pair
        status: "Success"
      };

      console.log("Data being passed to next page:", dataToPass);

      // Navigate to the next page with the data in the state
      navigate("/signup/business/info-details", {
        state: dataToPass
      });
    }
  };

  // Function to handle the click on the new button
  const handleIDVerificationClick = async () => {
    setIsCheckingStatus(true); // Start loading indicator
    setVerificationMessage(null); // Clear previous message
    setIdCheckInitiated(false); // Reset initiated status
    setSessionId(null); // Clear previous session ID

    const verificationSessionId = 'vs_1RMCdq4JAKsL0ZOVVmEwR9zN'; // **Replace with your actual session ID logic**
    const apiUrl = `http://54.236.192.13:8000/api/identity/check-status/${verificationSessionId}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers your API requires, e.g., Authorization
          // 'Authorization': 'Bearer YOUR_API_KEY',
        },
      });

      const data = await response.json();

      if (response.ok && data.code === 200 && data.data) {
        // API call was successful and returned expected structure
        const receivedSessionId = data.data.sessionId;

        setSessionId(receivedSessionId); // Store the received session ID
        setIdCheckInitiated(true); // Mark check as initiated and successful enough to get ID
        setVerificationMessage("ID verification check completed, Please fill below details to continue."); // User-friendly success message
        console.log("Check completed. Session ID:", receivedSessionId);

      } else {
        // API returned an error status code or unexpected structure
        const errorMessage = data.message || response.statusText || 'Unknown error';
        setVerificationMessage(`Error during check: ${errorMessage}`); // User-friendly error message
        console.error("API Error:", data);
        setSessionId(null); // Ensure session ID is null on error
      }

    } catch (error) {
      // Network or other error during fetch
      setVerificationMessage(`Error fetching status: ${error.message}`); // User-friendly fetch error message
      console.error("Fetch Error:", error);
      setSessionId(null); // Ensure session ID is null on error
    } finally {
      setIsCheckingStatus(false); // Stop loading indicator
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", fontFamily: "'Source Sans Pro', sans-serif", backgroundColor: "#000", color: "#fff" }}>
      <Header />
      <main style={{ flex: 1 }}>
        <div style={{ textAlign: "center", padding: "3rem 1rem", maxWidth: "900px", margin: "auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "2rem" }}>Personal Information</h2>

          {/* Button and status message */}
          <div style={{ marginBottom: "1.5rem" }}>
            <button
              onClick={handleIDVerificationClick}
              disabled={isCheckingStatus} // Disable button while loading
              style={{
                backgroundColor: "#96105E", // Match background
                color: "#fff", // White text
                border: "1px solid #444", // Subtle border
                padding: "8px 16px", // Adjusted padding
                borderRadius: "6px",
                cursor: isCheckingStatus ? "not-allowed" : "pointer",
                fontSize: "0.9rem", // Smaller font size
                opacity: isCheckingStatus ? 0.7 : 1, // Reduced opacity while loading
                transition: "opacity 0.3s ease-in-out",
              }}
            >
              {isCheckingStatus ? "Checking..." : "ID verification done?"}
            </button>
            {/* Display user-friendly verification message */}
            {verificationMessage && (
              <p style={{
                  marginTop: "0.5rem",
                  fontSize: "0.85rem",
                  // Color based on whether a session ID was successfully stored (indicating check initiation)
                  color: sessionId ? '#4CAF50' : '#ff4d4d'
               }}>
                {verificationMessage}
              </p>
            )}
          </div>


          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "500px", margin: "0 auto", textAlign: "left" }}>
            <label style={{ fontSize: "0.95rem" }}>
              Full Name
              <input type="text" name="fullName" value={formData.fullName} readOnly style={inputStyle} />
              {errors.fullName && <span style={{ color: "#ff4d4d", fontSize: "0.85rem", display: 'block', marginTop: '0.2rem' }}>{errors.fullName}</span>}
            </label>

            <label style={{ fontSize: "0.95rem" }}>
              Date of Birth
              <input type="text" name="dob" placeholder="MM/DD/YYYY" maxLength="10" value={formData.dob} onChange={handleChange} style={inputStyle} />
              {errors.dob && <span style={{ color: "#ff4d4d", fontSize: "0.85rem", display: 'block', marginTop: '0.2rem' }}>{errors.dob}</span>}
            </label>

            {/* Gender field updated to use react-select */}
            <label style={{ fontSize: "0.95rem" }}>
              Gender
              <Select
                name="gender"
                options={genderOptions}
                value={formData.gender}
                onChange={(selectedOption) => handleSelectChange("gender", selectedOption)}
                styles={customSelectStyles}
                placeholder="Select Gender"
              />
              {errors.gender && <span style={{ color: "#ff4d4d", fontSize: "0.85rem", display: 'block', marginTop: '0.2rem' }}>{errors.gender}</span>}
            </label>

            <label style={{ fontSize: "0.95rem" }}>
              SSN
              <input type="text" name="ssn" placeholder="Enter your SSN" value={formData.ssn} onChange={handleChange} style={inputStyle} />
              {errors.ssn && <span style={{ color: "#ff4d4d", fontSize: "0.85rem", display: 'block', marginTop: '0.2rem' }}>{errors.ssn}</span>}
            </label>

            <label style={{ fontSize: "0.95rem" }}>
              Government issued ID
              {/* Updated File Upload JSX */}
              <div
                 style={{
                   border: "1px solid #444", // Adjusted border color
                   backgroundColor: "#1d1d1d",
                   padding: "1.5rem", // Adjusted padding
                   borderRadius: "10px",
                   textAlign: "center",
                   marginTop: "0.3rem",
                   cursor: "pointer",
                   display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center',
                   justifyContent: 'center',
                 }}
                 onClick={() => document.getElementById('idFile').click()} // Click opens file dialog
              >
                 {/* SVG icon */}
                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M16 16l-4-4-4 4" /> <path d="M12 12v9" /> <path d="M20.39 18.39A5.5 5.5 0 0018 9h-1.26A8 8 0 104 16.3" />
                 </svg>
                 {/* Drag & drop text */}
                 <p style={{ margin: "1rem 0 0.5rem" }}>
                   Drag & drop files or <label htmlFor="idFile" style={{ color: "#d84b9e", cursor: "pointer", textDecoration: "underline" }}>Browse</label>
                 </p>
                 {/* Accepted file types */}
                 <p style={{ fontSize: "0.85rem", color: "#ccc" }}>png, pdf, jpg, docx accepted</p>
                 {/* Hidden file input */}
                 <input
                   type="file"
                   id="idFile"
                   name="idFile"
                   accept="image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                   onChange={handleFileChange}
                   style={{ display: "none" }}
                 />
              </div>

              {/* Display uploaded file info below the drag area if a file is selected */}
              {formData.idFile && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#333', // Darker background for the file row
                  padding: '10px',
                  borderRadius: '5px',
                  marginTop: '1rem', // Space between drag area and file display
                  wordBreak: 'break-all', // Prevent long file names from overflowing
                }}>
                  {/* File Icon (example) */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', flexShrink: 0 }}>
                    <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" />
                  </svg>
                  <span style={{ flex: 1, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {formData.idFile.name}
                  </span>
                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => {
                       setFormData(prev => ({ ...prev, idFile: null }));
                       setErrors(prevErrors => ({ ...prevErrors, idFile: null })); // Clear error if removed
                    }}
                    style={{
                      marginLeft: '10px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      padding: '0 5px',
                      flexShrink: 0, // Prevent button from shrinking
                    }}
                  >
                    &times; {/* Close icon */}
                  </button>
                </div>
              )}

              {errors.idFile && <span style={{ color: "#ff4d4f", fontSize: "0.85rem", display: 'block', marginTop: '0.5rem' }}>{errors.idFile}</span>}
            </label>

            <label style={{ fontSize: "0.95rem" }}>
              Address Line 1
              <input name="address1" value={formData.address1} onChange={handleChange} placeholder="Address Line 1" style={inputStyle} />
              {errors.address1 && <span style={{ color: "#ff4d4d", fontSize: "0.85rem", display: 'block', marginTop: '0.2rem' }}>{errors.address1}</span>}
            </label>

            <label style={{ fontSize: "0.95rem" }}>
              Address Line 2 <span style={{color: '#aaa', fontSize: '0.8rem'}}>(Optional)</span>
              <input name="address2" value={formData.address2} onChange={handleChange} placeholder="Address Line 2" style={inputStyle} />
            </label>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-start" }}>
              <label style={{ flex: 1, minWidth: '150px', fontSize: "0.95rem", display: "flex", flexDirection: "column" }}>
                Country
                <Select
                    name="country"
                    options={countryOptions}
                    value={formData.country}
                    onChange={(value) => handleSelectChange("country", value)}
                    styles={customSelectStyles}
                    placeholder="Select Country"
                />
                {errors.country && <span style={{ color: "#ff4d4d", fontSize: "0.85rem", display: 'block', marginTop: '0.2rem' }}>{errors.country}</span>}
              </label>
              <label style={{ flex: 1, minWidth: '150px', fontSize: "0.95rem", display: "flex", flexDirection: "column" }}>
                State
                <Select
                    name="state"
                    options={stateOptions}
                    value={formData.state}
                    onChange={(value) => handleSelectChange("state", value)}
                    isDisabled={!formData.country || stateOptions.length === 0}
                    styles={customSelectStyles}
                    placeholder="Select State"
                />
                {errors.state && <span style={{ color: "#ff4d4d", fontSize: "0.85rem", display: 'block', marginTop: '0.2rem' }}>{errors.state}</span>}
              </label>
            </div>

            <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", alignItems: "flex-start" }}>
              <label style={{ minWidth: '150px', fontSize: "0.95rem", display: "flex", flexDirection: "column" }}>
                City
                <input name="city" value={formData.city} onChange={handleChange} placeholder="City" style={inputStyle} />
                {errors.city && <span style={{ color: "#ff4d4d", fontSize: "0.85rem", display: 'block', marginTop: '0.2rem' }}>{errors.city}</span>}
              </label>
              <label style={{ minWidth: '150px', fontSize: "0.95rem", display: "flex", flexDirection: "column" }}>
                Zip / Postal code
                <input name="zip" value={formData.zip} onChange={handleChange} placeholder="ZIP / Postal code" style={inputStyle} />
                {errors.zip && <span style={{ color: "#ff4d4d", fontSize: "0.85rem", display: 'block', marginTop: '0.2rem' }}>{errors.zip}</span>}
              </label>
            </div>

            <div style={{ marginTop: "3rem", textAlign: "left" }}>
              <button
                type="submit"
                disabled={!idCheckInitiated || isCheckingStatus} // Button is disabled until check is initiated and not checking
                style={{
                    backgroundColor: "#96105E",
                    color: "white",
                    fontWeight: 600,
                    padding: "12px 24px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: (!idCheckInitiated || isCheckingStatus) ? "not-allowed" : "pointer",
                    fontSize: "1rem",
                    width: "100%",
                    maxWidth: "200px",
                    display: "block",
                    margin: "0 auto",
                    opacity: (!idCheckInitiated || isCheckingStatus) ? 0.5 : 1, // Reduce opacity when disabled
                    transition: "opacity 0.3s ease-in-out",
                }}
            >
                Next
              </button>
             
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}