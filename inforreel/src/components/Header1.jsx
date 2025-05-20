import { useState } from 'react'; // Import useState hook
import { Link } from "react-router-dom"; // Import Link for navigation
// Import icons from react-icons (example using Font Awesome)
import { FaCaretDown } from 'react-icons/fa'; // Shopping Cart, Bell, User, and Caret Down icons

function Header1() {
  // State to manage dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };  

  // Define the height of the header
  // You might need to adjust this value based on the actual rendered height
  const headerHeight = '60px'; // <--- Define header height, match the value used for sidebar's top

  return (
    <header
      style={{
    backgroundColor: 'rgba(20, 20, 20, 0.65)', // Matches #141414 with 85% opacity
        padding: "1rem 2rem", // Padding around the header content
        display: "flex", // Use flexbox for layout
        justifyContent: "space-between", // Space out the title and options
        alignItems: "center", // Vertically center items
        borderBottom: '1px solid rgba(51, 51, 51, 0.35)', // Updated: Thin bottom border with transparency
        marginBottom: "0", // No bottom margin
        color: "white", // Ensure text color is white
        position: 'fixed', // Changed: Fixes the header to the viewport
        top: 0, // Added: Positions header at the top of the viewport
        left: 0, // Added: Positions header at the left of the viewport
        width: '100%', // Added: Makes the header span the full width
        height: headerHeight, // Added: Set a fixed height for the header
        boxSizing: 'border-box', // Ensure padding is included in height/width
        zIndex: 666, // Ensure header is above other content
      }}
    >
      {/* Link for the InforReel title/logo */}
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <h1 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 700 }}>InforReel</h1>
      </Link>
      {/* Container for the three options/icons */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Shopping Cart Icon */}
        <div style={{ marginLeft: "20px", cursor: "pointer", fontSize: '1.2rem' }}>
          <img
                     src="/cart1.png"
                     alt="Add to Cart Icon"
                     style={{ marginBottom: 0, width: "70%", height: "auto", cursor: 'pointer',margin:"auto", display:"flex", alignItems:"center",justifyContent:"center"}}
                     onClick={() => handleAddToCartClick(item.id)}
                     />
        </div>

        {/* Notification Bell Icon */}
        <div style={{ marginLeft: "20px", cursor: "pointer", fontSize: '1.2rem' }}>
          <img
                     src="/BellIcon.png"
                     alt="Add to Cart Icon"
                     style={{ marginBottom: 0,height: "auto", cursor: 'pointer',margin:"auto", display:"flex", alignItems:"center",justifyContent:"center"}}
                     onClick={() => handleAddToCartClick(item.id)}
                     />
          
        </div>

        {/* User/Profile Icon with Dropdown */}
        <div style={{ marginLeft: "20px", cursor: "pointer", position: 'relative' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem' }}
            onClick={toggleDropdown} // Toggle dropdown on click
          >
             <img
                     src="/SmallAvatar.png"
                     alt="Add to Cart Icon"
                     style={{ marginBottom: 0,height: "auto", cursor: 'pointer',margin:"auto", display:"flex", alignItems:"center",justifyContent:"center"}}
                     onClick={() => handleAddToCartClick(item.id)}
                     />

            <FaCaretDown style={{ marginLeft: '5px', fontSize: '0.8rem' }} /> {/* Dropdown arrow */}
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && ( // Render dropdown only if isDropdownOpen is true
            <div
              style={{
                position: 'absolute', // Position dropdown absolutely
                top: '100%', // Position below the icon
                right: '0', // Align to the right of the icon container
                backgroundColor: '#333', // Dark background for dropdown (can also make transparent)
                color: 'white',
                borderRadius: '5px',
                padding: '10px',
                marginTop: '5px', // Space between icon and dropdown
                minWidth: '120px', // Minimum width for the dropdown
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)', // Add a subtle shadow
                zIndex: 20, // Ensure dropdown is above other elements
              }}
            >
              {/* Dropdown options - Replace with your actual menu items */}
              <div style={{ padding: '5px 0', cursor: 'pointer' }}>Profile</div>
              <div style={{ padding: '5px 0', cursor: 'pointer' }}>Settings</div>
              <div style={{ padding: '5px 0', cursor: 'pointer' }}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header1; // Export the component