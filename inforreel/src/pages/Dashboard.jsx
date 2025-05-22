import { useEffect, useState } from 'react'; // Import useState and useEffect
import { useLocation } from 'react-router-dom'; // Import useLocation
import "../App.css";
import FeedItems from "../components/FeedItems";
import Header1 from "../components/Header1";
import Marketplace from "../components/Marketplace";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [currentPage, setCurrentPage] = useState('Home');
  const location = useLocation(); // Initialize useLocation

  // Use useEffect to listen for changes in location state
  useEffect(() => {
    if (location.state && location.state.resetDashboard) {
      setCurrentPage('Home');
      // Clear the state to avoid resetting every time if the user navigates back
      // Note: This might not be strictly necessary depending on your exact routing setup,
      // but it's good practice to consume transient state.
      // If you are using React Router v6.4+ (data routers like createBrowserRouter),
      // you might prefer to clear state using replace: true in navigate.
      // For this example, we'll just set it.
    }
  }, [location.state]); // Re-run effect when location.state changes

  const handleSidebarItemClick = (item) => {
    setCurrentPage(item);
  };

  const headerHeight = '60px';
  const sidebarWidth = '20%';

  return (
    <div className="app-wrapper" style={{ backgroundColor: '#141414', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header1 />

      <main className="main-content" style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        <Sidebar onNavItemClick={handleSidebarItemClick} activeItem={currentPage} />

        <div style={{
          flex: '1',
          padding: '20px',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          marginLeft: sidebarWidth,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {currentPage === 'Home' ? (
            <FeedItems />
          ) : currentPage === 'Global Showroom' ? (
            <Marketplace />
          ) : (
            null
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;