import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header1 from '../components/Header1';
import Marketplace from '../components/Marketplace';
import Sidebar from '../components/Sidebar';
import YourCart from '../components/YourCart';

const MyCart = () => {
  const [currentPage, setCurrentPage] = useState('');
  const navigate = useNavigate();

  // ✅ Always reset to 'My Cart' on load
  useEffect(() => {
    setCurrentPage('My Cart');
  }, []);

  const handleSidebarClick = (item) => {
    if (item === 'Home') {
      navigate('/dashboard');
    } else {
      setCurrentPage(item);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#000',
        color: 'white',
      }}
    >
      <Sidebar onNavItemClick={handleSidebarClick} activeItem={currentPage} />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(to bottom, #B1A596 5%, #4E4D4B 49%, #141414 66%, #000 100%)',
        }}
      >
        <Header1 />

        {/* ✅ Show correct section */}
        {currentPage === 'My Cart' && <YourCart />}
        {currentPage === 'Global Showroom' && <Marketplace />}
      </div>
    </div>
  );
};

export default MyCart;
