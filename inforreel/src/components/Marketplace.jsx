import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import arrow icons
import { useEffect, useRef, useState } from 'react';
import BeautyProducts from './BeautyProducts';
import Beautyshowambassadors from './Beautyshowambassadors';
import Beautyshowrooms from './Beautyshowrooms';
function Marketplace() {
 const allImages = [
    {img:'/helth.png', Name:"Health & Wellness",},
    {img:'/sport.png', Name:"Sports & Athletics"},
    {img:'/beautyNew.png', Name:"Beauty"},
    {img:'/helth.png', Name:"Health & Wellness"},
    {img:'/beautyNew.png', Name:"Beauty"},
    {img:'/sport.png', Name:"Sports & Athletics"},
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
  { src: '/health/health1.mp4', label: 'Health & Wellness' },
  { src: '/health/health2.mp4', label: 'Beauty' },
  { src: '/health/health3.mp4', label: 'Fashion' },
  { src: '/health/health4.mp4', label: 'Fitness' },
  { src: '/health/health5.mp4', label: 'Organic Living' },
];

  const allVideosfastChannel = [
  '/health/health1.mp4',
  '/health/health2.mp4',
  '/health/health3.mp4',
  '/health/health4.mp4',
  '/health/health5.mp4',
  '/health/health1.mp4',
  ];
  const allVideosonDemand = [
  '/health/health1.mp4',
  '/health/health2.mp4',
  '/health/health3.mp4',
  '/health/health4.mp4',
  '/health/health5.mp4',
  '/health/health1.mp4',
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
  const [activeSection, setActiveSection] = useState('all');

const handleNavClick = (section) => {
  setActiveSection(section);
  scrollToSection(section);
};

  
  const videoRefs = useRef([]);
  const videoRefs1 = useRef([]);
  const videoRefs2 = useRef([]);
  const playOnHover = (index) => {
    videoRefs.current[index]?.play();
  };

  const pauseOnLeave = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
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
      setvideoonDemand(newAmbassadors);
      setIsAmbassadorNextDisabled(false);
    }
  };

  const nextvideoonDemand = () => {
    const nextIndex = videoonDemandIndex + 3;
    if (imageContainerRef.current && nextIndex < allVideosonDemand.length) {
      const newVideos = allVideosonDemand.slice(nextIndex, nextIndex + 3);
      setPreviousVideos(displayvideoonDemand);
      setvideoonDemand(newVideos);
      setvideoonDemandIndex(nextIndex);
      setIsVideoNextDisabled(nextIndex + 3 >= allVideosonDemand.length);
    }
  };

  const prevvideoonDemand = () => {
    const prevIndex = videoonDemandIndex - 3;
    if (imageContainerRef.current && prevIndex >= 0) {
      const newVideos = allVideosonDemand.slice(prevIndex, prevIndex + 3);
      setPreviousVideos(displayvideoonDemand);
      setvideoonDemand(newVideos);
      setvideoonDemandIndex(prevIndex);
      setIsVideoNextDisabled(false);
    }
  };

  const nextfastChannel = () => {
    if (imageContainerRef.current && fastIndex + 3 < allVideosfastChannel.length) {
      const newIndex = fastIndex + 3;
      const newVideos = allVideosfastChannel.slice(newIndex, newIndex + 3);
      setPreviousFastChannel(displayfastChannel);
      setFastChannel(newVideos);
      setFastChannelIndex(newIndex);
      setIsFastChannel(newIndex + 3 >= allVideosfastChannel.length);
    }
  };

  const prevfastChannel = () => {
    if (imageContainerRef.current && fastIndex - 3 >= 0) {
      const newIndex = fastIndex - 3;
      const newVideos = allVideosfastChannel.slice(newIndex, newIndex + 3);
      setPreviousFastChannel(displayfastChannel);
      setFastChannel(newVideos);
      setFastChannelIndex(newIndex);
      setIsFastChannel(false);
    }
  };

  const nextVideo = () => {
    if (imageContainerRef.current && videoIndex + 3 < allVideos1.length) {
      const newIndex = videoIndex + 3;
      const newVideos = allVideos1.slice(newIndex, newIndex + 3);
      setPreviousVideos(displayedVideos);
      setDisplayedVideos(newVideos);
      setVideoIndex(newIndex);
      setIsVideoNextDisabled(newIndex + 3 >= allVideos1.length);
    }
  };

  const prevVideo = () => {
    if (imageContainerRef.current && videoIndex - 3 >= 0) {
      const newIndex = videoIndex - 3;
      const newVideos = allVideos1.slice(newIndex, newIndex + 3);
      setPreviousVideos(displayedVideos);
      setDisplayedVideos(newVideos);
      setVideoIndex(newIndex);
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

  useEffect(() => {
  const sections = [
    { id: 'all', label: 'All' },
    { id: 'all1', label: 'Shop by Brands' },
    { id: 'brands', label: 'Shop by Products' },
    { id: 'ambassadors', label: 'Shop by Ambassador' },
    { id: 'brand-video', label: 'Brand Video' },
    { id: 'fast-channel', label: 'Fast Channel' },
    { id: 'vod', label: 'Video On demand' },
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        setActiveSection(visible[0].target.id);
      }
    },
    { threshold: 0.6 }
  );

  sections.forEach((section) => {
    const el = document.getElementById(section.id);
    if (el) observer.observe(el);
  });

  return () => {
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.unobserve(el);
    });
  };
}, []);


  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const navBtnStyle = {
    background: '#9D9A95',
    border: 'none',
    borderRadius: '50%',
    padding: 10,
    marginLeft: 8,
    color: '#333',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const slideStyle = {
    height: '200px',
    borderRadius: '10px',
    overflow: 'hidden',
    cursor: 'pointer',
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
        <ul
  className='Shownone'
  style={{
    margin: "0", padding: "0", listStyle: "none", display: "flex",
    position: "fixed", top: "20px", zIndex: "9999", alignItems: "center", justifyContent: "center", left: "25%"
  }}
>
  {[
    { id: 'all', label: 'All' },
    { id: 'all1', label: 'Shop by Brands' },
    { id: 'brands', label: 'Shop by Products' },
    { id: 'ambassadors', label: 'Shop by Ambassador' },
    { id: 'brand-video', label: 'Brand Video' },
    { id: 'fast-channel', label: 'Fast Channel' },
    { id: 'vod', label: 'Video On demand' },
  ].map((item, index) => (
    <li
      key={item.id}
      onClick={() => handleNavClick(item.id)}
      style={{
        cursor: "pointer",
        fontSize: "14px",
        color: activeSection === item.id ? "#96105E" : "#fff",
        borderBottom: activeSection === item.id ? "1px solid #96105E" : "none",
        padding: "0",
        margin: "0",
        marginLeft: index === 0 ? "0" : "20px",
        fontWeight: activeSection === item.id ? "bold" : "normal"
      }}
    >
      {item.label}
    </li>
  ))}
</ul>
        <div id= "all" style={{
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

<div style={{marginTop:"900px"}}>
<button
            onClick={() => slider?.prev()}
            style={navBtnStyle}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => slider?.next()}
            style={navBtnStyle}
          >
            <ChevronRight size={20} />
          </button>



{/* Shop by Brands Section */}
{/* Shop by Brands Section */}
<section id="all1" style={{ marginTop: '100vh', textAlign: 'left', position: 'relative' }}>
  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: "space-between" }}>
    <div style={{ display: 'flex', width: "100%", marginTop: '60px', marginBottom: '40px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontWeight: 'bold', color: 'White', fontSize: '32px' }}>Shop by Brands</span>
    </div>

    {/* Scroll Buttons */}
    <button
      onClick={() => document.getElementById('brandScrollContainer').scrollBy({ left: -300, behavior: 'smooth' })}
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
        justifyContent: 'center'
      }}
    >
      <ChevronLeft size={24} style={{ color: '#333' }} />
    </button>
    <button
      onClick={() => document.getElementById('brandScrollContainer').scrollBy({ left: 300, behavior: 'smooth' })}
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
        justifyContent: 'center'
      }}
    >
      <ChevronRight size={24} style={{ color: '#333' }} />
    </button>

    {/* Brand Image Row */}
    <div
      id="brandScrollContainer"
      style={{
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        paddingBottom: '20px',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        gap: '40px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      <style>
        {`
          #brandScrollContainer::-webkit-scrollbar {
            display: none;
          }
           @media screen and (max-width: 768px) {
      #brandScrollContainer {
        gap: 20px !important;
      }

      #brandScrollContainer > div {
        width: 70vw !important;
        height: auto !important;
      }

      #brandScrollContainer p {
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
  { src: '/health/health1.mp4', label: 'Health & Wellness' },
  { src: '/Beauty/beauty1.mp4', label: 'Beauty' },
  { src: '/Fashion/fashion1.mp4', label: 'Fashion' },
  { src: '/Fitness/fitness1.mp4', label: 'Fitness' },
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

      ].map((item, index) => (
        <div
          key={index}
          style={{
            flex: '0 0 auto',
            width: '259.01px',
            height: '520px',
            scrollSnapAlign: 'start',
            cursor: 'pointer',
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
              width: '100%',
              height: '460.46px',
              objectFit: 'cover',
              borderRadius: '0px',
            }}
            onMouseEnter={(e) => e.target.play()}
            onMouseLeave={(e) => {
              e.target.pause();
              e.target.currentTime = 0;
            }}
          />
          <p style={{ marginTop: "40px", fontSize: "24px", fontWeight: "bold", textAlign: "center", color: "white" }}>
  {item.label}
</p>

        </div>
      ))}
    </div>
  </div>
</section>

            {/* Shop by Product Section */}

{/* Shop by Product Section */}
<section id="brands" style={{ textAlign: 'left', marginTop: '40px', position: 'relative' }}>
  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: "space-between" }}>
    <div style={{ display: 'flex', width: "100%", marginTop: '60px', marginBottom: '40px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontWeight: 'bold', color: 'White', fontSize: '32px' }}>Shop by Products</span>
    </div>

    {/* Scroll Buttons */}
    <button
      onClick={() => document.getElementById('productScrollContainer').scrollBy({ left: -320, behavior: 'smooth' })}
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
        justifyContent: 'center'
      }}
    >
      <ChevronLeft size={24} style={{ color: '#333' }} />
    </button>
    <button
      onClick={() => document.getElementById('productScrollContainer').scrollBy({ left: 320, behavior: 'smooth' })}
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
        justifyContent: 'center'
      }}
    >
      <ChevronRight size={24} style={{ color: '#333' }} />
    </button>

    {/* Product Image Row */}
    <div
      id="productScrollContainer"
      style={{
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        paddingBottom: '20px',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        gap: '40px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
<style>
{`
  #productScrollContainer::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 768px) {
    #productScrollContainer {
      gap: 20px !important;
    }

    #productScrollContainer > div {
      width: 70vw !important;
      height: auto !important;
    }

    #productScrollContainer p {
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


      {allProducts.map((product, index) => (
        <div
          key={index}
          style={{
            flex: '0 0 auto',
            width: '309.75px',
            height: '373.75px',
            scrollSnapAlign: 'start',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          onClick={() => handleDetailView3()}
        >
          <img
            src={product.img}
            alt={`Product ${index + 1}`}
            style={{
              width: '100%',
              height: '309.75px',
              borderRadius: '0px',
              objectFit: 'cover'
            }}
          />
          <p style={{ marginTop: "40px", fontSize: "24px", fontWeight: "bold", textAlign: "center", color: "white" }}>
            {product.Name}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>



{/* Shop by Brand Ambassador Section */}
<section id="ambassadors" style={{ textAlign: 'left', marginTop: '40px', position: 'relative' }}>
  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: 'space-between' }}>
    <div style={{ display: 'flex', width: "100%", marginTop: '60px', marginBottom: '40px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontWeight: 'bold', color: 'White', fontSize: '32px' }}>Shop by Brand Ambassador</span>
    </div>

    {/* Scroll Buttons */}
    <button
      onClick={() => document.getElementById('ambassadorScrollContainer').scrollBy({ left: -320, behavior: 'smooth' })}
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
        justifyContent: 'center'
      }}
    >
      <ChevronLeft size={24} style={{ color: '#333' }} />
    </button>
    <button
      onClick={() => document.getElementById('ambassadorScrollContainer').scrollBy({ left: 320, behavior: 'smooth' })}
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
        justifyContent: 'center'
      }}
    >
      <ChevronRight size={24} style={{ color: '#333' }} />
    </button>

    {/* Ambassador Image Row */}
    <div
      id="ambassadorScrollContainer"
      style={{
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        paddingBottom: '20px',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        gap: '40px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
<style>
{`
  #ambassadorScrollContainer::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 768px) {
    #ambassadorScrollContainer {
      gap: 20px !important;
    }

    #ambassadorScrollContainer > div {
      width: 70vw !important;
      height: auto !important;
    }

    #ambassadorScrollContainer p {
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

      {allAmbassadors.map((amb, index) => (
        <div
          key={index}
          style={{
            flex: '0 0 auto',
            width: '310px',
            height: '373.75px',
            scrollSnapAlign: 'start',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          onClick={() => handleDetailView2()}
        >
          <img
            src={amb.img}
            alt={`Ambassador ${index + 1}`}
            style={{
              width: '100%',
              height: '309.75px',
              borderRadius: '0px',
              objectFit: 'cover'
            }}
          />
          <p style={{ marginTop: "40px", fontSize: "24px", fontWeight: "bold", textAlign: "center", color: "white" }}>
            {amb.Name}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>            
            
            

<section id="brand-video" style={{ textAlign: 'left', marginTop: '40px', marginBottom: '25px', position: 'relative' }}>
  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: 'space-between' }}>
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
        top: '195px',
        transform: 'translateY(-50%)',
        background: '#9D9A95',
        border: 'none',
        padding: '10px',
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <ChevronLeft size={24} style={{ color: '#333' }} />
    </button>
    <button
      onClick={() => document.getElementById('brandVideoScroll').scrollBy({ left: 400, behavior: 'smooth' })}
      style={{
        position: 'absolute',
        right: 0,
        top: '195px',
        transform: 'translateY(-50%)',
        background: '#9D9A95',
        border: 'none',
        padding: '10px',
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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
        paddingBottom: '10px',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        gap: '40px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
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
            height: '390px',
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
              width: '100%',
              height: '250px',
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
            marginTop: '20px',
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



{/* Fast Channel Section */}
<section id="fast-channel" style={{ textAlign: 'left', marginTop: '40px', marginBottom: '25px', position: 'relative' }}>
  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: 'space-between' }}>
    {/* Title */}
    <div style={{
      display: 'flex',
      width: '100%',
      marginTop: '0',
      marginBottom: '40px',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <span style={{ fontWeight: 'bold', color: 'white', fontSize: '32px' }}>Fast Channel</span>
    </div>

    {/* Scroll Buttons */}
    <button
      onClick={() => document.getElementById('fastChannelScroll').scrollBy({ left: -400, behavior: 'smooth' })}
      style={{
        position: 'absolute',
        left: 0,
        top: '195px',
        transform: 'translateY(-50%)',
        background: '#9D9A95',
        border: 'none',
        padding: '10px',
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <ChevronLeft size={24} style={{ color: '#333' }} />
    </button>
    <button
      onClick={() => document.getElementById('fastChannelScroll').scrollBy({ left: 400, behavior: 'smooth' })}
      style={{
        position: 'absolute',
        right: 0,
        top: '195px',
        transform: 'translateY(-50%)',
        background: '#9D9A95',
        border: 'none',
        padding: '10px',
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <ChevronRight size={24} style={{ color: '#333' }} />
    </button>

    {/* Scrollable Row */}
    <div
      id="fastChannelScroll"
      style={{
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        paddingBottom: '10px',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        gap: '40px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
     <style>
{`
  #fastChannelScroll::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 768px) {
    #fastChannelScroll {
      gap: 20px !important;
    }

    #fastChannelScroll > div {
      width: 70vw !important;
      height: auto !important;
    }

    #fastChannelScroll p {
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
  { src: '/health/health2.mp4', label: 'Health & Wellness' },
  { src: '/Beauty/beauty2.mp4', label: 'Beauty' }, 
  { src: '/Fashion/fashion2.mp4', label: 'Fashion' }, 
  { src: '/Fitness/fitness2.mp4', label: 'Fitness' },      ].map((item, index) => (
        <div
          key={index}
          style={{
            flex: '0 0 auto',
            width: '396.16px',
            height: '390px',
            scrollSnapAlign: 'start',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          onClick={() => console.log('Open detail view for:', item.label)}
        >
          <video
            src={item.src}
            muted
            style={{
              width: '100%',
              height: '250px',
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
            marginTop: '20px',
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

{/* Video On Demand Section */}
<section id="vod" style={{ textAlign: 'left', marginTop: '40px', marginBottom: '25px', position: 'relative' }}>
  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignContent: 'space-between' }}>
    {/* Title */}
    <div style={{
      display: 'flex',
      width: '100%',
      marginTop: '0',
      marginBottom: '40px',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <span style={{ fontWeight: 'bold', color: 'white', fontSize: '32px' }}>Video On Demand</span>
    </div>

    {/* Scroll Buttons */}
    <button
      onClick={() => document.getElementById('vodScroll').scrollBy({ left: -400, behavior: 'smooth' })}
      style={{
        position: 'absolute',
        left: 0,
        top: '195px',
        transform: 'translateY(-50%)',
        background: '#9D9A95',
        border: 'none',
        padding: '10px',
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <ChevronLeft size={24} style={{ color: '#333' }} />
    </button>
    <button
      onClick={() => document.getElementById('vodScroll').scrollBy({ left: 400, behavior: 'smooth' })}
      style={{
        position: 'absolute',
        right: 0,
        top: '195px',
        transform: 'translateY(-50%)',
        background: '#9D9A95',
        border: 'none',
        padding: '10px',
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <ChevronRight size={24} style={{ color: '#333' }} />
    </button>

    {/* Scrollable Row */}
    <div
      id="vodScroll"
      style={{
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        paddingBottom: '10px',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        gap: '40px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
<style>
{`
  #vodScroll::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 768px) {
    #vodScroll {
      gap: 20px !important;
    }

    #vodScroll > div {
      width: 70vw !important;
      height: auto !important;
    }

    #vodScroll p {
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
          
  { src: '/health/health4.mp4', label: 'Health & Wellness' },
  { src: '/Beauty/beauty4.mp4', label: 'Beauty' },
  { src: '/Fashion/fashion4.mp4', label: 'Fashion' },
  { src: '/Fitness/fitness4.mp4', label: 'Fitness' },
  { src: '/Beauty/beauty1.mp4', label: 'Beauty' },
  { src: '/Fashion/fashion1.mp4', label: 'Fashion' },
  { src: '/Fitness/fitness1.mp4', label: 'Fitness' }, 
  { src: '/health/health2.mp4', label: 'Health & Wellness' },
  { src: '/Beauty/beauty2.mp4', label: 'Beauty' }, 
  { src: '/Fashion/fashion2.mp4', label: 'Fashion' }, 
  { src: '/Fitness/fitness2.mp4', label: 'Fitness' },
  { src: '/health/health3.mp4', label: 'Health & Wellness' },
  { src: '/Beauty/beauty3.mp4', label: 'Beauty' },
  { src: '/Fashion/fashion3.mp4', label: 'Fashion' },
  { src: '/Fitness/fitness3.mp4', label: 'Fitness' },
      ].map((item, index) => (
        <div
          key={index}
          style={{
            flex: '0 0 auto',
            width: '396.16px',
            height: '390px',
            scrollSnapAlign: 'start',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          onClick={() => console.log('Open detail view for:', item.label)}
        >
          <video
            src={item.src}
            muted
            style={{
              width: '100%',
              height: '250px',
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
            marginTop: '20px',
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

          </div>
        </div>
      </>
    )}
    </>
  );
}

export default Marketplace;
