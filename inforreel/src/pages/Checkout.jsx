import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import navigate hook
import CheckoutComponent from '../components/CheckoutComponent';
import Header1 from '../components/Header1';
import Marketplace from '../components/Marketplace';
import Sidebar from '../components/Sidebar';

const Checkout = () => {
  const [currentPage, setCurrentPage] = useState('Checkout'); // Default selected
  const navigate = useNavigate(); // ✅ initialize navigate

  const handleNavItemClick = (item) => {
    setCurrentPage(item);
  };

  // ✅ Redirect to /dashboard when Home is clicked
  useEffect(() => {
    if (currentPage === 'Home') {
      navigate('/dashboard');
    }
  }, [currentPage, navigate]);

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#000',
      }}
    >
      <Sidebar onNavItemClick={handleNavItemClick} activeItem={currentPage} />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(to bottom, #B1A596 5%, #4E4D4B 49%, #141414 66%, #000 100%)',
        }}
      >
        <Header1 />

        {/* ✅ Conditional rendering based on selected sidebar item */}
        {currentPage === 'Checkout' ? (
          <CheckoutComponent />
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

export default Checkout;
