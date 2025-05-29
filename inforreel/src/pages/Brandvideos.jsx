import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header1 from '../components/Header1';
import Marketplace from '../components/Marketplace';
import Sidebar from '../components/Sidebar';

const Brandvideos = () => {
const [currentPage, setCurrentPage] = useState('Brand Videos');
  const navigate = useNavigate();

  const handleSidebarClick = (item) => {
    if (item === 'Home') {
      navigate('/dashboard');
    } else {
      setCurrentPage(item);
    }
  };

  const allVideos = [
    { video: '/BV/bv1.mp4', Name: "Gucci", Smallimg: '/gucci.png',description: 'Gucci Beauty Limited-Edition'},
    { video: '/BV/bv2.mp4', Name: "Fenty Beauty", Smallimg: '/fentyBeauty.png', description: 'Soft Matte Longwear Foundation'},
    { video: '/BV/bv3.mp4', Name: "Armani", Smallimg: '/armani.png',description: 'Lip Maestro Liquid Lipstick' },
    { video: '/BV/bv4.mp4', Name: "Chanel", Smallimg: '/be1_1.png', description:'Beauty Essentials' },
    { video: '/BV/bv5.mp4', Name: "Dior", Smallimg: '/be1_2.png',   description: 'Dior Prestige La Crème'},
    { video: '/BV/bv6.mp4', Name: "La Prairie", Smallimg: '/be1_3.png', description: 'Pure Gold Radiance Concentrate'},
    { video: '/BV/bv7.mp4', Name: "Estée Lauder", Smallimg: '/i_11.png', description:'Advanced Night Repair Serum' },
    { video: '/BV/bv8.mp4', Name: "Mac Cosmetics", Smallimg: '/i_12.png', description: 'Beauty Essentials'},
    { video: '/BV/bv9.mp4', Name: "Guerlain", Smallimg: '/i_13.png', description: 'Abeille Royale Youth Watery Oil' },
    { video: '/BV/bv1.mp4', Name: "Fenty Beauty", Smallimg: '/fentyBeauty.png', description: 'Soft Matte Longwear Foundation' },
  ];

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#141414',
        color: 'white',
        overflow: 'hidden',
      }}
    >
      <Sidebar onNavItemClick={handleSidebarClick} activeItem={currentPage} />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(to bottom, #B1A596 5%, #4E4D4B 49%, #141414 66%, #141414 100%)',
          overflowY: 'auto',
        }}
      >
        <Header1 />

        {currentPage === 'Brand Videos' && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              minHeight: '100vh',
              backgroundColor: '#141414',
              overflowY: 'scroll',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <style>
              {`
                ::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '0px',
                width: '100%',
                zIndex: 5,
                color: 'white',
                padding: '20px',
                textAlign: 'center',
                boxSizing: 'border-box',
                background:
                  'linear-gradient(to bottom, rgba(177, 165, 150, 0.65) 5%, rgba(78, 77, 75, 0.65) 25%, rgba(20, 20, 20, 0.65) 35%)',
                paddingLeft: '280px',
              }}
            >
              <section style={{ marginTop: '71px', textAlign: 'left' }}>
                
                <h1
                  style={{
                    fontSize: '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '40px',
                  }}
                >
                  Brand Videos
                </h1>

                {chunkArray(allVideos, 3).map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '42px',
                      justifyContent: 'center',
                      marginBottom: '40px',
                    }}
                  >
                    {row.map((videoItem, index) => (
                      <div
                        key={index}
                        style={{ width: '373.25px', height: '278px', cursor: 'pointer' }}
                        onClick={() => navigate('/brandvideos1', { state: { video: videoItem } })}
                      >
                        <video
                          src={videoItem.video}
                          muted
                          playsInline
                          style={{
                            width: '300.04px',
                            height: '177.89px',
                            objectFit: 'cover',
                          }}
                          onMouseEnter={(e) => e.target.play()}
                          onMouseLeave={(e) => {
                            e.target.pause();
                            e.target.currentTime = 0;
                          }}
                        />
<div
  style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '30px',
    textAlign: 'center'
  }}
>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img src={videoItem.Smallimg} alt={`Brand ${index + 1}`} />
    <span style={{ marginLeft: '16px', fontSize: '20px' }}>
      {videoItem.Name}
    </span>
  </div>
  <p style={{ marginTop: '6px', fontSize: '16px', color: '#d3d3d3' }}>
    {videoItem.description}
  </p>
</div>                      </div>
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

        {currentPage === 'Global Showroom' && <Marketplace />}
      </div>
    </div>
  );
};

export default Brandvideos;
