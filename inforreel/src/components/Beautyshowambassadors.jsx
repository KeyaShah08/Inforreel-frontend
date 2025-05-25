import { useState } from 'react';
import Marketplace from './Marketplace';
import ProductDetails2 from './ProductDetails2';

function Beautyshowambassadors () {
  const allImages = [
    {img:'/w1.png', Name:"Rihanna"},
    {img:'/w2.png', Name:"Cara Delevingne"},
    {img:'/w4.png', Name:"Jin"},
    {img:'/w3.png', Name:"Armani"},
    {img:'/w5.png', Name:"Guerlain"},
    {img:'/w6.png', Name:"Kendall Jenner"},
    {img:'/w7.png', Name:"Ariana Greenblatt"},
    {img:'/w8.png', Name:"Jude Bellingham"},
    {img:'/w9.png', Name:"Lisa"},
    {img:'/w10.png', Name:"Kris Wu"},
    {img:'/w11.png', Name:"Ryan Gosling"},
    {img:'/w12.png', Name:"Naomi Osaka"},
    {img:'/w13.png', Name:"Zendaya"},
  ];

  const [showBeautyShowroom, setShowBeautyShowroom] = useState(false);
  const [isBack, setBackView] = useState(false);

  const handleDetailView = () => {
    setShowBeautyShowroom(true);
  };

  const handleack = () => {
    setBackView(true);
  };

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  return (
    <>
      {showBeautyShowroom ? (
        <ProductDetails2 />
      ) : isBack ? (
        <Marketplace />
      ) : (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#141414',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          <style>
            {`
              ::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <div style={{
            position: 'absolute',
            top: 0,
            left: "0px",
            width: '100%',
            zIndex: 5,
            color: 'white',
            padding: '20px',
            textAlign: 'center',
            boxSizing: 'border-box',
            background: 'linear-gradient(to bottom, rgba(177, 165, 150, 0.65) 5%, rgba(78, 77, 75, 0.65) 25%, rgba(20, 20, 20, 0.65) 35%)',
            paddingLeft: "280px"
          }}>

            <section style={{ marginTop: '71px', textAlign: 'left' }}>
              <img
                onClick={() => handleack()}
                src={'/backArrow.png'}
                alt={`backArrow`}
                style={{
                  width: "auto",
                  height: "auto",
                  borderRadius: "0px",
                  objectFit: "cover",
                  position: "relative",
                  top: "76px",
                  marginRight: "6px",
                  marginTop: "3px"
                }}
              />
              <h1 style={{
                fontSize: '70px',
                display: 'flex',
                alignItems: "center",
                justifyContent: "center",
                marginBottom: '40px'
              }}>Beauty brand ambassadors</h1>

              {chunkArray(allImages, 3).map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '42px',
                    justifyContent: 'center',
                    marginBottom: '40px'
                  }}
                >
                  {row.map((image, index) => (
                    <div
                      key={index}
                      style={{ width: '373.25px', height: '278px', cursor: 'pointer' }}
                      onClick={() => handleDetailView()}
                    >
                      <img
                        src={image.img}
                        alt={`Brand ${index + 1}`}
                        style={{
                          width: '300.04px',
                          height: '177.89px',
                          objectFit: 'cover'
                        }}
                      />
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: "30px",
                        justifyContent: 'center'
                      }}>
                        <span style={{ marginLeft: "16px", fontSize: "20px" }}>{image.Name}</span>
                      </div>
                    </div>
                  ))}

                  {Array.from({ length: 3 - row.length }).map((_, i) => (
                    <div
                      key={`placeholder-${i}`}
                      style={{ width: '373.25px', height: '278px', visibility: 'hidden' }}
                    />
                  ))}
                </div>
              ))}
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default Beautyshowambassadors;
