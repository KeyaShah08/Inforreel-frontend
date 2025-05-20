import Header1 from '../components/Header1';
import Sidebar from '../components/Sidebar';
import YourCart from '../components/YourCart';

const MyCart = () => {
  const handleNavItemClick = (item) => {
    console.log('Nav clicked:', item);
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#000',
      }}
    >
      <Sidebar onNavItemClick={handleNavItemClick} activeItem="My cart" />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(to bottom, #B1A596 5%, #4E4D4B 49%, #141414 66%, #000 100%)',
        }}
      >
        <Header1 />
        <YourCart />
      </div>
    </div>
  );
};

export default MyCart;
