import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useNavigate } from 'react-router-dom';
import BeautyProducts from './BeautyProducts';
import Beautyshowambassadors from './Beautyshowambassadors';


function ProductDetails2() {
  const allImages = [
    {img:'/d1.png', Name:"Dior"},
    {img:'/d2.png', Name:"Chanel"},
    {img:'/d3.png', Name:"Gucci"},
    {img:'/d2.png', Name:"Chanel"},
    {img:'/d1.png', Name:"Dior"},
    {img:'/d3.png', Name:"Gucci"},
  ];
  const allProducts = [
    {img:'/m1.png', Name:"Makeup"},
    {img:'/m2.png', Name:"Skincare"},
    {img:'/m3.png', Name:"Name"},
    {img:'/m2.png', Name:"Skincare"},
    {img:'/m3.png', Name:"Makeup"},
    {img:'/m1.png', Name:"Makeup"},
  ];
  const allAmbassadors = [
    {img:'/v1.png', Name:"Lipstick"},
    {img:'/v2.png', Name:"Highlighter Powder"},
    {img:'/v3.png', Name:"Eyeshadows"},
    {img:'/v4.png', Name:"Skin care"},
    {img:'/v3.png', Name:"Lipstick"},
    {img:'/v1.png', Name:"Highlighter Powder"},
  ];

  const allPost = [
    {img:'/ps1.png', Name:"Skincare"},
    {img:'/ps2.png', Name:"Makeup"},
    {img:'/ps3.png', Name:"Haircare"},
    {img:'/ps4.png', Name:"Fragrances"},
    {img:'/ps1.png', Name:"Skincare"},
    {img:'/ps2.png', Name:"Makeup"},
  ];
  const allVideos = [
    '/samplevideo1.mp4',
    '/samplevideo2.mp4',
    '/samplevideo3.mp4',
    '/samplevideo4.mp4',
    '/samplevideo5.mp4',
    '/samplevideo6.mp4',
    
  ];
  const ListItem = [
    {img:'/Li1.png', Date:"5/1/2025", purchsed:"2K purchased", Name:"Prestige Exceptional Micro-Nutritive and Repairing Ritual",Smallimg:'/gucci.png'},
    {img:'/Li2.png', Date:"5/5/2025", purchsed:"5K purchased", Name:"Forever Glow Luminizer - Limited Edition",Smallimg:'/fentyBeauty.png'},
    {img:'/Li3.png', Date:"5/9/2025", purchsed:"10K purchased", Name:"Diorshow 5 Couleurs - Limited Edition", Smallimg:'/armani.png'},
    {img:'/Li4.png', Date:"5/10/2025", purchsed:"12K purchased", Name:"Rouge Dior",Smallimg:'/fentyBeauty.png'},
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
   
    { src: "/sl2.png"},
    { src: "/sl3.png"},
    { src: "/sl1.png"},
     { src: "/sl1.png"},
    { src: "/sl2.png"},
    { src: "/sl3.png"},
  ];
    const modalVideos = [ // New array for modal videos
    { src: "/Beauty/beauty1.mp4" },
    { src: "/Beauty/beauty2.mp4" },
    { src: "/Beauty/beauty3.mp4" },
    { src: "/Beauty/beauty4.mp4" },
    { src: "/Beauty/beauty5.mp4" },
  ];

  const modalVideos2 = [
  { src: "/Beauty/beauty4.mp4" },
  { src: "/Beauty/beauty5.mp4" },
  { src: "/Beauty/beauty6.mp4" },
  { src: "/Beauty/beauty7.mp4" },
  { src: "/Beauty/beauty8.mp4" },
];
  const allImagesBottom = [
    {img:'/pr1.png', Name:"Gucci", Smallimg:'/gucci.png'},
    {img:'/pr2.png', Name:"Fenty Beauty", Smallimg:'/fentyBeauty.png'},
    {img:'/pr3.png', Name:"Armani", Smallimg:'/armani.png'},
    {img:'/pr4.png', Name:"Fenty Beauty", Smallimg:'/fentyBeauty.png'},
    {img:'/pr5.png', Name:"Gucci", Smallimg:'/gucci.png'},
    {img:'/pr6.png', Name:"Armani", Smallimg:'/armani.png'},
    {img:'/pr7.png', Name:"Fenty Beauty", Smallimg:'/fentyBeauty.png'},
    {img:'/pr8.png', Name:"Gucci", Smallimg:'/gucci.png'},
    {img:'/pr9.png', Name:"Armani", Smallimg:'/armani.png'},
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
  const [displayedPost, setDisplayedPost] = useState(allPost.slice(0, 3));
  const [displayedVideos, setDisplayedVideos] = useState(allVideos.slice(0, 3));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productIndex, setProductIndex] = useState(0);
  const [ambassadorIndex, setAmbassadorIndex] = useState(0);
  const [postIndex, setPostIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const imageContainerRef = useRef(null);
  const [isNextDisabled, setIsNextDisabled] = useState(allImages.length <= 3);
  const [isProductNextDisabled, setIsProductNextDisabled] = useState(allProducts.length <= 3);
  const [isAmbassadorNextDisabled, setIsAmbassadorNextDisabled] = useState(allAmbassadors.length <= 3);
  const [isallPostNextDisabled, setIsallPostNextDisabled] = useState(allPost.length <= 3);
  const [isVideoNextDisabled, setIsVideoNextDisabled] = useState(allVideos.length <= 3);
  const [previousImages, setPreviousImages] = useState([]); // Track previously displayed images
  const [previousProducts, setPreviousProducts] = useState([]);
  const [previousAmbassadors, setPreviousAmbassadors] = useState([]);
  const [previousPost, setPreviousPost] = useState([]);
  const [previousVideos, setPreviousVideos] = useState([]);
  const [showBeautyShowroom, setShowBeautyShowroom] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpensec, setIssec] = useState(false);
  const [isBack, setBackView] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const videoRefscoll = useRef([]);
  const [modalContentType, setModalContentType] = useState('image'); // 'image' or 'video'



  const toggleDropdown = () => {
      setIsOpen(!isOpen);
      setIssec(false);
  };
  const toggleDropdown2 = () => {
    setIssec(!isOpensec);
    setIsOpen(false);
  };
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


  const nextPost = () => {
    if (imageContainerRef.current && postIndex + 3 < allAmbassadors.length) {
      // Store the current images as previous images
      setPreviousPost(displayedPost);

      setPostIndex(postIndex + 3);
      const newAmbassadors = allAmbassadors.slice(postIndex + 3, Math.min(postIndex + 6, allAmbassadors.length));
      setDisplayedPost(newAmbassadors); //directly set new images, don't accumulate
      if (postIndex + 6 >= allAmbassadors.length) {
        setIsallPostNextDisabled(true);
      }
    }
  };

  const prevPost = () => {
    if (imageContainerRef.current && postIndex - 3 >= 0) {
      setPreviousPost(displayedPost);
      setPostIndex(postIndex - 3);
      const newAmbassadors = allAmbassadors.slice(Math.max(0, postIndex - 3), postIndex);
      setDisplayedPost(newAmbassadors);
      setIsallPostNextDisabled(false);
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
  const handleack = () => {
    setBackView(true);
  };    

  const handleClickActive = (type) => { // Modified to accept a type parameter
    setIsActive(type === 'video'); // Set isActive based on 'video' type
    setModalContentType(type); // Set modal content type
  };
  return (
    <>
     <style>
      {`
      .ImagesAll:nth-child(3n) {
        margin-right: 0 !important;
      }
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
        .ActiveBtn {
          background: #912664 !important;
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
        .static-filter-tabs {
            display: flex;
            justify-content: flex-start;
            margin-top: 40px;
            border-bottom: 1px solid #7B7B7B; /* Bottom border for the whole section */
            padding-bottom: 10px; /* Space between buttons and border */
        }
        .static-filter-tab-button {
            background: transparent;
            border: none;
            color: #fff;
            margin-right: 30px;
            font-size: 20px;
            padding: 0;
            cursor: pointer;
            position: relative; /* Needed for the pseudo-element underline */
            padding-bottom: 10px; /* To lift the text slightly from the border */
        }
        .static-filter-tab-button.active {
            color: #96105E;
        }
        .static-filter-tab-button.active::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -1px; /* Position it just above the parent border */
            width: 100%;
            height: 2px; /* Thickness of the underline */
            background-color: #96105E;
        }
      `}

    </style>
    {showBeautyShowroom ? (
      <BeautyProducts />
    ) : isBack ? <Beautyshowambassadors /> : (
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
                    src={"/profile.png"}
                    alt={`profile`}
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
        background: 'rgba(78, 77, 75, 0.45)',
        paddingLeft: "280px"
      }}>
      <section style={{ marginTop: '545px', textAlign: 'left', position:"relative" }}>
      <img
            onClick={() => handleack()}
                                      src={'/backArrow.png'}
                                      alt={`backArrow`}
                                      style={{width: "auto",height: "auto",borderRadius: "0px",objectFit: "cover",position:"relative",zIndex:"9999",top:"-115px",marginRight:"6px",marginTop:"3px"}}
                                    />
          <div style={{display: "flex",alignItems: "center",justifyContent: "space-between",marginTop:"-35px", }}>
          
            <div style={{display: "flex",alignItems: "flex-start",justifyContent: "flex-start", flexDirection: "column", height:"90px" }}>
              <div style={{display: "flex",alignItems: "flex-start",justifyContent: "flex-start",flexDirection:"column", marginTop:"-58px", position:"relative", zIndex:"99"}}>
                <div style={{display: "flex",alignItems: "flex-start",justifyContent: "flex-start",}}>
                  <span style={{fontSize: "15px"}}>Verified account</span>
                  <img
                    src={"/verify.png"}
                    alt={`cdiorbeauty`}
                    style={{width: "auto",height: "auto", marginLeft:"30px", position:"relative", top:"3px"}}
                  />
                </div>
                <div style={{display: "flex",alignItems: "center",justifyContent: "flex-start",}}>
                  <span style={{fontSize: "32px"}}>Paulina Porizkova</span>
                </div>
              </div>
              <div style={{display: "flex",alignItems: "center",justifyContent: "flex-start",  marginTop:"10px" }}>
                <p style={{fontSize: "20px"}}>@cdiorbeauty</p>
                <button style={{ marginRight: '20px', textAlign: 'center', background:"#96105E", color:"#fff", height:"50px", width:"166px",borderRadius:"40px", border:"1px solid #96105E", fontSize:"16px", marginLeft:"30px"}} type='button'>Follow</button>
              </div>
            </div>
            <div style={{display: "flex",alignItems: "flex-start",justifyContent: "flex-center", flexDirection: "column",  marginLeft:"20px", padding:"4px 10px" ,borderLeft:"1px solid #666", height:"90px" }}>
                <p style={{fontSize: "18px", fontWeight:"600"}}>Monthly visitors</p>
                <p style={{fontSize: "40px"}}>12.4K</p>
            </div>
            <div style={{display: "flex",alignItems: "flex-start",justifyContent: "flex-center", flexDirection: "column",  marginLeft:"10px", padding:"4px 10px" ,borderLeft:"1px solid #666", height:"90px" }}>         
                <p style={{fontSize: "18px", fontWeight:"600"}}>Brands</p>
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
                        <img
                          src={item.Smallimg}
                          alt={`item ${index + 1}`}
                          style={{borderRadius: '0px', objectFit: 'cover' }}
                        />
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
<section>
        <div className="static-filter-tabs">
          <button
            className={`static-filter-tab-button ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('all');
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            All
          </button>
          <button
            className={`static-filter-tab-button ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('products');
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Products
          </button>
          <button
            className={`static-filter-tab-button ${activeTab === 'brandvideos' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('brandvideos');
              document.getElementById('brandvideos')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Brand Videos
          </button>
          <button
            className={`static-filter-tab-button ${activeTab === 'vibereel' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('vibereel');
              document.getElementById('vibereel')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            VibeReel
          </button>
          <button
            className={`static-filter-tab-button ${activeTab === 'post' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('post');
              document.getElementById('post')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Post
          </button>
        </div>

         {/* Shop by Product Section */}
<section id="products" style={{ textAlign: 'left', marginTop: '40px', position: 'relative' }}>
  <div style={{ position: 'relative' }}>
    {/* Title */}
    <div style={{
      display: 'flex',
      width: '100%',
      marginTop: '60px',
      marginBottom: '40px',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <span style={{ fontWeight: 'bold', color: 'white', fontSize: '32px' }}>Products</span>
    </div>

    {/* Scroll Wrapper */}
    <div style={{ position: 'relative', height: '340px' }}>
      {/* Left Button */}
      <button
        onClick={() => document.getElementById('productScroll').scrollBy({ left: -400, behavior: 'smooth' })}
        style={{
          position: 'absolute',
          left: 0,
          top: '125px',
          transform: 'translateY(-50%)',
          background: '#9D9A95',
          border: 'none',
          padding: '10px',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 10,
          height: '40px',
          width: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ChevronLeft size={24} style={{ color: '#333' }} />
      </button>

      {/* Right Button */}
      <button
        onClick={() => document.getElementById('productScroll').scrollBy({ left: 400, behavior: 'smooth' })}
        style={{
          position: 'absolute',
          right: 0,
          top: '125px',
          transform: 'translateY(-50%)',
          background: '#9D9A95',
          border: 'none',
          padding: '10px',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 10,
          height: '40px',
          width: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ChevronRight size={24} style={{ color: '#333' }} />
      </button>

      {/* Scrollable Image Row */}
      <div
        id="productScroll"
        style={{
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          gap: '40px',
          height: '100%',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          whiteSpace: 'nowrap'
        }}
      >
        <style>{`
          #productScroll::-webkit-scrollbar {
            display: none;
          }
          @media screen and (max-width: 768px) {
            #productScroll {
              gap: 20px !important;
            }
            #productScroll > div {
              width: 70vw !important;
              height: auto !important;
            }
            #productScroll p {
              font-size: 18px !important;
              margin-top: 10px !important;
            }
            button {
              top: auto !important;
              bottom: -30px !important;
              transform: none !important;
            }
          }
        `}</style>

        {allImages.map((image, index) => (
          <div
            key={index}
            style={{
              flex: '0 0 auto',
              width: '259px',
              height: '300px',
              scrollSnapAlign: 'start',
              display: 'inline-block',
              textAlign: 'center',
              cursor: 'pointer'
            }}
            onClick={() => setIsOpen(true)}
          >
            <img
              src={image.img}
              alt={`Product ${index + 1}`}
              style={{
                width: '100%',
                height: '250px',
                objectFit: 'cover',
                borderRadius: '0px'
              }}
            />
            <p style={{
              marginTop: '10px',
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'white'
            }}>
              {image.Name}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


          {/* Shop by Brand videos Section */}
<section id="brandvideos" style={{ textAlign: 'left', marginTop: '40px', position: 'relative' }}>
  <div style={{ position: 'relative' }}>
    
    {/* Title */}
    <div style={{
      display: 'flex',
      width: '100%',
      marginTop: '60px',
      marginBottom: '40px',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <span style={{ fontWeight: 'bold', color: 'white', fontSize: '32px' }}>Brand Videos</span>
    </div>

    {/* Scroll Buttons */}
    <button
      onClick={() => document.getElementById('brandVideoScroll').scrollBy({ left: -400, behavior: 'smooth' })}
      style={{
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        background: '#9D9A95',
        border: 'none',
        padding: '10px',
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40px',
        width: '40px'
      }}
    >
      <ChevronLeft size={24} style={{ color: '#333' }} />
    </button>

    <button
      onClick={() => document.getElementById('brandVideoScroll').scrollBy({ left: 400, behavior: 'smooth' })}
      style={{
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        background: '#9D9A95',
        border: 'none',
        padding: '10px',
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40px',
        width: '40px'
      }}
    >
      <ChevronRight size={24} style={{ color: '#333' }} />
    </button>

    {/* Scrollable Video Row */}
    <div
      id="brandVideoScroll"
      style={{
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        gap: '40px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        height: '340px' // ✅ increased so text is never clipped
      }}
    >
      <style>
        {`
        #brandVideoScroll::-webkit-scrollbar {
          display: none;
        }

        @media screen and (max-width: 768px) {
          #brandVideoScroll {
            gap: 20px !important;
          }

          #brandVideoScroll > div {
            width: 70vw !important;
            height: auto !important;
          }

          #brandVideoScroll p {
            font-size: 18px !important;
            margin-top: 20px !important;
          }

          button {
            top: auto !important;
            bottom: -30px !important;
            transform: none !important;
          }
        }
      `}
      </style>

      {[
        { src: '/health/health2.mp4', label: 'Health & Wellness' },
        { src: '/Beauty/beauty2.mp4', label: 'Beauty' },
        { src: '/Fashion/fashion2.mp4', label: 'Fashion' },
        { src: '/Fitness/fitness2.mp4', label: 'Fitness' },
        { src: '/health/health3.mp4', label: 'Health & Wellness' },
        { src: '/Beauty/beauty3.mp4', label: 'Beauty' },
        { src: '/Fashion/fashion3.mp4', label: 'Fashion' },
        { src: '/Fitness/fitness3.mp4', label: 'Fitness' },
        { src: '/health/health4.mp4', label: 'Health & Wellness' },
        { src: '/Beauty/beauty4.mp4', label: 'Beauty' },
        { src: '/Fashion/fashion4.mp4', label: 'Fashion' },
        { src: '/Fitness/fitness4.mp4', label: 'Fitness' },
        { src: '/Beauty/beauty1.mp4', label: 'Beauty' },
        { src: '/Fashion/fashion1.mp4', label: 'Fashion' },
        { src: '/Fitness/fitness1.mp4', label: 'Fitness' },
      ].map((item, index) => (
        <div
          key={index}
          style={{
            flex: '0 0 auto',
            width: '396.16px',
            height: '300px',
            scrollSnapAlign: 'start',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            cursor: 'pointer'
          }}
          onClick={() => handleDetailView()}
        >
          <video
            src={item.src}
            muted
            style={{
              width: '100%',
              height: '250px',
              objectFit: 'cover',
              borderRadius: '0px'
            }}
            onMouseEnter={(e) => e.target.play()}
            onMouseLeave={(e) => {
              e.target.pause();
              e.target.currentTime = 0;
            }}
          />
          <p style={{
            marginTop: '10px',
            fontSize: '20px',
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'white'
          }}>
            {item.label}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>




       {/* Shop by Vibereel Section */}
<section id="vibereel" style={{ textAlign: 'left', marginTop: '40px', position: 'relative' }}>
  <div style={{ position: 'relative' }}>

    {/* Title */}
    <div style={{
      display: 'flex',
      width: '100%',
      marginTop: '60px',
      marginBottom: '40px',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <span style={{ fontWeight: 'bold', color: 'white', fontSize: '32px' }}>VibeReel</span>
    </div>

    {/* Wrapper height to accommodate full cards */}
    <div style={{ position: 'relative', height: '600px' }}>
      
      {/* Left Scroll Button */}
      <button
        onClick={() => document.getElementById('brandVideoScroll').scrollBy({ left: -400, behavior: 'smooth' })}
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#9D9A95',
          border: 'none',
          padding: '10px',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '40px',
          width: '40px'
        }}
      >
        <ChevronLeft size={24} style={{ color: '#333' }} />
      </button>

      {/* Right Scroll Button */}
      <button
        onClick={() => document.getElementById('brandVideoScroll').scrollBy({ left: 400, behavior: 'smooth' })}
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#9D9A95',
          border: 'none',
          padding: '10px',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '40px',
          width: '40px'
        }}
      >
        <ChevronRight size={24} style={{ color: '#333' }} />
      </button>

      {/* Scrollable Video Row */}
      <div
        id="brandVideoScroll"
        style={{
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          gap: '40px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          height: '100%'
        }}
      >
        <style>
          {`
            #brandVideoScroll::-webkit-scrollbar {
              display: none;
            }

            @media screen and (max-width: 768px) {
              #brandVideoScroll {
                gap: 20px !important;
              }

              #brandVideoScroll > div {
                width: 70vw !important;
                height: auto !important;
              }

              #brandVideoScroll p {
                font-size: 18px !important;
                margin-top: 20px !important;
              }

              button {
                top: auto !important;
                bottom: -30px !important;
                transform: none !important;
              }
            }
          `}
        </style>

        {[
          { src: '/health/health2.mp4', label: 'Health & Wellness' },
          { src: '/Beauty/beauty2.mp4', label: 'Beauty' },
          { src: '/Fashion/fashion2.mp4', label: 'Fashion' },
          { src: '/Fitness/fitness2.mp4', label: 'Fitness' },
          { src: '/health/health3.mp4', label: 'Health & Wellness' },
          { src: '/Beauty/beauty3.mp4', label: 'Beauty' },
          { src: '/Fashion/fashion3.mp4', label: 'Fashion' },
          { src: '/Fitness/fitness3.mp4', label: 'Fitness' },
          { src: '/health/health4.mp4', label: 'Health & Wellness' },
          { src: '/Beauty/beauty4.mp4', label: 'Beauty' },
          { src: '/Fashion/fashion4.mp4', label: 'Fashion' },
          { src: '/Fitness/fitness4.mp4', label: 'Fitness' },
          { src: '/Beauty/beauty1.mp4', label: 'Beauty' },
          { src: '/Fashion/fashion1.mp4', label: 'Fashion' },
          { src: '/Fitness/fitness1.mp4', label: 'Fitness' },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              flex: '0 0 auto',
              width: '259px',
              height: '560px', // ✅ fits video + 40px + text
              scrollSnapAlign: 'start',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
            onClick={() => handleDetailView()}
          >
            <video
              src={item.src}
              muted
              style={{
                width: '259px',
                height: '460px',
                objectFit: 'cover',
                borderRadius: '0px',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.play()}
              onMouseLeave={(e) => {
                e.target.pause();
                e.target.currentTime = 0;
              }}
            />
            <p style={{
              marginTop: '40px', // ✅ exactly as requested
              fontSize: '20px',
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white'
            }}>
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

       {/* Shop by Post Section */}
<section id="post" style={{ textAlign: 'left', marginTop: '40px', position: 'relative' }}>
  <div style={{ position: 'relative' }}>

    {/* Title */}
    <div style={{
      display: 'flex',
      width: '100%',
      marginTop: '60px',
      marginBottom: '40px',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <span style={{ fontWeight: 'bold', color: 'white', fontSize: '32px' }}>Post</span>
    </div>

    {/* Wrapper height to accommodate full cards */}
    <div style={{ position: 'relative', height: '600px' }}>
      
      {/* Left Scroll Button */}
      <button
        onClick={() => document.getElementById('brandVideoScroll').scrollBy({ left: -400, behavior: 'smooth' })}
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#9D9A95',
          border: 'none',
          padding: '10px',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '40px',
          width: '40px'
        }}
      >
        <ChevronLeft size={24} style={{ color: '#333' }} />
      </button>

      {/* Right Scroll Button */}
      <button
        onClick={() => document.getElementById('brandVideoScroll').scrollBy({ left: 400, behavior: 'smooth' })}
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#9D9A95',
          border: 'none',
          padding: '10px',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '40px',
          width: '40px'
        }}
      >
        <ChevronRight size={24} style={{ color: '#333' }} />
      </button>

      {/* Scrollable Video Row */}
      <div
        id="brandVideoScroll"
        style={{
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          gap: '40px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          height: '100%'
        }}
      >
        <style>
          {`
            #brandVideoScroll::-webkit-scrollbar {
              display: none;
            }

            @media screen and (max-width: 768px) {
              #brandVideoScroll {
                gap: 20px !important;
              }

              #brandVideoScroll > div {
                width: 70vw !important;
                height: auto !important;
              }

              #brandVideoScroll p {
                font-size: 18px !important;
                margin-top: 20px !important;
              }

              button {
                top: auto !important;
                bottom: -30px !important;
                transform: none !important;
              }
            }
          `}
        </style>

        {[
          { src: '/health/health2.mp4', label: 'Health & Wellness' },
          { src: '/Beauty/beauty2.mp4', label: 'Beauty' },
          { src: '/Fashion/fashion2.mp4', label: 'Fashion' },
          { src: '/Fitness/fitness2.mp4', label: 'Fitness' },
          { src: '/health/health3.mp4', label: 'Health & Wellness' },
          { src: '/Beauty/beauty3.mp4', label: 'Beauty' },
          { src: '/Fashion/fashion3.mp4', label: 'Fashion' },
          { src: '/Fitness/fitness3.mp4', label: 'Fitness' },
          { src: '/health/health4.mp4', label: 'Health & Wellness' },
          { src: '/Beauty/beauty4.mp4', label: 'Beauty' },
          { src: '/Fashion/fashion4.mp4', label: 'Fashion' },
          { src: '/Fitness/fitness4.mp4', label: 'Fitness' },
          { src: '/Beauty/beauty1.mp4', label: 'Beauty' },
          { src: '/Fashion/fashion1.mp4', label: 'Fashion' },
          { src: '/Fitness/fitness1.mp4', label: 'Fitness' },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              flex: '0 0 auto',
              width: '259px',
              height: '560px', // ✅ fits video + 40px + text
              scrollSnapAlign: 'start',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
            onClick={() => handleDetailView()}
          >
            <video
              src={item.src}
              muted
              style={{
                width: '259px',
                height: '460px',
                objectFit: 'cover',
                borderRadius: '0px',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.play()}
              onMouseLeave={(e) => {
                e.target.pause();
                e.target.currentTime = 0;
              }}
            />
            <p style={{
              marginTop: '40px', // ✅ exactly as requested
              fontSize: '20px',
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white'
            }}>
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
<section style={{marginTop:"40px"}}>
          <div style={{display:"flex", background:"#666"}}>
            
              <div style={{display:"block"}}>
                  <img
                    src={"/profile.png"}
                    alt={`cdiorbeauty`}
                    style={{ width: '100%', height: '100%', borderRadius: '0px', objectFit: 'cover', maxHeight:"540px" }}
                  />
              </div>
              <div style={{display:"block", textAlign:"left", padding:"30px"}}>
                  <p style={{display:"block", fontSize:"36px"}}>About</p>
                  <p style={{display:"block", fontSize:"18px",paddingTop:"15px"}}>Paulina Porizkova is a beauty icon, model, and author who champions authenticity, confidence, and ageless beauty. She empowers others to embrace their true selves and redefine what beauty means.</p>
                  <p style={{display:"block", fontSize:"36px", marginTop:"30px"}}>Personal brand statement</p>
                  <p style={{display:"block", fontSize:"18px", paddingTop:"15px"}}>As a beauty brand ambassador, I stand for honesty, elegance, and the power of real stories. I partner with brands that empower others to embrace who they are boldly, beautifully, and unapologetically.</p>
                  <div style={{display:"block"}}>
                    <div style={{display:"flex", marginTop:"30px"}}>
                      <img
                        src={"/Tiktok.png"}
                        alt={`cdiorbeauty`}
                        style={{  }}
                      /> 
                      <img
                        src={"/Youtube.png"}
                        alt={`cdiorbeauty`}
                        style={{ marginLeft:"30px"}}
                      />
                      </div>
                  </div>
              </div>
              
          </div>
        </section>


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
              {modalContentType === 'image' ? ( // Conditional rendering for images
                <Carousel 
  autoPlay={false}
  infiniteLoop
  showStatus={false}
  showArrows={true}
  showThumbs={false}
>
                    {slides.map((slide, index) => (
                      <div key={index}>
                        <img src={slide.src} alt={`Slide ${index + 1}`} style={{ height: '480px', objectFit: 'cover' }} /> {/* Added height and objectFit */}
                      </div>
                    ))}
                </Carousel>
              ) : ( // Conditional rendering for videos
                <Carousel 
  autoPlay={false}
  infiniteLoop
  showStatus={false}
  showArrows={true}
  showThumbs={false}
>
                    {modalVideos.map((video, index) => (
                      <div key={index}>
                        <video 
                          src={video.src} 
                          controls 
                          autoPlay 
                          loop 
                          muted 
                          style={{width: '100%', height: '480px', borderRadius: '0px', objectFit: 'cover'}} // Changed height to 480px
                        />
                      </div>
                    ))}
                </Carousel>
              )}
              
              <div style={{position:"absolute", zIndex: "999",bottom:"0", left:"0",right:"0", background:"rgba(0,0,0,0.5)", padding:"2px 15px"}}>
                <div style={{display:"flex", alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{display:"flex", alignItems:"center",justifyContent:"space-between"}}>
                    <button onClick={() => handleClickActive('image')} className={`${modalContentType === 'image' ? "ActiveBtn" : ""}`} style={{cursor:"pointer",border:"none", display:"flex", alignItems:"center",background:"rgba(123,123,123,0.2)", padding:"2px 5px",borderTopLeftRadius:"15px",borderBottomLeftRadius:"15px", height:"21px", borderTopRightRadius:"0",borderBottomRightRadius:"0"}}>
                      <img
                        src={"/ImageShow.png"}
                        alt={`Image Icon`}
                        style={{ width: 'auto', height: 'auto', borderRadius: '0px', objectFit: 'cover', maxHeight:"540px" }}
                      />
                    </button>
                    <button onClick={() => handleClickActive('video')} className={`${modalContentType === 'video' ? "ActiveBtn" : ""}`} style={{cursor:"pointer",border:"none", display:"flex", alignItems:"center",background:"rgba(123,123,123,0.2)", padding:"2px 5px",borderTopRightRadius:"15px",borderBottomRightRadius:"15px", height:"21px",borderTopLeftRadius:"0",borderBottomLeftRadius:"0"}}>
                      <img
                        src={"/videoShow.png"}
                        alt={`Video Icon`}
                        style={{ width: 'auto', height: 'auto', borderRadius: '0px', objectFit: 'cover', maxHeight:"540px" }}
                      />
                    </button>
                  </div>
                  <img
                    src={"/zoom.png"}
                    alt={`zoom`}
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
                                  <span style={{display: 'flex',alignItems:"center",justifyContent: 'flex-start', fontWeight:"bold", fontSize:"36px", color:"#fff "}}>Skincare</span>
                                </div>
                                <div style={{display: 'block', marginTop:"15px"}}>
                                  <p style={{display: 'block', fontSize:"20px", marginTop:"5px", color:"#d2d2d2"}}>Dive into the world of Dior beauty - explore a luxurious range of cosmetics, makeup, fragrances, skincare, and gifts from the legendary brand.</p>
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
    <div className="modal" style={{ position: "relative" }}>
      <div className="modal-body" style={{ position: "relative" }}>
        <button
          onClick={() => {
            setIssec(false);
            setIsOpen(true);
          }}
          style={{
            position: "absolute",
            right: "15px",
            top: "15px",
            zIndex: "111111111",
            background: "#181818",
            color: "#fff",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            border: "none",
            cursor: "pointer",
          }}
        >
          X
        </button>
        <div className="SecondSection">
          <div style={{ position: "relative" }}>
            <Carousel
              autoPlay={false}
              infiniteLoop
              showStatus={false}
              showArrows={true}
              showThumbs={false}
            >
              {modalContentType === "image"
                ? slides2.map((slide, index) => (
                    <div key={index}>
                      <img
                        src={slide.src}
                        alt={`Slide ${index + 1}`}
                        style={{ height: "480px", objectFit: "cover" }}
                      />
                    </div>
                  ))
                : modalVideos2.map((video, index) => (
                    <div key={index}>
                      <video
                        src={video.src}
                        controls
                        autoPlay
                        loop
                        muted
                        style={{
                          width: "100%",
                          height: "480px",
                          borderRadius: "0px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}
            </Carousel>

            <div
              style={{
                position: "absolute",
                zIndex: "999",
                bottom: "0",
                left: "0",
                right: "0",
                background: "rgba(0,0,0,0.5)",
                padding: "2px 15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    onClick={() => handleClickActive("image")}
                    className={`${
                      modalContentType === "image" ? "ActiveBtn" : ""
                    }`}
                    style={{
                      cursor: "pointer",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      background: "rgba(123,123,123,0.2)",
                      padding: "2px 5px",
                      borderTopLeftRadius: "15px",
                      borderBottomLeftRadius: "15px",
                      height: "21px",
                    }}
                  >
                    <img src="/ImageShow.png" alt="Image" />
                  </button>
                  <button
                    onClick={() => handleClickActive("video")}
                    className={`${
                      modalContentType === "video" ? "ActiveBtn" : ""
                    }`}
                    style={{
                      cursor: "pointer",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      background: "rgba(123,123,123,0.2)",
                      padding: "2px 5px",
                      borderTopRightRadius: "15px",
                      borderBottomRightRadius: "15px",
                      height: "21px",
                    }}
                  >
                    <img src="/videoShow.png" alt="Video" />
                  </button>
                </div>
                <img src="/zoom.png" alt="zoom" />
              </div>
            </div>
          </div>              <div style={{padding:"15px 30px", background:"linear-gradient(rgb(120 85 65) 0%, rgba(78, 77, 75, 0.45) 30%, rgba(20, 20, 20, 0.55) 50%)", height:"100%"}}>
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

export default ProductDetails2;
