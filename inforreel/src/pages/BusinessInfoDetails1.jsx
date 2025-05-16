import { Country } from 'country-state-city'; // Import Country data
import { useEffect, useState } from "react"; // Added useEffect
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import Select from "react-select"; // Needed for Country select
import Footer from "../components/Footer";
import Header from "../components/Header";

// Define the API endpoint
const api_url = 'http://54.236.192.13:8000/api/users/profile';


// --- Static Styles (Moved outside the component) ---

const inputStyle = {
  backgroundColor: "#1D1D1D",
  color: "#FFFFFF",
  border: "1px solid #444",
  borderRadius: "8px",
  padding: "10px",
  marginTop: "5px",
  marginBottom: "5px", // Adjusted for error spacing
  width: "100%",
};

// Adjusted labelStyle for the dark theme
const labelStyle = {
  display: "flex",
  flexDirection: "column",
  fontSize: "0.95rem",
  color: "#FFFFFF", // White text for dark theme
};

// Modified fileUploadBox for dashed border and dark theme
// This function now only determines the border color based on error for fields *other than* product media
const fileUploadBoxStyle = (hasError) => ({
  border: `1px dashed ${hasError ? '#ff4d4f' : '#888'}`, // Dashed border, red on error for single optional fields
  backgroundColor: "#1d1d1d", // Dark background
  padding: "2rem",
  textAlign: "center",
  borderRadius: "10px", // Rounded corners matching other elements
  color: "#ccc", // Greyish text
  marginTop: "0.5rem",
  marginBottom: hasError || false ? '10px' : '20px', // Adjust spacing (no file list here)
  cursor: "pointer",
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

// New style specifically for the Product Media upload box, without error highlighting
const productMediaFileUploadBoxStyle = (hasError) => ({
     border: `1px dashed #888`, // Always dashed border with default color
     backgroundColor: "#1d1d1d", // Dark background
     padding: "2rem",
     textAlign: "center",
     borderRadius: "10px", // Rounded corners matching other elements
     color: "#ccc", // Greyish text
     marginTop: "0.5rem",
     marginBottom: hasError ? '10px' : '20px', // Adjust spacing based on error presence below
     cursor: "pointer",
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
     justifyContent: 'center',
});


// Style for the 'Browse' link within file upload
const browseLinkStyle = {
  fontWeight: "bold",
  color: "#d84b9e", // Accent color from previous page
  textDecoration: "underline",
};

// Button styles based on BusinessInfoDetails
const buttonStyle = {
  fontSize: "1rem",
  fontWeight: 600,
  padding: "12px",
  border: "none",
  borderRadius: "8px", // Rounded corners
  cursor: "pointer",
  marginTop: "1rem",
  color: "#FFFFFF", // White text for dark theme buttons
  flex: 1, // Make buttons take equal width
};

// Styles for the custom checkbox
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
  flexShrink: 0,
});

const tickMarkStyle = {
  color: 'white',
  fontSize: '1rem',
  lineHeight: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

// Style for error messages (reused)
const errorStyle = {
    color: '#ff4d4f',
    fontSize: '0.85rem',
    marginTop: '5px',
    marginBottom: '10px',
    display: 'block',
};

// Styles for uploaded file list items (reused from previous page)
const uploadedFileItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#333',
    padding: '10px',
    borderRadius: '5px',
    marginTop: '8px',
    wordBreak: 'break-all',
};

const removeFileButtonStyle = {
    marginLeft: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1.2rem',
    padding: '0 5px',
    flexShrink: 0,
};

// Custom styles for react-select (reused)
const customSelectStyles = {
  container: (base) => ({ ...base, marginTop: "0.3rem", marginBottom: "1rem" }),
  control: (base, state) => ({
    ...base, backgroundColor: "#1D1D1D", borderColor: state.isFocused || state.selectProps.value ? "#555" : "#444", color: "#fff", borderRadius: "8px", boxShadow: state.isFocused ? '0 0 0 1px #555' : 'none', "&:hover": { borderColor: "#555" }, minHeight: '40px', padding: '0 8px',
  }),
  singleValue: (base) => ({ ...base, color: "#fff" }), // Style for single value (not used in multi-select, but good to keep)
  multiValue: (base) => ({ ...base, backgroundColor: "#444", color: "#fff", borderRadius: '4px' }), // Style for selected tags
  multiValueLabel: (base) => ({ ...base, color: "#fff", fontSize: '0.9rem' }), // Style for selected tag text
  multiValueRemove: (base) => ({ ...base, color: "#ccc", ':hover': { backgroundColor: "#555", color: "#fff" } }), // Style for remove button on tags
  input: (base) => ({ ...base, color: "#fff" }),
  placeholder: (base) => ({ ...base, color: "#ccc" }),
  menu: (base) => ({ ...base, backgroundColor: "#fff", color: "#000", zIndex: 9999 }),
  option: (base, { isFocused, isSelected }) => ({ ...base, backgroundColor: isSelected ? "#96105E" : (isFocused ? "#f0f0f0" : "#fff"), color: isSelected ? "#fff" : "#000", cursor: "pointer" }), // Styles for dropdown options
  '&.react-select__control--disabled': { backgroundColor: '#2d2d2d', borderColor: '#555', },
  '.react-select__single-value--disabled': { color: '#bbb', },
  '.react-select__placeholder--disabled': { color: '#888', }
};


   // Helper function to extract file extension safely
   const getFileExtension = (fileName) => {
       if (!fileName) return "";
       const lastDotIndex = fileName.lastIndexOf('.');
       return lastDotIndex !== -1 && lastDotIndex < fileName.length - 1
           ? fileName.substring(lastDotIndex + 1) // Return without the dot
           : "";
   };

// --- Main Component ---

function BusinessInfoDetails1() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object to access state

  // State for country select
  const [allCountries, setAllCountries] = useState([]);

  const [useEverywhere, setUseEverywhere] = useState(true);
  // Changed to store an array of selected country objects for react-select
  const [selectedCountries, setSelectedCountries] = useState([]); // Changed state name and default to empty array

  const [plan, setPlan] = useState("");
  const [description, setDescription] = useState("");
  const [usp, setUSP] = useState("");

  // State for file uploads
  const [ingredientTransparencyFile, setIngredientTransparencyFile] = useState(null);
  const [packagingSustainabilityFile, setPackagingSustainabilityFile] = useState(null);
  const [productMediaFiles, setProductMediaFiles] = useState([]); // Max 3 files
  const [complianceQAFile, setComplianceQAFile] = useState(null);

  // State for validation errors
  const [errors, setErrors] = useState({});

  // State for API loading status
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Load country data on mount
  useEffect(() => {
    const countries = Country.getAllCountries().map(country => ({ value: country.isoCode, label: country.name }));
    setAllCountries(countries);
  }, []);


  // Handlers for standard inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Generic state update logic
    const fieldSetter = {
        plan: setPlan,
        description: setDescription,
        usp: setUSP,
    }[name];
    if(fieldSetter) fieldSetter(value);

    // Clear error on change
    if (errors[name]) {
        setErrors(prev => {
             const { [name]: removedError, ...rest } = prev;
             return rest;
        });
    }
  };

    // Handler for Country select (now handles multiple selections)
    const handleCountryChange = (selectedOptions) => {
        // selectedOptions will be an array of selected option objects, or null if cleared
        setSelectedCountries(selectedOptions || []); // Store the array (or empty array if null)
         // Clear error on change if selections are made or cleared
        if (errors.selectedCountries) { // Use the new state name for errors
             setErrors(prev => {
                  const { selectedCountries: removedError, ...rest } = prev;
                  return rest;
             });
           }
    };


  // Handlers for file uploads (basic single file)
  const handleSingleFileChange = (setter, name, e) => {
      const file = e.target.files[0] || null;
      setter(file);
        // Clear error on change
      if (errors[name]) {
             setErrors(prev => {
                  const { [name]: removedError, ...rest } = prev;
                  return rest;
             });
           }
        // Clear the input's value
        e.target.value = null;
  };

  // Handlers for Product Media (Max 3 files - multi-upload logic)
    const addProductMediaFiles = (newFiles) => {
        const remainingSlots = 3 - productMediaFiles.length; // Calculate how many more files can be added
        const filesToAdd = newFiles.slice(0, remainingSlots); // Take only files that fit within the limit

        setProductMediaFiles(prevDocs => {
            const updatedDocs = [...prevDocs, ...filesToAdd];
            // Clear validation error if adding files resolves it (length is >= 1 and <= 3)
            if (errors.productMediaFiles && updatedDocs.length >= 1 && updatedDocs.length <= 3) {
                 setErrors(prev => {
                     const { productMediaFiles: removedError, ...rest } = prev;
                     return rest;
                 });
            }
            return updatedDocs;
        });

        // If trying to add more than allowed, set the error immediately
        if (productMediaFiles.length + newFiles.length > 3) {
             setErrors(prev => ({
                 ...prev,
                 productMediaFiles: `You can upload a maximum of 3 files. You tried to add ${newFiles.length + productMediaFiles.length} files.`, // More accurate count
             }));
        }
    };

    const handleProductMediaFileChange = (e) => {
         const files = Array.from(e.target.files); // Convert FileList to Array
         addProductMediaFiles(files);
         // Clearing the input's value happens automatically when key changes due to state update
         // e.target.value = null; // Less crucial with key fix
    };

    const handleProductMediaDrop = (e) => {
         e.preventDefault();
         e.stopPropagation(); // Prevent default browser behavior
         const files = Array.from(e.dataTransfer.files); // Get files from drag event
         addProductMediaFiles(files);
    };

    const handleRemoveProductMediaFile = (indexToRemove) => {
         setProductMediaFiles(prevDocs => {
             const updatedDocs = prevDocs.filter((_, index) => index !== indexToRemove);
              // Clear validation error if removing a file resolves it (length is >= 1 and <= 3)
              // Need to re-validate the length after removal
              setErrors(prev => {
                  const currentError = prev.productMediaFiles;
                  const { productMediaFiles: removedError, ...rest } = prev;

                  // Check if after removal, we are no longer violating the rules (>= 1 or <= 3)
                  if (currentError && updatedDocs.length >= 1 && updatedDocs.length <= 3) {
                      return rest; // Clear the error
                  }
                  // If the error was about minimum (0 files) and we just removed the last one
                  if (currentError && updatedDocs.length === 0) { // Product Media is required
                      return { ...rest, productMediaFiles: "Please upload at least one product video or photo." }; // Add minimum error back
                  }
                  // Otherwise, keep or clear based on initial check
                  return rest; // Keep the error cleared if it's still valid range, or if it was another type of error
              });
              return updatedDocs;
         });
    };
    // End Product Media Handlers


  const validateForm = () => {
    const newErrors = {};

    // Basic required checks for text inputs
    if (!plan.trim()) newErrors.plan = "Please enter your promotional plan.";
    if (!description.trim()) newErrors.description = "Please enter the product description.";
    if (!usp.trim()) newErrors.usp = "Please enter what makes your product unique.";

    // Conditional country validation (checking if the array is empty)
    if (!useEverywhere && selectedCountries.length === 0) { // Check if not 'everywhere' AND no countries selected
        newErrors.selectedCountries = "Please select at least one country."; // Changed error message slightly
    }

    // Product Media validation (Required, max 3)
      if (productMediaFiles.length === 0) {
          newErrors.productMediaFiles = "Please upload at least one product video or photo.";
      } else if (productMediaFiles.length > 3) {
          newErrors.productMediaFiles = `You can upload a maximum of 3 files. You have uploaded ${productMediaFiles.length}.`;
      }

    // Optional file uploads (no validation needed)
    // ingredientTransparencyFile
    // packagingSustainabilityFile
    // complianceQAFile

    return newErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    // We are no longer blocking submission if sessionId is missing based on simplified flow.
    // The sessionId will just be passed as potentially null or undefined if the check failed or wasn't done.

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true); // Start loading state

      // --- Retrieve Auth Token ---
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
          console.error("Authentication token not found in local storage.");
          alert("Authentication required. Please log in again."); // Inform user
          setIsSubmitting(false); // End loading state
          // Optionally redirect to login page
          // navigate('/login'); // Uncomment and use navigate if needed
          return; // Stop the submission process
      }
      // --- End Retrieve Auth Token ---


      // --- Structure ALL data for the API call ---

      // 1. Get ALL relevant data received from the previous page (BusinessInfoDetails.jsx)
      // This object should contain profile (with residential address & ID documents), businessDetails, businessCategories, socialLinks, dbaDocumentsMeta, and sessionId
      const dataFromPrevPages = location.state || {}; // Use empty object if state is null/undefined

      // 2. Collect data from the current page (BusinessInfoDetails1.jsx)
      const dataFromCurrentPage = {
          isAllowedEveryWhere: useEverywhere,
          // Store selected countries as their labels if not everywhere, empty array otherwise
          productCountries: useEverywhere ? [] : selectedCountries.map(country => country.label),
          brandPromotionalPlan: plan,
          productDescription: description,
          productUSP: usp,
          documentStatus: "Pending", // Hardcoded as per desired output
          createdAt: new Date().toISOString(), // Generate current timestamp
      };

      // 3. Combine data into the final requested structure for the API call (JSON part)
      // This requires pulling data from different nested levels of dataFromPrevPages
      const finalProfileData = {
          // From BusinessInfo.jsx (nested in profile from prev page)
          fullName: dataFromPrevPages.profile?.fullName || "",
          dob: dataFromPrevPages.profile?.dob || "",
          gender: dataFromPrevPages.profile?.gender || "",
          ssn: dataFromPrevPages.profile?.ssn || "",
          address: { // Residential address
              addressLine1: dataFromPrevPages.profile?.address?.addressLine1 || "",
              addressLine2: dataFromPrevPages.profile?.address?.addressLine2 || "",
              city: dataFromPrevPages.profile?.address?.city || "",
              state: dataFromPrevPages.profile?.address?.state || "", // ISO code
              country: dataFromPrevPages.profile?.address?.country || "", // Assuming label was passed from BusinessInfo
              zipCode: dataFromPrevPages.profile?.address?.zipCode || "",
          },
           identification: {
               // The BusinessInfo.jsx doesn't explicitly set identification status or sessionId in the combined data anymore
               // We will pull sessionId and assume status is "Pending" as per desired output structure
               status: dataFromPrevPages.profile?.identification?.status || "Pending", // Get status from prev page if available, else Pending
               stripeSessionId: dataFromPrevPages.profile?.identification?.stripeSessionId || "", // Get session ID from prev page
           },


          // From BusinessInfoDetails.jsx (nested in profile from prev page)
          // Note: In the last step's BusinessInfoDetails.jsx, I structured these *inside* the profile object.
          // So we access them from dataFromPrevPages.profile
          categories: dataFromPrevPages.profile?.categories || [], // Should already be labels if formatted in prev page
          businessName: dataFromPrevPages.profile?.businessName || "",
          hasDba: dataFromPrevPages.profile?.hasDba || false, // Corrected key name from prev page
          dbaTradeName: dataFromPrevPages.profile?.dbaTradeName || "", // Conditional, corrected key name from prev page
          businessContact: {
              email: dataFromPrevPages.profile?.businessContact?.email || "",
              phone: dataFromPrevPages.profile?.businessContact?.phone || "",
          },
          businessAddress: { // Business address
              sameAsResidential: dataFromPrevPages.profile?.businessAddress?.sameAsResidential || false,
              addressLine1: dataFromPrevPages.profile?.businessAddress?.addressLine1 || "", // Using keys from BusinessInfoDetails formData
              addressLine2: dataFromPrevPages.profile?.businessAddress?.addressLine2 || "", // Using keys from BusinessInfoDetails formData
              city: dataFromPrevPages.profile?.businessAddress?.city || "",
              state: dataFromPrevPages.profile?.businessAddress?.state || "", // ISO code
              country: dataFromPrevPages.profile?.businessAddress?.country || "USA", // Assuming "USA" string from BusinessInfoDetails
              zipCode: dataFromPrevPages.profile?.businessAddress?.zipCode || "", // Using key from BusinessInfoDetails formData
          },
          businessWebsite: dataFromPrevPages.profile?.businessWebsite || "", // Optional
          businessType: dataFromPrevPages.profile?.businessType || "", // Should be label if formatted in prev page
          isRegisteredBusiness: dataFromPrevPages.profile?.isRegisteredBusiness || false, // Corrected key name from prev page
          einNumber: dataFromPrevPages.profile?.einNumber || "", // Conditional, corrected key name from prev page
          isManufacturer: dataFromPrevPages.profile?.isManufacturer || false,
          brandCountry: dataFromPrevPages.profile?.brandCountry || "", // Should be label if formatted in prev page
          brandLaunchYear: dataFromPrevPages.profile?.brandLaunchYear || "",
          socialLinks: dataFromPrevPages.profile?.socialLinks || {}, // Object of social links

          // From current page (BusinessInfoDetails1.jsx)
          ...dataFromCurrentPage, // includes isAllowedEveryWhere, productCountries (labels), brandPromotionalPlan, productDescription, productUSP, documentStatus, createdAt
      };

      // 4. Consolidate ALL document metadata from all pages into a single fileMeta array
      const allFileMeta = [
          // Documents from BusinessInfo.jsx (ID documents) - passed as fileMeta in prev page state
          ...(dataFromPrevPages.fileMeta || []),
          // Documents from BusinessInfoDetails.jsx (DBA documents) - passed as dbaDocumentsMeta in prev page state
          // Note: In the last step's BusinessInfoDetails.jsx, I *did* include dbaDocumentsMeta in the combined state,
          // so we can use that. Ensure dbaDocumentsMeta also contains category and fileType.
          ...(dataFromPrevPages.dbaDocumentsMeta || []),
          // Documents from current page (BusinessInfoDetails1.jsx)
          // Ingredient Transparency (Optional)
          ...(ingredientTransparencyFile ? [{
              fileName: ingredientTransparencyFile.name,
              category: "Ingredient Transparency", // Define category
              fileType: getFileExtension(ingredientTransparencyFile.name),
          }] : []),
          // Packaging Sustainability (Optional)
          ...(packagingSustainabilityFile ? [{
              fileName: packagingSustainabilityFile.name,
              category: "Packaging Sustainability", // Define category
              fileType: getFileExtension(packagingSustainabilityFile.name),
          }] : []),
          // Product Media (Required, Max 3)
          // Map each file in the productMediaFiles array
          ...(productMediaFiles.map(file => ({
              fileName: file.name,
              category: "Product Media", // Define category
              fileType: getFileExtension(file.name),
          }))),
          // Compliance and QA (Optional)
          ...(complianceQAFile ? [{
              fileName: complianceQAFile.name,
              category: "Compliance and QA", // Define category
              fileType: getFileExtension(complianceQAFile.name),
          }] : []),
      ];

      // 5. Create FormData object and append data
      const formData = new FormData();

      // Append the JSON part (profile and fileMeta) as a string
      formData.append('data', JSON.stringify({
          profile: finalProfileData,
          fileMeta: allFileMeta,
      }));

      // Append all actual File objects under the key 'files'
      // Files from BusinessInfo.jsx (ID documents) - passed as files in prev page state
      (dataFromPrevPages.files || []).forEach(file => {
          formData.append('files', file);
      });
      // Files from BusinessInfoDetails.jsx (DBA documents) - passed as dbaFiles in prev page state
       (dataFromPrevPages.dbaFiles || []).forEach(file => {
           formData.append('files', file);
       });
      // Files from current page (BusinessInfoDetails1.jsx)
      if (ingredientTransparencyFile) formData.append('files', ingredientTransparencyFile);
      if (packagingSustainabilityFile) formData.append('files', packagingSustainabilityFile);
      productMediaFiles.forEach(file => { // Append each file in the array
          formData.append('files', file);
      });
      if (complianceQAFile) formData.append('files', complianceQAFile);


      console.log("API Request Body (FormData - JSON part):", { profile: finalProfileData, fileMeta: allFileMeta });
      console.log("API Request Body (FormData - Files):", formData.getAll('files').map(file => file.name)); // Log file names


      // 6. Make the API call
      try {
          const response = await fetch(api_url, {
              method: 'POST',
              // When using FormData, the 'Content-Type' header is automatically set to 'multipart/form-data'
              // and includes the correct boundary. Do NOT set it manually here.
              headers: {
                  // 'Content-Type': 'multipart/form-data', // <-- DO NOT SET MANUALLY
                  'Authorization': `Bearer ${authToken}`, // Add this line to include the token
              },
              body: formData, // Pass the FormData object directly
          });

          if (response.ok) {
              const result = await response.json();
              console.log('API call successful:', result);
              // Handle success, navigate to the next page
              navigate('/signup/business/info-details-2'); // Navigate to the specified next page
          } else {
              const errorResult = await response.json(); // Attempt to parse error response
              console.error('API call failed:', response.status, errorResult);
              // Handle API errors, e.g., display an error message to the user
              alert(`Failed to submit profile data: ${errorResult.message || response.statusText}`); // Display user-friendly error
          }
      } catch (error) {
          console.error('Error making API call:', error);
          // Handle network or other fetch errors
          alert(`An error occurred while submitting data: ${error.message}`); // Display user-friendly error
      } finally {
          setIsSubmitting(false); // End loading state
      }
    } else {
      console.log("Validation errors:", validationErrors);
       // Scroll to the first error (simplified targeting)
       const firstErrorFieldName = Object.keys(validationErrors)[0];
         const element = document.getElementById(firstErrorFieldName) ||
                         document.querySelector(`[name="${firstErrorFieldName}"]`) || // Inputs
                         document.querySelector(`.signup-form label[htmlFor="${firstErrorFieldName}"]`) || // Labels linked by htmlFor
                         document.querySelector(`.signup-form .select-input[name="${firstErrorFieldName}"] .react-select__control`) || // Selects
                         document.getElementById('productMediaFilesInputArea'); // Product Media upload area (if that's the first error)

         // Fallback to label if direct input not found (can be useful for checkbox errors if you add them)
         const labelElement = document.querySelector(`.signup-form label[htmlFor="${firstErrorFieldName}"]`);


       if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
       } else if (labelElement) {
            labelElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
       } else {
            document.querySelector('.signup-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
       }
    }
  };


  return (
    <div
      className="app-wrapper"
      style={{ backgroundColor: "#000000", minHeight: "100vh", color: "white" }}
    >
      <Header />
      <main className="main-content" style={{flex: 1}}>
        <form
          onSubmit={handleSubmit}
          className="signup-form" // Reusing class for general form styling if needed
          style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "500px", margin: "2rem auto", textAlign: "left", padding: "0 20px" }} // Added padding for small screens
          noValidate // Disable default browser validation
        >
          <h2 style={{ textAlign: "center", fontSize: "1.8rem", fontWeight: 700, marginBottom: "1.5rem" }}>Business Information</h2> {/* Adjusted margin */}

          {/* Ingredient transparency document (optional) */}
            <label style={labelStyle}>
              Ingredient transparency document (optional)
              <div
                  style={fileUploadBoxStyle(errors.ingredientTransparencyFile)} // Use style function
                  onClick={() => document.getElementById('ingredientTransparencyInput').click()} // Trigger hidden input
              >
                 {/* SVG icon */}
                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 16l-4-4-4 4" /> <path d="M12 12v9" /> <path d="M20.39 18.39A5.5 5.5 0 0018 9h-1.26A8 8 0 104 16.3" />
                 </svg>
                 {/* Drag & drop text */}
                <p style={{ margin: "1rem 0 0.5rem" }}>
                  Drag & drop files or <span style={browseLinkStyle}>Browse</span> {/* Use styled span */}
                </p>
                 {/* Accepted file types (customize as needed) */}
                <p style={{ fontSize: "0.85rem", color: "#ccc" }}>png, pdf, jpg, docx accepted</p>
                 {/* Hidden file input */}
                 <input
                    type="file"
                    id="ingredientTransparencyInput"
                    name="ingredientTransparencyFile"
                    accept=".pdf,.jpg,.jpeg,.png,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(e) => handleSingleFileChange(setIngredientTransparencyFile, 'ingredientTransparencyFile', e)} // Use generic handler
                    style={{ display: "none" }}
                 />
              </div>
               {/* Display selected file name if any */}
               {ingredientTransparencyFile && (
                    <div style={uploadedFileItemStyle}>
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', flexShrink: 0 }}><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>
                       <span style={{ flex: 1, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ingredientTransparencyFile.name}</span>
                        <button type="button" onClick={() => setIngredientTransparencyFile(null)} style={removeFileButtonStyle}>&times;</button>
                    </div>
                 )}
               {/* No error span for optional field */}
            </label>

            {/* Packaging sustainability document (optional) */}
            <label style={labelStyle}>
              Packaging sustainability document (optional)
              <div
                  style={fileUploadBoxStyle(errors.packagingSustainabilityFile)} // Use style function
                  onClick={() => document.getElementById('packagingSustainabilityInput').click()} // Trigger hidden input
              >
                 {/* SVG icon */}
                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 16l-4-4-4 4" /> <path d="M12 12v9" /> <path d="M20.39 18.39A5.5 5.5 0 0018 9h-1.26A8 8 0 104 16.3" />
                 </svg>
                 {/* Drag & drop text */}
                <p style={{ margin: "1rem 0 0.5rem" }}>
                  Drag & drop files or <span style={browseLinkStyle}>Browse</span> {/* Use styled span */}
                </p>
                 {/* Accepted file types (customize as needed) */}
                <p style={{ fontSize: "0.85rem", color: "#ccc" }}>png, pdf, jpg, docx accepted</p>
                 {/* Hidden file input */}
                 <input
                    type="file"
                    id="packagingSustainabilityInput"
                    name="packagingSustainabilityFile"
                    accept=".pdf,.jpg,.jpeg,.png,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(e) => handleSingleFileChange(setPackagingSustainabilityFile, 'packagingSustainabilityFile', e)} // Use generic handler
                    style={{ display: "none" }}
                 />
              </div>
                {/* Display selected file name if any */}
                {packagingSustainabilityFile && (
                    <div style={uploadedFileItemStyle}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', flexShrink: 0 }}><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>
                        <span style={{ flex: 1, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{packagingSustainabilityFile.name}</span>
                         <button type="button" onClick={() => setPackagingSustainabilityFile(null)} style={removeFileButtonStyle}>&times;</button>
                    </div>
                 )}
               {/* No error span for optional field */}
            </label>


          {/* Custom Checkbox for useEverywhere */}
            <div style={{ display: "flex", alignItems: "center", marginTop: "0.5rem", marginBottom: errors.selectedCountries ? "5px" : "15px", cursor: 'pointer' }}> {/* Adjusted margin */}
              <input
                type="checkbox"
                id="useEverywhere"
                name="useEverywhere"
                checked={useEverywhere}
                onChange={(e) => setUseEverywhere(e.target.checked)}
                style={{ display: 'none' }}
              />
              <div style={customCheckboxStyle(useEverywhere)} onClick={() => setUseEverywhere(!useEverywhere)}>
                 {useEverywhere && (<span style={tickMarkStyle}>✓</span>)}
              </div>
              <label htmlFor="useEverywhere" style={{ color: "white", margin: 0, cursor: 'pointer' }} onClick={() => setUseEverywhere(!useEverywhere)}>
                Is this product allowed to use everywhere?
              </label>
            </div>

          {!useEverywhere && (
             <label style={labelStyle}>
               Which country should it be used in?
                {/* Using react-select for country - NOW MULTI-SELECT */}
                <Select
                   className="select-input"
                   name="selectedCountries" // Name for validation/scrolling
                   options={allCountries}
                   value={selectedCountries} // Use the array of selectedCountry objects
                   onChange={handleCountryChange} // Use the handler that handles arrays
                   styles={customSelectStyles}
                   placeholder="Select country(ies)" // Updated placeholder
                   isMulti // Add this prop for multiple selection
                 />
                {errors.selectedCountries && <span style={errorStyle}>{errors.selectedCountries}</span>}
             </label>
          )}

          <label style={labelStyle}>
              What is your brand promotional plan in InforReel?
              <input
                type="text"
                name="plan" // Name for validation/scrolling
                placeholder="Type here"
                value={plan}
                onChange={handleInputChange} // Use generic handler
                style={inputStyle}
              />
              {errors.plan && <span style={errorStyle}>{errors.plan}</span>}
            </label>

          <label style={labelStyle}>
              Product description
              <input
                type="text"
                name="description" // Name for validation/scrolling
                placeholder="Product description"
                value={description}
                onChange={handleInputChange} // Use generic handler
                style={inputStyle}
              />
              {errors.description && <span style={errorStyle}>{errors.description}</span>}
            </label>

          <label style={labelStyle}>
              What makes your product unique (USP)?
              <input
                type="text"
                name="usp" // Name for validation/scrolling
                placeholder="Type here"
                value={usp}
                onChange={handleInputChange} // Use generic handler
                style={inputStyle}
              />
              {errors.usp && <span style={errorStyle}>{errors.usp}</span>}
            </label>

            {/* Product video and photos (max 3 uploads) - Multi-upload logic */}
            <label style={{ ...labelStyle, marginBottom: productMediaFiles.length > 0 || errors.productMediaFiles ? '0' : '1rem' }}> {/* Adjust margin */}
              Product video and photos (max 3 uploads)
              {/* File Upload/Drop Area */}
              {(productMediaFiles.length < 3) ? (
                  <div
                       id="productMediaFilesInputArea" // ID for scrolling
                       style={productMediaFileUploadBoxStyle(errors.productMediaFiles)} // Use the NEW style function without error border
                       onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                       onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); }}
                       onDrop={handleProductMediaDrop} // Multi-file drop handler
                       onClick={() => document.getElementById('productMediaFilesInput').click()} // Trigger hidden input
                  >
                      {/* SVG icon */}
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="M16 16l-4-4-4 4" /> <path d="M12 12v9" /> <path d="M20.39 18.39A5.5 5.5 0 0018 9h-1.26A8 8 0 104 16.3" />
                      </svg>
                      {/* Drag & drop text */}
                     <p style={{ margin: "1rem 0 0.5rem" }}>
                          Drag & drop files or <span style={browseLinkStyle}>Browse</span>
                     </p>
                      {/* Accepted file types (customize as needed) */}
                     <p style={{ fontSize: "0.85rem", color: "#ccc" }}>mp4, mov, jpg, jpeg, png accepted</p> {/* Updated accepted types */}
                      {/* Hidden file input */}
                      <input
                          type="file"
                          key={productMediaFiles.length} // Key for smoother reset
                          id="productMediaFilesInput"
                          name="productMediaFiles" // Name for validation/scrolling
                          multiple // Allow multiple file selection
                          accept="video/*,image/*" // Accept video and image files
                          onChange={handleProductMediaFileChange} // Multi-file change handler
                          style={{ display: "none" }}
                      />
                  </div>
                ) : (
                    // This div will also use the NEW style without error border
                    <div style={{...productMediaFileUploadBoxStyle(errors.productMediaFiles), cursor: 'not-allowed', opacity: 0.7, marginBottom: errors.productMediaFiles ? '10px' : '20px'}}>
                        <p style={{ color: "white", margin: 0 }}>Maximum 3 files uploaded.</p>
                    </div>
                )}

              {/* Display uploaded files */}
              {productMediaFiles.length > 0 && (
                  <div style={{ marginTop: '1rem' }}>
                      {productMediaFiles.map((file, index) => (
                           <div key={`product-media-${index}`} className="uploaded-file-item" style={uploadedFileItemStyle}>
                                {/* File Icon (example) */}
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', flexShrink: 0 }}><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>
                              <span style={{ flex: 1, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                              </span>
                              <button
                                   key={`remove-product-media-${index}`}
                                   type="button"
                                   onClick={() => handleRemoveProductMediaFile(index)} // Multi-file remove handler
                                   style={removeFileButtonStyle}
                              >
                                   &times;
                              </button>
                           </div>
                      ))}
                  </div>
              )}

              {/* Display error message for Product Media */}
             {errors.productMediaFiles && <span style={errorStyle}>{errors.productMediaFiles}</span>}
            </label>


            {/* Compliance and QA upload (optional) */}
            <label style={labelStyle}>
              Compliance and QA upload (optional)
              <div
                  style={fileUploadBoxStyle(errors.complianceQAFile)} // Use style function
                  onClick={() => document.getElementById('complianceQAInput').click()} // Trigger hidden input
              >
                 {/* SVG icon */}
                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 16l-4-4-4 4" /> <path d="M12 12v9" /> <path d="M20.39 18.39A5.5 5.5 0 0018 9h-1.26A8 8 0 104 16.3" />
                 </svg>
                 {/* Drag & drop text */}
                <p style={{ margin: "1rem 0 0.5rem" }}>
                  Drag & drop files or <span style={browseLinkStyle}>Browse</span> {/* Use styled span */}
                </p>
                 {/* Accepted file types (customize as needed) */}
                <p style={{ fontSize: "0.85rem", color: "#ccc" }}>png, pdf, jpg, docx accepted</p>
                 {/* Hidden file input */}
                 <input
                    type="file"
                    id="complianceQAInput"
                    name="complianceQAFile"
                    accept=".pdf,.jpg,.jpeg,.png,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(e) => handleSingleFileChange(setComplianceQAFile, 'complianceQAFile', e)} // Use generic handler
                    style={{ display: "none" }}
                 />
              </div>
                {/* Display selected file name if any */}
                {complianceQAFile && (
                    <div style={uploadedFileItemStyle}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', flexShrink: 0 }}><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>
                        <span style={{ flex: 1, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{complianceQAFile.name}</span>
                         <button type="button" onClick={() => setComplianceQAFile(null)} style={removeFileButtonStyle}>&times;</button>
                    </div>
                 )}
               {/* No error span for optional field */}
            </label>


          {/* Buttons */}
          <div className="row" style={{ marginTop: "0.5rem", display: "flex", gap: "20px" }}> {/* Added gap */}
              <button type="button" className="black-btn" onClick={() => navigate(-1)}
                     style={{ ...buttonStyle, backgroundColor: "#7B7B7B" }}> {/* Grey color */}
                Previous
              </button>
              <button
                  type="submit"
                  className="black-btn"
                  style={{ ...buttonStyle, backgroundColor: "#96105E" }}
                  disabled={isSubmitting} // Disable button while submitting
              >
                {isSubmitting ? 'Submitting...' : 'Next'} {/* Change button text while submitting */}
              </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}


export default BusinessInfoDetails1;