// BusinessInfoDetails1.jsx - Final Page for API Submission

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
  boxSizing: 'border-box', // Ensure padding doesn't add to width
};

// Adjusted labelStyle for the dark theme
const labelStyle = {
  display: "flex",
  flexDirection: "column",
  fontSize: "0.95rem",
  color: "#FFFFFF", // White text for dark theme
};

// Modified fileUploadBox for dashed border and dark theme - for OPTIONAL single files
const fileUploadBoxStyle = (hasError, isDisabled) => ({
  border: `1px dashed ${hasError ? '#ff4d4f' : '#888'}`, // Dashed border, red on error for single optional fields
  backgroundColor: isDisabled ? '#2d2d2d' : "#1d1d1d", // Dark background, slightly different when disabled
  padding: "2rem",
  textAlign: "center",
  borderRadius: "10px", // Rounded corners matching other elements
  color: "#ccc", // Greyish text
  marginTop: "0.5rem",
  marginBottom: hasError ? '10px' : '20px', // Adjust spacing based on error presence below
  cursor: isDisabled ? 'not-allowed' : "pointer",
  opacity: isDisabled ? 0.7 : 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

// New style specifically for the Product Media upload box (REQUIRED multi-file)
const productMediaFileUploadBoxStyle = (hasError, isDisabled) => ({
     border: `1px dashed ${hasError ? '#ff4d4f' : '#888'}`, // Dashed border, red on error for this REQUIRED multi-file field
     backgroundColor: isDisabled ? '#2d2d2d' : "#1d1d1d", // Dark background, slightly different when disabled
     padding: "2rem",
     textAlign: "center",
     borderRadius: "10px", // Rounded corners matching other elements
     color: "#ccc", // Greyish text
     marginTop: "0.5rem",
     marginBottom: hasError ? '10px' : '20px', // Adjust spacing based on error presence below
     cursor: isDisabled ? 'not-allowed' : "pointer",
     opacity: isDisabled ? 0.7 : 1,
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

   // Add state to hold consolidated file data and metadata from previous pages
   const [allPreviousFiles, setAllPreviousFiles] = useState([]);
   const [allPreviousFileMeta, setAllPreviousFileMeta] = useState([]);


  // Load country data on mount
  useEffect(() => {
    const countries = Country.getAllCountries().map(country => ({ value: country.isoCode, label: country.name }));
    setAllCountries(countries);
  }, []);

  // Effect to process data received from the previous page on mount
  useEffect(() => {
      const dataFromPrevPages = location.state || {};
      console.log("Data received from BusinessInfoDetails.jsx:", dataFromPrevPages);

      // Extract and store consolidated files and fileMeta from previous pages
      // BusinessInfoDetails.jsx should have combined ID file and DBA files/meta
      setAllPreviousFiles(dataFromPrevPages.files || []); // This should contain ID file + DBA files
      setAllPreviousFileMeta(dataFromPrevPages.fileMeta || []); // This should contain ID file meta + DBA file meta

      // Optional: Check for critical data received from previous pages
      // Although validation on submit is the primary gate, checking here can provide early feedback.
      if (!dataFromPrevPages.profile || !dataFromPrevPages.profile.identification || !dataFromPrevPages.profile.identification.stripeSessionId || dataFromPrevPages.profile.identification.status !== 'success') {
           console.error("Critical data (profile, identification, session ID, or successful status) missing or invalid from previous steps.");
           // You might set an error state here to disable submission or show a message
           setErrors(prev => ({...prev, flowError: "Critical data missing from previous steps. Please go back."}));
       }


  }, [location.state]); // Dependency on location.state


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
        // Clear error on change for single optional file fields
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
                  productMediaFiles: `You can upload a maximum of 3 files. You tried to add ${productMediaFiles.length + newFiles.length} files.`, // More accurate count
              }));
        }
    };

    const handleProductMediaFileChange = (e) => {
         const files = Array.from(e.target.files); // Convert FileList to Array
         addProductMediaFiles(files);
         // Clear the input's value
         e.target.value = null;
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

    // Prevent submission if there are client-side validation errors OR critical data from previous pages is missing
    if (Object.keys(validationErrors).length > 0 || errors.flowError) {
        console.log("Validation errors or flow error:", { ...validationErrors, flowError: errors.flowError });
         // Scroll to the first error (simplified targeting)
         const firstErrorFieldName = errors.flowError ? 'flowError' : Object.keys(validationErrors)[0]; // Prioritize flow error scroll
           const element = document.getElementById(firstErrorFieldName) ||
                           document.querySelector(`[name="${firstErrorFieldName}"]`) || // Inputs
                           document.querySelector(`label[htmlFor="${firstErrorFieldName}"]`) || // Labels linked by htmlFor
                           document.querySelector(`.select-input[name="${firstErrorFieldName}"] .react-select__control`) || // Selects (using a class helper)
                           document.getElementById('productMediaFilesInputArea'); // Product Media upload area (if that's the first error)

         // Fallback to label if direct input not found (can be useful for checkbox errors if you add them)
         const labelElement = document.querySelector(`label[htmlFor="${firstErrorFieldName}"]`); // Also check label for scrolling

         if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
         } else if (labelElement) { // Fallback to label
              labelElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
         }
         else {
              // Fallback to the top of the form if the element wasn't found
              document.querySelector('.signup-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
         }
        return; // Stop submission
    }

    // --- Proceed if no validation errors AND no flow errors ---
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
    // This object should contain profile (with personal info, residential address, identification, business details, business address, social links, etc.),
    // fileMeta (ID documents metadata), files (ID documents File objects), dbaDocumentsMeta (DBA documents metadata), and dbaFiles (DBA documents File objects).
    const dataFromPrevPages = location.state || {}; // Use empty object if state is null/undefined

    // Check again for critical data received from previous pages before constructing API payload
     if (!dataFromPrevPages.profile || !dataFromPrevPages.profile.identification || !dataFromPrevPages.profile.identification.stripeSessionId || dataFromPrevPages.profile.identification.status !== 'success' ||
         !Array.isArray(allPreviousFileMeta) || !Array.isArray(allPreviousFiles)) {
          console.error("Critical data (profile, identification, session ID, status, or previous files/metadata arrays) missing or invalid from previous steps right before API call.");
          alert("An internal error occurred. Critical data from previous steps is missing. Please restart the process.");
          setIsSubmitting(false);
          // navigate('/signup/identity-intro'); // Redirect to a known safe start point
          return; // Stop submission
      }


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

    // 3. Combine data into the final requested STRUCTURE for the API call (JSON part)
    // This structure should EXACTLY match the 'profile' JSON expected by the backend.
    const finalProfileData = {
        // From BusinessInfo.jsx and BusinessInfoDetails.jsx (already merged into dataFromPrevPages.profile)
        // Access nested properties directly from dataFromPrevPages.profile
        fullName: dataFromPrevPages.profile.fullName || "",
        dob: dataFromPrevPages.profile.dob || "",
        gender: dataFromPrevPages.profile.gender || "",
        ssn: dataFromPrevPages.profile.ssn || "",
        address: { // Residential address
            addressLine1: dataFromPrevPages.profile.address?.addressLine1 || "",
            addressLine2: dataFromPrevPages.profile.address?.addressLine2 || "",
            city: dataFromPrevPages.profile.address?.city || "",
            state: dataFromPrevPages.profile.address?.state || "", // ISO code
            country: dataFromPrevPages.profile.address?.country || "", // Assuming label was passed from BusinessInfo/Details
            zipCode: dataFromPrevPages.profile.address?.zipCode || "",
        },
         identification: { // Identification data
             status: dataFromPrevPages.profile.identification?.status || "Pending", // Get status from prev page if available, else Pending
             stripeSessionId: dataFromPrevPages.profile.identification?.stripeSessionId || "", // Get session ID from prev page
         },
         categories: dataFromPrevPages.profile.categories || [], // Should already be labels if formatted in prev page
         businessName: dataFromPrevPages.profile.businessName || "",
         hasDba: dataFromPrevPages.profile.hasDba || false, // Corrected key name
         dbaTradeName: dataFromPrevPages.profile.dbaTradeName || "", // Conditional, corrected key name
         businessContact: {
             email: dataFromPrevPages.profile.businessContact?.email || "",
             phone: dataFromPrevPages.profile.businessContact?.phone || "",
         },
         businessAddress: { // Business address
             sameAsResidential: dataFromPrevPages.profile.businessAddress?.sameAsResidential || false,
             addressLine1: dataFromPrevPages.profile.businessAddress?.addressLine1 || "",
             addressLine2: dataFromPrevPages.profile.businessAddress?.addressLine2 || "",
             city: dataFromPrevPages.profile.businessAddress?.city || "",
             state: dataFromPrevPages.profile.businessAddress?.state || "", // ISO code
             country: dataFromPrevPages.profile.businessAddress?.country || "USA", // Assuming "USA" string from BusinessInfoDetails
             zipCode: dataFromPrevPages.profile.businessAddress?.zipCode || "",
         },
         businessWebsite: dataFromPrevPages.profile.businessWebsite || "", // Optional
         businessType: dataFromPrevPages.profile.businessType || "", // Should be label
         isRegisteredBusiness: dataFromPrevPages.profile.isRegisteredBusiness || false, // Corrected key name
         einNumber: dataFromPrevPages.profile.einNumber || "", // Conditional, corrected key name
         isManufacturer: dataFromPrevPages.profile.isManufacturer || false,
         brandCountry: dataFromPrevPages.profile.brandCountry || "", // Should be label
         brandLaunchYear: dataFromPrevPages.profile.brandLaunchYear || "",
         socialLinks: dataFromPrevPages.profile.socialLinks || {}, // Object of social links

        // Add/Overwrite with data from current page (P3) - Ensure consistency in keys
        ...dataFromCurrentPage, // includes isAllowedEveryWhere, productCountries (labels), brandPromotionalPlan, productDescription, productUSP, documentStatus, createdAt
    };

    // 4. Consolidate ALL document metadata from all pages into a single fileMeta array
    // This structure should EXACTLY match the 'fileMeta' JSON array expected by the backend.
    const allFileMeta = [
        // Metadata from previous pages (ID documents + DBA documents) - already consolidated in state
        ...allPreviousFileMeta,
        // Metadata from current page (P3) optional files + required product media
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

    // 5. Create FormData object and append data - MATCHING POSTMAN STRUCTURE
    const formData = new FormData();

    // Append the 'profile' JSON string under the key 'profile'
    formData.append('profile', JSON.stringify(finalProfileData));

    // Append the 'fileMeta' JSON string under the key 'fileMeta'
    formData.append('fileMeta', JSON.stringify(allFileMeta));

    // Append ALL actual File objects under the key 'files'
    // Files from previous pages (ID documents + DBA documents) - already consolidated in state
    allPreviousFiles.forEach(file => {
        // Ensure it's actually a File/Blob before appending
        if (file instanceof File || file instanceof Blob) {
             formData.append('files', file);
        } else {
             console.warn("Skipping non-File/Blob object found in previous pages' files array:", file);
        }
    });

    // Files from current page (P3)
    if (ingredientTransparencyFile) {
        if (ingredientTransparencyFile instanceof File || ingredientTransparencyFile instanceof Blob) {
            formData.append('files', ingredientTransparencyFile);
        } else { console.warn("Ingredient Transparency File is not a File/Blob:", ingredientTransparencyFile); }
    }
    if (packagingSustainabilityFile) {
         if (packagingSustainabilityFile instanceof File || packagingSustainabilityFile instanceof Blob) {
            formData.append('files', packagingSustainabilityFile);
        } else { console.warn("Packaging Sustainability File is not a File/Blob:", packagingSustainabilityFile); }
    }

    productMediaFiles.forEach(file => { // Append each file in the required array
         if (file instanceof File || file instanceof Blob) {
             formData.append('files', file);
         } else {
              console.warn("Skipping non-File/Blob object found in current page's productMediaFiles array:", file);
         }
    });

    if (complianceQAFile) {
         if (complianceQAFile instanceof File || complianceQAFile instanceof Blob) {
            formData.append('files', complianceQAFile);
        } else { console.warn("Compliance QA File is not a File/Blob:", complianceQAFile); }
    }


    // Optional: Log FormData entries (for debugging, handles text and file names)
    console.log("Constructed FormData entries:");
    for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
            console.log(pair[0] + ': ', pair[1].name, pair[1].size, pair[1].type);
        } else {
            console.log(pair[0] + ': ', pair[1]);
        }
    }


    // --- 6. Make the API call ---
    try {
        const response = await fetch(api_url, {
            method: 'POST',
            // 'Content-Type': 'multipart/form-data' is automatically set by fetch when using FormData,
            // including the necessary boundary. Do NOT set it manually.
            headers: {
                'Authorization': `Bearer ${authToken}`, // Include the authentication token
                // DO NOT set 'Content-Type' manually for FormData
            },
            body: formData, // Pass the FormData object directly
        });

        if (response.ok) {
            const result = await response.json();
            console.log('API call successful:', result);
            // Handle success - navigate to a success page
            navigate('/dashboard'); // Example success page route
        } else {
            // Attempt to parse error response for more details
            const errorResult = await response.json();
            console.error('API call failed:', response.status, errorResult);
            // Display a user-friendly error message
            alert(`Failed to submit profile data: ${errorResult.message || errorResult.error || response.statusText}`);
            // If the error is "Missing profile data", log a specific suggestion
            if (errorResult.error === "Missing profile data") {
                 console.warn("Received 'Missing profile data' error from backend. This suggests the backend's middleware for parsing multipart/form-data might not be correctly configured to parse the 'profile' text field when files are present. The FormData structure sent from the client appears correct based on Postman/backend code.");
            }
        }
    } catch (error) {
        console.error('Error making API call:', error);
        // Handle network or other fetch errors
        alert(`An error occurred while submitting data: ${error.message}`);
    } finally {
        setIsSubmitting(false); // End loading state regardless of success or failure
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
          <h2 style={{ textAlign: "center", fontSize: "1.8rem", fontWeight: 700, marginBottom: "1.5rem" }}>Product Information</h2> {/* Adjusted margin */}

          {/* Display flow error if critical data is missing from previous pages */}
          {errors.flowError && <p style={errorStyle}>{errors.flowError}</p>}

          {/* Conditional rendering of form content based on flowError */}
          {!errors.flowError ? (
             <> {/* Use a Fragment to group content */}

              {/* Ingredient transparency document (optional) */}
                <label style={labelStyle}>
                  Ingredient transparency document (optional)
                  <div
                      style={fileUploadBoxStyle(!!errors.ingredientTransparencyFile, !!ingredientTransparencyFile)} // Use style function, pass boolean error and isDisabled if file exists
                      onClick={() => {
                           // Only trigger click if a file isn't already selected
                           if (!ingredientTransparencyFile) document.getElementById('ingredientTransparencyInput').click()
                           else console.log("Remove existing file to upload a new one."); // Optional feedback
                       }}
                  >
                     {/* SVG icon */}
                     <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 16l-4-4-4 4" /> <path d="M12 12v9" /> <path d="M20.39 18.39A5.5 5.5 0 0018 9h-1.26A8 8 0 104 16.3" />
                     </svg>
                     {/* Drag & drop text */}
                    <p style={{ margin: "1rem 0 0.5rem" }}>
                      Drag & drop file or <span style={browseLinkStyle}>Browse</span> {/* Use styled span */}
                    </p>
                     {/* Accepted file types (customize as needed) */}
                    <p style={{ fontSize: "0.85rem", color: "#ccc" }}>png, pdf, jpg, docx accepted</p>
                     {/* Hidden file input */}
                     <input
                        type="file"
                         key={ingredientTransparencyFile?.name || 'no-file'} // Key to force re-render on file change/removal
                        id="ingredientTransparencyInput"
                        name="ingredientTransparencyFile" // Name for validation/scrolling (though not validated)
                        accept=".pdf,.jpg,.jpeg,.png,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={(e) => handleSingleFileChange(setIngredientTransparencyFile, 'ingredientTransparencyFile', e)} // Use generic handler
                        style={{ display: "none" }}
                         disabled={!!ingredientTransparencyFile} // Disable input if a file is already selected
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
                      style={fileUploadBoxStyle(!!errors.packagingSustainabilityFile, !!packagingSustainabilityFile)} // Use style function, pass boolean error and isDisabled if file exists
                      onClick={() => {
                           // Only trigger click if a file isn't already selected
                           if (!packagingSustainabilityFile) document.getElementById('packagingSustainabilityInput').click()
                            else console.log("Remove existing file to upload a new one."); // Optional feedback
                      }}
                  >
                     {/* SVG icon */}
                     <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 16l-4-4-4 4" /> <path d="M12 12v9" /> <path d="M20.39 18.39A5.5 5.5 0 0018 9h-1.26A8 8 0 104 16.3" />
                     </svg>
                     {/* Drag & drop text */}
                    <p style={{ margin: "1rem 0 0.5rem" }}>
                      Drag & drop file or <span style={browseLinkStyle}>Browse</span> {/* Use styled span */}
                    </p>
                     {/* Accepted file types (customize as needed) */}
                    <p style={{ fontSize: "0.85rem", color: "#ccc" }}>png, pdf, jpg, docx accepted</p>
                     {/* Hidden file input */}
                     <input
                        type="file"
                         key={packagingSustainabilityFile?.name || 'no-file'} // Key to force re-render
                        id="packagingSustainabilityInput"
                        name="packagingSustainabilityFile" // Name for validation/scrolling (though not validated)
                        accept=".pdf,.jpg,.jpeg,.png,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={(e) => handleSingleFileChange(setPackagingSustainabilityFile, 'packagingSustainabilityFile', e)} // Use generic handler
                        style={{ display: "none" }}
                         disabled={!!packagingSustainabilityFile} // Disable input if a file is already selected
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
                <label style={{ ...labelStyle, marginBottom: productMediaFiles.length > 0 || errors.productMediaFiles ? '0' : '1rem' }}> {/* Adjust margin based on error/files below */}
                  Product video and photos (max 3 uploads)
                  {/* File Upload/Drop Area */}
                  {(productMediaFiles.length < 3) ? (
                      <div
                           id="productMediaFilesInputArea" // ID for scrolling
                           style={productMediaFileUploadBoxStyle(!!errors.productMediaFiles, false)} // Use the NEW style function and pass isDisabled=false
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
                          {/* Hidden file input - use key to reset input field state */}
                          <input
                              type="file"
                              key={productMediaFiles.length} // Key for smoother reset when adding/removing files
                              id="productMediaFilesInput"
                              name="productMediaFiles" // Name for validation/scrolling
                              multiple // Allow multiple file selection
                              accept="video/*,image/*" // Accept video and image files
                              onChange={handleProductMediaFileChange} // Multi-file change handler
                              style={{ display: "none" }}
                               disabled={productMediaFiles.length >= 3} // Disable input if max files reached
                          />
                      </div>
                    ) : (
                        // This div will also use the NEW style without error border when disabled
                        <div
                           id="productMediaFilesInputArea" // Keep ID even when disabled for scrolling
                           style={productMediaFileUploadBoxStyle(!!errors.productMediaFiles, true)} // Use the NEW style function and pass isDisabled=true
                        >
                            {/* SVG icon (can make it slightly less prominent) */}
                           <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M16 16l-4-4-4 4" /> <path d="M12 12v9" /> <path d="M20.39 18.39A5.5 5.5 0 0018 9h-1.26A8 8 0 104 16.3" />
                           </svg>
                           <p style={{ margin: "1rem 0 0.5rem", color: '#ccc' }}>Maximum 3 files allowed.</p>
                           <p style={{ fontSize: "0.85rem", color: "#888" }}>Remove a file to upload another.</p>
                        </div>
                    )}

                  {/* Display uploaded files */}
                  {productMediaFiles.length > 0 && (
                      <div style={{ marginTop: productMediaFiles.length > 0 ? '0' : '1rem' }}> {/* Adjusted margin */}
                          {productMediaFiles.map((file, index) => (
                               <div key={`product-media-${index}`} className="uploaded-file-item" style={uploadedFileItemStyle}>
                                    {/* File Icon (example) */}
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', flexShrink: 0 }}><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>
                                  <span style={{ flex: 1, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                      {file.name} ({(file.size / 1024).toFixed(2)} KB)
                                  </span>
                                  <button
                                       key={`remove-product-media-${index}`} // Added key
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
                      style={fileUploadBoxStyle(!!errors.complianceQAFile, !!complianceQAFile)} // Use style function, pass boolean error and isDisabled if file exists
                      onClick={() => {
                          // Only trigger click if a file isn't already selected
                          if (!complianceQAFile) document.getElementById('complianceQAInput').click()
                           else console.log("Remove existing file to upload a new one."); // Optional feedback
                      }}
                  >
                     {/* SVG icon */}
                     <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 16l-4-4-4 4" /> <path d="M12 12v9" /> <path d="M20.39 18.39A5.5 5.5 0 0018 9h-1.26A8 8 0 104 16.3" />
                     </svg>
                     {/* Drag & drop text */}
                    <p style={{ margin: "1rem 0 0.5rem" }}>
                      Drag & drop file or <span style={browseLinkStyle}>Browse</span> {/* Use styled span */}
                    </p>
                     {/* Accepted file types (customize as needed) */}
                    <p style={{ fontSize: "0.85rem", color: "#ccc" }}>png, pdf, jpg, docx accepted</p>
                     {/* Hidden file input - use key to reset input field state */}
                     <input
                        type="file"
                         key={complianceQAFile?.name || 'no-file'} // Key to force re-render
                        id="complianceQAInput"
                        name="complianceQAFile" // Name for validation/scrolling (though not validated)
                        accept=".pdf,.jpg,.jpeg,.png,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={(e) => handleSingleFileChange(setComplianceQAFile, 'complianceQAFile', e)} // Use generic handler
                        style={{ display: "none" }}
                         disabled={!!complianceQAFile} // Disable input if a file is already selected
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
                      disabled={isSubmitting || !!errors.flowError} // Disable button while submitting OR if flow error exists
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Profile'} {/* Change button text while submitting */}
                  </button>
              </div>

             </> // Close Fragment
         ) : null /* Render nothing or a loading/error message if flowError exists */ }


        </form>
      </main>
      <Footer />
    </div>
  );
}


export default BusinessInfoDetails1;