import { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

function Header1() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false); // New state for notification panel
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleLogout = () => {
    setIsDropdownOpen(false);
    console.log("Logging out...");
    navigate('/');
  };
  const handleInforReelClick = () => {
    navigate('/dashboard', { state: { resetDashboard: true } });
  };

  // New function to handle notification icon click
  const handleNotificationClick = () => {
    setShowNotificationPanel(true);
    setIsDropdownOpen(false); // Close dropdown if open
    console.log("Notification clicked");
  };

  return (
    <>
      <header className="header-custom">
        <div onClick={handleInforReelClick} style={{ cursor: "pointer", marginLeft: '2rem' }}>
          <h1 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 700 }}>InforReel</h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", marginRight: '2rem' }}>
          {/* Cart Icon */}
          <div style={{ marginLeft: "20px", cursor: "pointer" }}>
            <img src="/cart1.png" alt="Cart" style={{ height: "24px", width: "24px" }} onClick={() => console.log("Cart clicked")} />
          </div>

          {/* Notification Icon */}
          <div style={{ marginLeft: "20px", cursor: "pointer" }}>
            <img src="/BellIcon.png" alt="Notifications" style={{ height: "24px", width: "24px" }} onClick={handleNotificationClick} />
          </div>

          {/* Avatar + Dropdown */}
          <div style={{ marginLeft: "20px", cursor: "pointer", position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center' }} onClick={toggleDropdown}>
              <img src="/SmallAvatar.png" alt="User" style={{ height: "28px", width: "28px", borderRadius: '50%' }} />
              <FaCaretDown style={{ marginLeft: '5px', fontSize: '0.8rem' }} />
            </div>

            {isDropdownOpen && (
              <div style={{
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
              }}>
                <div style={{ padding: '5px 0', cursor: 'pointer' }} onClick={() => setIsDropdownOpen(false)}>Profile</div>
                <div style={{ padding: '5px 0', cursor: 'pointer' }} onClick={() => setIsDropdownOpen(false)}>Settings</div>
                <div style={{ padding: '5px 0', cursor: 'pointer' }} onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Notification Panel */}
      {showNotificationPanel && (
        <div style={{
          display: "block",
          position: "fixed",
          top: "0px",
          zIndex: "9999",
          right: "0",
          height: "100vh",
          width: "100%",
          background: "rgba(20,20,20,0.5)",
        }}>
          <div style={{
            display: "block",
            position: "fixed",
            top: "58.5px", // Adjusted to be below the header
            zIndex: "99999",
            right: "0",
            height: "100vh",
            width: "340px",
            background: "rgba(20,20,20,1)",
            padding: "15px",
            boxSizing: "border-box", // Include padding in width
            border: "1px solid rgba(224, 224, 224, 0.2)", // Very subtle light grey with some transparency
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
              paddingBottom: "15px",
              borderBottom: "1px solid #454545",
            }}>
              <h2 style={{ color: "white", margin: 0, fontSize: "1.4rem" }}>Notifications</h2>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0",
                }}
                onClick={() => setShowNotificationPanel(false)}
              >
                <img
                  src={"/closeicon.png"}
                  alt={`Close`}
                  style={{ width: '24px', height: '24px' }}
                />
              </button>
            </div>
            {/* Notification content goes here */}
            <div style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
              <p>No new notifications.</p>
              {/* You can add your list of notifications here */}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .header-custom {
          background-color: rgba(20, 20, 20, 0.65);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(51, 51, 51, 0.35);
          color: white;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 11vh;
          box-sizing: border-box;
          z-index: 666;
          padding: 0;
        }

        @media (max-width: 768px) {
          .header-custom {
            height: 9vh;
          }

          .header-custom h1 {
            font-size: 1.2rem !important;
          }

          .header-custom img {
            height: 20px !important;
            width: 20px !important;
          }
        }

        @media (max-width: 480px) {
          .header-custom {
            height: 8vh;
            flex-direction: column;
            align-items: flex-start;
          }

          .header-custom h1 {
            font-size: 1rem !important;
          }

          .header-custom img {
            height: 18px !important;
            width: 18px !important;
          }
        }
      `}</style>
    </>
  );
}

export default Header1;