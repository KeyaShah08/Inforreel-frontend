// BusinessInfoDetails.jsx - Second Page

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import Footer from "../components/Footer";
import Header from "../components/Header";

// Import modules from the installed library
import { Country, State } from 'country-state-city';

const categories = [
  { label: "Fashion", value: "fashion" },
  { label: "Health & Wellness", value: "health" },
  { label: "Beauty", value: "beauty" },
  { label: "Athletics / Fitness", value: "fitness" },
  { label: "Other", value: "other" },
];

const businessTypes = [
  { label: "Privately owned business", value: "private" },
  { label: "Publicly listed business", value: "public" },
  { label: "State-owned business", value: "state" },
  { label: "Individual", value: "individual" },
];

const socialPlatforms = [
  { label: "Instagram", value: "Instagram" },
  { label: "Facebook", value: "Facebook" },
  { label: "TikTok", value: "TikTok" },
  { label: "YouTube", value: "YouTube" },
  { label: "Other", value: "Other" },
];

// Helper function to extract file extension safely
const getFileExtension = (fileName) => {
   if (!fileName) return "";
   const lastDotIndex = fileName.lastIndexOf('.');
   return lastDotIndex !== -1 && lastDotIndex < fileName.length - 1
       ? fileName.substring(lastDotIndex + 1) // Get substring AFTER the dot
       : "";
};


function BusinessInfoDetails() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object to access state

  // Retrieve ALL data passed from the previous page (BusinessInfo.jsx) via state
  // This object contains the structure { profile: { ..., address: {...}, identification: {...} }, fileMeta: [...], files: [...] }
  const dataFromPrevPage = location.state;

  // Log the received data to confirm
  useEffect(() => {
        console.log("Received data from BusinessInfo.jsx:", dataFromPrevPage);

        // Check for critical data existence on mount
        // Ensure profile and identification are present and valid
        if (!dataFromPrevPage?.profile || !dataFromPrevPage.profile.identification || !dataFromPrevPage.profile.identification.stripeSessionId || dataFromPrevPage.profile.identification.status !== 'success') {
          console.error("Critical: Identification data missing or not successful in data received from previous step.");
          // Handle this critical error - maybe redirect to an error page or the verification start
          // navigate('/signup/identity-intro', { state: { message: 'Verification data missing in flow.' } });
           // You might want to set a state variable here to disable the form or show a message
        }

    }, [dataFromPrevPage]); // Depend on dataFromPrevPage to run once when state is received


  // State to hold the loaded country and state data from the library
  const [allCountries, setAllCountries] = useState([]);
  const [usStates, setUsStates] = useState([]);
  // State for DBA documents - storing File objects temporarily
  const [dbaDocuments, setDbaDocuments] = useState([]); // Stores File objects


  // Load country and state data when the component mounts
  useEffect(() => {
    const countries = Country.getAllCountries().map(country => ({
      value: country.isoCode, // Use ISO code as value
      label: country.name,    // Use country name as label
    }));
    setAllCountries(countries);

    const states = State.getStatesOfCountry('US').map(state => ({
        value: state.isoCode, // Use ISO code as value
        label: state.name,    // Use state name as label
    }));
    setUsStates(states);

  }, []); // Empty dependency array means this effect runs only once on mount


  // Style objects (Assuming these are correct from your attached code)
  const inputStyle = {
    backgroundColor: "#141414",
    color: "#FFFFFF",
    border: "1px solid #444", // Default border color
    borderRadius: "8px",
    padding: "10px",
    marginTop: "5px",
    marginBottom: "5px", // Adjusted margin to make space for errors
    width: "100%",
    boxSizing: 'border-box', // Ensure padding doesn't add to width
  };

  const customSelectStyles = {
    container: (base) => ({
      ...base,
      marginTop: "0.3rem",
      marginBottom: "1rem", // Keep this for spacing below the label
    }),
    control: (base, state) => ({
      ...base,
      backgroundColor: "#141414",
      borderColor: state.isFocused || state.selectProps.value ? "#555" : "#444", // Highlight on focus/value
      color: "#fff",
      borderRadius: "8px",
      boxShadow: state.isFocused ? '0 0 0 1px #555' : 'none', // Add a subtle focus ring
      "&:hover": {
        borderColor: "#555",
      },
       // Adjust height to better match input fields
       minHeight: '40px', // Roughly matches input height with padding
       padding: '0 8px', // Adjust internal padding
    }),
    singleValue: (base) => ({
      ...base,
      color: "#fff",
    }),
    input: (base) => ({
      ...base,
      color: "#fff",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#ccc",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#fff",
      color: "#000",
      zIndex: 9999,
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? "#f0f0f0" : "#fff",
      color: "#000",
      cursor: "pointer",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#f5f5f5", // light chip bg
      color: "#000",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#000", // label text color
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#000", // "×" icon color
      ':hover': {
        backgroundColor: "#ddd",
        color: "#000",
      },
    }),
     // Style when disabled
     '&.react-select__control--disabled': {
        backgroundColor: '#2d2d2d', // Slightly lighter dark background when disabled
        borderColor: '#555',
     },
     '.react-select__single-value--disabled': {
         color: '#bbb', // Grayed out text for single value
     },
     '.react-select__placeholder--disabled': {
         color: '#888', // Grayed out placeholder
     }
  };


  const [formData, setFormData] = useState({
    businessName: "",
    hasDBA: false, // Controls visibility of trade name and DBA docs
    tradeName: "",
    email: "",
    phone: "",
    sameAsResidential: false, // This state will control the pre-fill
    address1: "",
    address2: "",
    city: "",
    state: "", // Store state ISO code (e.g., 'CA')
    country: "USA", // This field seems fixed to USA, kept its value
    zip: "",
    website: "",
    businessType: "", // Store business type value (e.g., 'private')
    isRegistered: false,
    ein: "",
    isManufacturer: false,
    manufactureCountry: "", // Store country ISO code (e.g., 'US', 'CHN')
    launchYear: "", // Store year as string
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // State for react-select values (when they hold objects/arrays)
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSocials, setSelectedSocials] = useState([]);
  const [socialLinks, setSocialLinks] = useState({});


  // Still needed for conditional rendering of inputs based on checkboxes
  const [showTrade, setShowTrade] = useState(false);
  const [showEIN, setShowEIN] = useState(false);


  // Effect to pre-fill address if sameAsResidential is true and data is available
  useEffect(() => {
      // Get residential address from the received data - Access it from inside the profile object
      const residentialAddress = dataFromPrevPage?.profile?.address;

      // Check if the checkbox is true AND residential address data was passed from previous page
      if (formData.sameAsResidential && residentialAddress) { // Check if residential data exists in received state
          setFormData(prev => ({
              ...prev,
              address1: residentialAddress.addressLine1 || '', // Use correct key names from profile.address
              address2: residentialAddress.addressLine2 || '',
              city: residentialAddress.city || '',
              state: residentialAddress.state || '', // state value (ISO code)
              // country: residentialAddress.country || '', // Original code hardcoded country to USA, so maybe don't copy
              zip: residentialAddress.zipCode || '', // Use correct key name from profile.address
          }));
           // Clear any address-related errors when pre-filling
           setErrors(prev => {
               const { address1, address2, city, state, zip, ...rest } = prev;
               return rest;
           });
      } else if (!formData.sameAsResidential) {
           // If the checkbox becomes unchecked, clear the business address fields
           setFormData(prev => ({
                ...prev,
                address1: '',
                address2: '',
                city: '',
                state: '',
                // country: '', // Original code hardcoded country to USA, don't clear if it's always USA
                zip: '',
           }));
           // No need to explicitly clear errors here, validation on submit will add them back if fields are empty
      }
       // isManufacturer doesn't have dependent *required* inputs that need clearing based on current validation.

  }, [formData.sameAsResidential, dataFromPrevPage]); // Depend on these values


  // This function will now toggle the state for the hidden input
  // Updated to handle clearing DBA docs state and errors
  const handleCheckboxToggle = (key) => {
    // Get residential address from the received data - Access it from inside the profile object
    const residentialAddress = dataFromPrevPage?.profile?.address;

    // We will toggle the checkbox state regardless, but only pre-fill if address is available.
    const newState = !formData[key];
    setFormData({ ...formData, [key]: newState });


    // Handle dependent fields visibility and error clearing
    if (key === "hasDBA") {
      setShowTrade(newState);
      // Clear tradeName, DBA docs state, and their errors if DBA is unchecked
      if (!newState) {
        setFormData(prev => ({ ...prev, tradeName: "" }));
        setDbaDocuments([]); // Clear the documents array
        setErrors(prev => {
            const { tradeName, dbaDocuments, ...rest } = prev; // Clear both errors
            return rest;
        });
      }
    } else if (key === "isRegistered") {
      setShowEIN(newState);
        // Clear EIN and its error if isRegistered is unchecked
        if (!newState) {
           setFormData(prev => ({ ...prev, ein: "" }));
            setErrors(prev => {
                const { ein, ...rest } = prev;
                return rest;
            });
        }
    } else if (key === "sameAsResidential") { // Logic for the address checkbox
        if (newState && residentialAddress) {
            // Checkbox is checked AND we have residential address data from previous page
             setFormData(prev => ({
              ...prev,
              address1: residentialAddress.addressLine1 || '', // Use correct key names from profile.address
              address2: residentialAddress.addressLine2 || '',
              city: residentialAddress.city || '',
              state: residentialAddress.state || '', // state value (ISO code)
              // country: residentialAddress.country || '', // Original code hardcoded country to USA, so maybe don't copy
              zip: residentialAddress.zipCode || '', // Use correct key name from profile.address
            }));
             // Clear any address-related errors when pre-filling
             setErrors(prev => {
                 const { address1, address2, city, state, zip, ...rest } = prev;
                 return rest;
             });
        } else if (!newState) {
            // Checkbox is unchecked - clear the address fields
            setFormData(prev => ({
                ...prev,
                address1: '',
                address2: '',
                city: '',
                state: '',
                // country: '', // Original code hardcoded country to USA, don't clear if it's always USA
                zip: '',
            }));
             // No need to explicitly clear errors here, validation on submit will add them back if fields are empty
        } else {
             // If trying to check but residential address data wasn't available
             console.warn("Attempted to toggle sameAsResidential without available residential address data.");
             // The error message in JSX handles the visual cue.
         }
    }
      // isManufacturer doesn't have dependent *required* inputs that need clearing based on current validation.
  };


  const handleSocialChange = (selectedOptions) => {
    setSelectedSocials(selectedOptions);
    const keys = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    const newLinks = {};
    keys.forEach((key) => {
      newLinks[key] = socialLinks[key] || ""; // Keep existing links if platform remains selected
    });
     // Remove links for deselected platforms
     for (const oldKey in socialLinks) {
         if (!keys.includes(oldKey)) {
             delete socialLinks[oldKey];
         }
     }
    setSocialLinks(newLinks);
  };

    // Helper function to handle changes for inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error on change
        if (errors[name]) {
            setErrors(prev => {
                 const { [name]: removedError, ...rest } = prev;
                 return rest;
            });
        }
    };

    // Helper function to handle changes for react-selects
     const handleSelectChange = (name, selectedOption) => {
         const value = selectedOption ? selectedOption.value : '';
         setFormData(prev => ({ ...prev, [name]: value }));
          // Clear error on change
          if (errors[name]) {
             setErrors(prev => {
                  const { [name]: removedError, ...rest } = prev;
                  return rest;
             });
         }
     };

    // >> MODIFIED File/Drop handlers for DBA Documents <<
    const handleDbaFileChange = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to Array
        addDbaDocuments(files);
         // Clearing the input's value happens automatically when key changes due to state update
         // e.target.value = null; // This line is less crucial with the key={dbaDocuments.length} fix
    };

     const handleDbaDrop = (e) => {
         e.preventDefault();
         e.stopPropagation(); // Prevent default browser behavior
         const files = Array.from(e.dataTransfer.files); // Get files from drag event
         addDbaDocuments(files);
     };

     const addDbaDocuments = (newFiles) => {
         const remainingSlots = 3 - dbaDocuments.length; // Calculate how many more files can be added
         const filesToAdd = newFiles.slice(0, remainingSlots); // Take only files that fit within the limit

         setDbaDocuments(prevDocs => {
             const updatedDocs = [...prevDocs, ...filesToAdd];
             // Clear validation error if adding files resolves it (length is >= 1 and <= 3)
             if (errors.dbaDocuments && updatedDocs.length >= 1 && updatedDocs.length <= 3) {
                  setErrors(prev => {
                      const { dbaDocuments: removedError, ...rest } = prev;
                      return rest;
                  });
             }
             return updatedDocs;
         });

         // If trying to add more than allowed, set the error immediately
         if (dbaDocuments.length + newFiles.length > 3) {
              setErrors(prev => ({
                  ...prev,
                  dbaDocuments: `You can upload a maximum of 3 DBA/trade name documents. You have uploaded ${dbaDocuments.length}.`, // More accurate count
              }));
         }
     };


    const handleRemoveDbaDocument = (indexToRemove) => {
        setDbaDocuments(prevDocs => {
            const updatedDocs = prevDocs.filter((_, index) => index !== indexToRemove);
             // Clear validation error if removing a file resolves it (length is >= 1 and <= 3)
             // Need to re-validate the length after removal
             setErrors(prev => {
                 const currentDbaError = prev.dbaDocuments;
                 const { dbaDocuments: removedError, ...rest } = prev;

                 // Check if after removal, we are no longer violating the rules (>= 1 or <= 3)
                 if (currentDbaError && (updatedDocs.length >= 1 && updatedDocs.length <= 3)) {
                     return rest; // Clear the error
                 }
                 // If the error was about minimum (0 files) and we just removed the last one
                 if (currentDbaError && updatedDocs.length === 0 && formData.hasDBA) {
                     return { ...rest, dbaDocuments: "Please upload at least one DBA/trade name document." }; // Add minimum error back
                 }
                 // Otherwise, keep or clear based on initial check
                 return rest; // Keep the error cleared if it's still valid range, or if it was another type of error
            });
            return updatedDocs;
        });
    };
    // >> END MODIFIED File/Drop handlers <<


  // Validation function
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      { name: 'businessName', label: 'Registered business name' },
      { name: 'email', label: 'Business contact email' },
      { name: 'phone', label: 'Business contact phone number' },
       // manufactureCountry is validated below with specific logic for Select
      // launchYear is validated below with specific logic
      // categories is validated below with specific logic for Multi-Select
      // Business Type validation
      { name: 'businessType', label: 'Business type' },
    ];

    requiredFields.forEach(field => {
      // Using optional chaining and toString().trim() for safer check on potentially non-string values
      if (!formData[field.name]?.toString().trim()) {
            newErrors[field.name] = `Please enter ${field.label}`;
         }
    });

     // Address fields are required UNLESS sameAsResidential is checked AND residentialAddress was passed
     const addressFields = ['address1', 'city', 'state', 'zip']; // Include zip here for validation if not pre-filled
     // Get residential address from the received data - Access it from inside the profile object
     const residentialAddress = dataFromPrevPage?.profile?.address;

     addressFields.forEach(field => {
         // If sameAsResidential is NOT checked OR residentialAddress is NOT available, then check if the field is empty
         if (!formData.sameAsResidential || !residentialAddress) { // Check against received data
             // Map formData keys to validation messages
             const fieldLabelMap = {
                 address1: 'Address Line 1',
                 city: 'City',
                 state: 'State',
                 zip: 'Zip / Postal code',
             };
             if (!formData[field]?.toString().trim()) { // Safe check on current form state address
                  newErrors[field] = `Please enter ${fieldLabelMap[field]}`;
             }
         }
     });
     // Note: Country is hardcoded to USA and not validated as a required field

    // Conditional validation for DBA (Trade Name and Documents)
    if (formData.hasDBA) {
      if (!formData.tradeName?.trim()) { newErrors.tradeName = "Please enter trade name"; } // Safe check
      if (dbaDocuments.length === 0) {
        newErrors.dbaDocuments = "Please upload at least one DBA/trade name document.";
      } else if (dbaDocuments.length > 3) {
        newErrors.dbaDocuments = `You can upload a maximum of 3 DBA/trade name documents. You have uploaded ${dbaDocuments.length}.`;
      }
    }

    // Conditional validation for Registered Business/EIN
    if (formData.isRegistered) {
      if (!formData.ein?.trim()) { newErrors.ein = "Please enter EIN"; } // Safe check
    }

    // Specific validation for Business Categories (must select at least one)
    if (selectedCategories.length === 0) { newErrors.categories = 'Please select at least one business category'; }

    // Specific validation for Launch Year (must be a 4-digit number)
    const launchYear = formData.launchYear?.toString().trim(); // Safe check
    if (!launchYear) { newErrors.launchYear = 'Please enter launch year'; }
    else if (!/^\d{4}$/.test(launchYear)) { newErrors.launchYear = 'Please enter a valid 4-digit year (e.g., 2020)'; }
    else {
        const currentYear = new Date().getFullYear();
        if (parseInt(launchYear, 10) > currentYear) { newErrors.launchYear = `Launch year cannot be in the future (max ${currentYear})`; }
    }

    // Specific validation for Country of Manufacture (must select one)
    if (!formData.manufactureCountry) { newErrors.manufactureCountry = 'Please select country of manufacture'; }

     // Optional: Validate email format
    if (formData.email?.trim() && !/\S+@\S+\.\S+/.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address";
    }
     // Optional: Basic phone number format validation (very simple, adjust regex as needed)
    if (formData.phone?.trim() && !/^\+?\d[\d\s-]{7,}\d$/.test(formData.phone.trim())) {
        newErrors.phone = "Please enter a valid phone number";
    }
     // Optional: Website URL format validation (very simple, adjust regex as needed)
     if (formData.website?.trim() && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(formData.website.trim())) {
          newErrors.website = "Please enter a valid website URL (e.g., https://example.com)";
     }


    return newErrors;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    // Check if identification data from the previous page is available and successful before proceeding
    const identificationData = dataFromPrevPage?.profile?.identification;
    if (!dataFromPrevPage || !identificationData || !identificationData.stripeSessionId || identificationData.status !== 'success') {
        // This is a critical error that should ideally be handled on mount or earlier
        // but we double-check here. Set a prominent error message if needed.
         setErrors(prev => ({ ...prev, flowError: "Critical: Identification data missing or not successful from previous step." }));
         console.error("Identification data missing or not successful. Cannot proceed with form submission.");
         // You might want to redirect the user away from this page in the useEffect above if this data is missing.
         return; // Stop submission
     }


    if (Object.keys(validationErrors).length === 0) {
      // --- Structure all data for the next page (/signup/business/info-details-1) ---

      // DBA documents metadata from the current page
       const dbaDocumentsMetaForNext = dbaDocuments.map(file => ({
            fileName: file.name,
            category: "DBA Document", // Hardcoded category
            fileType: getFileExtension(file.name), // Helper function needed
        }));


       // Combine ALL data from previous page and current page into the final desired structure
       const combinedDataForNextPage = {
           // Start with the profile object from the previous page and merge new data into it
           profile: {
               ...(dataFromPrevPage?.profile || {}), // Spread existing profile data (personal info, residential address, identification)
               // Add all business details collected on the current page INSIDE profile
               categories: selectedCategories.map(cat => cat.label), // Pass labels as in desired output
               businessName: formData.businessName,
               hasDba: formData.hasDBA, // Corrected key name
               dbaTradeName: formData.tradeName, // Conditional, corrected key name
               businessContact: {
                   email: formData.email,
                   phone: formData.phone,
               },
               businessAddress: { // Business address collected on this page
                   sameAsResidential: formData.sameAsResidential,
                   // Use the current state of the business address fields
                   addressLine1: formData.address1,
                   addressLine2: formData.address2,
                   city: formData.city,
                   state: formData.state, // ISO code
                   country: formData.country, // Assuming "USA" string from state
                   zipCode: formData.zip, // Corrected key name
               },
               businessWebsite: formData.website, // Optional
               businessType: businessTypes.find(type => type.value === formData.businessType)?.label || "", // Pass label
               isRegisteredBusiness: formData.isRegistered, // Corrected key name
               einNumber: formData.ein, // Conditional, corrected key name
               isManufacturer: formData.isManufacturer,
               brandCountry: allCountries.find(country => country.value === formData.manufactureCountry)?.label || "", // Pass label
               brandLaunchYear: formData.launchYear,
               socialLinks: socialLinks, // Object of social links (optional fields)
               // Note: fileMeta and files from the previous page were previously in profile.documents
               // Now they will be at the top level according to the desired output structure.
               // So we don't spread dataFromPrevPage?.profile?.documents here.
               // The identification is already part of profile from the previous page spread.
           },
           // Add the file metadata from the previous page at the top level
           fileMeta: dataFromPrevPage?.fileMeta || [], // Ensure it's an array even if empty
           // Add the actual File object(s) from the previous page at the top level
           files: dataFromPrevPage?.files || [], // Ensure it's an array even if empty
           // Add DBA documents metadata from the current page at the top level
           dbaDocumentsMeta: dbaDocumentsMetaForNext,
           // Add the actual DBA File object(s) from the current page at the top level
           ...(dbaDocuments.length > 0 && {
               dbaFiles: dbaDocuments // Put the DBA File objects in an array
           }),
       };


       console.log("Combined data for next page (/signup/business/info-details-1):", combinedDataForNextPage);

       // Check if the profile object is getting too large to reliably pass via state
       // This is more of a precautionary measure for very large state objects,
       // but File objects themselves are not fully serialized, only metadata might increase size significantly.
       // const stateSize = JSON.stringify(combinedDataForNextPage).length;
       // console.log("Combined data size (approx KB):", stateSize / 1024);
       // if (stateSize > 500000) { // Example limit, adjust as needed
       //     console.warn("Data size for state might be large, consider alternative passing methods if issues occur.");
       // }


      // 5. Navigate to the next page (/signup/business/info-details-1) and pass the combined data in state
      // This route '/signup/business/info-details-1' is where the attached code navigates on submit.
      navigate("/signup/business/info-details-1", { state: combinedDataForNextPage });

    } else {

      console.log("Validation errors:", validationErrors);
      const firstErrorFieldName = Object.keys(validationErrors)[0];
      // Attempt to find the element to scroll to
      const element = document.getElementById(firstErrorFieldName) ||
                       document.querySelector(`[name="${firstErrorFieldName}"]`) ||
                       document.querySelector(`.signup-form label[htmlFor="${firstErrorFieldName}"]`) || // Check label before select control
                       document.querySelector(`.signup-form .select-input[name="${firstErrorFieldName}"] .react-select__control`) ||
                       document.getElementById('dbaDocumentsUploadArea') || // Specific ID for DBA area
                       document.querySelector('.uploaded-dba-document-item'); // For DBA file errors


      if (element) {
          // Scroll slightly above the element
          const elementTop = element.getBoundingClientRect().top + window.scrollY;
          const scrollToPosition = elementTop - 100; // Adjust 100px as needed for padding above the element
          window.scrollTo({ top: scrollToPosition > 0 ? scrollToPosition : 0, behavior: 'smooth' });
      } else {
           // Fallback: Scroll to the top of the form or page
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
    backgroundColor: isChecked ? '#96105E' : '#141414',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
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
      marginBottom: '10px',
      display: 'block',
  };

  // Custom input style function to handle readOnly state
  const getAddressInputStyle = (isReadOnly) => ({
     ...inputStyle,
     backgroundColor: isReadOnly ? '#2d2d2d' : inputStyle.backgroundColor,
     color: isReadOnly ? '#bbb' : inputStyle.color,
     borderColor: isReadOnly ? '#555' : inputStyle.borderColor,
     cursor: isReadOnly ? 'not-allowed' : 'text',
  });

    // Style for the file upload drag area - **NO RED BORDER ON ERROR**
    const fileUploadAreaStyle = (hasError, isDisabled) => ({
        border: `1px dashed ${hasError ? '#ff4d4f' : '#888'}`, // Dashed border, red on error
        backgroundColor: isDisabled ? '#2d2d2d' : "#141414", // Dark background, slightly different when disabled
        padding: "2rem",
        borderRadius: "10px",
        textAlign: "center",
        marginTop: "0.5rem",
         // Adjusted margin based on error or presence of files below (error still affects layout)
        marginBottom: hasError || dbaDocuments.length > 0 ? '10px' : '20px',
        cursor: isDisabled ? 'not-allowed' : "pointer",
        opacity: isDisabled ? 0.7 : 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    });


    const uploadedFileItemStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#141414',
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

   // Helper function to extract file extension safely for DBA documents
   const getFileExtension = (fileName) => {
       if (!fileName) return "";
       const lastDotIndex = fileName.lastIndexOf('.');
       return lastDotIndex !== -1 && lastDotIndex < fileName.length - 1
           ? fileName.substring(lastDotIndex + 1) // Get substring AFTER the dot
           : "";
   };


  return (
    <div
      className="app-wrapper"
      style={{ backgroundColor: "#141414", minHeight: "100vh", color: "white" }}
    >
      <Header />
      <main className="main-content">
        {/* Added noValidate to prevent default browser validation, we handle it */}
        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <h2 style={{ textAlign: "center",fontSize: "1.8rem", fontWeight: 700, marginBottom: "2rem", marginTop:"2rem" }}>Business Information</h2>

          {/* Display flow error if critical data is missing */}
          {errors.flowError && <p style={errorStyle}>{errors.flowError}</p>}

          {/* Add a check/message if previous page data didn't load */}
          {!dataFromPrevPage && (
               <p style={{...errorStyle, textAlign: 'center', marginBottom: '2rem'}}>
                  Could not load data from the previous step. Please go back and try again.
               </p>
          )}


         {/* Wrap form content in a conditional div that only renders if dataFromPrevPage and its profile exist */}
         {dataFromPrevPage && dataFromPrevPage.profile ? (
             <> {/* Use a Fragment to group content */}

              <label style={{ color: "white" }}>
                Business categories
                <Select
                  className="select-input"
                  name="categories" // Added name for potential use, though not used by react-select itself
                  isMulti
                  value={selectedCategories}
                  options={categories}
                  onChange={(selectedOptions) => { setSelectedCategories(selectedOptions || []); setErrors({...errors, categories: ''}); }}
                  styles={customSelectStyles}
                   placeholder="Select categories"
                />
                {errors.categories && <span style={errorStyle}>{errors.categories}</span>}
              </label>

              <label style={{ color: "white" }}>
                Registered business name
                <input
                  type="text"
                   name="businessName"
                   style={inputStyle}
                   value={formData.businessName}
                   onChange={handleInputChange}
                   placeholder="Enter business name"
                />
                 {errors.businessName && <span style={errorStyle}>{errors.businessName}</span>}
              </label>

              {/* Custom Checkbox for hasDBA */}
              <div style={{ display: "flex", alignItems: "center", marginBottom: (errors.tradeName || errors.dbaDocuments) ? "5px" : "15px" }}>
                <input type="checkbox" id="hasDBA" name="hasDBA" checked={formData.hasDBA} onChange={() => {}} style={{ display: 'none' }} />
                <div style={customCheckboxStyle(formData.hasDBA)} onClick={() => handleCheckboxToggle("hasDBA")}>
                   {formData.hasDBA && (<span style={tickMarkStyle}>✓</span>)}
                </div>
                <label htmlFor="hasDBA" style={{ color: "white", margin: 0, cursor: 'pointer' }} onClick={() => handleCheckboxToggle("hasDBA")}>
                  My company has a DBA (Doing Business As) or an official name change
                </label>
              </div>

              {showTrade && (
                <>
                  <label style={{ color: "white" }}>
                    Trade name
                     <input
                       type="text"
                        name="tradeName"
                       style={inputStyle}
                       value={formData.tradeName}
                       onChange={handleInputChange}
                        placeholder="Enter trade name"
                     />
                     {errors.tradeName && <span style={errorStyle}>{errors.tradeName}</span>}
                  </label>

                  {/* DBA Documents Upload Section */}
                   {/* Label includes max count hint */}
                  <label style={{ color: "white", fontSize: "0.95rem", display: 'block', marginBottom: dbaDocuments.length > 0 ? '0' : '1rem' }}>
                     DBA and/or trade name documents (Max 3)
                     {/* File Upload/Drop Area */}
                     {/* Disable if max files reached */}
                    {(dbaDocuments.length < 3) ? (
                      <div
                           id="dbaDocumentsUploadArea" // Added ID for potential scrolling
                           style={fileUploadAreaStyle(!!errors.dbaDocuments, false)} // Use dynamic style for error border
                           onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                           onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); }}
                           onDrop={handleDbaDrop}
                      >
                           <img
    src="/icons/cloud-upload1.png"
    alt="Upload Icon"
    style={{ width: "48px", height: "48px", marginBottom: "0.5rem" }}
  />
                           {/* Drag & drop text */}
                           <p style={{ margin: "1rem 0 0.5rem" }}>
                            
                              Drag & drop files or <label htmlFor="dbaDocumentsInput" style={{ color: "#d84b9e", cursor: "pointer", textDecoration: "underline" }}>Browse</label>
                           </p>
                           {/* Accepted file types (customize as needed) */}
                           <p style={{ fontSize: "0.85rem", color: "#ccc" }}>png, pdf, jpg, docx accepted</p>
                           {/* Hidden file input */}
                           <input
                              type="file"
                              key={dbaDocuments.length} // Key for smoother reset
                              id="dbaDocumentsInput"
                              name="dbaDocuments" // Added name for validation/scrolling
                              multiple
                              accept=".pdf,.jpg,.jpeg,.png,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              onChange={handleDbaFileChange}
                              style={{ display: "none" }}
                           />
                      </div>
                    ) : (
                        // Optional: Message when max files are uploaded and upload area is disabled
                         <div
                            id="dbaDocumentsUploadArea" // Keep ID even when disabled for scrolling
                            style={fileUploadAreaStyle(!!errors.dbaDocuments, true)} // Pass boolean error and isDisabled = true
                         >
                             {/* SVG icon (can make it slightly less prominent) */}
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                               <path d="M16 16l-4-4-4 4" /> <path d="M12 12v9" /> <path d="M20.39 18.39A5.5 5.5 0 0018 9h-1.26A8 8 0 104 16.3" />
                            </svg>
                            <p style={{ margin: "1rem 0 0.5rem", color: '#ccc' }}>Maximum 3 documents allowed.</p>
                            <p style={{ fontSize: "0.85rem", color: "#888" }}>Remove a document to upload another.</p>
                         </div>
                    )}


                     {/* Display uploaded files */}
                     {dbaDocuments.length > 0 && (
                         <div style={{ marginTop: dbaDocuments.length > 0 ? '0' : '1rem' }}> {/* Adjusted margin */}
                             {dbaDocuments.map((file, index) => (
                                 <div key={`dba-doc-${index}`} className="uploaded-dba-document-item" style={uploadedFileItemStyle}>
                                      {/* File Icon (example) */}
                                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', flexShrink: 0 }}>
                                        <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" />
                                     </svg>
                                     <span style={{ flex: 1, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {file.name} ({(file.size / 1024).toFixed(2)} KB)
                                     </span>
                                     <button
                                         key={`remove-dba-${index}`} // Added key
                                         type="button"
                                         onClick={() => handleRemoveDbaDocument(index)}
                                         style={removeFileButtonStyle}
                                     >
                                         &times;
                                     </button>
                                 </div>
                             ))}
                         </div>
                     )}

                     {/* Display error message for DBA documents below the list if files are present */}
                    {errors.dbaDocuments && <span style={{...errorStyle, marginTop: dbaDocuments.length > 0 ? '5px' : '0'}}>{errors.dbaDocuments}</span>} {/* Adjusted marginTop */}
                  </label>
                </>
              )}

              <label style={{ color: "white" }}>
                Business contact Email
                <input
                  type="email"
                   name="email" // Added name for validation/scrolling
                   style={inputStyle}
                   placeholder="Enter your email"
                   value={formData.email}
                   onChange={handleInputChange}
                />
                 {errors.email && <span style={errorStyle}>{errors.email}</span>}
              </label>

              <label style={{ color: "white" }}>
                 Business contact Phone Number
                <input
                  type="text"
                   name="phone" // Added name for validation/scrolling
                   style={inputStyle}
                   placeholder="Enter your phone number"
                   value={formData.phone}
                   onChange={handleInputChange}
                />
                 {errors.phone && <span style={errorStyle}>{errors.phone}</span>}
              </label>

              {/* Custom Checkbox for sameAsResidential */}
              {/* CORRECTED: The opacity, cursor, and disabled state are now controlled by checking for profile.address */}
              <div style={{ display: "flex", alignItems: "center", marginBottom: "15px", opacity: dataFromPrevPage?.profile?.address ? 1 : 0.5, cursor: dataFromPrevPage?.profile?.address ? 'pointer' : 'not-allowed' }}>
                <input type="checkbox" id="sameAsResidential" name="sameAsResidential" checked={formData.sameAsResidential} onChange={() => {}} style={{ display: 'none' }} disabled={!dataFromPrevPage?.profile?.address} />
                {/* The onClick handlers also use the corrected path */}
                <div style={customCheckboxStyle(formData.sameAsResidential)} onClick={() => dataFromPrevPage?.profile?.address && handleCheckboxToggle("sameAsResidential")}>
                   {formData.sameAsResidential && (<span style={tickMarkStyle}>✓</span>)}
                </div>
                <label htmlFor="sameAsResidential" style={{ color: "white", margin: 0, cursor: dataFromPrevPage?.profile?.address ? 'pointer' : 'not-allowed' }} onClick={() => dataFromPrevPage?.profile?.address && handleCheckboxToggle("sameAsResidential")}>
                  My company address is same as my residential address
                </label>
                 {/* This span displays the error message, now also controlled by profile.address */}
                 {!dataFromPrevPage?.profile?.address && (
                     <span style={{ ...errorStyle, marginTop: 0, marginLeft: '10px', display: 'inline-block' }}>
                        (Residential address not available from previous step)
                     </span>
                 )}
              </div>


              <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: '150px' }}> {/* Added minWidth */}
                  <label style={{ color: "white" }}>
                    Address Line 1
                     <input
                       type="text"
                        name="address1" // Added name for validation/scrolling
                       style={getAddressInputStyle(formData.sameAsResidential)}
                       value={formData.address1}
                       onChange={handleInputChange}
                       placeholder="Enter your address"
                       readOnly={formData.sameAsResidential}
                     />
                     {errors.address1 && <span style={errorStyle}>{errors.address1}</span>}
                  </label>
                </div>
                <div style={{ flex: 1, minWidth: '150px' }}> {/* Added minWidth */}
                  <label style={{ color: "white" }}>
                    Address Line 2 (Optional)
                     <input
                        type="text"
                        name="address2" // Added name for validation/scrolling
                        style={getAddressInputStyle(formData.sameAsResidential)}
                        value={formData.address2}
                        onChange={handleInputChange}
                        placeholder="Enter your address"
                        readOnly={formData.sameAsResidential}
                     />
                    {/* Removed error check for optional field */}
                     {/*errors.address2 && <span style={errorStyle}>{errors.address2}</span>*/}
                  </label>
                </div>
              </div>

              <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}> {/* Adjusted gap to 3rem for better spacing */}
                <div style={{ flex: 1, minWidth: '150px' }}> {/* Added minWidth */}
                  <label style={{ color: "white" }}>
                    City
                     <input
                        type="text"
                        name="city" // Added name for validation/scrolling
                        style={getAddressInputStyle(formData.sameAsResidential)}
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        readOnly={formData.sameAsResidential}
                     />
                     {errors.city && <span style={errorStyle}>{errors.city}</span>}
                  </label>
                </div>
                <div style={{ flex: 1, minWidth: '150px' }}> {/* Added minWidth */}
                  <label style={{ color: "white" }}>
                    State
                    <Select
                      className="select-input"
                      name="state" // Added name for validation/scrolling
                      options={usStates}
                      value={usStates.find(state => state.value === formData.state) || null}
                      onChange={(selectedOption) => handleSelectChange('state', selectedOption)}
                      styles={customSelectStyles}
                      placeholder="Select State"
                      isDisabled={!formData.country || usStates.length === 0 || formData.sameAsResidential}
                    />
                     {errors.state && <span style={errorStyle}>{errors.state}</span>}
                  </label>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}> {/* Adjusted gap to 1rem */}
                <div style={{ flex: 1, minWidth: '150px' }}> {/* Added minWidth */}
                  <label style={{ color: "white" }}>
                    Country
                     <Select
                       className="select-input"
                       name="country" // Added name for validation/scrolling
                       value={{ label: "United States", value: "USA" }} // Assuming fixed to USA
                       options={[{ label: "United States", value: "USA" }]} // Only USA option
                       isDisabled // Disable as it's fixed
                       styles={customSelectStyles}
                     />
                      {/* Removed error check for fixed field */}
                     {/*errors.country && <span style={errorStyle}>{errors.country}</span>*/}
                  </label>
                </div>
                <div style={{ flex: 1, minWidth: '150px' }}> {/* Added minWidth */}
                  <label style={{ color: "white" }}>
                    Zip / Postal code
                     <input
                        type="text"
                        name="zip" // Added name for validation/scrolling
                        style={getAddressInputStyle(formData.sameAsResidential)}
                        value={formData.zip}
                        onChange={handleInputChange}
                        placeholder="Zip / Postal code"
                        readOnly={formData.sameAsResidential}
                     />
                     {errors.zip && <span style={errorStyle}>{errors.zip}</span>}
                  </label>
                </div>
              </div>


              <label style={{ color: "white" }}>Business website (optional)
                <input type="text" name="website" style={inputStyle} value={formData.website} onChange={handleInputChange} placeholder="e.g., https://yourwebsite.com" />
                 {errors.website && <span style={errorStyle}>{errors.website}</span>} {/* Added error for optional field */}
              </label>

              <label style={{ color: "white" }}>Business type
                <Select
                  className="select-input"
                   name="businessType" // Added name for validation/scrolling
                  options={businessTypes}
                  value={businessTypes.find((t) => t.value === formData.businessType) || null}
                  onChange={(selected) => handleSelectChange('businessType', selected)}
                  styles={customSelectStyles}
                  placeholder="Select business type"
                />
                 {errors.businessType && <span style={errorStyle}>{errors.businessType}</span>}
              </label>

              <div style={{ display: "flex", alignItems: "center", marginBottom: errors.ein ? "5px" : "15px" }}>
                <input type="checkbox" id="isRegistered" name="isRegistered" checked={formData.isRegistered} onChange={() => {}} style={{ display: 'none' }} />
                <div style={customCheckboxStyle(formData.isRegistered)} onClick={() => handleCheckboxToggle("isRegistered")}>
                   {formData.isRegistered && (<span style={tickMarkStyle}>✓</span>)}
                </div>
                <label htmlFor="isRegistered" style={{ color: "white", margin: 0, cursor: 'pointer' }} onClick={() => handleCheckboxToggle("isRegistered")}>
                  Is it a registered business?
                </label>
              </div>

              {showEIN && (
                <label style={{ color: "white" }}>
                  EIN
                  <input type="text" name="ein" style={inputStyle} value={formData.ein} onChange={handleInputChange} placeholder="Enter EIN" />
                   {errors.ein && <span style={errorStyle}>{errors.ein}</span>}
                </label>
              )}

              <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                <input type="checkbox" id="isManufacturer" name="isManufacturer" checked={formData.isManufacturer} onChange={() => {}} style={{ display: 'none' }} />
                <div style={customCheckboxStyle(formData.isManufacturer)} onClick={() => handleCheckboxToggle("isManufacturer")}>
                   {formData.isManufacturer && (<span style={tickMarkStyle}>✓</span>)}
                </div>
                <label htmlFor="isManufacturer" style={{ color: "white", margin: 0, cursor: 'pointer' }} onClick={() => handleCheckboxToggle("isManufacturer")}>
                  Are you a manufacturer of this brand?
                </label>
              </div>

              <label style={{ color: "white" }}>Country of manufacture
                 <Select
                     className="select-input"
                     name="manufactureCountry" // Added name for validation/scrolling
                     options={allCountries}
                     value={allCountries.find(country => country.value === formData.manufactureCountry) || null}
                     onChange={(selectedOption) => handleSelectChange('manufactureCountry', selectedOption)}
                     styles={customSelectStyles}
                     placeholder="Select country"
                 />
                 {errors.manufactureCountry && <span style={errorStyle}>{errors.manufactureCountry}</span>}
              </label>

              <label style={{ color: "white" }}>What year did you launch this brand?
                 <input
                   type="text"
                    name="launchYear" // Added name for validation/scrolling
                    maxLength={4}
                   style={inputStyle}
                   value={formData.launchYear}
                   onChange={handleInputChange}
                    placeholder="YYYY"
                 />
                 {errors.launchYear && <span style={errorStyle}>{errors.launchYear}</span>}
              </label>

              <label style={{ color: "white" }}>Social links (optional)
                 <Select
                     className="select-input"
                     name="socialPlatforms" // Added name
                     options={socialPlatforms}
                     isMulti
                     value={selectedSocials}
                     onChange={handleSocialChange}
                     styles={customSelectStyles}
                     placeholder="Select social platforms"
                 />
              </label>

              {selectedSocials.map((platform) => (
                 <label key={platform.value} style={{ color: "white" }}>
                  {platform.label} Link
                  <div style={{ display: "flex", alignItems: "center", gap: '10px' }}> {/* Added gap */}
                    <input
                      type="text"
                       name={`${platform.value}Link`} // Use a unique name for each input (not validated currently)
                      style={{ ...inputStyle, width: "100%", flex: 1 }} // Allow input to grow
                      placeholder={`Enter your ${platform.label} link`}
                      value={socialLinks[platform.value] || ""}
                      onChange={(e) => setSocialLinks({ ...socialLinks, [platform.value]: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => handleSocialChange(selectedSocials.filter((p) => p.value !== platform.value))} // Use handleSocialChange to keep links synced
                      style={{ background: "#eee", color: "#000", border: "none", borderRadius: "4px", padding: "10px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer", flexShrink: 0 }} // Prevent button shrinking
                    >
                       &minus;
                    </button>
                  </div>
                </label>
              ))}

              <div className="row" style={{ marginTop: "2rem", display: "flex", gap: "20px" }}> {/* Added gap */}
                 {/* Previous Button */}
                 <button type="button" className="black-btn" onClick={() => navigate(-1)}
                         style={{
                             flex: 1,
                             marginRight: '10px',
                             backgroundColor: "#7B7B7B", // Grey color
                             color: "#FFFFFF", // White text
                             // Other black-btn styles like padding, border, etc. would apply unless overridden
                         }}>
                   Previous
                 </button>
                 {/* Next Button */}
                 {/* Disable button if dataFromPrevPage is missing or identification wasn't successful */}
                 <button type="submit" className="black-btn"
                         disabled={!dataFromPrevPage || !dataFromPrevPage.profile?.identification || dataFromPrevPage.profile.identification.status !== 'success'}
                         style={{
                             flex: 1,
                             marginLeft: '10px',
                             backgroundColor: "#96105E", // Purple color
                             color: "white", // White text
                             opacity: (!dataFromPrevPage || !dataFromPrevPage.profile?.identification || dataFromPrevPage.profile.identification.status !== 'success') ? 0.5 : 1,
                             cursor: (!dataFromPrevPage || !dataFromPrevPage.profile?.identification || dataFromPrevPage.profile.identification.status !== 'success') ? 'not-allowed' : 'pointer',
                             transition: "opacity 0.3s ease-in-out",
                             // Other black-btn styles like padding, border, etc. would apply unless overridden
                         }}>
                   Next
                 </button>
              </div>

             </> // Close Fragment
         ) : (
             // Display a message if dataFromPrevPage or its profile is missing
             <p style={{...errorStyle, textAlign: 'center', marginBottom: '2rem'}}>
                 Could not load data from the previous step. Please go back and try again.
             </p>
         )} {/* Close dataFromPrevPage and profile conditional render */}

        </form>
      </main>
      <Footer />
    </div>
  );
}

export default BusinessInfoDetails;