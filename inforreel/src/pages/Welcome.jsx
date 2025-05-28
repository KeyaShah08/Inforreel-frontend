import { UserIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

// Ensure Source Sans Pro is loaded in index.html:
// <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap" rel="stylesheet">

function Welcome() {
  const navigate = useNavigate();

  const roles = [
    {
      label: "User",
      desc: "Discover, Vibe, and Shop.",
      path: "/signup/user",
    },
    {
      label: "Brand / Vendor",
      desc: "Partner with brands. Create a VibesReel. Earn.",
      path: "/signup/business",
    },
    {
      label: "Influencer / Brand Ambassador",
      desc: "Showcase Products. Create a VibeReel. Partner with Influencers. Drive Sales.",
      path: "/signup/influencer",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "'Source Sans Pro', sans-serif",
        backgroundColor: "#141414", // ✅ true black background
        color: "#ffffff",
        margin: 0,
        padding: 0,
      }}
    >
      <Header />

      <main style={{ flex: 1 }}>
        <div
          style={{
            textAlign: "center",
            padding: "4rem 1rem 2rem",
            maxWidth: "800px",
            margin: "auto",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              marginBottom: "0.8rem",
              marginTop:"2rem"
            }}
          >
            Tell Us Who You Are
          </h2>

          <p
            style={{
              fontSize: "1.125rem",
              color: "#b0b0b0",
              fontWeight: 400,
              lineHeight: "1.6",
              marginBottom: "2.5rem",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Choose the path that best fits your journey on InforReel.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {roles.map(({ label, desc, path }) => (
              <div
                key={label}
                onClick={() => navigate(path)}
                style={roleCardStyle}
                onMouseEnter={(e) => {
                  const arrow = e.currentTarget.querySelector(".arrow");
                  if (arrow) arrow.style.opacity = 1;
                }}
                onMouseLeave={(e) => {
                  const arrow = e.currentTarget.querySelector(".arrow");
                  if (arrow) arrow.style.opacity = 0;
                }}
              >
                <div style={iconStyle}>
                  <UserIcon style={{ width: "20px", height: "20px", color: "#ccc" }} />
                </div>
                <div style={{ flexGrow: 1, textAlign: "left" }}>
                  <h3
                    style={{
                      margin: 0,
                      marginBottom: "4px",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                    }}
                  >
                    {label}
                  </h3>
                  <p style={{ margin: 0, color: "#bbbbbb", fontWeight: 400 }}>{desc}</p>
                </div>
                <div className="arrow" style={arrowStyle}>→</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const roleCardStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  border: "1px solid #333",
  borderRadius: "12px",
  padding: "1rem",
  backgroundColor: "#1e1e1e",
  cursor: "pointer",
  transition: "all 0.3s ease",
  position: "relative",
};

const iconStyle = {
  backgroundColor: "#2a2a2a",
  borderRadius: "50%",
  padding: "0.5rem",
  width: "40px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "1rem",
};

const arrowStyle = {
  fontSize: "1.2rem",
  color: "#ffffff",
  opacity: 0,
  transform: "translateX(5px)",
  transition: "opacity 0.3s ease",
};

export default Welcome;
