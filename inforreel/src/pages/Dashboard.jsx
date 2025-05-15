import { useState } from 'react'; // Import useState
import "../App.css"; // You might still need App.css for global styles
import FeedItems from "../components/FeedItems"; // Import the new FeedItems component
import Header1 from "../components/Header1"; // Import the new Header1 component
import Marketplace from "../components/Marketplace"; // Import the Marketplace component
import Sidebar from "../components/Sidebar"; // Import the new Sidebar component

function Dashboard() {
  // State to keep track of the current page/section displayed in the main area
  const [currentPage, setCurrentPage] = useState('Home');

  // Function to handle clicks on sidebar navigation items
  const handleSidebarItemClick = (item) => {
    setCurrentPage(item); // Update the current page state
  };

  // Define the height of the header - MAKE SURE THIS MATCHES the headerHeight in Header1.js
  const headerHeight = '60px';
  // Define the width of the sidebar - MAKE SURE THIS MATCHES the width in Sidebar.js
  const sidebarWidth = '20%';


  return (
    // app-wrapper now uses flex column to stack header and main content
    <div className="app-wrapper" style={{ backgroundColor: '#141414', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Use the fixed Header1 component here */}
      {/* The Header1 component itself has position: fixed */}
      <Header1 />

      {/* main-content now takes remaining height (due to header being fixed) and is a flex container */}
      {/* No changes needed on the main element itself */}
      <main className="main-content" style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}> {/* Keep overflow: hidden */}

        {/* Use the fixed Sidebar component here */}
        {/* The Sidebar component itself has position: fixed */}
        <Sidebar onNavItemClick={handleSidebarItemClick} activeItem={currentPage} />

        {/* Main Content Area - This div needs margin to not be hidden behind fixed header/sidebar */}
        <div style={{
          flex: '1',
          padding: '20px', // Padding around the content area within this div
          overflowY: 'auto', // Enable scrolling for this div (important!)
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          // Add margin to push content away from fixed header and sidebar
          marginLeft: sidebarWidth,
          // The content inside this div will be centered horizontally due to alignItems: 'center' below

          // Flex properties to center the content horizontally within this main content area
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {/* Conditional Rendering based on currentPage state */}
          {currentPage === 'Home' ? (
            // Render FeedItems if currentPage is 'Home'
            <FeedItems />
          ) : currentPage === 'Global Showroom' ? (
            // Render Marketplace if currentPage is 'Global Showroom'
            <Marketplace />
          ) : (
            // Render nothing for any other currentPage values
            null
          )}
        </div>
      </main>

      {/* Assuming Footer component is defined elsewhere and imported */}
      {/* You might still need the Footer import and component if you have a footer */}
      {/* import Footer from "../components/Footer"; */}
      {/* <Footer /> */}
    </div>
  );
}

export default Dashboard;  
