import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ added

const steps = ['Address', 'Shipping', 'Payment', 'Review'];

const CheckoutComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState({
    firstName: '', lastName: '', address1: '', address2: '', city: '', country: '', state: '', zip: '', phone: '', email: '',
    shippingMethod: '', cardName: '', cardNumber: '', expiry: '', cvv: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // ✅ added

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
        -webkit-text-fill-color: white !important;
        background-color: transparent !important;
        caret-color: white !important;
        transition: background-color 9999s ease-out, color 9999s ease-out !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateStep = () => {
    let newErrors = {};
    if (activeStep === 0) {
      ['email', 'firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'country', 'phone'].forEach((field) => {
        if (!form[field]) newErrors[field] = `Enter valid ${field}`;
      });
    }
    if (activeStep === 1 && !form.shippingMethod) newErrors.shippingMethod = 'Select a shipping method';
    if (activeStep === 2) {
      if (!form.cardName) newErrors.cardName = 'Enter card holder name';
      if (!/\d{16}/.test(form.cardNumber)) newErrors.cardNumber = 'Enter valid card number';
      if (!/\d{2}\/\d{2}/.test(form.expiry)) newErrors.expiry = 'Format: MM/YY';
      if (!/\d{3}/.test(form.cvv)) newErrors.cvv = 'Enter valid CVV';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStepClick = (index) => {
    if (index <= activeStep) setActiveStep(index);
  };

  const nextStep = () => {
    if (validateStep()) setActiveStep((prev) => prev + 1);
  };

  const renderInput = (props) => (
    <input
      {...props}
      style={{ ...inputStyle, ...(props.style || {}) }}
      onFocus={(e) => e.target.style.border = '1px solid white'}
      onBlur={(e) => e.target.style.border = '1px solid white'}
    />
  );

  const renderLeftSection = () => {
    switch (activeStep) {
      case 0:
        return (
          <div style={{ flex: 2, marginLeft: '40px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Address</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '398px' }}>
              {renderInput({ name: "email", placeholder: "Email", value: form.email, onChange: handleChange })}

              <div style={{ display: 'flex', gap: '10px' }}>
                {renderInput({ name: "firstName", placeholder: "First Name", value: form.firstName, onChange: handleChange, style: { width: '194px' } })}
                {renderInput({ name: "lastName", placeholder: "Last Name", value: form.lastName, onChange: handleChange, style: { width: '194px' } })}
              </div>

              {renderInput({ name: "address1", placeholder: "Address", value: form.address1, onChange: handleChange })}
              {renderInput({ name: "address2", placeholder: "Apartment, suite, etc (optional)", value: form.address2, onChange: handleChange })}
              {renderInput({ name: "city", placeholder: "City", value: form.city, onChange: handleChange })}

              <div style={{ display: 'flex', gap: '5px' }}>
                {renderInput({ name: "country", placeholder: "Country", value: form.country, onChange: handleChange, style: { width: '130px' } })}
                {renderInput({ name: "state", placeholder: "State", value: form.state, onChange: handleChange, style: { width: '130px' } })}
                {renderInput({ name: "zip", placeholder: "ZIP Code", value: form.zip, onChange: handleChange, style: { width: '130px' } })}
              </div>

              {renderInput({ name: "phone", placeholder: "Phone Number", value: form.phone, onChange: handleChange })}

              <label style={{ fontSize: '13px', color: '#ccc' }}>
                <input type="checkbox" style={{ marginRight: '8px', accentColor: '#96105E' }} />
                Save contact information
              </label>

              <button onClick={nextStep} style={buttonStyle}>Continue to Shipping</button>
            </div>
          </div>
        );
      case 1:
        return (
          <div style={{ flex: 2, marginLeft: '40px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '30px' }}>Shipping</h2>
            <div style={{ width: '518px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* Standard Shipping Option */}
              <label style={shippingLabelStyle}>
                <div style={shippingLeftStyle}>
                  <input type="radio" name="shippingMethod" value="Standard" checked={form.shippingMethod === 'Standard'} onChange={handleChange} style={shippingInputStyle} />
                  <div>
                    <div style={shippingTitle}>Standard</div>
                    <div style={shippingSub}>Delivery Friday, May 23</div>
                  </div>
                </div>
                <div style={shippingPrice}>Free</div>
              </label>

              {/* Express Shipping Option */}
              <label style={shippingLabelStyle}>
                <div style={shippingLeftStyle}>
                  <input type="radio" name="shippingMethod" value="Express" checked={form.shippingMethod === 'Express'} onChange={handleChange} style={shippingInputStyle} />
                  <div>
                    <div style={shippingTitle}>Express</div>
                    <div style={shippingSub}>Delivered Tomorrow</div>
                  </div>
                </div>
                <div style={shippingPrice}>$12.00</div>
              </label>

              <button onClick={nextStep} style={{ ...buttonStyle, marginTop: '30px' }}>Continue to Payment</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div style={{ flex: 2, marginLeft: '40px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Payment Information</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '398px' }}>
              <select
                name="savedCard"
                value={form.savedCard}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  color: form.savedCard ? 'white' : 'grey',
                  backgroundColor: 'transparent',
                  border: '1px solid white',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                }}
              >
                <option value="" disabled>Select payment method</option>
                <option value="card1">Keya XXXXXXXXXXXX1234 — EXP 09/2028</option>
                <option value="card2">Keya XXXXXXXXXXXX1654 — EXP 09/2029</option>
              </select>
              <input name="cardName" placeholder="Card holder name" value={form.cardName} onChange={handleChange} style={inputStyle} />
              <input name="cardNumber" placeholder="Card number" value={form.cardNumber} onChange={handleChange} style={inputStyle} />
              <div style={{ display: 'flex', gap: '10px' }}>
                <input name="expiry" placeholder="MM/YY" value={form.expiry} onChange={handleChange} style={{ ...inputStyle, width: '194px' }} />
                <input name="cvv" placeholder="CVV" value={form.cvv} onChange={handleChange} style={{ ...inputStyle, width: '194px' }} />
              </div>
              <label style={{ fontSize: '13px', color: '#ccc' }}>
                <input type="checkbox" style={{ marginRight: '8px', accentColor: '#96105E' }} />
                Save card details for future payments
              </label>
              <button onClick={nextStep} style={{ ...buttonStyle, marginTop: '16px' }}>Pay now</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div style={{ flex: 2, marginLeft: '40px', width: '449px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Payment Information</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h4 style={{ fontWeight: 'bold', marginBottom: '6px' }}>Shipping address</h4>
                <p style={{ margin: 0 }}>Keya Shah</p>
                <p style={{ margin: 0 }}>4828 Jennifer Ct., Union City, 94587</p>
                <p style={{ margin: 0 }}>+1 123 456 789</p>
                <p style={editStyle}>Edit</p>
              </div>
              <div>
                <h4 style={{ fontWeight: 'bold', marginBottom: '6px' }}>Payment Information</h4>
                <p style={{ margin: 0 }}>Keya Shah</p>
                <p style={{ margin: 0 }}>XXXXXXXXXXXX1234</p>
                <p style={{ margin: 0 }}>09/2028</p>
                <p style={editStyle}>Edit</p>
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '6px' }}>Standard shipping</h4>
              <p style={{ margin: 0 }}>Delivery Friday, May 23</p>
              <p style={editStyle}>Edit</p>
            </div>
            <button
              onClick={() => navigate("/thankyou")} // ✅ added
              style={{
                backgroundColor: '#B10263',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '16px'
              }}
            >
              Place the order
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ flex: 1, paddingTop: '60px', paddingBottom: '40px', paddingLeft: '270px', paddingRight: '60px', boxSizing: 'border-box', color: 'white' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '40px' }}>Checkout</h1>
        <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start' }}>
          <div style={{ flex: 2 }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', marginLeft: '40px' }}>
              {steps.map((step, index) => (
                <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    onClick={() => handleStepClick(index)}
                    style={{
                      cursor: index <= activeStep ? 'pointer' : 'not-allowed',
                      color: 'white',
                      fontWeight: index === activeStep ? 'bold' : 'normal',
                      fontSize: '16px'
                    }}
                  >
                    {step}
                  </div>
                  {index < steps.length - 1 && <span style={{ margin: '0 10px', color: 'white' }}>—</span>}
                </div>
              ))}
            </div>
            {renderLeftSection()}
          </div>

          <div style={{ flex: 1, maxWidth: '440px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Order Summary</h3>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
              <img src="/b12.png" alt="Rose Activated Serum" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '4px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Rose Activated Serum, 30 ml</h2>
                  <div style={{ margin: '10px 0', display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <span style={{ fontSize: '16px', fontWeight: 'bold' }}>$100</span>
                    <span style={{ fontSize: '14px', color: '#aaa' }}>In Stock</span>
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
            <input placeholder="Enter coupon code here" style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '1px solid white', borderRadius: '4px', backgroundColor: 'transparent', color: 'white', fontSize: '14px', outline: 'none' }} />
            <div style={{ fontSize: '14px', marginBottom: '10px' }}>
              <div style={summaryRowStyle}><span>Subtotal</span><span>$100</span></div>
              <div style={summaryRowStyle}><span>Shipping Fee</span><span style={{ color: '#aaa' }}>Calculated at the next step</span></div>
              <div style={summaryRowStyle}><span>Sales Tax</span><span>$0.14</span></div>
            </div>
            <hr style={{ borderColor: '#555', margin: '12px 0' }} />
            <div style={{ ...summaryRowStyle, fontWeight: 'bold', fontSize: '16px' }}><span>Total</span><span>$100.14</span></div>
            <button
              onClick={() => navigate("/thankyou")} // ✅ added
              style={{
                marginTop: '20px',
                width: '100%',
                backgroundColor: '#B10263',
                color: 'white',
                padding: '14px',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '398px',
  height: '40px',
  padding: '10px 12px',
  fontSize: '14px',
  borderRadius: '4px',
  border: '1px solid white',
  backgroundColor: 'transparent',
  color: 'white',
  boxSizing: 'border-box',
  outline: 'none'
};

const buttonStyle = {
  width: '398px',
  height: '40px',
  backgroundColor: '#B10263',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '14px',
  marginTop: '16px'
};

const qtyBtnStyle = {
  backgroundColor: '#333',
  color: 'white',
  padding: '6px 12px',
  border: '1px solid #555',
  cursor: 'pointer',
  fontSize: '14px'
};

const actionBtnStyle = {
  backgroundColor: '#444',
  color: 'white',
  padding: '6px 14px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '14px'
};

const summaryRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px'
};

const shippingLabelStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  padding: '16px',
  border: '1px solid white',
  borderRadius: '6px',
  backgroundColor: 'transparent',
  color: 'white',
  cursor: 'pointer',
};

const shippingLeftStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

const shippingInputStyle = {
  accentColor: '#B10263',
  transform: 'scale(1.2)'
};

const shippingTitle = {
  fontWeight: 'bold',
  fontSize: '16px'
};

const shippingSub = {
  fontSize: '14px',
  color: '#ccc'
};

const shippingPrice = {
  fontWeight: 'bold',
  fontSize: '14px'
};

const editStyle = {
  marginTop: '8px',
  color: '#B10263',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '14px'
};

export default CheckoutComponent;
