// components/YourCart.jsx
import { useNavigate } from 'react-router-dom';

const qtyBtnStyle = {
  backgroundColor: '#333',
  color: 'white',
  padding: '6px 12px',
  border: '1px solid #555',
  cursor: 'pointer',
  fontSize: '14px',
};

const actionBtnStyle = {
  backgroundColor: '#444',
  color: 'white',
  padding: '6px 14px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '14px',
};

const summaryRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px',
};

const YourCart = () => {
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    navigate('/checkout');
  };

  return (
    <div
      style={{
        flex: 1,
        paddingTop: '60px',
        paddingBottom: '40px',
        paddingLeft: '270px',
        paddingRight: '60px',
        boxSizing: 'border-box',
        color: 'white',
      }}
    >
      <h1
        style={{
          fontSize: '36px',
          fontWeight: 'bold',
          marginBottom: '36px',
          marginTop: '60px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        My cart
      </h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '40px',
        }}
      >
        {/* Left: Product Info */}
        <div style={{ width: '50%' }}>
          <p style={{ color: 'white', fontSize: '14px', marginTop: '36px', marginBottom: '16px' }}>
            Not ready to checkout?{' '}
            <span style={{ textDecoration: 'underline' }}>Continue Shopping</span>
          </p>

          <div style={{ display: 'flex', gap: '20px' }}>
            <img
              src="/b12.png"
              alt="Rose Activated Serum"
              style={{
                width: '120px',
                height: '120px',
                objectFit: 'cover',
                borderRadius: '4px',
              }}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
                  Rose Activated Serum, 30 ml
                </h2>
                <div
                  style={{
                    margin: '12px 0',
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>$100</span>
                  <span style={{ fontSize: '14px', color: 'white' }}>In Stock</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button style={qtyBtnStyle}>-</button>
                <span>1</span>
                <button style={qtyBtnStyle}>+</button>
                <button style={actionBtnStyle}>Delete</button>
                <button style={actionBtnStyle}>Save</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div
          style={{
            width: '30%',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '6px',
            color: 'white',
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', marginTop: '36px' }}>
            Order Summary
          </h3>

          <input
            placeholder="Enter coupon code here"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '20px',
              border: '1px solid #666',
              borderRadius: '4px',
              backgroundColor: 'transparent',
              color: 'white',
              fontSize: '14px',
            }}
          />

          <div style={{ fontSize: '14px', marginBottom: '10px' }}>
            <div style={summaryRowStyle}>
              <span>Subtotal</span>
              <span>$100</span>
            </div>
            <div style={summaryRowStyle}>
              <span>Shipping Fee</span>
              <span style={{ color: '#aaa' }}>Calculated at the next step</span>
            </div>
            <div style={summaryRowStyle}>
              <span>Sales Tax</span>
              <span>$0.14</span>
            </div>
          </div>

          <hr style={{ borderColor: '#555', margin: '12px 0' }} />

          <div style={{ ...summaryRowStyle, fontWeight: 'bold', fontSize: '16px' }}>
            <span>Total</span>
            <span>$100.14</span>
          </div>

          <button
            onClick={handleCheckoutClick}
            style={{
              marginTop: '20px',
              width: '100%',
              backgroundColor: '#A00060',
              color: 'white',
              padding: '14px',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Continue to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default YourCart;
