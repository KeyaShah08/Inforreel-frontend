// Accept onNavItemClick and activeItem as props
function Sidebar({ onNavItemClick, activeItem }) {

  // Handler function for navigation items
  const handleNavItemClick = (item) => {
    onNavItemClick(item);
  };

  // Handler function for the Create Post button
  const handleCreatePostClick = () => {
    console.log('Create Post button clicked');
    // Add logic to open a modal or navigate to a create post page
    // You might want to add an onButtonClick prop here too if Dashboard
    // needs to handle the Create Post action.
  };

  // Define base styles for list items
  const baseLiStyle = {
    marginBottom: '10px', // Space between list items
    padding: '12px 0', // Vertical padding within list items
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease', // Optional: Add a smooth transition for hover/active
  };

  // Define styles for the active list item
  const activeLiStyle = {
    backgroundColor: '#262626', // Background color for active item from Figma
    borderRight: '4px solid #96105E', // Pink/purple bar on the RIGHT
    paddingLeft: '25px', // Increased left padding to move content right
    paddingRight: '8px', // Adjust right padding to account for border width
  };

  // Define styles for inactive list items to ensure consistent left alignment
  const inactiveLiStyle = {
    paddingLeft: '25px', // Increased left padding to move content right (match active state for alignment)
    paddingRight: '12px', // Maintain right padding
  };

  const headerHeight = '60px'; // <--- Define your header height here

  return (
    // Sidebar - Fixed width, positioned below header
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '20%', // Adjust this percentage as needed for the overall sidebar width
      backgroundColor: 'rgba(20, 20, 20, 0.35)', // Updated: #141414 with 65% transparency
      color: 'white',
      padding: '0', // Removed general padding
      paddingTop: '20px', // Added specific top padding
      boxSizing: 'border-box',
      borderRight: '1px solid rgba(51, 51, 51, 0.35)', // Updated: #333 border with matching transparency
      position: 'fixed', // Added: Fixes the sidebar position
      top: headerHeight, // <-- Starts below the header
      left: 0, // Added: Positions sidebar at the left of the viewport
      height: `calc(100vh - ${headerHeight})`, // <-- Fills space below header
      zIndex: 1000, // Optional: Ensures sidebar is on top of other content
    }}>
      {/* Inner div for sidebar content that will scroll */}
      {/* Removed paddingBottom as the button is now inside */}
      <div style={{ height: '100%', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>

        {/* Navigation Menu */}
        <nav>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li
              style={{
                ...baseLiStyle,
                ...(activeItem === 'Home' ? activeLiStyle : inactiveLiStyle),
              }}
              onClick={() => handleNavItemClick('Home')}
            >
              <img src="/icons/home.svg" alt="Home Icon" style={{ marginRight: '10px', width: '18px', height: '18px' }} /> Home
            </li>
            <li
              style={{
                ...baseLiStyle,
                ...(activeItem === 'Global Showroom' ? activeLiStyle : inactiveLiStyle),
              }}
              onClick={() => handleNavItemClick('Global Showroom')}
            >
              <img src="/icons/globalShowroom.svg" alt="Global Showroom Icon" style={{ marginRight: '10px', width: '18px', height: '18px' }} /> Global Showroom
            </li>
            <li
              style={{
                ...baseLiStyle,
                ...(activeItem === 'Search' ? activeLiStyle : inactiveLiStyle),
              }}
              onClick={() => handleNavItemClick('Search')}
            >
              <img src="/icons/search.svg" alt="Search Icon" style={{ marginRight: '10px', width: '18px', height: '18px' }} /> Search
            </li>
            <li
              style={{
                ...baseLiStyle,
                ...(activeItem === 'Chats' ? activeLiStyle : inactiveLiStyle),
              }}
              onClick={() => handleNavItemClick('Chats')}
            >
              <img src="/icons/chat.svg" alt="Chats Icon" style={{ marginRight: '10px', width: '18px', height: '18px' }} /> Chats
            </li>
            <li
              style={{
                ...baseLiStyle,
                ...(activeItem === 'Library' ? activeLiStyle : inactiveLiStyle),
              }}
              onClick={() => handleNavItemClick('Library')}
            >
              <img src="/icons/library.svg" alt="Library Icon" style={{ marginRight: '10px', width: '18px', height: '18px' }} /> Library
            </li>
          </ul>
        </nav>

        {/* Create Post Button Container - Now inside the scrolling div */}
        <div style={{
            paddingTop: '20px', // Space above the button  
            paddingLeft: '20px', // Added padding to align with nav items
            paddingRight: '20px', // Added padding to align with nav items
            // Removed marginTop: 'auto' as it's now part of the scrolling content flow
        }}>
          <button
              style={{
                backgroundColor: '#96105E',
                color: 'white',
                border: 'none',
                padding: '10px 20px', // You can make this smaller too, e.g., '8px 15px'
                borderRadius: '5px',
                cursor: 'pointer',
                width: '200px', // <--- Set a smaller fixed width
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
              }}
              onClick={handleCreatePostClick}
            >
              Create Post
            </button>
        </div>

      </div> {/* End of inner scrolling div */}

      {/* The Create Post button container is now inside the scrolling div,
          so this space at the bottom is no longer needed outside the scrolling area.
          Ensure there's no extra content or padding here. */}
    </div> // End of Sidebar div
  );
}

export default Sidebar;