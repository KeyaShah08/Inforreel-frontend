import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import arrow icons
import ProductDetails from './ProductDetails';

function Beautyshowrooms () {
  const allImages = [
    {img:'/beauty1.png', Name:"Gucci", Smallimg:'/gucci.png'},
    {img:'/beauty2.png', Name:"Fenty Beauty", Smallimg:'/fentyBeauty.png'},
    {img:'/beauty3.png', Name:"Armani", Smallimg:'/armani.png'},
    {img:'/beauty2.png', Name:"Fenty Beauty", Smallimg:'/fentyBeauty.png'},
    {img:'/beauty1.png', Name:"Gucci", Smallimg:'/gucci.png'},
    {img:'/beauty3.png', Name:"Armani", Smallimg:'/armani.png'},
  ];
  const allProducts = [
    {img:'/be1.png', Name:"Chanel", Smallimg:'/be1_1.png'},
    {img:'/be2.png', Name:"Dior", Smallimg:'/be1_2.png'},
    {img:'/be3.png', Name:"La Prairie", Smallimg:'/be1_3.png'},
    {img:'/be2.png', Name:"Dior", Smallimg:'/be1_2.png'},
    {img:'/be3.png', Name:"Chanel", Smallimg:'/be1_3.png'},
    {img:'/be1.png', Name:"La Prairie", Smallimg:'/be1_1.png'},
  ];
  const allAmbassadors = [
    {img:'/i1.png', Name:"Estée Lauder", Smallimg:'/i_11.png'},
    {img:'/i2.png', Name:"Mac Cosmetics", Smallimg:'/i_12.png'},
    {img:'/i3.png', Name:"Guerlain", Smallimg:'/i_13.png'},
    {img:'/i2.png', Name:"Mac Cosmetics", Smallimg:'/i_12.png'},
    {img:'/i3.png', Name:"Guerlain", Smallimg:'/i_13.png'},
    {img:'/i1.png', Name:"Estée Lauder", Smallimg:'/i_11.png'},
  ];
  const allVideos = [
    '/samplevideo1.mp4',
    '/samplevideo2.mp4',
    '/samplevideo3.mp4',
    '/samplevideo4.mp4',
    '/samplevideo5.mp4',
    '/samplevideo6.mp4',
    
  ];

  const [displayedImages, setDisplayedImages] = useState(allImages.slice(0, 3));
  const [displayedProducts, setDisplayedProducts] = useState(allProducts.slice(0, 3));
  const [displayedAmbassadors, setDisplayedAmbassadors] = useState(allAmbassadors.slice(0, 3));
  const [displayedVideos, setDisplayedVideos] = useState(allVideos.slice(0, 3));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productIndex, setProductIndex] = useState(0);
  const [ambassadorIndex, setAmbassadorIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const imageContainerRef = useRef(null);
  const [isNextDisabled, setIsNextDisabled] = useState(allImages.length <= 3);
  const [isProductNextDisabled, setIsProductNextDisabled] = useState(allProducts.length <= 3);
  const [isAmbassadorNextDisabled, setIsAmbassadorNextDisabled] = useState(allAmbassadors.length <= 3);
  const [isVideoNextDisabled, setIsVideoNextDisabled] = useState(allVideos.length <= 3);
  const [previousImages, setPreviousImages] = useState([]); // Track previously displayed images
  const [previousProducts, setPreviousProducts] = useState([]);
  const [previousAmbassadors, setPreviousAmbassadors] = useState([]);
  const [previousVideos, setPreviousVideos] = useState([]);
  const [showBeautyShowroom, setShowBeautyShowroom] = useState(false);

  const nextImage = () => {
    if (imageContainerRef.current && currentIndex + 3 < allImages.length) {
      // Store the current images as previous images
      setPreviousImages(displayedImages);

      setCurrentIndex(currentIndex + 3);
      const newImages = allImages.slice(currentIndex + 3, Math.min(currentIndex + 6, allImages.length));
      setDisplayedImages(newImages); //directly set new images, don't accumulate
      if (currentIndex + 6 >= allImages.length) {
        setIsNextDisabled(true);
      }
    }
  };

  const prevImage = () => {
    if (imageContainerRef.current && currentIndex - 3 >= 0) {
      setPreviousImages(displayedImages);
      setCurrentIndex(currentIndex - 3);
      const newImages = allImages.slice(Math.max(0, currentIndex - 3), currentIndex);
      setDisplayedImages(newImages);
      setIsNextDisabled(false);
    }
  };

  const nextProduct = () => {
    if (imageContainerRef.current && productIndex + 3 < allProducts.length) {
      // Store the current images as previous images
      setPreviousProducts(displayedProducts);

      setProductIndex(productIndex + 3);
      const newProducts = allProducts.slice(productIndex + 3, Math.min(productIndex + 6, allProducts.length));
      setDisplayedProducts(newProducts); //directly set new images, don't accumulate
      if (productIndex + 6 >= allProducts.length) {
        setIsProductNextDisabled(true);
      }
    }
  };

  const prevProduct = () => {
    if (imageContainerRef.current && productIndex - 3 >= 0) {
      setPreviousProducts(displayedProducts);
      setProductIndex(productIndex - 3);
      const newProducts = allProducts.slice(Math.max(0, productIndex - 3), productIndex);
      setDisplayedProducts(newProducts);
      setIsProductNextDisabled(false);
    }
  };

  const nextAmbassador = () => {
    if (imageContainerRef.current && ambassadorIndex + 3 < allAmbassadors.length) {
      // Store the current images as previous images
      setPreviousAmbassadors(displayedAmbassadors);

      setAmbassadorIndex(ambassadorIndex + 3);
      const newAmbassadors = allAmbassadors.slice(ambassadorIndex + 3, Math.min(ambassadorIndex + 6, allAmbassadors.length));
      setDisplayedAmbassadors(newAmbassadors); //directly set new images, don't accumulate
      if (ambassadorIndex + 6 >= allAmbassadors.length) {
        setIsAmbassadorNextDisabled(true);
      }
    }
  };

  const prevAmbassador = () => {
    if (imageContainerRef.current && ambassadorIndex - 3 >= 0) {
      setPreviousAmbassadors(displayedAmbassadors);
      setAmbassadorIndex(ambassadorIndex - 3);
      const newAmbassadors = allAmbassadors.slice(Math.max(0, ambassadorIndex - 3), ambassadorIndex);
      setDisplayedAmbassadors(newAmbassadors);
      setIsAmbassadorNextDisabled(false);
    }
  };

  const nextVideo = () => {
    if (imageContainerRef.current && videoIndex + 3 < allVideos.length) {
      setPreviousVideos(displayedVideos);
      setVideoIndex(videoIndex + 3);
      const newVideos = allVideos.slice(videoIndex + 3, Math.min(videoIndex + 6, allVideos.length));
      setDisplayedVideos(newVideos);
      setIsVideoNextDisabled(true);
    }
  };

  const prevVideo = () => {
    if (imageContainerRef.current && videoIndex - 3 >= 0) {
      setPreviousVideos(displayedVideos);
      setVideoIndex(videoIndex - 3);
      const newVideos = allVideos.slice(Math.max(0, videoIndex - 3), videoIndex);
      setDisplayedVideos(newVideos);
      setIsVideoNextDisabled(false);
    }
  };
  const handleDetailView = () => {
    setShowBeautyShowroom(true);
  };
  useEffect(() => {
    //   console.log("Displayed Images:", displayedImages);
    //   console.log("Previous Images:", previousImages);
  }, [displayedImages, previousImages]);

  return (
    <>
    {showBeautyShowroom ? (
      <ProductDetails />
    ) : (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#000'
      }}>
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
          paddingLeft: "270px"
        }}>


          {/* Shop by Brands Section */}
          <section style={{ marginTop: '71px', textAlign: 'left' }}>
          <h1 style={{ fontSize: '70px', display: 'flex', alignItems:"center", justifyContent:"center" }}>Beauty showrooms</h1>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: "flex-end" }}>
              {/* Navigation Buttons */}
              <div style={{ width:"100%",display: 'flex', marginTop:"20px", marginBottom: '20px', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              
                <div style={{ display: 'flex' }}>
                  <button
                    onClick={prevImage}
                    style={{
                      background: '#868584',
                      color: '#000',
                      border: 'none',
                      padding: '5px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      zIndex: 10,
                      marginRight: '20px',
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '48px',
                      height: '48px',
                    }}
                    disabled={currentIndex === 0}
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={nextImage}
                    style={{  
                      background: '#868584',
                      color: '#000',
                      border: 'none',
                      padding: '5px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      marginBottom: '20px',
                      marginRight: '20px',
                      zIndex: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '48px',
                      height: '48px',
                    }}
                    disabled={isNextDisabled}
                  >
                    <ChevronRight size={32} />
                  </button>
                </div>
              </div>
              <div
                ref={imageContainerRef}
                style={{
                  display: 'flex',
                  overflowX: 'auto',
                  paddingBottom: '20px',
                  scrollSnapType: 'x mandatory',
                  WebkitOverflowScrolling: 'touch',
                  justifyContent: "space-between"
                }}
              >
                {displayedImages.map((image, index) => (
                  <div key={index} style={{
                    flex: '0 0 auto',
                    width: '32%',
                    height: '32%',
                    marginRight: '10px',
                    borderRadius: '8px',
                    scrollSnapAlign: 'start',
                    transition: 'opacity 0.5s ease-in-out', // Add smooth transition
                    opacity: previousImages.includes(image) ? 0 : 1, // Hide previous images
                  }} onClick={() => handleDetailView()}>
                    <img
                      src={image.img}
                      alt={`Brand ${index + 1}`}
                      style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop:"16px",
                      justifyContent: 'center',
                    }}>
                      <img
                        src={image.Smallimg}
                        alt={`Brand ${index + 1}`}
                      />
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft:"16px",
                        fontSize:"20px"
                      }}>{image.Name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Shop by Product Section */}
          <section style={{  textAlign: 'left', marginTop: '40px' }}>
          
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: "flex-end"  }}>
              {/* Navigation Buttons */}
              <div style={{ display: 'flex', width:"100%",marginTop:"20px",marginBottom: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                
                <div style={{ display: 'flex' }}>
                  <button
                    onClick={prevProduct}
                    style={{
                      background: '#868584',
                      color: '#000',
                      border: 'none',
                      padding: '5px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      zIndex: 10,
                      marginBottom: '20px',
                      marginRight: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '48px',
                      height: '48px',
                    }}
                    disabled={productIndex === 0}
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={nextProduct}
                    style={{
                      background: '#868584',
                      color: '#000',
                      border: 'none',
                      padding: '5px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      zIndex: 10,
                      marginBottom: '20px',
                      marginRight: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '48px',
                      height: '48px',
                    }}
                    disabled={isProductNextDisabled}
                  >
                    <ChevronRight size={32} />
                  </button>
                </div>
              </div>
              <div
                ref={imageContainerRef}
                style={{
                  display: 'flex',
                  overflowX: 'auto',
                  paddingBottom: '20px',
                  scrollSnapType: 'x mandatory',
                  WebkitOverflowScrolling: 'touch',
                  justifyContent: "space-between"
                }}
              >
                {displayedProducts.map((product, index) => (
                  <div key={index} style={{
                    flex: '0 0 auto',
                    width: '32%',
                    height: '32%',
                    marginRight: '10px',
                    borderRadius: '8px',
                    scrollSnapAlign: 'start',
                    transition: 'opacity 0.5s ease-in-out', // Add smooth transition
                    opacity: previousProducts.includes(product) ? 0 : 1, // Hide previous images
                  }} onClick={() => handleDetailView()}>
                    <img
                      src={product.img}
                      alt={`Product ${index + 1}`}
                      style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop:"16px",
                      justifyContent: 'center',
                    }}>
                      <img
                        src={product.Smallimg}
                        alt={`Brand ${index + 1}`}
                      />
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft:"16px",
                        fontSize:"20px"
                      }}>{product.Name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Shop by Brand Ambassador Section */}
          <section style={{  textAlign: 'left', marginTop: '40px' }}>
          
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: "flex-end"  }}>
              {/* Navigation Buttons */}
              <div style={{ display: 'flex', width: "100%", marginTop:"20px",marginBottom: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              
                <div style={{ display: 'flex' }}>
                  <button
                    onClick={prevAmbassador}
                    style={{
                      background: '#868584',
                      color: '#000',
                      border: 'none',
                      padding: '5px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      zIndex: 10,
                      marginRight: '20px',
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '48px',
                      height: '48px',
                    }}
                    disabled={ambassadorIndex === 0}
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={nextAmbassador}
                    style={{
                      background: '#868584',
                      color: '#000',
                      border: 'none',
                      padding: '5px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      zIndex: 10,
                      marginRight: '20px',
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '48px',
                      height: '48px',
                    }}
                    disabled={isAmbassadorNextDisabled}
                  >
                    <ChevronRight size={32} />
                  </button>
                </div>
              </div>
              <div
                ref={imageContainerRef}
                style={{
                  display: 'flex',
                  overflowX: 'auto',
                  paddingBottom: '20px',
                  scrollSnapType: 'x mandatory',
                  WebkitOverflowScrolling: 'touch',
                  justifyContent: "space-between"
                }}
              >
                {displayedAmbassadors.map((ambassador, index) => (
                  <div key={index} style={{
                    flex: '0 0 auto',
                    width: '32%',
                    height: '32%',
                    marginRight: '10px',
                    borderRadius: '8px',
                    scrollSnapAlign: 'start',
                    transition: 'opacity 0.5s ease-in-out', // Add smooth transition
                    opacity: previousAmbassadors.includes(ambassador) ? 0 : 1, // Hide previous images
                  }} onClick={() => handleDetailView()}>
                    <img
                      src={ambassador.img}
                      alt={`Ambassador ${index + 1}`}
                      style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop:"16px",
                      justifyContent: 'center',
                    }}>
                      <img
                        src={ambassador.Smallimg}
                        alt={`Brand ${index + 1}`}
                      />
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft:"16px",
                        fontSize:"20px"
                      }}>{ambassador.Name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    )}
    </>
  );
}

export default Beautyshowrooms ;
