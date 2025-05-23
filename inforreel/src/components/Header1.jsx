import { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

function Header1() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
            <img src="/BellIcon.png" alt="Notifications" style={{ height: "24px", width: "24px" }} onClick={() => console.log("Bell clicked")} />
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
