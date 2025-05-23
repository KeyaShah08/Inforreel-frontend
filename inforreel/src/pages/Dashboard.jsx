import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../App.css";
import FeedItems from "../components/FeedItems";
import Header1 from "../components/Header1";
import Marketplace from "../components/Marketplace";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [currentPage, setCurrentPage] = useState('Home');
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.resetDashboard) {
      setCurrentPage('Home');
    }
  }, [location.state]);

  const handleSidebarItemClick = (item) => {
    setCurrentPage(item);
  };

  const sidebarWidth = '20%';

  return (
    <>
      <div
        className="app-wrapper"
        style={{
          backgroundColor: '#141414',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header1 />

        <main
          className="main-content"
          style={{
            display: 'flex',
            flexGrow: 1,
            overflow: 'hidden',
          }}
        >
          <Sidebar
            onNavItemClick={handleSidebarItemClick}
            activeItem={currentPage}
          />

          <div
            className="main-panel"
            style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              marginLeft: sidebarWidth,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxSizing: 'border-box',
            }}
          >
            {currentPage === 'Home' ? (
              <FeedItems />
            ) : currentPage === 'Global Showroom' ? (
              <Marketplace />
            ) : null}
          </div>
        </main>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .main-content {
            flex-direction: column;
          }

          .main-panel {
            margin-left: 0 !important;
            width: 100% !important;
            padding: 10px !important;
          }
        }
      `}</style>
    </>
  );
}

export default Dashboard;
