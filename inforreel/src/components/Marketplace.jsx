import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import arrow icons
import { useEffect, useRef, useState } from 'react';
import Beautyshowambassadors from './Beautyshowambassadors';
import Beautyshowrooms from './Beautyshowrooms';

function Marketplace() {
 const allImages = [
    {img:'/helth.png', Name:"Health & Wellness",},
    {img:'/sport.png', Name:"Sports & Athletics"},
    {img:'/beautyNew.png', Name:"Beauty"},
    {img:'/sport.png', Name:"Sports & Athletics"},
    {img:'/helth.png', Name:"Health & Wellness"},
    {img:'/beautyNew.png', Name:"Beauty"},
  ];
  const allProducts = [
    {img:'/p1.png', Name:"Beauty",},
    {img:'/p2.png', Name:"Health & Wellness"},
    {img:'/p3.png', Name:"Fashion"},
    {img:'/p3.png', Name:"Beauty"},
    {img:'/p1.png', Name:"Health & Wellness"},
    {img:'/p2.png', Name:"Fashion"},
  ];
  const allAmbassadors = [
    {img:'/pq1.png', Name:"Fashion",},
    {img:'/pq2.png', Name:"Health & Wellness"},
    {img:'/pq3.png', Name:"Beauty"},
    {img:'/pq3.png', Name:"Sports & Athletics"},
    {img:'/pq1.png', Name:"Health & Wellness"},
    {img:'/pq2.png', Name:"Fashion"},
  ];
  const allVideos = [
    '/samplevideo1.mp4',
    '/samplevideo3.mp4',
    '/samplevideo4.mp4',
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
  const [showBeautyShow, setShowBeauty] = useState(false);

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
  const handleDetailView2 = () => {
    setShowBeauty(true);
  };
  useEffect(() => {
    //   console.log("Displayed Images:", displayedImages);
    //   console.log("Previous Images:", previousImages);
  }, [displayedImages, previousImages]);

  return (
    <>
    {showBeautyShowroom ? (
      <Beautyshowrooms />
    ) : showBeautyShow ? (
      <Beautyshowambassadors />
    ):(
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
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: 9,
          backgroundColor: '#000',
        }}>
          <video autoPlay muted loop playsInline style={{
            width: "100%",
            height: "100%",
            objectFit: 'cover'
          }}>
            <source src="/hero-bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div
            style={{
              position: "absolute",
              bottom: "-1px",
              left: 0,
              width: "100%",
              height: "300px",
              background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #141414 100%)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "200px",
              background: "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, #141414 100%)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
        </div>

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
          <section style={{ marginTop: '100vh', textAlign: 'left' }}>
        
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: "space-between" }}>
              {/* Navigation Buttons */}
              <div style={{ width:"100%",display: 'flex', marginBottom: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', color: 'White', fontSize: '25px' }}>Shop by Brands</span>
                <div style={{ display: 'flex' }}>
                  <button
                    onClick={prevImage}
                    style={{
                      background: '#9D9A95',
                      color: 'white',
                      border: 'none',
                      padding: '5px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      zIndex: 10,
                      marginRight: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '45px',
                      height: '45px',
                    }}
                    disabled={currentIndex === 0}
                  >
                    <ChevronLeft size={45} />
                  </button>
                  <button
                    onClick={nextImage}
                    style={{  
                      background: '#9D9A95',
                      color: 'white',
                      border: 'none',
                      padding: '5px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      zIndex: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '45px',
                      height: '45px',
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
                    borderRadius: '0px',
                    scrollSnapAlign: 'start',
                    transition: 'opacity 0.5s ease-in-out', // Add smooth transition
                    opacity: previousImages.includes(image) ? 0 : 1, // Hide previous images
                  }} onClick={() => handleDetailView()}>
                    <img
                      src={image.img}
                      alt={`Brand ${index + 1}`}
                      style={{ width: '100%', height: '100%', borderRadius: '0px', objectFit: 'cover' }}
                    />
                    <p style={{marginTop:"15px",fontSize:"20px", fontWeight:"bold", textAlign:"center" }}>{image.Name}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Shop by Product Section */}
          <section style={{  textAlign: 'left', marginTop: '40px' }}>
          
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: 'space-between' }}>
              {/* Navigation Buttons */}
              <div style={{ display: 'flex', width:"100%",marginBottom: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', color: 'White', fontSize: '20px' }}>Shop by Products</span>
                <div style={{ display: 'flex' }}>
                  <button
                    onClick={prevProduct}
                    style={{
                      background: '#9D9A95',
                      color: 'white',
                      border: 'none',
                      padding: '5px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      zIndex: 10,
                      marginRight: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '45px',
                      height: '45px',
                    }}
                    disabled={productIndex === 0}
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={nextProduct}
                    style={{
                      background: '#9D9A95',
                      color: 'white',
                      border: 'none',
                      padding: '5px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      zIndex: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '45px',
                      height: '45px',
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
                    borderRadius: '0px',
                    scrollSnapAlign: 'start',
                    transition: 'opacity 0.5s ease-in-out', // Add smooth transition
                    opacity: previousProducts.includes(product) ? 0 : 1, // Hide previous images
                  }} onClick={() => handleDetailView2()}>
                    <img
                      src={product.img}
                      alt={`Product ${index + 1}`}
                      style={{ width: '100%', height: '100%', borderRadius: '0px', objectFit: 'cover' }}
                    />
                    <p style={{marginTop:"15px",fontSize:"20px", fontWeight:"bold", textAlign:"center" }}>{product.Name}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Shop by Brand Ambassador Section */}
          <section style={{  textAlign: 'left', marginTop: '40px' }}>
          
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: 'space-between'  }}>
              {/* Navigation Buttons */}
              <div style={{ display: 'flex', width: "100%", marginBottom: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', color: 'White', fontSize: '20px' }}>Shop by Brand Ambassadors</span>
                <div style={{ display: 'flex' }}>
                  <button
                    onClick={prevAmbassador}
                    style={{
                      background: '#9D9A95',
                      color: 'white',
                      border: 'none',
                      padding: '5px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      zIndex: 10,
                      marginRight: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '45px',
                      height: '45px',
                    }}
                    disabled={ambassadorIndex === 0}
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={nextAmbassador}
                    style={{
                      background: '#9D9A95',
                      color: 'white',
                      border: 'none',
                      padding: '5px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      zIndex: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '45px',
                      height: '45px',
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
                    borderRadius: '0px',
                    scrollSnapAlign: 'start',
                    transition: 'opacity 0.5s ease-in-out', // Add smooth transition
                    opacity: previousAmbassadors.includes(ambassador) ? 0 : 1, // Hide previous images
                  }} onClick={() => handleDetailView()}>
                    <img
                      src={ambassador.img}
                      alt={`Ambassador ${index + 1}`}
                      style={{ width: '100%', height: '100%', borderRadius: '0px', objectFit: 'cover' }}
                    />
                    <p style={{marginTop:"15px",fontSize:"20px", fontWeight:"bold", textAlign:"center" }}>{ambassador.Name}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Shop by Brand Video Section */}
          <section style={{ textAlign: 'left', marginTop: '40px' }}>
          
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              {/* Navigation Buttons */}
              <div style={{ display: 'flex', width: "100%",marginBottom: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', color: 'White', fontSize: '20px' }}>Shop by Brand Videos</span>
                <div style={{ display: 'flex' }}>
                  <button
                    onClick={prevVideo}
                    style={{
                      background: '#9D9A95',
                      color: 'white',
                      border: 'none',
                      padding: '5px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      zIndex: 10,
                      marginRight: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '45px',
                      height: '45px',
                    }}
                    disabled={videoIndex === 0}
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={nextVideo}
                    style={{
                      background: '#9D9A95',
                      color: 'white',
                      border: 'none',
                      padding: '5px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      zIndex: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '45px',
                      height: '45px',
                    }}
                    disabled={isVideoNextDisabled}
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
                {displayedVideos.map((video, index) => (
                  <div key={index} style={{
                    flex: '0 0 auto',
                    width: '32%',
                    height: '32%',
                    marginRight: '10px',
                    borderRadius: '0px',
                    scrollSnapAlign: 'start',
                    transition: 'opacity 0.5s ease-in-out', // Add smooth transition
                    opacity: previousVideos.includes(video) ? 0 : 1, // Hide previous images
                    display: 'flex', // Use flexbox for centering
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <video
                      src={video}
                      controls
                      style={{ width: '100%', height: '100%', borderRadius: '0px', objectFit: 'cover' }}
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

export default Marketplace;
