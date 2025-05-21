import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header1 from '../components/Header1';
import Marketplace from '../components/Marketplace';
import Sidebar from '../components/Sidebar';
import YourCart from '../components/YourCart';

const MyCart = () => {
  const [currentPage, setCurrentPage] = useState('My Cart');
  const navigate = useNavigate();

  // Watch for Home click and navigate to Dashboard page
  useEffect(() => {
    if (currentPage === 'Home') {
      navigate('/dashboard'); // 🔁 redirects to Dashboard page route
    }
  }, [currentPage, navigate]);

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#000',
        color: 'white',
      }}
    >
      <Sidebar onNavItemClick={setCurrentPage} activeItem={currentPage} />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(to bottom, #B1A596 5%, #4E4D4B 49%, #141414 66%, #000 100%)',
        }}
      >
        <Header1 />

        {/* ✅ Show content based on current page */}
        {currentPage === 'My Cart' ? (
          <YourCart />
        ) : currentPage === 'Global Showroom' ? (
          <Marketplace />
        ) : (
          <div style={{ color: 'white', padding: '40px' }}>
            <h2>{currentPage} page coming soon...</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCart;
