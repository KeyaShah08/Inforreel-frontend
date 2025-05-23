function Sidebar({ onNavItemClick, activeItem }) {
  const handleNavItemClick = (item) => {
    onNavItemClick(item);
  };

  const handleCreatePostClick = () => {
    console.log('Create Post button clicked');
  };

  const baseLiStyle = {
    marginBottom: '10px',
    padding: '12px 0',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const activeLiStyle = {
    backgroundColor: '#262626',
    borderRight: '4px solid #96105E',
    paddingLeft: '25px',
    paddingRight: '8px',
  };

  const inactiveLiStyle = {
    paddingLeft: '25px',
    paddingRight: '12px',
  };

  const headerHeight = '11vh';

  return (
    <>
      <div className="sidebar">
        <div style={{ height: '100%', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <nav>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li
                style={{
                  ...baseLiStyle,
                  ...(activeItem === 'Home' ? activeLiStyle : inactiveLiStyle),
                }}
                onClick={() => handleNavItemClick('Home')}
              >
                <img src="/icons/home.svg" alt="Home" className="nav-icon" />
                <span className="nav-label">Home</span>
              </li>
              <li
                style={{
                  ...baseLiStyle,
                  ...(activeItem === 'Global Showroom' ? activeLiStyle : inactiveLiStyle),
                }}
                onClick={() => handleNavItemClick('Global Showroom')}
              >
                <img src="/icons/globalShowroom.svg" alt="Showroom" className="nav-icon" />
                <span className="nav-label">Global Showroom</span>
              </li>
              <li
                style={{
                  ...baseLiStyle,
                  ...(activeItem === 'Search' ? activeLiStyle : inactiveLiStyle),
                }}
                onClick={() => handleNavItemClick('Search')}
              >
                <img src="/icons/search.svg" alt="Search" className="nav-icon" />
                <span className="nav-label">Search</span>
              </li>
              <li
                style={{
                  ...baseLiStyle,
                  ...(activeItem === 'Chats' ? activeLiStyle : inactiveLiStyle),
                }}
                onClick={() => handleNavItemClick('Chats')}
              >
                <img src="/icons/chat.svg" alt="Chats" className="nav-icon" />
                <span className="nav-label">Chats</span>
              </li>
              <li
                style={{
                  ...baseLiStyle,
                  ...(activeItem === 'Library' ? activeLiStyle : inactiveLiStyle),
                }}
                onClick={() => handleNavItemClick('Library')}
              >
                <img src="/icons/library.svg" alt="Library" className="nav-icon" />
                <span className="nav-label">Library</span>
              </li>
            </ul>
          </nav>

          {/* Create Post Button */}
          <div style={{ paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px' }}>
            <button className="create-post-btn" onClick={handleCreatePostClick}>
              Create Post
            </button>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        .sidebar {
          display: flex;
          flex-direction: column;
          width: 20%;
          background-color: rgba(20, 20, 20, 0.35);
          color: white;
          padding: 0;
          padding-top: 20px;
          box-sizing: border-box;
          border-right: 1px solid rgba(51, 51, 51, 0.7);
          position: fixed;
          top: ${headerHeight};
          left: 0;
          height: calc(100vh - ${headerHeight});
          z-index: 1000;
        }

        .nav-icon {
          margin-right: 10px;
          width: 18px;
          height: 18px;
        }

        .create-post-btn {
          background-color: #96105E;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          width: 100%;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .create-post-btn {
            font-size: 14px;
            padding: 8px 15px;
          }

          .nav-icon {
            width: 16px;
            height: 16px;
          }

          .nav-label {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .nav-label {
            display: none;
          }

          .nav-icon {
            margin-right: 0;
            margin-left: 2px;
          }

          .create-post-btn {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

export default Sidebar;
