// BusinessInfo.jsx - First Page - Updated Again

import { State } from "country-state-city";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // Import useSearchParams
import Select from "react-select";
import countryList from "react-select-country-list";
import Footer from "../components/Footer";
import Header from "../components/Header";

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

  // Check if the date parts form a valid date (e.g., no Feb 30)
  if (
    enteredDate.getFullYear() !== year ||
    enteredDate.getMonth() !== month - 1 ||
    enteredDate.getDate() !== day
  ) {
    return false;
  }

  // Check if the date is not in the future
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return enteredDate <= today;
};

const isValidSSN = (ssn) => {
  // Basic SSN format check (###-##-#### or #########)
  // This regex allows optional hyphens or spaces.
  // It also includes some common restrictions (not all zeros, not starting with 000, 666, or 900-999).
  const regex = /^(?!000|666|9\d{2})?\d{3}[- ]?(?!00)?\d{2}[- ]?(?!0000)?\d{4}$/;
  return regex.test(ssn);
};


const genderOptions = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not", label: "Prefer not to say" },
];

const customSelectStyles = {
  container: (base) => ({ ...base, marginTop: "0.3rem" }),
  control: (base, state) => ({
    ...base,
    backgroundColor: "#141414",
    borderColor: state.isFocused ? "#555" : "#444",
    color: "#fff",
    boxShadow: state.isFocused ? '0 0 0 1px #555' : 'none',
    "&:hover": { borderColor: "#555" },
    fontSize: "1rem",
    minHeight: "auto",
    padding: "2px 0px", // Adjust padding to match input
  }),
  singleValue: (base) => ({ ...base, color: "#fff" }),
  menu: (base) => ({ ...base, backgroundColor: "#fff", color: "#141414", zIndex: 9999 }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? "#f0f0f0" : "#fff",
    color: "#000",
    cursor: "pointer",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#a0a0a0",
  }),
  indicatorSeparator: (base) => ({ // Style for the separator line
    ...base,
    backgroundColor: "#444",
  }),
  dropdownIndicator: (base) => ({ // Style for the dropdown arrow
    ...base,
    color: "#a0a0a0",
    "&:hover": {
        color: "#fff"
    }
  }),
};

const inputStyle = {
  marginTop: "0.3rem",
  padding: "10px", // Match Select padding roughly
  border: "1px solid #444",
  backgroundColor: "#141414",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "1rem",
  width: "100%",
  boxSizing: 'border-box', // Ensure padding doesn't add to width
};

// Added style for labels to ensure white color
const labelStyle = {
  fontSize: "0.95rem",
  color: "white", // Explicitly set label color to white
};


export default function BusinessInfo() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: null,
    ssn: "",
    address1: "",
    address2: "",
    city: "",
    state: null,
    country: countryList().getData().find((c) => c.label === "United States"), // Default to USA
    zip: "",
    idFile: null, // Storing the File object
    identification: { // Object to store verification status and session ID
      status: null, // We assume status is 'success' if on this page with session ID
      stripeSessionId: null,
    },
  });

  const [errors, setErrors] = useState({});

  // Filter country list to only include United States as required
  const countryOptions = useMemo(() => countryList().getData().filter((c) => c.label === "United States"), []);

  const stateOptions = useMemo(() => {
    return formData.country
      ? State.getStatesOfCountry(formData.country.value).map((s) => ({
          label: s.name,
          value: s.isoCode, // Use ISO code for state value
        }))
      : [];
  }, [formData.country]);

  useEffect(() => {
    // Check URL parameters for verification status and session ID
    // We are assuming status is 'success' if we reach this page with a session ID.
    const verificationStatus = searchParams.get("status"); // Keep for potential logging/debugging
    const stripeSessionIdFromUrl = searchParams.get("session_id");

    // Check localStorage for a session ID if not in URL (for continuity if user leaves page)
    const storedSessionId = localStorage.getItem("stripe_session_id");
    // const storedVerificationStatus = localStorage.getItem("stripe_status"); // No longer strictly needed if we assume success

    // Prioritize URL parameter, fall back to localStorage for session ID
    const finalSessionId = stripeSessionIdFromUrl || storedSessionId;
    // If a session ID is found (either from URL or storage), assume status is 'success' for this page's logic
    const finalStatus = finalSessionId ? 'success' : null; // Set status to 'success' if sessionId exists, else null

    // Only update state if a session ID is found
    if (finalSessionId) {
      setFormData(prev => ({
        ...prev,
        identification: {
          status: finalStatus, // This will be 'success' if sessionId exists
          stripeSessionId: finalSessionId,
        }
      }));

        // Clean up URL parameters and storage if needed
        // It's generally good practice to clear URL params after processing them
        if (stripeSessionIdFromUrl) {
             const url = new URL(window.location.href);
             url.searchParams.delete("status");
             url.searchParams.delete("session_id");
             window.history.replaceState({}, '', url.toString());
        }
         // Optionally clear storage after using it, depending on desired persistence
         // localStorage.removeItem("stripe_session_id");
         // localStorage.removeItem("stripe_status");


    }

    // // Restore full name from session storage if it exists (assuming it's set during registration/login)
    // const savedName = sessionStorage.getItem("businessFullName");
    // if (savedName) {
    //   setFormData((prev) => ({ ...prev, fullName: savedName }));
    // }

  }, [searchParams]); // Depend on searchParams to react to URL changes

   // Effect to store identification data in localStorage when it changes in state
   // This helps persist verification status across page reloads if using redirects
   useEffect(() => {
       // Only store/clear session ID based on whether it's present in state
       if (formData.identification.stripeSessionId) {
           localStorage.setItem("stripe_session_id", formData.identification.stripeSessionId);
           // If we are storing session ID, we might as well store the assumed 'success' status too for completeness
           localStorage.setItem("stripe_status", 'success');
       } else {
           // If session ID is removed from state, clear both from storage
           localStorage.removeItem("stripe_session_id");
           localStorage.removeItem("stripe_status");
       }
       // The status stored in state is now derived from whether sessionId exists,
       // so we don't need a separate dependency on formData.identification.status for this effect.
   }, [formData.identification.stripeSessionId]); // Depend only on sessionId


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "dob" ? formatDOB(value) : value, // Format DOB input
    }));
    // Clear error for the field being changed
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Reset state if country changes
    if (field === "country") {
      setFormData((prev) => ({ ...prev, state: null }));
    }
    // Clear error for the field being changed
    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, idFile: file }));
    // Clear error for the file input
    if (errors.idFile) {
      setErrors((prevErrors) => ({ ...prevErrors, idFile: null }));
    }
  };

    const handleFileDrop = (e) => {
         e.preventDefault();
         e.stopPropagation(); // Prevent default browser behavior
         const file = e.dataTransfer.files[0] || null; // Get the single file
         setFormData(prev => ({ ...prev, idFile: file }));
         // Clear error on drop
          if (errors.idFile) {
               setErrors(prev => { const { idFile: removedError, ...rest } = prev; return rest; });
          }
      };

     const handleRemoveFile = () => {
         setFormData(prev => ({ ...prev, idFile: null }));
          // Add error back if removing makes it invalid (e.g., clears a required field)
          // In this case, idFile is required, so add the error back immediately
          setErrors(prev => ({ ...prev, idFile: "Government Issued ID is required." }));
     };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    const newErrors = {};
    const fieldNames = { // User-friendly names for error messages
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
    } else if (!isValidDOB(formData.dob)) { // Validate DOB format and validity
      newErrors.dob = `Please enter a valid ${fieldNames.dob} (MM/DD/YYYY) and ensure it's not in the future.`;
    }
    if (!formData.gender || !formData.gender.value) {
      newErrors.gender = `Please select ${fieldNames.gender}.`;
    }
     if (!formData.ssn?.trim()) {
      newErrors.ssn = `Please enter ${fieldNames.ssn}.`;
    } else if (!isValidSSN(formData.ssn)) { // Validate SSN format
      newErrors.ssn = `Please enter a valid 9-digit ${fieldNames.ssn}.`;
    }
    if (!formData.address1?.trim()) newErrors.address1 = `Please enter ${fieldNames.address1}.`;
    if (!formData.city?.trim()) newErrors.city = `Please enter ${fieldNames.city}.`;
    if (!formData.country || !formData.country.value) {
      newErrors.country = `Please select ${fieldNames.country}.`;
    }
    // Only require state if country is selected and has states (e.g., USA)
    if (formData.country && stateOptions.length > 0 && (!formData.state || !formData.state.value)) {
        newErrors.state = `Please select ${fieldNames.state}.`;
    }
    if (!formData.zip?.trim()) newErrors.zip = `Please enter ${fieldNames.zip}.`;
    if (!formData.idFile) newErrors.idFile = `Please upload your ${fieldNames.idFile}.`;

    // We are assuming identification is successful if a stripeSessionId is present
    // If sessionId is missing, although the button is disabled, add a validation error for clarity on submission attempt
    if (!formData.identification.stripeSessionId) {
        newErrors.general = "Identity verification session ID is missing. Please ensure verification is initiated and successful.";
    }


    setErrors(newErrors);

    // Proceed only if there are NO validation errors
    // The check for formData.identification.stripeSessionId is implicitly handled by the 'general' error above if needed,
    // but the primary gate is the button's disabled state.
     if (Object.keys(newErrors).length === 0) {
      console.log("Form Data Validated. Preparing data for next page...");

      // Reformat DOB toYYYY-MM-DD for the profile object (as per backend expectation or standard)
      const [month, day, year] = formData.dob.split('/');
      const formattedDob = `${year}-${month}-${day}`;

      // Adjust country label to "USA" if it's "United States" (consistent with backend structure)
      const countryLabel = formData.country?.label;
      const countryValue = countryLabel === "United States" ? "USA" : countryLabel; // Assuming only USA is an option based on filtering

      // Helper function to extract file extension safely
       const getFileExtension = (fileName) => {
           if (!fileName) return "";
           const lastDotIndex = fileName.lastIndexOf('.');
           return lastDotIndex !== -1 && lastDotIndex < fileName.length - 1
               ? fileName.substring(lastDotIndex + 1) // Return without the dot
               : "";
       };


      const dataToPass = {
        // Structure ALL data from this page into the profile object
        profile: {
          fullName: formData.fullName,
          dob: formattedDob, // Use reformatted DOB
          gender: formData.gender?.label, // Pass the label string
          ssn: formData.ssn,
          address: { // Structure address as a nested object
            addressLine1: formData.address1,
            addressLine2: formData.address2,
            city: formData.city,
            state: formData.state?.value, // Pass the state ISO code (e.g., "TX")
            country: countryValue, // Pass the adjusted country value "USA"
            zipCode: formData.zip, // Corrected key name to zipCode as desired
          },
           // Pass the identification data object as collected from URL/storage
           // We still pass status and sessionId, even if status is assumed 'success' for button logic
           identification: {
               status: formData.identification.status,
               stripeSessionId: formData.identification.stripeSessionId,
           },
           // Note: Other profile fields like categories, businessName, etc. will be added in the next step
        },
         // Conditionally add fileMeta and files only if a file was uploaded
         // These will be arrays even if only one file, to make merging easier later
        ...(formData.idFile && {
          fileMeta: [
            {
              fileName: formData.idFile.name,
              category: "Government issued ID", // Set a relevant category
              fileType: getFileExtension(formData.idFile.name), // Get file extension using helper
            }
          ]
        }),
        ...(formData.idFile && {
           files: [formData.idFile] // Pass the actual File object(s) in an array
        }),
      };

      console.log("Data being passed to next page:", dataToPass);

      // Navigate to the next page, passing the data in the state
      navigate("/signup/business/info-details", {
        state: dataToPass
      });
    } else {
        // If there are validation errors, errors state is already set.
        // The disabled state on the button prevents submission if identification is not met.
        console.log("Form validation failed.");
         // Scroll to the first error
         const firstErrorFieldName = Object.keys(newErrors)[0];
           const element = document.getElementById(firstErrorFieldName) ||
                           document.querySelector(`[name="${firstErrorFieldName}"]`) || // Inputs
                           document.querySelector(`label[htmlFor="${firstErrorFieldName}"]`) || // Labels linked by htmlFor
                           document.querySelector(`.select-input[name="${firstErrorFieldName}"] .react-select__control`) || // Selects (using a class helper)
                           document.getElementById('idFile') || // Specific ID for file input if needed
                           document.querySelector('#idFileInputArea'); // Use the area ID for file upload error


         if (element) {
              // Scroll slightly above the element for better visibility
              const elementTop = element.getBoundingClientRect().top + window.scrollY;
              const scrollToPosition = elementTop - 100; // Adjust 100px as needed for padding
              window.scrollTo({ top: scrollToPosition > 0 ? scrollToPosition : 0, behavior: 'smooth' });
         } else {
              // Fallback to the top of the form if element wasn't found
              document.querySelector('.signup-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
         }

    }
  };

  // Inline styles for the custom checkbox appearance - Using #96105E color and 16px size
  const customCheckboxStyle = (isChecked) => ({
    width: '16px',
    height: '16px',
    border: '1px solid #444',
    borderRadius: '4px',
    marginRight: "10px",
    backgroundColor: isChecked ? '#96105E' : '#1D1D1D',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0, // Prevent checkbox from shrinking
  });

    // Style for the tick mark inside the custom checkbox
  const tickMarkStyle = {
      color: 'white',
      fontSize: '1rem',
      lineHeight: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  };

  // Style for error messages
  const errorStyle = {
      color: '#ff4d4f',
      fontSize: '0.85rem',
      marginTop: '5px',
      marginBottom: '10px', // Added bottom margin for spacing
      display: 'block',
  };

   // Style for the file upload drag area
     const fileUploadAreaStyle = (hasError) => ({
         border: `1px dashed ${hasError ? '#ff4d4f' : '#888'}`, // Dashed border, red on error
         backgroundColor: "#141414",
         padding: "2rem",
         textAlign: "center",
         borderRadius: "10px", // Rounded corners matching other elements
         color: "#ccc", // Greyish text
         marginTop: "0.5rem",
         marginBottom: hasError ? '10px' : '20px', // Adjust spacing based on error presence
         cursor: "pointer",
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
     });

   // Style for uploaded file list items
   const uploadedFileItemStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#141414', // Darker background for item
      padding: '10px',
      borderRadius: '5px',
      marginTop: '1rem', // Space above the first item
      wordBreak: 'break-all', // Prevent overflow of long file names
   };

   const removeFileButtonStyle = {
       marginLeft: '10px',
       backgroundColor: 'transparent',
       border: 'none',
       color: '#fff', // White color for times icon
       cursor: 'pointer',
       fontSize: '1.2rem', // Large enough for clicking
       padding: '0 5px',
       flexShrink: 0, // Prevent the button from shrinking
   };


  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", fontFamily: "'Source Sans Pro', sans-serif", backgroundColor: "#141414", color: "#fff" }}>
      <Header />
      <main style={{ flex: 1 }}>
        <div style={{ textAlign: "center", padding: "3rem 1rem", maxWidth: "900px", margin: "auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "2rem", marginTop:"2rem" }}>Personal Information</h2>

            {/* Removed all verification status messages */}


          <form onSubmit={handleSubmit} className="signup-form" style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "500px", margin: "0 auto", textAlign: "left" }} noValidate>
            <label style={labelStyle}> {/* Applied labelStyle */}
              Full Name
<input
  type="text"
  name="fullName"
  value={formData.fullName}
  onChange={handleChange}
  placeholder="Enter your full name"
  style={inputStyle}
/>              {errors.fullName && <span style={{ color: "#ff4d4f", fontSize: "0.85rem", display: 'block', marginTop: '0.2rem' }}>{errors.fullName}</span>}
            </label>

            <label style={labelStyle}> {/* Applied labelStyle */}
              Date of Birth
              <input type="text" name="dob" placeholder="MM/DD/YYYY" maxLength="10" value={formData.dob} onChange={handleChange} style={inputStyle} />
              {errors.dob && <span style={{ color: "#ff4d4f", fontSize: "0.85rem", display: 'block', marginTop: '0.2rem' }}>{errors.dob}</span>}
            </label>

            {/* Gender field updated to use react-select */}
            <label style={labelStyle}> {/* Applied labelStyle */}
              Gender
              <Select
                name="gender" // Added name for validation/scrolling
                options={genderOptions}
                value={formData.gender}
                onChange={(selectedOption) => handleSelectChange("gender", selectedOption)}
                styles={customSelectStyles}
                placeholder="Select Gender"
              />
              {errors.gender && <span style={{ color: "#ff4d4f", fontSize: "0.85rem", display: 'block', marginTop: '0.2rem' }}>{errors.gender}</span>}
            </label>

            <label style={labelStyle}> {/* Applied labelStyle */}
              SSN
              <input type="text" name="ssn" placeholder="Enter your SSN" value={formData.ssn} onChange={handleChange} style={inputStyle} />
              {errors.ssn && <span style={{ color: "#ff4d4f", fontSize: "0.85rem", display: 'block', marginTop: '0.2rem' }}>{errors.ssn}</span>}
            </label>

            <label style={labelStyle}> {/* Applied labelStyle */}
              Government issued ID
              {/* Updated File Upload JSX */}
<div
  id="idFileInputArea"
  style={fileUploadAreaStyle(errors.idFile)}
  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
  onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); }}
  onDrop={handleFileDrop}
>
<img
    src="/icons/cloud-upload1.png"
    alt="Upload Icon"
    style={{ width: "48px", height: "48px", marginBottom: "0.5rem" }}
  />  <p style={{ margin: "1rem 0 0.5rem" }}>
    Drag & drop file or{" "}
    <span
      style={{ color: "#d84b9e", cursor: "pointer", textDecoration: "underline" }}
      onClick={() => {
        if (!formData.idFile) {
          document.getElementById("idFileInput").click();
        }
      }}
    >
      Browse
    </span>
  </p>
  <p style={{ fontSize: "0.85rem", color: "#ccc" }}>png, pdf, jpg, docx accepted</p>
  <input
    type="file"
    key={formData.idFile ? formData.idFile.name : "no-file"}
    id="idFileInput"
    name="idFile"
    accept="image/*,.pdf,.doc,.docx"
    onChange={handleFileChange}
    style={{ display: "none" }}
  />
</div>


                {/* Display uploaded file info below the drag area if a file is selected */}
                {formData.idFile && (
                   <div style={uploadedFileItemStyle}>
                      {/* File Icon (example) */}
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', flexShrink: 0 }}>
                       <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" />
                      </svg>
                      <span style={{ flex: 1, fontSize: "0.95rem", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                       {formData.idFile.name} ({(formData.idFile.size / 1024).toFixed(2)} KB)
                      </span>
                      {/* Remove Button */}
                      <button
                       type="button"
                       onClick={handleRemoveFile} // Use the dedicated remove handler
                       style={removeFileButtonStyle}
                      >
                       &times; {/* Close icon */}
                      </button>
                   </div>
                )}

                {errors.idFile && <span style={{ color: "#ff4d4f", fontSize: "0.85rem", display: 'block', marginTop: '0.5rem' }}>{errors.idFile}</span>}
            </label>

            <label style={labelStyle}> {/* Applied labelStyle */}
              Address Line 1
              <input name="address1" value={formData.address1} onChange={handleChange} placeholder="Address Line 1" style={inputStyle} />
              {errors.address1 && <span style={{ color: "#ff4d4f", fontSize: "0.85rem", display: 'block', marginTop: '0.2rem' }}>{errors.address1}</span>}
            </label>

            <label style={labelStyle}> {/* Applied labelStyle */}
              Address Line 2 <span style={{color: '#aaa', fontSize: '0.8rem'}}>(Optional)</span>
              <input name="address2" value={formData.address2} onChange={handleChange} placeholder="Address Line 2" style={inputStyle} />
              {errors.address2 && <span style={{ color: "#ff4d4f", fontSize: "0.85rem", display: 'block', marginTop: '0.2rem' }}>{errors.address2}</span>}
            </label>

            {/* Address fields: Country, State, City, Zip */}
            {/* Wrapped Country/State in a flex container */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-start" }}>
              <label style={{ ...labelStyle, flex: 1, minWidth: '150px', display: "flex", flexDirection: "column" }}> {/* Applied labelStyle and flex properties */}
                Country
                <Select
                    name="country" // Added name
                    options={countryOptions}
                    value={formData.country}
                    onChange={(value) => handleSelectChange("country", value)}
                    styles={customSelectStyles}
                    placeholder="Select Country"
                    isDisabled={true} // Assuming country is fixed to USA
                    isSearchable={false} // No need to search if only one option
                />
                 {errors.country && <span style={{ color: "#ff4d4f", fontSize: "0.85rem", display: 'block', marginTop: '0.2rem' }}>{errors.country}</span>}
              </label>
              <label style={{ ...labelStyle, flex: 1, minWidth: '150px', display: "flex", flexDirection: "column" }}> {/* Applied labelStyle and flex properties */}
                State
                <Select
                    name="state" // Added name
                    options={stateOptions}
                    value={formData.state}
                    onChange={(value) => handleSelectChange("state", value)}
                    isDisabled={!formData.country || stateOptions.length === 0} // Disable if no country selected or no states available
                    styles={customSelectStyles}
                    placeholder="Select State"
                />
                {errors.state && <span style={{ color: "#ff4d4f", fontSize: "0.85rem", display: 'block', marginTop: '0.2rem' }}>{errors.state}</span>}
              </label>
            </div>

            {/* Wrapped City/Zip in a flex container */}
             <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-start" }}> {/* Use 1rem gap for consistency */}
              <label style={{ ...labelStyle, flex: 1, minWidth: '150px', display: "flex", flexDirection: "column" }}> {/* Applied labelStyle and flex properties */}
                City
                <input name="city" value={formData.city} onChange={handleChange} placeholder="City" style={inputStyle} />
                 {errors.city && <span style={{ color: "#ff4d4f", fontSize: "0.85rem", display: 'block', marginTop: '0.2rem' }}>{errors.city}</span>}
              </label>
              <label style={{ ...labelStyle, flex: 1, minWidth: '150px', display: "flex", flexDirection: "column" }}> {/* Applied labelStyle and flex properties */}
                Zip / Postal code
                <input name="zip" value={formData.zip} onChange={handleChange} placeholder="ZIP / Postal code" style={inputStyle} />
                 {errors.zip && <span style={{ color: "#ff4d4f", fontSize: "0.85rem", display: 'block', marginTop: '0.2rem' }}>{errors.zip}</span>}
              </label>
            </div>


            <div style={{ marginTop: "3rem", textAlign: "left" }}>
              <button
                type="submit"
                // Enable button as long as stripeSessionId is present (assuming presence means success)
                disabled={!formData.identification.stripeSessionId}
                style={{
                    backgroundColor: "#96105E",
                    color: "white",
                    fontWeight: 600,
                    padding: "12px 24px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: (!formData.identification.stripeSessionId) ? "not-allowed" : "pointer",
                    fontSize: "1rem",
                    width: "100%",
                    maxWidth: "200px",
                    display: "block",
                    margin: "0 auto", // Center the button
                    opacity: (!formData.identification.stripeSessionId) ? 0.5 : 1,
                    transition: "opacity 0.3s ease-in-out",
                }}
              >
                Next
              </button>
                {/* Optional: Display a general error if validation fails on submit, including missing sessionId */}
                {errors.general && (
                    <p style={{ color: "#ff4d4f", fontSize: "0.85rem", textAlign: 'center', marginTop: '0.5rem' }}>
                        {errors.general}
                    </p>
                 )}
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}