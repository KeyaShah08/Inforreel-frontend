// Thankyou.jsx
import { CheckCircle } from 'lucide-react'; // or replace with any check icon
import { useNavigate } from 'react-router-dom';
import Header1 from '../components/Header1';
import Sidebar from '../components/Sidebar';

export default function Thankyou() {
  const navigate = useNavigate();

  const handleNavItemClick = (item) => {
    console.log('Nav clicked:', item);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000' }}>
      <Sidebar onNavItemClick={handleNavItemClick} activeItem="My cart" />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(to bottom, #B1A596 5%, #4E4D4B 49%, #141414 66%, #000 100%)',
          color: 'white',
        }}
      >
        <Header1 />

        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '60px',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '600px' }}>
            {/* Checkmark Icon */}
            <div style={{ marginBottom: '30px' }}>
              <CheckCircle size={80} strokeWidth={1.5} color="white" />
            </div>

            {/* Success Message */}
            <p style={{ fontSize: '18px', marginBottom: '10px' }}>Your order was successful</p>

            {/* Heading */}
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>
              Thanks for your purchase!
            </h1>

            {/* Order Info */}
            <p style={{ fontSize: '16px', color: '#D9D9D9', marginBottom: '30px' }}>
              Your order number is <strong>#1123455</strong><br />
              You’ll receive an email confirming your order details.
            </p>

            {/* Primary Button */}
            <button
              onClick={() => alert("Redirect to tracking page")}
              style={{
                backgroundColor: '#B10263',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '14px 36px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '16px',
              }}
            >
              Track your order
            </button>

            {/* Secondary Button */}
            <div>
              <button
                onClick={() => navigate('/')}
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '1px solid white',
                  borderRadius: '6px',
                  padding: '12px 28px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Back to home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
