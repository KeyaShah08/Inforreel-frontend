import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BeautyProducts from './BeautyProducts';
import Beautyshowrooms from './Beautyshowrooms';

function ProductDetails() {
  const allImages = [
    {img:'/C1.png', Name:"Skincare"},
    {img:'/C2.png', Name:"Makeup"},
    {img:'/C3.png', Name:"Fragrances"},
    {img:'/C2.png', Name:"Makeup"},
    {img:'/C1.png', Name:"Skincare"},
    {img:'/C3.png', Name:"Fragrances"},
  ];
  const allProducts = [
    {img:'/B1.png', Name:"Makeup"},
    {img:'/B2.png', Name:"Skincare"},
    {img:'/B3.png', Name:"Name"},
    {img:'/B2.png', Name:"Skincare"},
    {img:'/B3.png', Name:"Makeup"},
    {img:'/B1.png', Name:"Makeup"},
  ];
  const allAmbassadors = [
    {img:'/v1.png', Name:"Lipstick"},
    {img:'/v2.png', Name:"Highlighter Powder"},
    {img:'/v3.png', Name:"Eyeshadows"},
    {img:'/v4.png', Name:"Skin care"},
    {img:'/v3.png', Name:"Lipstick"},
    {img:'/v1.png', Name:"Highlighter Powder"},
  ];
  const allVideos = [
    '/samplevideo1.mp4',
    '/samplevideo3.mp4',
    '/samplevideo4.mp4',
    '/samplevideo4.mp4',
    '/samplevideo5.mp4',
    '/samplevideo6.mp4',  
  ];
  const ListItem = [
    {img:'/Li1.png', Date:"5/1/2025", purchsed:"2K purchased", Name:"Prestige Exceptional Micro-Nutritive and Repairing Ritual "},
    {img:'/Li2.png', Date:"5/5/2025", purchsed:"5K purchased", Name:"Forever Glow Luminizer - Limited Edition"},
    {img:'/Li3.png', Date:"5/9/2025", purchsed:"10K purchased", Name:"Diorshow 5 Couleurs - Limited Edition"},
    {img:'/Li4.png', Date:"5/10/2025", purchsed:"12K purchased", Name:"Rouge Dior"},
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
  const [activeTab, setActiveTab] = useState('tab1');
  const [isBack, setBackView] = useState(false);
  const videoRefs = useRef([]);
  const videoRefsN = useRef([]);
  const videoRefscoll = useRef([]);
  const videoRefs2 = useRef([]);
  const videoRef3 = useRef([]);

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
    const handleack = () => {
      setBackView(true);
    };
  useEffect(() => {
    //   console.log("Displayed Images:", displayedImages);
    //   console.log("Previous Images:", previousImages);
  }, [displayedImages, previousImages]);
  useEffect(() => {
    if (activeTab !== "tab2") {
      videoRefsN.current.forEach(video => {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });
    }
  }, [activeTab]);
 
  return (
    <>
     <style>
      {`
        .custom-input::placeholder {
          color: #000;
          font-weight:500;
        }
        .tab-panel {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.2s ease, transform 1s ease;
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
        }
        .tab-panel.active {
          opacity: 1;
          transform: translateY(0);
          position: relative;
         
        }
        .tab-btn {
          background: transparent;
          border:none;
          color:#fff;
          margin-right:30px;
          font-size: 20px;
          padding:0;
          border-bottom: 2px solid transparent;
          cursor:pointer;
          margin-bottom: -1px;
        }
        .activeTab {
          opacity: 1;
          color:#96105E;  
          border-bottom: 2px solid #96105E;
        }
      `}
    </style>
    {showBeautyShowroom ? (
      <BeautyProducts />
    ) : isBack ? <Beautyshowrooms /> : (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#000', // Changed to black
      maxHeight: "540px",
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
        maxHeight: "540px",
      }}>
        {/* <video autoPlay muted loop playsInline style={{
          width: "100%",
          height: "100%",
          objectFit: 'cover'
        }}>
          <source src="/hero-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
                  <img
                    src={"/cdiorbeauty.png"}
                    alt={`cdiorbeauty`}
                    style={{ width: '100%', height: '100%', borderRadius: '0px', objectFit: 'cover', maxHeight:"540px" }}
                  />
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
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        boxSizing: 'border-box',
        background: 'linear-gradient(rgba(243, 180, 97, 0.55) 0%, rgba(78, 77, 75, 0.45) 30%, rgba(20, 20, 20, 0.55) 100%)',
        paddingLeft: "270px"
      }}>
      <section style={{ marginTop: '525px', textAlign: 'left', position:"relative" }}>
      <img
            onClick={() => handleack()}
                                      src={'/backArrow.png'}
                                      alt={`backArrow`}
                                      style={{width: "auto",height: "auto",borderRadius: "0px",objectFit: "cover",position:"relative",zIndex:"9999",top:"-76px",marginRight:"6px",marginTop:"3px"}}
                                    />
          <div style={{display: "flex",alignItems: "center",justifyContent: "space-between" }}>
          <img
            src={"/Icon1.png"}
            alt={`cdiorbeauty`}
            style={{width: "auto",height: "auto",borderRadius: "0px",objectFit: "cover",marginRight:"5px", marginTop: "-30px",position: "relative",zIndex: "66"}}
          />
            <div style={{display: "flex",alignItems: "flex-start",justifyContent: "flex-start", flexDirection: "column", height:"90px" }}>
              <div style={{display: "flex",alignItems: "center",justifyContent: "flex-start" }}>
                <span style={{fontSize: "32px"}}>C Dior Beauty</span>
                <img
                  src={"/RightIcon.png"}
                  alt={`cdiorbeauty`}
                  style={{width: "auto",height: "auto", marginLeft:"30px", position:"relative", top:"3px"}}
                />
              </div>
              <div style={{display: "flex",alignItems: "center",justifyContent: "flex-start",  marginTop:"10px" }}>
                <p style={{fontSize: "20px"}}>@cdiorbeauty</p>
                <p style={{fontSize: "20px", marginLeft:"30px"}}> <img
                    src={"/location.png"}
                    alt={`location`}
                    style={{width: "auto",height: "auto", marginRight :"5px", fontWeight:"600"}}
                  />New York, USA
                </p>
              </div>
            </div>
            <div style={{display: "flex",alignItems: "flex-start",justifyContent: "flex-center", flexDirection: "column",  marginLeft:"20px", padding:"4px 10px" ,borderLeft:"1px solid #666", height:"90px" }}>
                <p style={{fontSize: "18px", fontWeight:"600"}}>Monthly visitors</p>
                <p style={{fontSize: "40px"}}>12.4K</p>
            </div>
            <div style={{display: "flex",alignItems: "flex-start",justifyContent: "flex-center", flexDirection: "column",  marginLeft:"10px", padding:"4px 10px" ,borderLeft:"1px solid #666", height:"90px" }}>         
                <p style={{fontSize: "18px", fontWeight:"600"}}>Ambassadors</p>
                <p style={{fontSize: "40px"}}>10</p>
            </div>
            <div style={{display: "flex",alignItems: "flex-start",justifyContent: "flex-center", flexDirection: "column",  marginLeft:"10px", padding:"4px 10px" ,borderLeft:"1px solid #666", height:"90px" }}>
                <p style={{fontSize: "18px", fontWeight:"600"}}>Followers</p>
                <p style={{fontSize: "40px"}}>32K</p>
            </div>
            <div style={{display: "flex",alignItems: "flex-start",justifyContent: "flex-center", flexDirection: "column",  marginLeft:"10px", padding:"4px 10px" ,paddingRight:"0", borderLeft:"1px solid #666", height:"90px" }}>
                <p style={{fontSize: "18px", fontWeight:"600"}}>Following</p>
                <p style={{fontSize: "40px"}}>12K</p>
            </div>
          </div>
          <p style={{fontSize: "20px",fontWeight: "600", marginTop:"20px" }}>
            Step Into Dior: A World of Iconic Beauty and Timeless Elegance.
          </p>
      </section>
      <section style={{ display:"flex",alignItems: "center",justifyContent: "space-between", marginTop: '30px', textAlign: 'left', position:"relative" }}>
        <div style={{position:"relative", display:"flex",width:"50%"}}>
          <button style={{ marginRight: '20px', textAlign: 'center', background:"#96105E", color:"#fff", height:"50px", width:"166px",borderRadius:"40px", border:"1px solid #96105E", fontSize:"16px"}} type='button'>Follow</button>
          <button style={{ marginRight: '20px', textAlign: 'center', background:"transparent", color:"#fff", height:"50px", width:"190px",borderRadius:"40px", border:"1px solid #7B7B7B", fontSize:"16px"}} type='button'>Become Ambassadors</button>
        </div>
        <div style={{position:"relative", display:"flex",width:"50%", alignItems:"center",justifyContent:"flex-end"}}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              justifyContent:"flex-end"
            }}>
            <div style={{ width:"60%",position: 'relative'}}>
           
              <input
                type="text"
                placeholder="Search"
                className='custom-input'
                style={{
                  width: '100%',
                  padding: '5px 15px',
                  borderRadius: '20px',
                  border: 'none',
                  backgroundColor: '#bcbcbc',
                  fontSize: '14px',
                  outline: 'none',
                  height:"35px",
                  color:"#000",
                  marginRight:"30px"
                }}
              />
                <img
                  src={"/searchIcon.png"}
                  alt={`searchIcon`}
                  style={{
                    position: 'absolute',
                    right: '-20px',
                    top: '10px',
                    color: 'black',cursor:"pointer",width: "auto",height: "auto",borderRadius: "0px",objectFit: "cover"}}
                />
            </div>

          <button style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#959595',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            marginLeft:"60px"
          }}>
            <img
                src={"/msgIcon.png"}
                alt={`msgIcon`}
                style={{width: "auto",height: "auto",borderRadius: "0px",objectFit: "cover",position: "relative",zIndex: "66"}}
              />
          </button>

          <button style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#959595',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            marginLeft:"15px"
          }}>
            <img
                src={"/menu.png"}
                alt={`msgIcon`}
                style={{width: "auto",height: "auto",borderRadius: "0px",objectFit: "cover",position: "relative",zIndex: "66"}}
              />
          </button>
            </div>
        </div>

        {/************ Trending *************/}
      </section>
      <section>
        <p  style={{marginTop:"40px",display:"flex", justifyContent:"flex-start",alignItems:"center",fontSize: "32px",fontWeight: "600",}}>Trending</p>
        <div style={{marginTop:"30px"}}>
            <ul style={{display: "block",width: "85%", padding:"0"}}>
              {ListItem.map((item, index) => (
                <li key={index} style={{
                  flex: '0 0 auto',
                  width: '100%',
                  height: '100%',
                  borderRadius: '0px',
                  scrollSnapAlign: 'start',
                  transition: 'opacity 0.5s ease-in-out',
                  listStyle:"none",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"space-between",
                  marginTop:"20px"
                }} >
                  <div style={{display:"flex", width:"40%"}}>
                      <img
                        src={item.img}
                        alt={`item ${index + 1}`}
                        style={{borderRadius: '0px', objectFit: 'cover' }}
                      />
                      <p style={{marginLeft: '20px', objectFit: 'cover', textAlign:"left", display:"flex", alignItems:"center" }}>{item.Name}</p>
                    </div>
                    <div style={{display:"flex",textAlign:"center", width:"10%"}}>
                      <p>{item.Date}</p>
                    </div>
                    <div style={{display:"flex", textAlign:"left",width:"15%"}}>
                      <p>{item.purchsed}</p>
                    </div>
                </li>
              ))}
            </ul>
        </div>
      </section>
      {/* Tab Section */}
      <section style={{marginTop:"50px"}}>
      <div className="tabs-wrapper">
        <div className="tab-buttons" style={{display:"flex",borderBottom:"1px solid #666"}}>
          <button className={`tab-btn ${activeTab === 'tab1' ? 'activeTab' : ''}`} onClick={() => setActiveTab('tab1')}>All</button>
          <button className={`tab-btn ${activeTab === 'tab2' ? 'activeTab' : ''}`} onClick={() => setActiveTab('tab2')}>Collection</button>
          <button className={`tab-btn ${activeTab === 'tab3' ? 'activeTab' : ''}`} onClick={() => setActiveTab('tab3')}>Brand Video</button>
          <button className={`tab-btn ${activeTab === 'tab4' ? 'activeTab' : ''}`} onClick={() => setActiveTab('tab4')}>VibeReel</button>
        </div>

      <div style={{position: "relative", marginTop:"30px",  overflow: "hidden"}}>
        <div className={`tab-panel ${activeTab === 'tab1' ? 'active' : ''}`}>
          {/* Shop by Brands Section */}
          <section style={{ textAlign: 'left' }}>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: "space-between" }}>
              {/* Navigation Buttons */}
              <div style={{ width:"100%",display: 'flex', marginBottom: '25px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', color: 'White', fontSize: '25px' }}>Collection</span>
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
                      zIndex: 10,
                      marginRight: '20px',
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
                    <p style={{fontSize:"20px", textAlign:"center", marginTop:"10px"}}>{image.Name}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/* Shop by Product Section */}
        <section style={{  textAlign: 'left', marginTop: '40px' }}>
         
         <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: 'space-between' }}>
           {/* Navigation Buttons */}
           <div style={{ display: 'flex', width:"100%",marginBottom: '20px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
           <span style={{ fontWeight: 'bold', color: 'White', fontSize: '25px' }}>Brand Videos</span>
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
                     marginRight: '20px',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     width: '48px',
                     height: '48px',
                 }}
                 disabled={productIndex === 0}
               >
                 <ChevronLeft size={20} />
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
                     marginRight: '20px',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     width: '48px',
                     height: '48px',
                 }}
                 disabled={isProductNextDisabled}
               >
                 <ChevronRight size={20} />
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
                 opacity: previousProducts.includes(video) ? 0 : 1, // Hide previous images
               }} onClick={() => handleDetailView()}>
                 {/* <img
                   src={product.img}
                   alt={`Product ${index + 1}`}
                   style={{ width: '100%', height: '100%', borderRadius: '0px', objectFit: 'cover' }}
                 />
                 <p style={{fontSize:"20px", textAlign:"center", marginTop:"10px"}}>{product.Name}</p> */}
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

       {/* Shop by Brand Ambassador Section */}
       <section style={{  textAlign: 'left', marginTop: '40px' }}>
       
         <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: 'space-between'  }}>
           {/* Navigation Buttons */}
           <div style={{ display: 'flex', width: "100%", marginBottom: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
             <span style={{ fontWeight: 'bold', color: 'White', fontSize: '25px' }}>VibeReel</span>
             <div style={{ display: 'flex' }}>
               <button
                 onClick={prevAmbassador}
                 style={{
                   background: 'rgba(0, 0, 0, 0.5)',
                   color: 'white',
                   border: 'none',
                   padding: '12px',
                   borderRadius: '50%',
                   cursor: 'pointer',
                   zIndex: 10,
                   marginRight: '5px',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   width: '48px',
                   height: '48px',
                 }}
                 disabled={ambassadorIndex === 0}
               >
                 <ChevronLeft size={20} />
               </button>
               <button
                 onClick={nextAmbassador}
                 style={{
                   background: 'rgba(0, 0, 0, 0.5)',
                   color: 'white',
                   border: 'none',
                   padding: '12px',
                   borderRadius: '50%',
                   cursor: 'pointer',
                   zIndex: 10,
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   width: '48px',
                   height: '48px',
                 }}
                 disabled={isAmbassadorNextDisabled}
               >
                 <ChevronRight size={20} />
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
                    opacity: previousProducts.includes(video) ? 0 : 1, // Hide previous images
                  }} onClick={() => handleDetailView()}>
                    {/* <img
                      src={product.img}
                      alt={`Product ${index + 1}`}
                      style={{ width: '100%', height: '100%', borderRadius: '0px', objectFit: 'cover' }}
                    />
                    <p style={{fontSize:"20px", textAlign:"center", marginTop:"10px"}}>{product.Name}</p> */}
                        <video
                            ref={(el) => {
                              if (el) videoRef3.current[index] = el;
                            }}
                            src={video}
                            controls
                            muted
                            style={{ cursor:"pointer",width: '100%', height: '100%', borderRadius: '0px', objectFit: 'cover' }}
                            onMouseEnter={() => {
                              videoRef3.current[index]?.play();
                            }}
                            onMouseLeave={() => {
                              videoRef3.current[index]?.pause();
                              videoRef3.current[index].currentTime = 0;
                            }}
                        />
                  </div>
                ))}
           </div>
         </div>
       </section>
        </div>
        <div className={`tab-panel ${activeTab === 'tab2' ? 'active' : ''}`}>
           {/* Shop by Product Section */}
            <section style={{  textAlign: 'left', }}>
            
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: 'space-between' }}>
              {/* Navigation Buttons */}
              <div style={{ display: 'flex', width:"100%",marginBottom: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', color: 'White', fontSize: '25px' }}>Collection</span>
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
                        marginRight: '20px',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '48px',
                        height: '48px',
                    }}
                    disabled={productIndex === 0}
                  >
                    <ChevronLeft size={20} />
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
                        marginRight: '20px',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '48px',
                        height: '48px',
                    }}
                    disabled={isProductNextDisabled}
                  >
                    <ChevronRight size={20} />
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
                {/* {displayedProducts.map((product, index) => (
                  <div key={index} style={{
                    flex: '0 0 auto',
                    width: '32%',
                    height: '32%',
                    marginRight: '10px',
                    borderRadius: '0px',
                    scrollSnapAlign: 'start',
                    transition: 'opacity 0.5s ease-in-out', // Add smooth transition
                    opacity: previousProducts.includes(product) ? 0 : 1, // Hide previous images
                  }} onClick={() => handleDetailView()}>
                    <img
                      src={product.img}
                      alt={`Product ${index + 1}`}
                      style={{ width: '100%', height: '100%', borderRadius: '0px', objectFit: 'cover' }}
                    />
                    <p style={{fontSize:"20px", textAlign:"center", marginTop:"10px"}}>{product.Name}</p>
                  </div>
                ))} */}
                {displayedVideos.map((video, index) => (
                  <div key={index} style={{
                    flex: '0 0 auto',
                    width: '32%',
                    height: '32%',
                    marginRight: '10px',
                    borderRadius: '0px',
                    scrollSnapAlign: 'start',
                    transition: 'opacity 0.5s ease-in-out', // Add smooth transition
                    opacity: previousProducts.includes(video) ? 0 : 1, // Hide previous images
                  }} onClick={() => handleDetailView()}>
                    {/* <img
                      src={product.img}
                      alt={`Product ${index + 1}`}
                      style={{ width: '100%', height: '100%', borderRadius: '0px', objectFit: 'cover' }}
                    />
                    <p style={{fontSize:"20px", textAlign:"center", marginTop:"10px"}}>{product.Name}</p> */}
                    <video
                            ref={(el) => {
                              if (el) videoRefscoll.current[index] = el;
                            }}
                            src={video}
                            controls
                            muted
                            style={{ cursor:"pointer",width: '100%', height: '100%', borderRadius: '0px', objectFit: 'cover' }}
                            onMouseEnter={() => {
                              videoRefscoll.current[index]?.play();
                            }}
                            onMouseLeave={() => {
                              videoRefscoll.current[index]?.pause();
                              videoRefscoll.current[index].currentTime = 0;
                            }}
                          />
                  </div>
                ))}
              </div>
            </div>
            </section>
        </div>
        <div className={`tab-panel ${activeTab === 'tab3' ? 'active' : ''}`}>
            <section style={{ textAlign: 'left' }}>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: "space-between" }}>
                {/* Navigation Buttons */}
                <div style={{ width:"100%",display: 'flex', marginBottom: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 'bold', color: 'White', fontSize: '25px' }}>Shop by Brands</span>
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
                      <ChevronLeft size={20} />
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
                        zIndex: 10,
                        marginRight: '20px',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '48px',
                        height: '48px',
                      }}
                      disabled={isNextDisabled}
                    >
                      <ChevronRight size={20} />
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
                      <p style={{fontSize:"20px", textAlign:"center", marginTop:"10px"}}>{image.Name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
        </div>
        <div className={`tab-panel ${activeTab === 'tab4' ? 'active' : ''}`}>
          {/* Shop by Brand Ambassador Section */}
            <section style={{  textAlign: 'left', }}>
            
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: 'space-between'  }}>
              {/* Navigation Buttons */}
              <div style={{ display: 'flex', width: "100%", marginBottom: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', color: 'White', fontSize: '25px' }}>VibeReel</span>
                <div style={{ display: 'flex' }}>
                  <button
                    onClick={prevAmbassador}
                    style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      zIndex: 10,
                      marginRight: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '48px',
                      height: '48px',
                    }}
                    disabled={ambassadorIndex === 0}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextAmbassador}
                    style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      zIndex: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '48px',
                      height: '48px',
                    }}
                    disabled={isAmbassadorNextDisabled}
                  >
                    <ChevronRight size={20} />
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
                    opacity: previousProducts.includes(video) ? 0 : 1, // Hide previous images
                  }} onClick={() => handleDetailView()}>
                    {/* <img
                      src={product.img}
                      alt={`Product ${index + 1}`}
                      style={{ width: '100%', height: '100%', borderRadius: '0px', objectFit: 'cover' }}
                    />
                    <p style={{fontSize:"20px", textAlign:"center", marginTop:"10px"}}>{product.Name}</p> */}
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
                  </div>
                ))}
              </div>
            </div>
            </section>
        </div>
      </div>
    </div>
      </section>
      </div>
    </div>
    )}
    </>
  );
}

export default ProductDetails;
