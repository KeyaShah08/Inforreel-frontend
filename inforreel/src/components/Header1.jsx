import { useState } from 'react'; // Import useState hook
import { FaCaretDown } from 'react-icons/fa';
import { useNavigate } from "react-router-dom"; // Import Link and useNavigate

function Header1() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    setIsDropdownOpen(false);
    navigate('/');
  };

  // New function to handle InforReel click
  const handleInforReelClick = () => {
    // Navigate to dashboard and pass a state to indicate reset
    navigate('/dashboard', { state: { resetDashboard: true } });
  };

  const headerHeight = '60px';

  return (
    <header
      style={{
        backgroundColor: 'rgba(20, 20, 20, 0.65)',
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: '1px solid rgba(51, 51, 51, 0.35)',
        marginBottom: "0",
        color: "white",
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: headerHeight,
        boxSizing: 'border-box',
        zIndex: 666,
      }}
    >
      {/* Change from Link to a clickable div/button for custom logic */}
      <div
        onClick={handleInforReelClick}
        style={{ textDecoration: "none", color: "white", cursor: "pointer" }}
      >
        <h1 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 700 }}>InforReel</h1>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginLeft: "20px", cursor: "pointer", fontSize: '1.2rem' }}>
          <img
            src="/cart1.png"
            alt="Add to Cart Icon"
            style={{ marginBottom: 0, width: "70%", height: "auto", cursor: 'pointer', margin: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={() => console.log("Cart icon clicked")}
          />
        </div>

        <div style={{ marginLeft: "20px", cursor: "pointer", fontSize: '1.2rem' }}>
          <img
            src="/BellIcon.png"
            alt="Notification Bell Icon"
            style={{ marginBottom: 0, height: "auto", cursor: 'pointer', margin: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={() => console.log("Bell icon clicked")}
          />
        </div>

        <div style={{ marginLeft: "20px", cursor: "pointer", position: 'relative' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem' }}
            onClick={toggleDropdown}
          >
            <img
              src="/SmallAvatar.png"
              alt="User Avatar"
              style={{ marginBottom: 0, height: "auto", cursor: 'pointer', margin: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}
            />
            <FaCaretDown style={{ marginLeft: '5px', fontSize: '0.8rem' }} />
          </div>

          {isDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                backgroundColor: '#333',
                color: 'white',
                borderRadius: '5px',
                padding: '10px',
                marginTop: '5px',
                minWidth: '120px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                zIndex: 20,
              }}
            >
              <div style={{ padding: '5px 0', cursor: 'pointer' }} onClick={() => {
                setIsDropdownOpen(false);
                console.log("Profile clicked");
              }}>Profile</div>
              <div style={{ padding: '5px 0', cursor: 'pointer' }} onClick={() => {
                setIsDropdownOpen(false);
                console.log("Settings clicked");
              }}>Settings</div>
              <div style={{ padding: '5px 0', cursor: 'pointer' }} onClick={handleLogout}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header1;