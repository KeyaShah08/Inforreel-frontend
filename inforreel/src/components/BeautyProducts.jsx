import { useEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useNavigate } from 'react-router-dom';
import Marketplace from './Marketplace';
import ProductDetails from './ProductDetails';

function BeautyProducts () {
  const navigate = useNavigate();
  const handleAddToCart = () => navigate('/mycart');
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
 


    const allImagesBottom = [
      {img:'/b11.png', Name:"Gucci", Smallimg:'/gucci.png'},
      {img:'/b12.png', Name:"Fenty Beauty", Smallimg:'/fentyBeauty.png'},
      {img:'/b13.png', Name:"Armani", Smallimg:'/armani.png'},
      {img:'/b12.png', Name:"Fenty Beauty", Smallimg:'/fentyBeauty.png'},
      {img:'/b13.png', Name:"Gucci", Smallimg:'/gucci.png'},
      {img:'/b11.png', Name:"Armani", Smallimg:'/armani.png'},
    ];

  const slides = [
    { src: "/sl1.png"},
    { src: "/b13.png"},
    { src: "/b11.png"},
    { src: "/sl1.png"},
    { src: "/b13.png"},
    { src: "/b11.png"},
  ];

  const [displayedImages, setDisplayedImages] = useState(allImages.slice(0, 3));
  const [displayedProducts, setDisplayedProducts] = useState(allProducts.slice(0, 3));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productIndex, setProductIndex] = useState(0);
  const [ambassadorIndex, setAmbassadorIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const imageContainerRef = useRef(null);
  const [isNextDisabled, setIsNextDisabled] = useState(allImages.length <= 3);
  const [isProductNextDisabled, setIsProductNextDisabled] = useState(allProducts.length <= 3);
  const [previousImages, setPreviousImages] = useState([]); // Track previously displayed images
  const [previousProducts, setPreviousProducts] = useState([]);
  const [previousAmbassadors, setPreviousAmbassadors] = useState([]);
  const [previousVideos, setPreviousVideos] = useState([]);
  const [showBeautyShowroom, setShowBeautyShowroom] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDrp, setIsOpenDrp] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [isBack, setBackView] = useState(false);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
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



 


  const toggleDropdown = () => {
    setIsOpenDrp(!isOpenDrp);
  };
  useEffect(() => {
    //   console.log("Displayed Images:", displayedImages);
    //   console.log("Previous Images:", previousImages);
  }, [displayedImages, previousImages]);
  const handleack = () => {
    setBackView(true);
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
      `}
    </style>
    {showBeautyShowroom ? (
      <ProductDetails />
    ) : isBack ? <Marketplace /> : (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#141414' // Changed to black
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
          <img
            onClick={() => handleack()}
                                      src={'/backArrow.png'}
                                      alt={`backArrow`}
                                      style={{width: "auto",height: "auto",borderRadius: "0px",objectFit: "cover",position:"relative",top:"76px",marginRight:"6px",marginTop:"3px"}}
                                    />
          <h1 style={{ fontSize: '70px', display: 'flex', alignItems:"center", justifyContent:"center" }}>Beauty products</h1>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: "flex-end" }}>
              {/* Navigation Buttons */}
              
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
                  }} onClick={() => setIsOpen(true)}>
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

       

        </div>
      </div>
    )}
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
              <div style={{position:"absolute",bottom:"0", left:"0",right:"0", background:"rgba(0,0,0,0.5)", padding:"2px 15px"}}>
                <div style={{display:"flex", alignItems:"center",justifyContent:"space-between"}}>
                  <img
                    src={"/Icon_12.png"}
                    alt={`cdiorbeauty`}
                  />
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
                                      <button onClick={handleAddToCart} style={{ marginRight: '20px', textAlign: 'center', background:'#96105E', color:'#fff', height:'50px', width:'166px', borderRadius:'10px', border:'1px solid #96105E', fontSize:'16px' }} type='button'>Add to Cart</button>
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
                                            <div >
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
                                              {isOpenDrp && (
                                                <div id="dropdownMenu" className="dropdown-content" style={{
                                                  position: 'absolute',
                                                  backgroundColor: '#000',
                                                  boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
                                                  minWidth: '100px',
                                                  zIndex: 1,
                                                }}>
                                                  <button style={{ background:"transparent",border:"none",display: 'block', padding: '12px 16px', color: '#fff' }}>20ml</button>
                                                  <button style={{ background:"transparent",border:"none",display: 'block', padding: '12px 16px', color: '#fff' }}>120ml</button>
                                                  <button style={{ background:"transparent",border:"none",display: 'block', padding: '12px 16px', color: '#fff' }}>150ml</button>
                                                </div>
                                              )}
                                            </div>
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
    </>
  );
}

export default BeautyProducts ;