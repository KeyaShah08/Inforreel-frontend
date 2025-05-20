import CheckoutComponent from '../components/CheckoutComponent';
import Header1 from '../components/Header1';
import Sidebar from '../components/Sidebar';

const Checkout = () => {
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
      <Sidebar onNavItemClick={handleNavItemClick} activeItem="Checkout" />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(to bottom, #B1A596 5%, #4E4D4B 49%, #141414 66%, #000 100%)',
        }}
      >
        <Header1 />
        <CheckoutComponent />
      </div>
    </div>
  );
};

export default Checkout;
