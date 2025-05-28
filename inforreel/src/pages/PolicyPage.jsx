import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function PolicyPage() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const handleBegin = () => {
    if (agreed) {
      navigate("/signup/verify-intro");
    }
  };

  const stepStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: "1rem",
    marginBottom: "2.5rem",
  };

  const numberCircleStyle = {
    minWidth: "28px",
    height: "28px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    color: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "0.9rem",
    marginTop: "0.2rem",
  };

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
            padding: "4rem 1rem 3rem",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "1.9rem",
              fontWeight: "700",
              marginBottom: "0.75rem",
              marginTop: "2rem",
            }}
          >
            Welcome to InforReel Seller Account Setup!
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#ccc",
              marginBottom: "2.5rem",
            }}
          >
            Here’s what to expect as a Vendor
          </p>

          <div
            style={{
              textAlign: "left",
              lineHeight: "1.7",
              fontSize: "0.95rem",
              marginTop: "1.5rem",
            }}
          >
            <div style={stepStyle}>
              <div style={numberCircleStyle}>1</div>
              <div>
                <strong>Personal & Business Information</strong>
                <p style={{ marginTop: "0.6rem" }}>
                  We’ll request your personal and business details to comply with identification and verification requirements.
                </p>
              </div>
            </div>

            <div style={stepStyle}>
              <div style={numberCircleStyle}>2</div>
              <div>
                <strong>Verification Process</strong>
                <p style={{ marginTop: "0.6rem" }}>
                  After you submit your information, our team will review it. In some cases, InforReel associate may call you on phone or ask you for a meeting to complete the verification process.
                </p>
                <p style={{ marginTop: "0.9rem" }}>
                  InforReel partners with Stripe, a globally trusted payment processor, to securely verify your information. Your data is safe and will never be shared with third parties.
                </p>
              </div>
            </div>

            <div style={stepStyle}>
              <div style={numberCircleStyle}>3</div>
              <div>
                <strong>Get Verified & Start Selling</strong>
                <p style={{ marginTop: "0.6rem" }}>
                  Once your information is reviewed and approved, you’ll receive an email with a link to access your showroom admin and begin selling.
                </p>
                <p style={{ marginTop: "0.9rem" }}>
                  If your brand is not approved, we’ll notify you via email with the reason and may invite you to reapply.
                </p>
              </div>
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div
            style={{
              margin: "3rem 0 1.5rem",
              display: "flex",
              alignItems: "center",
              fontSize: "0.95rem",
              justifyContent: "center",
            }}
          >
            <input
              type="checkbox"
              id="agreement"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              style={{ marginRight: "0.6rem" }}
            />
            <label htmlFor="agreement">
              I accept the{" "}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#aa1674", textDecoration: "underline" }}
              >
                terms and conditions
              </a>
            </label>
          </div>

          {/* Begin Button */}
          <button
            onClick={handleBegin}
            disabled={!agreed}
            style={{
              backgroundColor: agreed ? "#96105E" : "#7B7B7B",
              color: "white",
              fontSize: "1rem",
              fontWeight: 600,
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              cursor: agreed ? "pointer" : "not-allowed",
              opacity: agreed ? 1 : 1,
              transition: "background-color 0.3s",
              width: "100%",
              maxWidth: "400px",
              margin: "auto",
              display: "block",
              marginTop: "1rem",
            }}
          >
            Begin
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PolicyPage;
