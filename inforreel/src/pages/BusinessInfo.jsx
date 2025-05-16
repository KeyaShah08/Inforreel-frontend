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
  // Basic SSN format check (###-##-#### or #########)
  // This regex allows optional hyphens. You might need a more strict one
  // depending on requirements (e.g., disallowing all zeros in parts).
  const regex = /^(?!000|666|9\d{2})\d{3}[- ]?(?!00)\d{2}[- ]?(?!0000)\d{4}$/;
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
    backgroundColor: "#1d1d1d",
    borderColor: state.isFocused ? "#555" : "#444",
    color: "#fff",
    boxShadow: state.isFocused ? '0 0 0 1px #555' : 'none',
    "&:hover": { borderColor: "#555" },
    fontSize: "1rem",
    minHeight: "auto",
    padding: "2px 0px",
  }),
  singleValue: (base) => ({ ...base, color: "#fff" }),
  menu: (base) => ({ ...base, backgroundColor: "#fff", color: "#000", zIndex: 9999 }),
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
    country: countryList().getData().find((c) => c.label === "United States"),
    zip: "",
    idFile: null, // Storing the File object
    identification: {
      status: null,
      stripeSessionId: null,
    },
  });

  const [errors, setErrors] = useState({});

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
    const verificationStatus = searchParams.get("status");
    const stripeSessionIdFromUrl = searchParams.get("session_id");

    // --- START: Added logic to check localStorage ---
    const storedSessionId = localStorage.getItem("stripe_session_id");

    // Prioritize URL parameter, fall back to localStorage
    const finalSessionId = stripeSessionIdFromUrl || storedSessionId;
    // --- END: Added logic to check localStorage ---


    if (verificationStatus || finalSessionId) { // Use finalSessionId here
      setFormData(prev => ({
        ...prev,
        identification: {
          status: verificationStatus || prev.identification.status,
          stripeSessionId: finalSessionId || prev.identification.stripeSessionId, // Use finalSessionId here
        }
      }));

      // Optional: Consider removing the session ID from localStorage
      // once you've successfully retrieved and processed it on this page.
      // This prevents using a potentially old ID on subsequent visits
      // if the URL parameter isn't present.
      // if (finalSessionId === storedSessionId && !stripeSessionIdFromUrl) {
      //    localStorage.removeItem("stripe_session_id");
      // }
    }

    const savedName = sessionStorage.getItem("businessFullName");
    if (savedName) {
      setFormData((prev) => ({ ...prev, fullName: savedName }));
    }
  }, [searchParams]); // Keep searchParams as a dependency


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

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

    // Validation check for identification data before proceeding
    // This ensures that either a URL parameter or a localStorage value was found
    if (!formData.identification.stripeSessionId || !formData.identification.status) {
        alert("Identification data is missing. Please ensure verification was completed.");
        return; // Prevent form submission
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

      // Reformat DOB to YYYY-MM-DD
      const [month, day, year] = formData.dob.split('/');
      const formattedDob = `${year}-${month}-${day}`;

      // Adjust country label to "USA" if it's "United States"
      const countryLabel = formData.country?.label;
      const countryValue = countryLabel === "United States" ? "USA" : countryLabel;

      const dataToPass = {
        profile: {
          fullName: formData.fullName,
          dob: formattedDob, // Use reformatted DOB
          gender: formData.gender?.label,
          ssn: formData.ssn,
          address: {
            addressLine1: formData.address1,
            addressLine2: formData.address2,
            city: formData.city,
            state: formData.state?.value, // This is already the ISO code like "NY"
            country: countryValue, // Use the adjusted country value "USA"
            zipCode: formData.zip, // Corrected key name
          },
          // Pass the identification data, including the session ID and status
          identification: formData.identification,
        },
        // File metadata is a top-level array named 'fileMeta'
        ...(formData.idFile && {
          fileMeta: [
            {
              fileName: formData.idFile.name,
              category: "Government issued ID", // Based on your text description
              fileType: formData.idFile.name.split('.').pop() || '',
            }
          ]
        }),
        // Add the actual File object(s) under a top-level 'files' key
        ...(formData.idFile && {
            files: [formData.idFile] // Put the single File object in an array
        }),
      };

      console.log("Data being passed to next page:", dataToPass);

      navigate("/signup/business/info-details", {
        state: dataToPass
      });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", fontFamily: "'Source Sans Pro', sans-serif", backgroundColor: "#000", color: "#fff" }}>
      <Header />
      <main style={{ flex: 1 }}>
        <div style={{ textAlign: "center", padding: "3rem 1rem", maxWidth: "900px", margin: "auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "2rem" }}>Personal Information</h2>

            {/* Display status if available */}
            {formData.identification.status && (
              <p style={{
                  marginTop: "0.5rem",
                  fontSize: "0.85rem",
                  color: formData.identification.status === 'success' ? '#96105E' : '#ff4d4d', // Assuming 'verified' is success
                  textAlign: 'center'
                 }}>
                Your Identity Verification is {formData.identification.status}
              </p>
            )}
             {/* Removed the display of the Verification Session ID */}
             {/*
             {formData.identification.stripeSessionId && (
               <p style={{
                   marginTop: "0.5rem",
                   fontSize: "0.85rem",
                   color: '#ddd',
                   textAlign: 'center'
                  }}>
                 Verification Session ID: {formData.identification.stripeSessionId}
               </p>
             )}
             */}


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
                     border: "1px solid #444",
                     backgroundColor: "#1d1d1d",
                     padding: "1.5rem",
                     borderRadius: "10px",
                     textAlign: "center",
                     marginTop: "0.3rem",
                     cursor: "pointer",
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     justifyContent: 'center',
                   }}
                   onClick={() => document.getElementById('idFile').click()}
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
                   backgroundColor: '#333',
                   padding: '10px',
                   borderRadius: '5px',
                   marginTop: '1rem',
                   wordBreak: 'break-all',
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
                         setErrors(prevErrors => ({ ...prevErrors, idFile: null }));
                     }}
                     style={{
                       marginLeft: '10px',
                       backgroundColor: 'transparent',
                       border: 'none',
                       color: '#fff',
                       cursor: 'pointer',
                       fontSize: '1.2rem',
                       padding: '0 5px',
                       flexShrink: 0,
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
                // Enable button only if identification data (status and session ID) is present
                disabled={!formData.identification.stripeSessionId || !formData.identification.status}
                style={{
                    backgroundColor: "#96105E",
                    color: "white",
                    fontWeight: 600,
                    padding: "12px 24px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: (!formData.identification.stripeSessionId || !formData.identification.status) ? "not-allowed" : "pointer",
                    fontSize: "1rem",
                    width: "100%",
                    maxWidth: "200px",
                    display: "block",
                    margin: "0 auto",
                    opacity: (!formData.identification.stripeSessionId || !formData.identification.status) ? 0.5 : 1,
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
