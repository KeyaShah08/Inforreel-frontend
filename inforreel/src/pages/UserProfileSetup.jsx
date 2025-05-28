import { State } from "country-state-city";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";
import Footer from "../components/Footer";
import Header from "../components/Header";

// Format MM/DD/YYYY
const formatDOB = (value) => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 4) return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
};

// Validate format + ensure not future date
const isValidDOB = (dob) => {
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/;
  if (!regex.test(dob)) return false;
  const [month, day, year] = dob.split("/").map(Number);
  const dateObject = new Date(year, month - 1, day);
  const today = new Date();

  if (
    dateObject.getFullYear() !== year ||
    dateObject.getMonth() !== month - 1 ||
    dateObject.getDate() !== day
  ) {
    return false;
  }

  return dateObject <= today;
};

// Updated neutral dropdown styles
const customSelectStyles = {
  container: (base) => ({
    ...base,
    marginTop: "0.3rem",
  }),
  control: (base, state) => ({
    ...base,
    backgroundColor: "#1d1d1d",
    borderColor: state.isFocused ? "#666" : "#444",
    color: "#fff",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#555",
    },
    minHeight: '40px',
  }),
  singleValue: (base) => ({
    ...base,
    color: "#fff",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#fff",
    color: "#000",
    zIndex: 9999,
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected ? "#333" : isFocused ? "#eee" : "#fff",
    color: isSelected ? "white" : "#000",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "#333",
      color: "white",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: '#aaa',
  }),
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: '#444',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: '#aaa',
    "&:hover": {
      color: '#ccc',
    }
  }),
  input: (base) => ({
    ...base,
    color: "#fff",
  })
};

function UserProfileSetup() {
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [gender, setGender] = useState(null);
  const [dob, setDob] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const { authToken, userType } = location.state || {};

  useEffect(() => {
    if (!authToken) {
      console.warn("Auth token missing in UserProfileSetup state. Redirecting to signup.");
      navigate('/signup', { replace: true });
    }
  }, [authToken, navigate]);

  const countryOptions = useMemo(() => countryList().getData(), []);

  const handleCountryChange = (value) => {
    setCountry(value);
    setState(null);
  };

  const stateOptions = country
    ? State.getStatesOfCountry(country.value).map((s) => ({
        label: s.name,
        value: s.isoCode,
      }))
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!country) newErrors.country = "Country is required";
    if (!country || (stateOptions.length > 0 && !state)) {
      if (country && stateOptions.length > 0) {
        newErrors.state = "State is required";
      }
    }
    if (!gender) newErrors.gender = "Gender is required";
    if (!dob) {
      newErrors.dob = "Date of Birth is required";
    } else if (!isValidDOB(dob)) {
      newErrors.dob = "Please enter a valid date (MM/DD/YYYY) and ensure it's not in the future.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && authToken) {
      const [month, day, year] = dob.split("/").map(Number);
      const formattedDob = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      const profileDataToSend = {
        country: country.label,
        state: state ? state.label : null,
        gender: gender.label,
        dob: formattedDob,
      };

      navigate("/interest", {
        state: {
          profileData: profileDataToSend,
          authToken: authToken,
        },
      });
    }
  };

  const isStateRequiredAndMissing = country && stateOptions.length > 0 && !state;
  const isFormValid = country && gender && dob && isValidDOB(dob) && !isStateRequiredAndMissing;
  const isButtonDisabled = !isFormValid || !authToken;

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
        <div
          style={{
            textAlign: "center",
            padding: "3rem 1rem",
            maxWidth: "800px",
            margin: "auto",
          }}
        >
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem", marginTop: "2rem" }}>
            Continue your profile setup
          </h2>

          {!authToken && (
            <p style={{ fontSize: "1rem", color: "#ff4d4d", textAlign: "center", marginBottom: "1rem" }}>
              Authentication token missing. Please restart the process.
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              maxWidth: "400px",
              margin: "2rem auto 0",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <label style={{ flex: 1, minWidth: '150px', fontSize: "0.95rem", display: "flex", flexDirection: "column" }}>
                Country
                <Select
                  options={countryOptions}
                  value={country}
                  onChange={handleCountryChange}
                  styles={customSelectStyles}
                  isDisabled={!authToken}
                />
                {errors.country && (
                  <span style={{ color: "#ff4d4d", fontSize: "0.9rem", marginTop: "0.3rem" }}>{errors.country}</span>
                )}
              </label>

              <label style={{ flex: 1, minWidth: '150px', fontSize: "0.95rem", display: "flex", flexDirection: "column" }}>
                State
                <Select
                  options={stateOptions}
                  value={state}
                  onChange={setState}
                  isDisabled={!country || stateOptions.length === 0 || !authToken}
                  styles={customSelectStyles}
                />
                {errors.state && (
                  <span style={{ color: "#ff4d4d", fontSize: "0.9rem", marginTop: "0.3rem" }}>{errors.state}</span>
                )}
              </label>
            </div>

            <label style={{ fontSize: "0.95rem", display: "flex", flexDirection: "column" }}>
              Gender
              <Select
                options={[
                  { label: "Female", value: "female" },
                  { label: "Male", value: "male" },
                  { label: "Non-binary", value: "non-binary" },
                  { label: "Prefer not to say", value: "prefer-not" },
                ]}
                value={gender}
                onChange={setGender}
                styles={customSelectStyles}
                isDisabled={!authToken}
              />
              {errors.gender && (
                <span style={{ color: "#ff4d4d", fontSize: "0.9rem", marginTop: "0.3rem" }}>{errors.gender}</span>
              )}
            </label>

            <label style={{ fontSize: "0.95rem", display: "flex", flexDirection: "column" }}>
              Date of Birth
              <input
                type="text"
                placeholder="MM/DD/YYYY"
                maxLength="10"
                value={dob}
                onChange={(e) => setDob(formatDOB(e.target.value))}
                style={{
                  marginTop: "0.3rem",
                  padding: "10px",
                  border: `1px solid ${errors.dob ? '#ff4d4d' : '#444'}`,
                  borderRadius: "6px",
                  fontSize: "1rem",
                  backgroundColor: "#1d1d1d",
                  color: "#fff",
                }}
                disabled={!authToken}
              />
              {errors.dob && (
                <span style={{ color: "#ff4d4d", fontSize: "0.9rem", marginTop: "0.3rem" }}>{errors.dob}</span>
              )}
            </label>

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
                marginTop: "1rem",
                transition: "all 0.3s ease",
                opacity: !authToken ? 0.7 : 1,
              }}
            >
              Next
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default UserProfileSetup;
