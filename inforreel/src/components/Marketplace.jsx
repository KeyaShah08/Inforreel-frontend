import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import arrow icons
import { useEffect, useRef, useState } from 'react';
import Beautyshowambassadors from './Beautyshowambassadors';
import Beautyshowrooms from './Beautyshowrooms';
import ProductDetails from './ProductDetails';
import BeautyProducts from './BeautyProducts';

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
  const allVideos1 = [
    '/samplevideo1.mp4',
    '/samplevideo3.mp4',
    '/samplevideo4.mp4',
    '/samplevideo4.mp4',
    '/samplevideo5.mp4',
    '/samplevideo6.mp4',
  ];

  const allVideosfastChannel = [
    '/samplevideo5.mp4',
    '/samplevideo6.mp4',
    '/samplevideo3.mp4',
    '/samplevideo4.mp4',
    '/samplevideo1.mp4',
    '/samplevideo5.mp4',
  ];
  const allVideosonDemand = [
    '/samplevideo3.mp4',
    '/samplevideo5.mp4',
    '/samplevideo6.mp4',    
    '/samplevideo4.mp4',
    '/samplevideo1.mp4',
    '/samplevideo5.mp4',
  ];

  const allVideos = [
    {img:'/bs1.png', Name:"Sports & Athletics",},
    {img:'/bs2.png', Name:"Health & Wellness"},
    {img:'/bs3.png', Name:"Fashion"},
    {img:'/bs3.png', Name:"Sports & Athletics"},
    {img:'/bs1.png', Name:"Health & Wellness"},
    {img:'/bs2.png', Name:"Fashion"}, 
  ];

  const fastChannel = [
    {img:'/fc1.png', Name:"Fashion",},
    {img:'/fc2.png', Name:"Beauty"},
    {img:'/fc3.png', Name:"Sports & Athletics"},
    {img:'/fc1.png', Name:"Fashion"},
    {img:'/fc2.png', Name:"Beauty"},
    {img:'/fc3.png', Name:"Sports & Athletics"}, 
  ];

  const videoonDemand = [
    {img:'/vd1.png', Name:"Fashion",},
    {img:'/vd2.png', Name:"Beauty"},
    {img:'/vd3.png', Name:"Sports & Athletics"},
    {img:'/vd1.png', Name:"Fashion"},
    {img:'/vd2.png', Name:"Beauty"},
    {img:'/vd3.png', Name:"Sports & Athletics"}, 
  ];

  const [displayedImages, setDisplayedImages] = useState(allImages.slice(0, 3));
  const [displayedProducts, setDisplayedProducts] = useState(allProducts.slice(0, 3));
  const [displayedAmbassadors, setDisplayedAmbassadors] = useState(allAmbassadors.slice(0, 3));
  const [displayedVideos, setDisplayedVideos] = useState(allVideos1.slice(0, 3));
  const [displayfastChannel, setFastChannel] = useState(allVideosfastChannel.slice(0, 3));
  const [displayvideoonDemand, setvideoonDemand] = useState(allVideosonDemand.slice(0, 3));
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productIndex, setProductIndex] = useState(0);
  const [ambassadorIndex, setAmbassadorIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [fastIndex, setFastChannelIndex] = useState(0);
  const [videoonDemandIndex, setvideoonDemandIndex] = useState(0);
  const imageContainerRef = useRef(null);
  const [isNextDisabled, setIsNextDisabled] = useState(allImages.length <= 3);
  const [isProductNextDisabled, setIsProductNextDisabled] = useState(allProducts.length <= 3);
  const [isAmbassadorNextDisabled, setIsAmbassadorNextDisabled] = useState(allAmbassadors.length <= 3);
  const [isvideoNextDisabled, setIsisvideoNextDisabledNextDisabled] = useState(allAmbassadors.length <= 3);
  const [isfastChannelDisabled, setIsFastChannel] = useState(fastChannel.length <= 3);
  const [isVideoNextDisabled, setIsVideoNextDisabled] = useState(allVideos.length <= 3);
  const [previousImages, setPreviousImages] = useState([]); // Track previously displayed images
  const [previousProducts, setPreviousProducts] = useState([]);
  const [previousAmbassadors, setPreviousAmbassadors] = useState([]);
  const [previousVideos, setPreviousVideos] = useState([]);
  const [previousFastChannel, setPreviousFastChannel] = useState([]);
  const [showBeautyShowroom, setShowBeautyShowroom] = useState(false);
  const [showBeautyShow, setShowBeauty] = useState(false);
  const [showBeautyProd, setShowProduct] = useState(false);
  
  const videoRefs = useRef([]);
  const videoRefs1 = useRef([]);
  const videoRefs2 = useRef([]);

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
      setvideoonDemand(newAmbassadors);
      setIsAmbassadorNextDisabled(false);
    }
  };

  const nextvideoonDemand = () => {
    if (imageContainerRef.current && videoonDemandIndex + 3 < allAmbassadors.length) {
      // Store the current images as previous images
      setPreviousVideos(displayedAmbassadors);

      setvideoonDemandIndex(videoonDemandIndex + 3);
      const newAmbassadors = allAmbassadors.slice(videoonDemandIndex + 3, Math.min(videoonDemandIndex + 6, allAmbassadors.length));
      setvideoonDemand(newAmbassadors); //directly set new images, don't accumulate
      if (videoonDemandIndex + 6 >= allAmbassadors.length) {
        setIsisvideoNextDisabledNextDisabled(true);
      }
    }
  };

  const prevvideoonDemand = () => {
    if (imageContainerRef.current && videoonDemandIndex - 3 >= 0) {
      setPreviousVideos(displayedAmbassadors);
      setvideoonDemandIndex(videoonDemandIndex - 3);
      const newAmbassadors = videoonDemand.slice(Math.max(0, videoonDemandIndex - 3), videoonDemandIndex);
      setDisplayedVideos(newAmbassadors);
      setIsisvideoNextDisabledNextDisabled(false);
    }
  };


  const nextfastChannel = () => {
    if (imageContainerRef.current && fastIndex + 3 < videoonDemand.length) {
      // Store the current images as previous images
      setPreviousFastChannel(displayfastChannel);

      setFastChannelIndex(fastIndex + 3);
      const newAmbassadors = videoonDemand.slice(fastIndex + 3, Math.min(fastIndex + 6, videoonDemand.length));
      setFastChannel(newAmbassadors); //directly set new images, don't accumulate
      if (fastIndex + 6 >= videoonDemand.length) {
        setIsFastChannel(true);
      }
    }
  };

  const prevfastChannel = () => {
    if (imageContainerRef.current && fastIndex - 3 >= 0) {
      setPreviousFastChannel(displayfastChannel);
      setFastChannelIndex(fastIndex - 3);
      const newAmbassadors = fastChannel.slice(Math.max(0, fastIndex - 3), fastIndex);
      setFastChannel(newAmbassadors);
      setIsFastChannel(false);
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
  const handleDetailView3 = () => {
    setShowProduct(true);
  };
  
  useEffect(() => {
    //   console.log("Displayed Images:", displayedImages);
    //   console.log("Previous Images:", previousImages);
  }, [displayedImages, previousImages]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
    {showBeautyShowroom ? (
      <Beautyshowrooms />
    ) : showBeautyShow ? (
      <Beautyshowambassadors />
    ) : showBeautyProd ?
      <BeautyProducts />
    :(
      <>
        <ul className='Shownone' style={{margin:"0", padding:"0", listStyle:"none", display:"flex", position: "fixed", top: "20px", zIndex: "9999",  alignItems: "center", justifyContent: "center", left: "25%"}}>
          <li onClick={() => scrollToSection('all')} style={{cursor:"pointer",fontSize:"14px",color:"#96105E", borderBottom:"1px solid #96105E", padding:"0", margin:"0", fontWeight:"bold"}}>All</li>
          <li onClick={() => scrollToSection('brands')} style={{cursor:"pointer",fontSize:"14px",color:"#fff", padding:"0", margin:"0",marginLeft:"20px", fontWeight:"normal"}}>Shop by Brands</li>
          <li onClick={() => scrollToSection('ambassador')} style={{cursor:"pointer",fontSize:"14px",color:"#fff", padding:"0", margin:"0",marginLeft:"20px", fontWeight:"normal"}}>Shop by Ambassador</li>
          <li onClick={() => scrollToSection('brand-video')} style={{cursor:"pointer",fontSize:"14px",color:"#fff", padding:"0", margin:"0",marginLeft:"20px", fontWeight:"normal"}}>Brand Video</li>
          <li onClick={() => scrollToSection('fast-channel')} style={{cursor:"pointer",fontSize:"14px",color:"#fff", padding:"0", margin:"0",marginLeft:"20px", fontWeight:"normal"}}>Fast Channel</li>
          <li onClick={() => scrollToSection('vod')} style={{cursor:"pointer",fontSize:"14px",color:"#fff", padding:"0", margin:"0",marginLeft:"20px", fontWeight:"normal"}}>Video On demand</li>
        </ul>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#000',
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
            <section id="all" style={{ marginTop: '100vh', textAlign: 'left' }}>
          
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: "space-between" }}>
                {/* Navigation Buttons */}
                <div style={{ width:"100%",display: 'flex', marginBottom: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 'bold', color: 'White', fontSize: '25px' }}>Shop by Brands</span>
                  <div style={{ display: 'flex' }}>
                    <button
                      onClick={prevImage}
                      style={{
                        background: '#9D9A95',
                        color: '#333',
                        border: 'none',
                        padding: '5px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        zIndex: 10,
                        marginRight: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '45px',
                        height: '45px',
                      }}
                      disabled={currentIndex === 0}
                    >
                      <ChevronLeft size={32} style={{color: '#333',}}/>
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
                      <ChevronRight size={32} style={{color: '#333',}} />
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
            <section id="brands" style={{  textAlign: 'left', marginTop: '40px' }}>
            
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
                        marginRight: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '45px',
                        height: '45px',
                      }}
                      disabled={productIndex === 0}
                    >
                      <ChevronLeft size={32} style={{color: '#333',}}/>
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
                      <ChevronRight size={32} style={{color: '#333',}}/>
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
                    }} onClick={() => handleDetailView3()}>
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
            <section id="ambassador" style={{  textAlign: 'left', marginTop: '40px' }}>
            
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
                        marginRight: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '45px',
                        height: '45px',
                      }}
                      disabled={ambassadorIndex === 0}
                    >
                      <ChevronLeft size={32} style={{color: '#333',}}/>
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
                      <ChevronRight size={32} style={{color: '#333',}}/>
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
                    }} onClick={() => handleDetailView2()}>
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
            <section id="brand-video" style={{ textAlign: 'left', marginTop: '40px' }}>
            
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                {/* Navigation Buttons */}
                <div style={{ display: 'flex', width: "100%",marginBottom: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 'bold', color: 'White', fontSize: '20px' }}>Brand Videos</span>
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
                        marginRight: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '45px',
                        height: '45px',
                      }}
                      disabled={videoIndex === 0}
                    >
                      <ChevronLeft size={32} style={{color: '#333',}}/>
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
                      <ChevronRight size={32} style={{color: '#333',}}/>
                    </button>
                  </div>
                </div>
                <div
                  ref={imageContainerRef}
                  style={{
                    display: 'flex',
                    overflowX: 'hidden',
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
                      transition: 'opacity 0.5s ease-in-out', 
                      opacity: previousVideos.includes(video) ? 0 : 1, // Hide previous images
                    }} onClick={() => handleDetailView()}>

                      {/* <img
                        src={video.img}
                        alt={`Ambassador ${index + 1}`}
                        style={{ width: '100%', height: '100%', borderRadius: '0px', objectFit: 'cover' }}
                      />
                      <p style={{marginTop:"15px",fontSize:"20px", fontWeight:"bold", textAlign:"center" }}>{video.Name}</p>
           */}
                      <video
                        ref={(el) => {
                          if (el) videoRefs.current[index] = el;
                        }}
                        src={video}
                        controls
                        muted
                        style={{ cursor:"pointer",width: '100%', height: '100%', borderRadius: '0px', objectFit: 'cover' }}
                        onMouseEnter={() => {
                          videoRefs.current[index]?.play();
                        }}
                        onMouseLeave={() => {
                          videoRefs.current[index]?.pause();
                          videoRefs.current[index].currentTime = 0;
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Fast channel Section */}
            <section id="fast-channel" style={{ textAlign: 'left', marginTop: '40px' }}>
            
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                {/* Navigation Buttons */}
                <div style={{ display: 'flex', width: "100%",marginBottom: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 'bold', color: 'White', fontSize: '20px' }}>Fast Channel</span>
                  <div style={{ display: 'flex' }}>
                    <button
                      onClick={prevfastChannel}
                      style={{
                        background: '#9D9A95',
                        color: 'white',
                        border: 'none',
                        padding: '5px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        zIndex: 10,
                        marginRight: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '45px',
                        height: '45px',
                      }}
                      disabled={fastIndex === 0}
                    >
                      <ChevronLeft size={32} style={{color: '#333',}}/>
                    </button>
                    <button
                      onClick={nextfastChannel}
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
                      <ChevronRight size={32} style={{color: '#333',}}/>
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
                    justifyContent: "space-between",
                    width:"100%",
                  }}
                >
                  {displayfastChannel.map((video, index) => (
                    <div key={index} style={{
                      flex: '0 0 auto',
                      width: '32%',
                      height: '32%',
                      marginRight: '10px',
                      borderRadius: '0px',
                      scrollSnapAlign: 'start',
                      transition: 'opacity 0.5s ease-in-out', 
                      opacity: previousFastChannel.includes(video) ? 0 : 1, // Hide previous images
                    }} onClick={() => handleDetailView()}>
                        <video
                          ref={(el) => {
                            if (el) videoRefs1.current[index] = el;
                          }}
                          src={video}
                          controls
                          muted
                          style={{ cursor:"pointer",width: '100%', height: '100%', borderRadius: '0px', objectFit: 'cover' }}
                          onMouseEnter={() => {
                            videoRefs1.current[index]?.play();
                          }}
                          onMouseLeave={() => {
                            videoRefs1.current[index]?.pause();
                            videoRefs1.current[index].currentTime = 0;
                          }}
                        />
                      {/* <img
                        src={video.img}
                        alt={`Ambassador ${index + 1}`}
                        style={{ width: '100%', height: '100%', borderRadius: '0px', objectFit: 'cover' }}
                      />
                      <p style={{marginTop:"15px",fontSize:"20px", fontWeight:"bold", textAlign:"center" }}>{video.Name}</p> */}
                    </div>
                  ))}


                  
                </div>
              </div>
            </section>

            {/* Video on demoand Section */}
            <section id="vod" style={{ textAlign: 'left', marginTop: '40px' }}>
            
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                {/* Navigation Buttons */}
                <div style={{ display: 'flex', width: "100%",marginBottom: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 'bold', color: 'White', fontSize: '20px' }}>Video On demand</span>
                  <div style={{ display: 'flex' }}>
                    <button
                      onClick={prevvideoonDemand}
                      style={{
                        background: '#9D9A95',
                        color: 'white',
                        border: 'none',
                        padding: '5px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        zIndex: 10,
                        marginRight: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '45px',
                        height: '45px',
                      }}
                      disabled={videoonDemandIndex === 0}
                    >
                      <ChevronLeft size={32} style={{color: '#333',}}/>
                    </button>
                    <button
                      onClick={nextvideoonDemand}
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
                      <ChevronRight size={32} style={{color: '#333',}}/>
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
                    justifyContent: "space-between",
                    width:"100%",
                  }}
                >
                  {displayvideoonDemand.map((video, index) => (
                    <div key={index} style={{
                      flex: '0 0 auto',
                      width: '32%',
                      height: '32%',
                      marginRight: '10px',
                      borderRadius: '0px',
                      scrollSnapAlign: 'start',
                      transition: 'opacity 0.5s ease-in-out', 
                      opacity: previousVideos.includes(video) ? 0 : 1, // Hide previous images
                    }} onClick={() => handleDetailView()}>
                      <video
                        ref={(el) => {
                          if (el) videoRefs2.current[index] = el;
                        }}
                        src={video}
                        controls
                        muted
                        style={{ cursor:"pointer",width: '100%', height: '100%', borderRadius: '0px', objectFit: 'cover' }}
                        onMouseEnter={() => {
                          videoRefs2.current[index]?.play();
                        }}
                        onMouseLeave={() => {
                          videoRefs2.current[index]?.pause();
                          videoRefs2.current[index].currentTime = 0;
                        }}
                      />
                      {/* <img
                        src={video.img}
                        alt={`Ambassador ${index + 1}`}
                        style={{ width: '100%', height: '100%', borderRadius: '0px', objectFit: 'cover' }}
                      />
                      <p style={{marginTop:"15px",fontSize:"20px", fontWeight:"bold", textAlign:"center" }}>{video.Name}</p> */}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </>
    )}
    </>
  );
}

export default Marketplace;
