import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import arrow icons
import ProductDetails from './ProductDetails';

function BeautyProducts () {
  const allImages = [
    {img:'/b11.png', Name:"Gucci", Smallimg:'/gucci.png'},
    {img:'/b12.png', Name:"Fenty Beauty", Smallimg:'/fentyBeauty.png'},
    {img:'/b13.png', Name:"Armani", Smallimg:'/armani.png'},
    {img:'/b12.png', Name:"Fenty Beauty", Smallimg:'/fentyBeauty.png'},
    {img:'/b13.png', Name:"Gucci", Smallimg:'/gucci.png'},
    {img:'/b11.png', Name:"Armani", Smallimg:'/armani.png'},
  ];
  const allProducts = [
    {img:'/b111.png', Name:"Chanel", Smallimg:'/be1_1.png'},
    {img:'/b112.png', Name:"Dior", Smallimg:'/be1_2.png'},
    {img:'/b113.png', Name:"La Prairie", Smallimg:'/be1_3.png'},
    {img:'/b112.png', Name:"Dior", Smallimg:'/be1_2.png'},
    {img:'/b113.png', Name:"Chanel", Smallimg:'/be1_3.png'},
    {img:'/b111.png', Name:"La Prairie", Smallimg:'/be1_1.png'},
  ];
  const allAmbassadors = [
    {img:'/v11.png', Name:"Estée Lauder", Smallimg:'/i_11.png'},
    {img:'/v12.png', Name:"Mac Cosmetics", Smallimg:'/i_12.png'},
    {img:'/v13.png', Name:"Guerlain", Smallimg:'/i_13.png'},
    {img:'/v12.png', Name:"Mac Cosmetics", Smallimg:'/i_12.png'},
    {img:'/v13.png', Name:"Guerlain", Smallimg:'/i_13.png'},
    {img:'/v11.png', Name:"Estée Lauder", Smallimg:'/i_11.png'},
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
    <style>
      {`
      .Effect:nth-of-type(1) .HoverEffect {
        left:0; 
      }
      .Effect:nth-of-type(2) .HoverEffect { 
        left:auto;
        right: auto;
      }
      .Effect:nth-of-type(n+3) .HoverEffect {
        right: 20px;
      }
        .OnHover .HoverEffect {
          display:none;
          transition:all 1s ease-in-out;
        }
        .OnHover:hover .HoverEffect {
          display:block;
          transition:all 1s ease-in-out;
        }
        .HoverEffect {
          width:36%;
          position: absolute;
          z-index:9999;
          top:0;
        }
      `}
    </style>
    {showBeautyShowroom ? (
      <ProductDetails />
    ) : (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#000' // Changed to black
        // background: 'linear-gradient(to bottom, #141414, #282828)', // Removed gradient
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
          <h1 style={{ fontSize: '70px', display: 'flex', alignItems:"center", justifyContent:"center" }}>Beauty products</h1>
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
                  <div key={index} className='Effect' style={{
                    flex: '0 0 auto',
                    width: '32%',
                    height: '32%',
                    marginRight: '10px',
                    borderRadius: '0',
                    scrollSnapAlign: 'start',
                    transition: 'opacity 0.5s ease-in-out', // Add smooth transition
                    opacity: previousImages.includes(image) ? 0 : 1, // Hide previous images
                  }} onClick={() => handleDetailView()}>
                    <span className='OnHover'>
                        <img
                          src={image.img}
                          alt={`Brand ${index + 1}`}
                          style={{ width: '100%', height: '100%', borderRadius: '0', objectFit: 'cover' }}
                        />
                          <div className='HoverEffect'>
                            <img
                              src={image.img}
                                    alt={`Brand ${index + 1}`}
                                    style={{ width: '100%', height: '100%', borderRadius: '0', objectFit: 'cover' }}
                                  />
                              <div style={{background: '#2f2f2f',padding:"15px",marginTop: '-5px'}}>
                                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                                    <div style={{display:"flex", alignItems:"center", justifyContent:"flex-start"}}>
                                      <button type='button' style={{  
                                            background: '#7b7b7b',
                                            border:"none",
                                            padding:"5px 15px",
                                            display:"flex",
                                            alignItems:"center",
                                            justifyContent:"center",
                                            borderRadius:"20px",
                                            height:"42px",
                                            marginRight:"10px",
                                          }}
                                        >
                                          <img
                                            src={"/Thumb.png"}
                                            alt={`cdiorbeauty`}
                                          /> <span style={{color:"#fff", fontSize:"13px", paddingLeft:"5px", marginTop:"1px"}}>241</span>
                                      </button>
                                      <button type='button' style={{  
                                            background: '#7b7b7b',
                                            border:"none",
                                            padding:"5px 15px",
                                            display:"flex",
                                            alignItems:"center",
                                            justifyContent:"center",
                                            borderRadius:"20px",
                                            height:"42px",
                                            marginRight:"10px",
                                          }}
                                        >
                                          <img
                                            src={"/Msg.png"}
                                            alt={`cdiorbeauty`}
                                          /> <span style={{color:"#fff", fontSize:"13px", paddingLeft:"5px", marginTop:"1px"}}>32</span>
                                      </button>
                                      <button type='button' style={{  
                                            background: '#7b7b7b',
                                            border:"none",
                                            padding:"8px 15px",
                                            display:"flex",
                                            alignItems:"center",
                                            justifyContent:"center",
                                            borderRadius:"50%",
                                            width:"42px",
                                            height:"42px",
                                            marginRight:"10px",
                                          }}
                                        >
                                          <img
                                            src={"/cart.png"}
                                            alt={`cdiorbeauty`}
                                          />
                                      </button>
                                      <button type='button' style={{  
                                            background: '#7b7b7b',
                                            border:"none",
                                            display:"flex",
                                            alignItems:"center",
                                            justifyContent:"center",
                                            borderRadius:"50%",
                                            width:"42px",
                                            height:"42px",
                                            marginRight:"10px",
                                          }}
                                        >
                                          <img
                                            src={"/send.png"}
                                            alt={`cdiorbeauty`}
                                          />
                                      </button>
                                    </div>
                                    <div style={{display:"flex", alignItems:"center", justifyContent:"flex-end"}}>
                                      <button type='button' style={{  
                                            background: '#7b7b7b',
                                            border:"none",
                                            display:"flex",
                                            alignItems:"center",
                                            justifyContent:"center",
                                            borderRadius:"50%",
                                            width:"42px",
                                            height:"42px",
                                          }}
                                        >
                                          <img
                                            src={"/down.png"}
                                            alt={`cdiorbeauty`}
                                          />
                                      </button>
                                    </div>
                                </div>
                                <div style={{display: 'flex',alignItems:"center",justifyContent: 'flex-start', marginTop:"25px"}}>                                  
                                  <img
                                      src={'/gucci.png'}
                                      alt={`Brand ${index + 1}`}
                                      style={{width: "auto",height: "auto",borderRadius: "0px",objectFit: "cover",marginRight:"5px",}}
                                    />
                                  <span style={{display: 'flex',alignItems:"center",justifyContent: 'flex-start', fontWeight:"bold", fontSize:"20px"}}>Dior</span>
                                </div>
                                <div style={{display: 'block', marginTop:"15px"}}>
                                  <p style={{display: 'block', fontSize:"15px", marginTop:"10px", color:"#d2d2d2"}}>Dior Prestige La Micro-Huile de Rose Activated Serum</p>
                                  <p style={{display: 'block', fontSize:"12px", marginTop:"5px", color:"#d2d2d2"}}>Exceptional Repairing Micro-Nutritive Serum</p>
                                </div>
                                <div style={{display: 'flex', alignItems:"center",justifyContent: 'flex-start', marginTop:"15px"}}>
                                  <p style={{display: 'flex', alignItems:"center",justifyContent: 'flex-start', marginRight:"20px",fontSize:"16px"}}>$100.00</p>
                                  <img
                                      src={'/star.png'}
                                      alt={`Brand ${index + 1}`}
                                      style={{width: "auto",height: "auto",borderRadius: "0px",objectFit: "cover",marginRight:"6px",marginTop:"3px"}}
                                    />
                                    <p style={{fontSize:"10px", marginTop:"3px"}}>( 32 review )</p>
                                </div>
                              </div>
                              
                          </div>
                      </span>
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
                    borderRadius: '0',
                    scrollSnapAlign: 'start',
                    transition: 'opacity 0.5s ease-in-out', // Add smooth transition
                    opacity: previousProducts.includes(product) ? 0 : 1, // Hide previous images
                  }} onClick={() => handleDetailView()}>
                    <img
                      src={product.img}
                      alt={`Product ${index + 1}`}
                      style={{ width: '100%', height: '100%', borderRadius: '0', objectFit: 'cover' }}
                    />
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
                    borderRadius: '0',
                    scrollSnapAlign: 'start',
                    transition: 'opacity 0.5s ease-in-out', // Add smooth transition
                    opacity: previousAmbassadors.includes(ambassador) ? 0 : 1, // Hide previous images
                  }} onClick={() => handleDetailView()}>
                    <img
                      src={ambassador.img}
                      alt={`Ambassador ${index + 1}`}
                      style={{ width: '100%', height: '100%', borderRadius: '0', objectFit: 'cover' }}
                    />
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

export default BeautyProducts ;
