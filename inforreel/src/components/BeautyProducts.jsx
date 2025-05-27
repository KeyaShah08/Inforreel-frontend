import { useEffect, useRef, useState } from 'react'; // Import hooks
import { Carousel } from 'react-responsive-carousel'; // Import Carousel component
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import ProductDetails from './ProductDetails'; // Import ProductDetails component

function BeautyProducts () {
  const navigate = useNavigate(); // Initialize useNavigate
  const handleAddToCart = () => navigate('/mycart'); // Function to navigate to cart
  const allImages = [
    {img:'/b11.png', Name:"Gucci", Smallimg:'/gucci.png'},
    {img:'/b12.png', Name:"Fenty Beauty", Smallimg:'/fentyBeauty.png'},
    {img:'/b13.png', Name:"Armani", Smallimg:'/armani.png'},
    {img:'/b12.png', Name:"Fenty Beauty", Smallimg:'/fentyBeauty.png'},
    {img:'/b13.png', Name:"Gucci", Smallimg:'/gucci.png'},
    {img:'/b11.png', Name:"Armani", Smallimg:'/armani.png'},
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

const allImagesBottom2 = [
  { img: '/b13.png', Name: "Dior", Smallimg: '/gucci.png' },
  { img: '/b11.png', Name: "Armani", Smallimg: '/armani.png' },
  { img: '/b12.png', Name: "Fenty Beauty", Smallimg: '/fentyBeauty.png' },
];
  const [displayedImages, setDisplayedImages] = useState(allImages.slice(0, 3)); // State for displayed images
  const [displayedProducts, setDisplayedProducts] = useState(allProducts.slice(0, 3)); // State for displayed products
  const [displayedAmbassadors, setDisplayedAmbassadors] = useState(allAmbassadors.slice(0, 3)); // State for displayed ambassadors
  const [displayedVideos, setDisplayedVideos] = useState(allVideos.slice(0, 3)); // State for displayed videos
  const [currentIndex, setCurrentIndex] = useState(0); // State for current image index
  const [productIndex, setProductIndex] = useState(0); // State for current product index
  const [ambassadorIndex, setAmbassadorIndex] = useState(0); // State for current ambassador index
  const [videoIndex, setVideoIndex] = useState(0); // State for current video index
  const imageContainerRef = useRef(null); // Ref for image container
  const [isNextDisabled, setIsNextDisabled] = useState(allImages.length <= 3); // State for next image button disabled status
  const [isProductNextDisabled, setIsProductNextDisabled] = useState(allProducts.length <= 3); // State for next product button disabled status
  const [isAmbassadorNextDisabled, setIsAmbassadorNextDisabled] = useState(allAmbassadors.length <= 3); // State for next ambassador button disabled status
  const [isVideoNextDisabled, setIsVideoNextDisabled] = useState(allVideos.length <= 3); // State for next video button disabled status
  const [previousImages, setPreviousImages] = useState([]); // Track previously displayed images
  const [previousProducts, setPreviousProducts] = useState([]); // Track previously displayed products
  const [previousAmbassadors, setPreviousAmbassadors] = useState([]); // Track previously displayed ambassadors
  const [previousVideos, setPreviousVideos] = useState([]); // Track previously displayed videos
  const [showBeautyShowroom, setShowBeautyShowroom] = useState(false); // State to show beauty showroom
  const [isOpen, setIsOpen] = useState(false); // State for modal open status
  const [isOpenDrp, setIsOpenDrp] = useState(false); // State for dropdown open status
  const [selectedOption, setSelectedOption] = useState(''); // State for selected dropdown option
  const [isBack, setBackView] = useState(false); // State for back view
  const [activeFilter, setActiveFilter] = useState("All");
  const [isActive, setIsActive] = useState(false);
  const [modalContentType, setModalContentType] = useState("image");



  const handleChange = (e) => { // Handler for dropdown change
    setSelectedOption(e.target.value);
  };

  const nextImage = () => { // Function to go to next image
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

  const prevImage = () => { // Function to go to previous image
    if (imageContainerRef.current && currentIndex - 3 >= 0) {
      setPreviousImages(displayedImages);
      setCurrentIndex(currentIndex - 3);
      const newImages = allImages.slice(Math.max(0, currentIndex - 3), currentIndex);
      setDisplayedImages(newImages);
      setIsNextDisabled(false);
    }
  };

  const nextProduct = () => { // Function to go to next product
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

  const prevProduct = () => { // Function to go to previous product
    if (imageContainerRef.current && productIndex - 3 >= 0) {
      setPreviousProducts(displayedProducts);
      setProductIndex(productIndex - 3);
      const newProducts = allProducts.slice(Math.max(0, productIndex - 3), productIndex);
      setDisplayedProducts(newProducts);
      setIsProductNextDisabled(false);
    }
  };

  const nextAmbassador = () => { // Function to go to next ambassador
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

  const prevAmbassador = () => { // Function to go to previous ambassador
    if (imageContainerRef.current && ambassadorIndex - 3 >= 0) {
      setPreviousAmbassadors(displayedAmbassadors);
      setAmbassadorIndex(ambassadorIndex - 3);
      const newAmbassadors = allAmbassadors.slice(Math.max(0, ambassadorIndex - 3), ambassadorIndex);
      setDisplayedAmbassadors(newAmbassadors);
      setIsAmbassadorNextDisabled(false);
    }
  };

  const nextVideo = () => { // Function to go to next video
    if (imageContainerRef.current && videoIndex + 3 < allVideos.length) {
      setPreviousVideos(displayedVideos);
      setVideoIndex(videoIndex + 3);
      const newVideos = allVideos.slice(videoIndex + 3, Math.min(videoIndex + 6, allVideos.length));
      setDisplayedVideos(newVideos);
      setIsVideoNextDisabled(true);
    }
  };

  const prevVideo = () => { // Function to go to previous video
    if (imageContainerRef.current && videoIndex - 3 >= 0) {
      setPreviousVideos(displayedVideos);
      setVideoIndex(videoIndex - 3);
      const newVideos = allVideos.slice(Math.max(0, videoIndex - 3), videoIndex);
      setDisplayedVideos(newVideos);
      setIsVideoNextDisabled(false);
    }
  };
  const handleDetailView = () => { // Function to handle detail view
    setShowBeautyShowroom(true);
  };
  const toggleDropdown = () => { // Function to toggle dropdown
    setIsOpenDrp(!isOpenDrp);
  };
  useEffect(() => {
    //   console.log("Displayed Images:", displayedImages);
    //   console.log("Previous Images:", previousImages);
  }, [displayedImages, previousImages]);
  const handleack = () => { // Function to handle back action
    setBackView(true);
  };
const handleClickActive = (type) => {
  setModalContentType(type);
};
const [isOpensec, setIssec] = useState(false);
const toggleDropdown2 = () => {
  setIsOpen(false);     // Close first modal
  setIssec(true);       // Open second modal
  setModalContentType("image"); // Or "video", depending on what you want to show by default
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
    .ActiveBtn {
      background: #912664 !important;
    }
  `}
</style>

    {showBeautyShowroom ? (
      <ProductDetails />
    ) : isBack ? <ProductDetails/> : (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#141414'
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
          paddingLeft: "280px"
        }}>


          {/* Shop by Brands Section */}
<section style={{ marginTop: '71px', textAlign: 'left' }}>
  <img
    onClick={() => handleack()}
    src={'/backArrow.png'}
    alt="backArrow"
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
  <h1 style={{ fontSize: '70px', display: 'flex', alignItems: "center", justifyContent: "center" }}>
    Beauty products
  </h1>

  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: "flex-end" }}>
    
  


        {/* Filter Buttons Centered */}
<div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px', marginBottom: '20px' }}>
  {["All", "Men", "Women"].map((label) => (
    <button
      key={label}
      onClick={() => setActiveFilter(label)}
      style={{
        padding: '10px 30px',
        borderRadius: '10px',
        backgroundColor: activeFilter === label ? '#96105E' : '#2F2F2F',
        color: 'white',
        border: 'none',
        fontWeight: 'bold',
        fontSize: '16px',
        cursor: 'pointer'
      }}
    >
      {label}
    </button>
  ))}


              </div>
{(() => {
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  return chunkArray(allImages, 3).map((row, rowIndex) => (
    <div
      key={rowIndex}
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '42px',
        justifyContent: 'center',
        marginBottom: '30px'
      }}
    >
      {row.map((image, index) => (
        <div
          key={index}
          style={{ width: '373.25px', height: '222px', cursor: 'pointer' }}
          onClick={() => setIsOpen(true)}
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
          
        </div>
      ))}

      {/* Add empty placeholders if less than 3 */}
      {Array.from({ length: 3 - row.length }).map((_, i) => (
        <div
          key={`placeholder-${i}`}
          style={{ width: '373.25px', height: '278px', visibility: 'hidden' }}
        />
      ))}
    </div>
  ));
})()}


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
                                  <span style={{display: 'flex',alignItems:"center",justifyContent: 'flex-start', fontWeight:"bold", fontSize:"36px", color:"#fff "}}>Dior</span>
                                </div>
                                <div style={{display: 'block', marginTop:"15px"}}>
                                  <p style={{display: 'block', fontSize:"20px", marginTop:"5px", color:"#d2d2d2"}}>Dive into the world of Dior beauty - explore a luxurious range of cosmetics, makeup, fragrances, skincare, and gifts from the legendary brand.</p>
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
                                              <button onClick={toggleDropdown} className="dropdown-button" style={{
                                                padding: '10px 20px',
                                                backgroundColor: '#333',
                                                color: 'white',
                                                border: "1px solid #d7d7d7",
                                                cursor: 'pointer',
                                                background:"transparent",
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
                                  </div>                              </div> 
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

export default BeautyProducts ;