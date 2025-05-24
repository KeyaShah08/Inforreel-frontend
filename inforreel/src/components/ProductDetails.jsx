import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel'; // Import Carousel component
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { useNavigate } from 'react-router-dom';
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
  const allCollection = [    
    '/samplevideo3.mp4',
    '/samplevideo4.mp4',    
    '/samplevideo5.mp4',
    '/samplevideo6.mp4',  
    '/samplevideo1.mp4',
    '/samplevideo4.mp4',
  ];
  const slides = [
    { src: "/sl1.png"},
    { src: "/b13.png"},
    { src: "/b11.png"},
    { src: "/sl1.png"},
    { src: "/b13.png"},
    { src: "/b11.png"},
  ];
  const slides2 = [
    { src: "/sl1.png"},
    { src: "/sl2.png"},
    { src: "/sl3.png"},
    { src: "/sl1.png"},
    { src: "/sl2.png"},
    { src: "/sl3.png"},
  ];
  const ListItem = [
    {img:'/Li1.png', Date:"5/1/2025", purchsed:"2K purchased", Name:"Prestige Exceptional Micro-Nutritive and Repairing Ritual "},
    {img:'/Li2.png', Date:"5/5/2025", purchsed:"5K purchased", Name:"Forever Glow Luminizer - Limited Edition"},
    {img:'/Li3.png', Date:"5/9/2025", purchsed:"10K purchased", Name:"Diorshow 5 Couleurs - Limited Edition"},
    {img:'/Li4.png', Date:"5/10/2025", purchsed:"12K purchased", Name:"Rouge Dior"},
  ];
  const allImagesBottom = [
    {img:'/b11.png', Name:"Gucci", Smallimg:'/gucci.png'},
    {img:'/b12.png', Name:"Fenty Beauty", Smallimg:'/fentyBeauty.png'},
    {img:'/b13.png', Name:"Armani", Smallimg:'/armani.png'},
    {img:'/b12.png', Name:"Fenty Beauty", Smallimg:'/fentyBeauty.png'},
    {img:'/b13.png', Name:"Gucci", Smallimg:'/gucci.png'},
    {img:'/b11.png', Name:"Armani", Smallimg:'/armani.png'},
  ];
  const allImagesBottom2 = [
    {img:'/sp1.png', Name:"Gucci", Smallimg:'/gucci.png'},
    {img:'/sp2.png', Name:"Fenty Beauty", Smallimg:'/fentyBeauty.png'},
    {img:'/sp3.png', Name:"Armani", Smallimg:'/armani.png'},
    {img:'/sp4.png', Name:"Fenty Beauty", Smallimg:'/fentyBeauty.png'},
    {img:'/sp5.png', Name:"Gucci", Smallimg:'/gucci.png'},
    {img:'/sp6.png', Name:"Armani", Smallimg:'/armani.png'},
  ];
  const [displayedImages, setDisplayedImages] = useState(allImages.slice(0, 3));
  const [displayedProducts, setDisplayedProducts] = useState(allProducts.slice(0, 3));
  const [displayedAmbassadors, setDisplayedAmbassadors] = useState(allAmbassadors.slice(0, 3));
  const [displayedVideos, setDisplayedVideos] = useState(allVideos.slice(0, 3));
  const [displayedCollection, setDisplayedCollection] = useState(allCollection.slice(0, 3));
  
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
  const [isOpen, setIsOpen] = useState(false); 
  const [isOpensec, setIssec] = useState(false);
  const [isOpenDrp, setIsOpenDrp] = useState(false); // State for dropdown open status  
  const [isActive, setIsActive] = useState(false);
  const videoRefs = useRef([]);
  const videoRefsN = useRef([]);
  const videoRefscoll = useRef([]);
  const videoRefs2 = useRef([]);
  const videoRef3 = useRef([]);
  const navigate = useNavigate();


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
    // Clear video refs when tab/content changes
    videoRefscoll.current = [];
  }, [activeTab]);

  const toggleDropdown = () => { 
    setIsOpenDrp(!isOpenDrp);
    setIssec(false);
  };
  const toggleDropdown2 = () => {
    setIssec(!isOpensec);
    setIsOpen(false);
  };
  const handleClickActive = () => {
    setIsActive(!isActive);
  };
  return (
    <>
     <style>
      {`
      .dropdown {
        border: 1px solid #ddd;
        width:200px;
        height:30px;
        outline:0;
        border-radius:4px;
        background:rgba(0,0,0,0.2);
        color:#fff;
      }
      .carousel .control-dots .dot {
        background: #797470; 
        opacity: 0.7;
        margin: 0 2px;
      }
      .select-box:hover {
        background-color: #f0f0f0;
      }   
      .carousel .control-dots .dot.selected {
        background: #fff;
        opacity: 1;
      }
      .carousel .control-dots .dot:hover {
        background: #666;
      }
      .slide img {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
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
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 11111;
      }
      .modal {
        background: #000;
        border-radius: 7px;
        max-width: 78%;
        width: 90%;
        max-height: 90vh; 
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        animation: fadeIn 0.3s ease-out;
        overflow: hidden;
      }
      .modal-body {
        max-height: 92vh;
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none; 
      }
      .modal-body::-webkit-scrollbar {
        display: none;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .ImagesAll:nth-child(3n) {
        margin-right: 0 !important;
      }
  
      /* Hide vertical scrollbar for the whole page */
      ::-webkit-scrollbar {
        width: 0px;
        background: transparent;
      }
      html {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      body {
        overflow-y: scroll;
      }
        .custom-input::placeholder {
          color: #000;
          font-weight:500;
        }
        .tab-panel {
          display: none;
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
          display:block;
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
        .ActiveBtn {
          background: #912664 !important;
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
        paddingLeft: "280px"
      }}>
      <section style={{ marginTop: '525px', textAlign: 'left', position:"relative" }}>
      <img
            onClick={() => handleack()}
                                      src={'/backArrow.png'}
                                      alt={`backArrow`}
                                      style={{width: "auto",height: "auto",borderRadius: "0px",objectFit: "cover",position:"relative",zIndex:"9999",top:"-86px",marginRight:"6px",marginTop:"3px"}}
                                    />
          <div style={{display: "flex",alignItems: "center",justifyContent: "space-between",marginTop:"-32px" }}>
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
                  }} onClick={() => setIsOpen(true)}>
                    {/* onClick={() => handleDetailView()} */}
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
                          if (el) videoRefsN.current[index] = el;
                        }}
                        src={video}
                        controls
                        muted
                        style={{ cursor:"pointer",width: '100%', height: '100%', borderRadius: '0px', objectFit: 'cover' }}
                        onMouseEnter={() => {
                          videoRefsN.current[index]?.play();
                        }}
                        onMouseLeave={() => {
                          const video = videoRefsN.current?.[index];
                          if (video && typeof video.pause === 'function') {
                            video.pause();
                            video.currentTime = 0;
                          }
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
                {displayedCollection.map((video, index) => (
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
                          const video = videoRefs.current?.[index];
                          if (video && typeof video.pause === 'function') {
                            video.pause();
                            video.currentTime = 0;
                          }
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

    //first modal 
    {isOpen && (
        <div className="modal-overlay">
          <div className="modal" style={{position:"relative"}}>
          <div className="modal-body" style={{position:"relative"}}>
            <button
                onClick={() => setIsOpen(false)}
                style={{position:"absolute", right:"15px", top:"15px", zIndex:"111111111", background:"#181818", color:"#fff", borderRadius:"50%", width:"36px", height:"36px", border:"none", cursor:"pointer  "}}
              >
              X
            </button>
            <div style={{position:"relative"}}>
              <Carousel 
                autoPlay
                interval={2000} 
                infiniteLoop 
                howStatus={false} 
                showArrows={false} 
                showThumbs={false} 
                showStatus={false} 
              >
                  {slides.map((slide, index) => (
                    <div key={index}>
                      <img src={slide.src} alt={`Slide ${index + 1}`} />
                    </div>
                  ))}
              </Carousel>
              <div style={{position:"absolute", zIndex: "999",bottom:"0", left:"0",right:"0", background:"rgba(0,0,0,0.5)", padding:"2px 15px"}}>
                <div style={{display:"flex", alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{display:"flex", alignItems:"center",justifyContent:"space-between"}}>
                    <button onClick={handleClickActive} className={`${isActive ? "" : "ActiveBtn"}`} style={{cursor:"pointer",border:"none", display:"flex", alignItems:"center",background:"rgba(123,123,123,0.2)", padding:"2px 5px",borderTopLeftRadius:"15px",borderBottomLeftRadius:"15px", height:"21px", borderTopRightRadius:"0",borderBottomRightRadius:"0"}}>
                      <img
                        src={"/ImageShow.png"}
                        alt={`cdiorbeauty`}
                        style={{ width: 'auto', height: 'auto', borderRadius: '0px', objectFit: 'cover', maxHeight:"540px" }}
                      />
                    </button>
                    <button onClick={handleClickActive} className={`${isActive ? "ActiveBtn" : ""}`} style={{cursor:"pointer",border:"none", display:"flex", alignItems:"center",background:"rgba(123,123,123,0.2)", padding:"2px 5px",borderTopRightRadius:"15px",borderBottomRightRadius:"15px", height:"21px",borderTopLeftRadius:"0",borderBottomLeftRadius:"0"}}>
                      <img
                        src={"/videoShow.png"}
                        alt={`cdiorbeauty`}
                        style={{ width: 'auto', height: 'auto', borderRadius: '0px', objectFit: 'cover', maxHeight:"540px" }}
                      />
                    </button>
                  </div>
                  <img
                    src={"/zoom.png"}
                    alt={`cdiorbeauty`}
                  />
                </div>
              </div>
            </div>
            <div style={{padding:"15px 30px", background:"linear-gradient(rgba(243, 180, 97, 0.55) 0%, rgba(78, 77, 75, 0.45) 30%, rgba(20, 20, 20, 0.55) 100%)", height:"100%"}}>
              <div style={{marginTop: '0px'}}>
                                <div style={{display: 'flex',alignItems:"center",justifyContent: 'flex-start', marginTop:"15px"}}>                                  
                                  <img
                                      src={'/be1_2.png'}
                                      alt={`name`}
                                      style={{width: "auto",height: "auto",borderRadius: "0px",objectFit: "cover",marginRight:"5px",}}
                                    />
                                  <span style={{display: 'flex',alignItems:"center",justifyContent: 'flex-start', fontWeight:"bold", fontSize:"20px", color:"#fff "}}>Dior</span>
                                </div>
                                <div style={{display: 'block', marginTop:"15px"}}>
                                  <p style={{display: 'block', fontSize:"28px", fontWeight:"bold", marginTop:"20px", color:"#d2d2d2"}}>Dior Prestige La Micro-Huile de Rose Activated Serum</p>
                                  <p style={{display: 'block', fontSize:"20px", marginTop:"5px", color:"#d2d2d2"}}>Exceptional Repairing Micro-Nutritive Serum</p>
                                </div>
                                <div style={{display: 'flex', alignItems:"center",justifyContent: 'flex-start', marginTop:"15px"}}>
                                  <p style={{display: 'flex', alignItems:"center",justifyContent: 'flex-start', marginRight:"20px",fontSize:"16px", color:"#fff"}}>$100.00</p>
                                  <img
                                      src={'/star.png'}
                                      alt={`name`}
                                      style={{borderLeft:"1px solid #fff",paddingLeft:"15px",width: "auto",height: "auto",borderRadius: "0px",objectFit: "cover",marginRight:"6px",marginTop:"3px"}}
                                    />
                                    <p style={{fontSize:"10px", marginTop:"3px", color:"#fff"}}>( 32 review )</p>
                                </div>
                                <div style={{display:"flex", alignItems:"center", justifyContent:"flex-start", marginTop:"30px"}}>
                                      <button type='button' style={{  
                                            background: 'rgba(123,123,123,0.4)',
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
                                            background: 'rgba(123,123,123,0.4)',
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
                                            background: 'rgba(123,123,123,0.4)',
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
                                            src={"/send.png"}
                                            alt={`cdiorbeauty`}
                                          />
                                      </button>
                                      <button type='button' style={{  
                                            background: 'rgba(123,123,123,0.4)',
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
                                            src={"/info.png"}
                                            alt={`cdiorbeauty`}
                                          />
                                      </button>
                                    </div>
                                    <div>
                                    <div style={{position:"relative", display:"flex", marginTop:"25px"}}>
                                    {/* onClick={handleAddToCart} */}
                                      <button  style={{ marginRight: '20px', textAlign: 'center', background:'#96105E', color:'#fff', height:'50px', width:'166px', borderRadius:'10px', border:'1px solid #96105E', fontSize:'16px' }} type='button'>Add to Cart</button>
                                      <button style={{ marginRight: '0px', textAlign: 'center', background:"transparent", color:"#fff", height:"50px", width:"166px",borderRadius:"10px", border:"1px solid #7B7B7B", fontSize:"16px"}} type='button'>Buy Now</button>
                                    </div>
                                    <div style={{display: 'block', marginTop:"15px"}}>
                                      <p style={{display: 'block', fontSize:"16px", marginTop:"5px", color:"#d2d2d2"}}>An anti-aging serum for face and neck, Dior Prestige La Micro-Huile de Rose Activated Serum is the ultimate Dior micro-nutritive supplement for visibly younger, plumper skin.</p>
                                    </div>
                                        <div style={{display: 'flex', marginTop:"30px"}}>
                                          <div>
                                          <span style={{  
                                            color:"#fff",
                                            fontSize:"18px",
                                              }}>Quantity</span>
                                              <button type='button' style={{  
                                                background: 'transparent',
                                                border:"1px solid #d7d7d7",
                                                padding:"8px 15px",
                                                display:"flex",
                                                alignItems:"center",
                                                justifyContent:"space-between",
                                                borderRadius:"20px",
                                                width:"127px",
                                                height:"49px",
                                                marginRight:"10px",
                                                marginTop:"20px",
                                              }}
                                            >
                                              <span style={{fontSize:"20px", color:"#fff", width:"24px",
                                                height:"24px", display:"flex",
                                                alignItems:"center",
                                                justifyContent:"center",}}>-</span>
                                              <input type='text' value="1" style={{fontSize:"14px",color:"#fff", width:"20px", background:"transparent", border:"none", textAlign:"center"}}/>
                                              <span style={{fontSize:"20px", color:"#fff", width:"24px",
                                                height:"24px", display:"flex",
                                                alignItems:"center",
                                                justifyContent:"center",}}>+</span>
                                          </button>
                                          </div>
                                          <div>
                                          <span style={{  
                                            color:"#fff",
                                            fontSize:"18px",
                                            marginLeft:"30px",
                                              }}>Size</span>
                                              <button onClick={toggleDropdown} className="dropdown-button" style={{
                                                padding: '10px 20px',
                                                backgroundColor: '#333',
                                                color: 'white',
                                                border: "1px solid #d7d7d7",
                                                cursor: 'pointer',
                                                background:"transparent",
                                                display: 'block',
                                                display:"flex",
                                                alignItems:"center",
                                                justifyContent:"space-between",
                                                borderRadius:"20px",
                                                width:"127px",
                                                height:"49px",
                                                marginLeft:"30px",
                                                marginTop:"20px",

                                              }}>
                                                30ml  
                                                <img
                                                  src={'/downmenu.png'}
                                                  alt={`name`}
                                                  style={{paddingLeft:"15px",width: "auto",height: "auto",borderRadius: "0px",objectFit: "cover",marginTop:"3px"}}
                                                />
                                              </button>

                                          </div>
                                        </div>  
                                  </div>
                              </div> 
                <div style={{marginTop: '50px'}}>
                  <p style={{fontSize:"24px",color:"#fff",}}>Related Products</p>
                  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: "flex-end" }}>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        overflowX: 'hidden',
                        paddingBottom: '20px',
                        justifyContent: "space-between"
                      }}
                    >
                      {allImagesBottom.map((image, index) => (
                        <div key={index} className='ImagesAll' style={{
                          flex: '0 0 auto',
                          width: '31%',
                          height: '31%',
                          marginRight: '10px',
                          marginTop:"30px",
                          borderRadius: '2px',
                          transition: 'opacity 0.5s ease-in-out',
                        }} onClick={toggleDropdown2}>
                          <img
                            src={image.img}
                            alt={`Brand ${index + 1}`}
                            style={{ width: '100%', height: '100%', borderTopLeftRadius: '4px',borderTopRightRadius: '4px', objectFit: 'cover' }}
                          />
                          <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            <div className=''>
                                    <div style={{background: '#2f2f2f',padding:"15px",marginTop:"-5px", borderRadius:"4px"}}>
                                      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                                          <div style={{display:"flex", alignItems:"center", justifyContent:"flex-start"}}>
                                            <button type='button' style={{  
                                                  background: 'rgba(123,123,123,0.2)',
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
                                                /> <span style={{width:"16px",
                                                height:"16px",color:"#fff", fontSize:"13px", paddingLeft:"5px", marginTop:"1px"}}>241</span>
                                            </button>
                                            <button type='button' style={{  
                                                  background: 'rgba(123,123,123,0.2)',
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
                                                  background: 'rgba(123,123,123,0.2)',
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
                                                background: 'rgba(123,123,123,0.2)',
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
                                      </div>
                                      <div style={{display: 'flex',alignItems:"center",justifyContent: 'flex-start', marginTop:"25px"}}>                                  
                                        <img
                                            src={'/gucci.png'}
                                            alt={`Brand ${index + 1}`}
                                            style={{width: "auto",height: "auto",borderRadius: "0px",objectFit: "cover",marginRight:"5px",}}
                                          />
                                        <span style={{display: 'flex',alignItems:"center",justifyContent: 'flex-start', fontWeight:"bold", fontSize:"20px", color:"#fff"}}>Dior</span>
                                      </div>
                                      <div style={{display: 'block', marginTop:"15px"}}>
                                        <p style={{display: 'block', fontSize:"15px", marginTop:"10px", color:"#d2d2d2"}}>Rouge Dior</p>
                                        <p style={{display: 'block', fontSize:"12px", marginTop:"5px", color:"#d2d2d2"}}>Couture Color - Hydrating & Long-lasting lipstick - Velvet, Satin & New Veil Finishes</p>
                                      </div>
                                      <div style={{display: 'flex', alignItems:"center",justifyContent: 'flex-start', marginTop:"15px"}}>
                                        <p style={{display: 'flex', alignItems:"center",justifyContent: 'flex-start', marginRight:"20px",fontSize:"16px", color:"#fff"}}>$45.00</p>
                                        <img
                                            src={'/star.png'}
                                            alt={`Brand ${index + 1}`}
                                            style={{width: "auto",height: "auto",borderRadius: "0px",objectFit: "cover",marginRight:"6px",marginTop:"3px"}}
                                          />
                                          <p style={{fontSize:"10px", marginTop:"3px", color:"#fff"}}>( 132 review )</p>
                                      </div>
                                    </div>
                                    
                                </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      // second modal
      {isOpensec && (
        <div className="modal-overlay">
          <div className="modal" style={{position:"relative"}}>
          <div className="modal-body" style={{position:"relative"}}>
            <button
                onClick={() => {
                  setIsOpen(false);
                  setIssec(false);}}
                style={{position:"absolute", right:"15px", top:"15px", zIndex:"111111111", background:"#181818", color:"#fff", borderRadius:"50%", width:"36px", height:"36px", border:"none", cursor:"pointer  "}}
              >
              X
            </button>
             <div className='SecondSection'>
              <div style={{position:"relative"}}>
                <Carousel 
                  autoPlay 
                  interval={2000} 
                  infiniteLoop 
                  howStatus={false} 
                  showArrows={false} 
                  showThumbs={false} 
                  showStatus={false} 
                >
                    {slides2.map((slide, index) => (
                      <div key={index}>
                        <img src={slide.src} alt={`Slide ${index + 1}`} />
                      </div>
                    ))}
                </Carousel>
                <div style={{position:"absolute",zIndex: "999",bottom:"0", left:"0",right:"0", background:"rgba(0,0,0,0.1)", padding:"2px 15px"}}>
                  <div style={{display:"flex", alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{display:"flex", alignItems:"center",justifyContent:"space-between"}}>
                    <button onClick={handleClickActive} className={`${isActive ? "" : "ActiveBtn"}`} style={{cursor:"pointer",border:"none", display:"flex", alignItems:"center",background:"rgba(123,123,123,0.2)", padding:"2px 5px",borderTopLeftRadius:"15px",borderBottomLeftRadius:"15px", height:"21px", borderTopRightRadius:"0",borderBottomRightRadius:"0"}}>
                      <img
                        src={"/ImageShow.png"}
                        alt={`cdiorbeauty`}
                        style={{ width: 'auto', height: 'auto', borderRadius: '0px', objectFit: 'cover', maxHeight:"540px" }}
                      />
                    </button>
                    <button onClick={handleClickActive} className={`${isActive ? "ActiveBtn" : ""}`} style={{cursor:"pointer",border:"none", display:"flex", alignItems:"center",background:"rgba(123,123,123,0.2)", padding:"2px 5px",borderTopRightRadius:"15px",borderBottomRightRadius:"15px", height:"21px",borderTopLeftRadius:"0",borderBottomLeftRadius:"0"}}>
                      <img
                        src={"/videoShow.png"}
                        alt={`cdiorbeauty`}
                        style={{ width: 'auto', height: 'auto', borderRadius: '0px', objectFit: 'cover', maxHeight:"540px" }}
                      />
                    </button>
                  </div>
                    <img
                      src={"/zoom.png"}
                      alt={`cdiorbeauty`}
                    />
                  </div>
                </div>
              </div>
              <div style={{padding:"15px 30px", background:"linear-gradient(rgb(120 85 65) 0%, rgba(78, 77, 75, 0.45) 30%, rgba(20, 20, 20, 0.55) 50%)", height:"100%"}}>
                <div style={{marginTop: '0px'}}>
                                  <div style={{display: 'flex',alignItems:"center",justifyContent: 'flex-start', marginTop:"15px"}}>                                  
                                    <img
                                        src={'/be1_2.png'}
                                        alt={`name`}
                                        style={{width: "auto",height: "auto",borderRadius: "0px",objectFit: "cover",marginRight:"5px",marginTop:"4px"}}
                                      />
                                    <span style={{display: 'flex',alignItems:"center",justifyContent: 'flex-start', fontWeight:"bold", fontSize:"36px", color:"#fff ", marginLeft:"20px"}}>Dior</span>
                                  </div>
                                  <div style={{display: 'block', marginTop:"15px"}}>
                                  <p style={{display: 'block', fontSize:"25px", fontWeight:"bold", marginTop:"5px", color:"#fff"}}>Rouge Dior</p>
                                    <p style={{display: 'block', fontSize:"20px", marginTop:"10px", color:"#d2d2d2"}}>Couture Color - Hydrating & Long-lasting lipstick - Velvet, Satin & New Veil Finishes</p>
                                  </div>
                                  <div style={{display: 'flex', alignItems:"center",justifyContent: 'flex-start', marginTop:"15px"}}>
                                  <p style={{display: 'flex', alignItems:"center",justifyContent: 'flex-start', marginRight:"20px",fontSize:"28px", color:"#fff"}}>$100.00</p>
                                  <img
                                      src={'/star.png'}
                                      alt={`star`}
                                      style={{borderLeft:"1px solid #fff", paddingLeft:"20px",width: "auto",height: "auto",borderRadius: "0px",objectFit: "cover",marginRight:"10px",marginTop:"3px"}}
                                    />
                                    <p style={{fontSize:"14px", marginTop:"3px", color:"#fff"}}>( 32 review )</p>
                                </div>
                                <div style={{display:"flex", alignItems:"center", justifyContent:"flex-start", marginTop:"30px"}}>
                                      <button type='button' style={{  
                                            background: 'rgba(123,123,123,0.4)',
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
                                            background: 'rgba(123,123,123,0.4)',
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
                                            background: 'rgba(123,123,123,0.4)',
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
                                            src={"/send.png"}
                                            alt={`cdiorbeauty`}
                                          />
                                      </button>
                                      <button type='button' style={{  
                                            background: 'rgba(123,123,123,0.4)',
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
                                            src={"/info.png"}
                                            alt={`cdiorbeauty`}
                                          />
                                      </button>
                                    </div>
                                    <div>
                                    <div style={{position:"relative", display:"flex", marginTop:"25px"}}>
<button
    style={{ marginRight: '20px', textAlign: 'center', background:'#96105E', color:'#fff', height:'50px', width:'166px', borderRadius:'10px', border:'1px solid #96105E', fontSize:'16px' }}
    type='button'
    onClick={() => navigate('/mycart')} // Add this line
>
    Add to Cart
</button>                                          <button style={{ marginRight: '0px', textAlign: 'center', background:"transparent", color:"#fff", height:"50px", width:"166px",borderRadius:"10px", border:"1px solid #7B7B7B", fontSize:"16px"}} type='button'>Buy Now</button>
                                    </div>
                                    <div style={{display: 'block', marginTop:"15px"}}>
                                      <p style={{display: 'block', fontSize:"16px", marginTop:"5px", color:"#d2d2d2"}}>An anti-aging serum for face and neck, Dior Prestige La Micro-Huile de Rose Activated Serum is the ultimate Dior micro-nutritive supplement for visibly younger, plumper skin.</p>
                                    </div>
                                    <div style={{display: 'flex', marginTop:"30px"}}>
                                      <div>
                                      <span style={{  
                                        color:"#fff",
                                        fontSize:"18px",
                                          }}>Quantity</span>
                                          <button type='button' style={{  
                                            background: 'transparent',
                                            border:"1px solid #d7d7d7",
                                            padding:"8px 15px",
                                            display:"flex",
                                            alignItems:"center",
                                            justifyContent:"space-between",
                                            borderRadius:"20px",
                                            width:"127px",
                                            height:"49px",
                                            marginRight:"10px",
                                            marginTop:"20px",
                                          }}
                                        >
                                          <span style={{fontSize:"20px", color:"#fff", width:"24px",
                                            height:"24px", display:"flex",
                                            alignItems:"center",
                                            justifyContent:"center",}}>-</span>
                                          <input type='text' value="1" style={{fontSize:"14px",color:"#fff", width:"20px", background:"transparent", border:"none", textAlign:"center"}}/>
                                          <span style={{fontSize:"20px", color:"#fff", width:"24px",
                                            height:"24px", display:"flex",
                                            alignItems:"center",
                                            justifyContent:"center",}}>+</span>
                                      </button>
                                      </div>
                                      <div>
                                      <span style={{  
                                        color:"#fff",
                                        fontSize:"18px",
                                        marginLeft:"30px",
                                          }}>Color</span>
                                        <ul style={{margin:"0", padding:"0", listStyle:"none",display: "flex", marginTop: "28px",marginLeft: "30px" }}>
                                          <li style={{display:"flex",}}>
                                            <button type='button' style={{cursor:"pointer",border: "1px solid rgb(255, 255, 255)",borderRadius:"50%",display: "flex",width: "32px",height: "32px",background: "transparent",padding: "0",alignItems: "center",justifyContent: "center"}}><span style={{background: "rgb(193, 117, 113)",borderRadius: "50%",width: "24px",height: "24px",display: "flex",alignItems: "center",justifyContent: "center",margin: "auto",position: "relative",left: "0.5px",top: "0.6px"}}></span></button>
                                          </li>
                                          <li style={{display:"flex",}}>
                                            <button type='button' style={{cursor:"pointer",border: "none",background:"transparent",display: "flex",}}><span style={{background: "#7B3835",borderRadius: "50%",width: "24px",height: "24px",display: "flex",alignItems: "center",justifyContent: "center",margin: "auto",position: "relative",left: "0.5px",top: "0.6px"}}></span></button>
                                          </li>
                                          <li style={{display:"flex",}}>
                                            <button type='button' style={{cursor:"pointer",border: "none",background:"transparent",display: "flex",}}><span style={{background: "#E3726A",borderRadius: "50%",width: "24px",height: "24px",display: "flex",alignItems: "center",justifyContent: "center",margin: "auto",position: "relative",left: "0.5px",top: "0.6px"}}></span></button>
                                          </li>
                                          <li style={{display:"flex",}}>
                                            <button type='button' style={{cursor:"pointer",border: "none",background:"transparent",display: "flex",}}><span style={{background: "#C7433E",borderRadius: "50%",width: "24px",height: "24px",display: "flex",alignItems: "center",justifyContent: "center",margin: "auto",position: "relative",left: "0.5px",top: "0.6px"}}></span></button>
                                          </li>
                                          <li style={{display:"flex",}}>
                                            <button type='button' style={{cursor:"pointer",border: "none",background:"transparent",display: "flex",}}><span style={{background: "#CF6F66",borderRadius: "50%",width: "24px",height: "24px",display: "flex",alignItems: "center",justifyContent: "center",margin: "auto",position: "relative",left: "0.5px",top: "0.6px"}}></span></button>
                                          </li>
                                          <li style={{display:"flex",}}>
                                            <button type='button' style={{cursor:"pointer",border: "none",background:"transparent",display: "flex",}}><span style={{background: "#DA3E47",borderRadius: "50%",width: "24px",height: "24px",display: "flex",alignItems: "center",justifyContent: "center",margin: "auto",position: "relative",left: "0.5px",top: "0.6px"}}></span></button>
                                          </li>
                                          <li style={{display:"flex",}}>
                                            <button type='button' style={{cursor:"pointer",border: "none",background:"transparent",display: "flex",}}><span style={{background: "#EC1B19",borderRadius: "50%",width: "24px",height: "24px",display: "flex",alignItems: "center",justifyContent: "center",margin: "auto",position: "relative",left: "0.5px",top: "0.6px"}}></span></button>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div> 
                  <div style={{marginTop: '50px'}}>
                    <p style={{fontSize:"24px",color:"#fff",}}>Related Products</p>
                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: "flex-end" }}>
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          overflowX: 'hidden',
                          paddingBottom: '20px',
                          justifyContent: "space-between"
                        }}
                      >
                        {allImagesBottom2.map((image, index) => (
                          <div key={index} className='ImagesAll' style={{
                            flex: '0 0 auto',
                            width: '31%',
                            height: '31%',
                            marginRight: '10px',
                            marginTop:"30px",
                            borderRadius: '2px',
                            transition: 'opacity 0.5s ease-in-out',
                          }}>
                            <img
                              src={image.img}
                              alt={`Brand ${index + 1}`}
                              style={{ width: '100%', height: '100%', borderTopLeftRadius: '4px',borderTopRightRadius: '4px', objectFit: 'cover' }}
                            />
                            <div key={index} style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                              <div className=''>
                                      <div style={{background: '#2f2f2f',padding:"15px",marginTop:"-5px", borderRadius:"4px"}}>
                                        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                                            <div style={{display:"flex", alignItems:"center", justifyContent:"flex-start"}}>
                                              <button type='button' style={{  
                                                    background: 'rgba(123,123,123,0.2)',
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
                                                  /> <span style={{width:"16px",
                                                  height:"16px",color:"#fff", fontSize:"13px", paddingLeft:"5px", marginTop:"1px"}}>241</span>
                                              </button>
                                              <button type='button' style={{  
                                                    background: 'rgba(123,123,123,0.2)',
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
                                                    background: 'rgba(123,123,123,0.2)',
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
                                                  background: 'rgba(123,123,123,0.2)',
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
                                        </div>
                                        <div style={{display: 'flex',alignItems:"center",justifyContent: 'flex-start', marginTop:"25px"}}>                                  
                                          <img
                                              src={'/gucci.png'}
                                              alt={`Brand ${index + 1}`}
                                              style={{width: "auto",height: "auto",borderRadius: "0px",objectFit: "cover",marginRight:"5px",}}
                                            />
                                          <span style={{display: 'flex',alignItems:"center",justifyContent: 'flex-start', fontWeight:"bold", fontSize:"22px", color:"#fff"}}>Dior</span>
                                        </div>
                                        <div style={{display: 'block', marginTop:"15px"}}>
                                          <p style={{display: 'block', fontSize:"18px", marginTop:"10px", color:"#d2d2d2", fontWeight:"bold"}}>Rouge Dior</p>
                                          <p style={{display: 'block', fontSize:"12px", marginTop:"5px", color:"#d2d2d2"}}>Couture Color - Hydrating & Long-lasting lipstick - Velvet, Satin & New Veil Finishes</p>
                                        </div>
                                        <div style={{display: 'flex', alignItems:"center",justifyContent: 'space-between', marginTop:"15px"}}>
                                          <p style={{display: 'flex', alignItems:"center",justifyContent: 'flex-start', marginRight:"20px",fontSize:"16px", color:"#fff"}}>$45.00</p>
                                          <div style={{display: 'flex', alignItems:"center",justifyContent: 'flex-end',}}>
                                            <img
                                                src={'/star.png'}
                                                alt={`Brand ${index + 1}`}
                                                style={{width: "auto",height: "auto",borderRadius: "0px",objectFit: "cover",marginRight:"6px",marginTop:"3px"}}
                                              />
                                            <p style={{fontSize:"10px", marginTop:"3px", color:"#fff"}}>( 132 review )</p>
                                            </div>
                                        </div>
                                      </div>
                                      
                                  </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
      )}
    </>
  );
}

export default ProductDetails;
