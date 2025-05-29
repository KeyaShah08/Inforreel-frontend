import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header1 from '../components/Header1';
import Sidebar from '../components/Sidebar';

const Brandvideos1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const videoData = location.state?.video || {};
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ display: 'flex', backgroundColor: '#141414', color: 'white', minHeight: '100vh' }}>
      <Sidebar activeItem="Global Showroom" onNavItemClick={() => {}} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header1 />
        <div
          style={{
            paddingRight: '20px',
            marginTop: '80px',
            marginLeft: '280px',
            minHeight: '100vh',
            position: 'relative',
          }}
        >
          <button
            onClick={() => navigate('/brandvideos')}
            style={{
              position: 'absolute',
              top: '0px',
              right: '0px',
              background: 'transparent',
              border: 'none',
              fontSize: '24px',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            &times;
          </button>

          <div
            style={{
              display: 'flex',
              gap: '32px',
              alignItems: 'flex-start',
              marginBottom: '40px',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                flex: '1 1 60%',
                height: isScrolled ? '480px' : '640px',
                transition: 'height 0.3s ease',
                backgroundColor: '#141414',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflowX: 'hidden',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  width: isScrolled ? '80%' : '100%',
                  maxWidth: '100%',
                  aspectRatio: '16 / 9',
                  transition: 'width 0.3s ease',
                }}
              >
                <CustomVideoPlayer videoSrc={videoData.video} />
              </div>
            </div>

            <div style={{ flex: '1 1 40%' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
                {videoData.description || 'Product Title'}
              </h2>

              <p style={{ fontSize: '16px', color: '#ccc', maxWidth: '100%' }}>
                Soft {videoData.Name?.toLowerCase()} prestige le baume de minuit is the first highly densifying night
                cream concentrated with midnight rosapeptide. In 1 month, skin appears 6 times denser.
                <span style={{ color: '#96105E', cursor: 'pointer' }}> read more</span>
              </p>

              <div style={{ marginTop: '10px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Products</h3>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ width: '240px', backgroundColor: '#222', borderRadius: '8px' }}>
                    <img src="/b113.png" alt="Product" style={{ width: '100%' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', marginTop: '10px', color: '#eee' }}>Fenty Beauty</p>
                    <p style={{ fontSize: '13px', color: '#bbb' }}>
                      Soft matte powder foundation... <span style={{ color: '#96105E' }}>read more</span>
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '20px' }}>
                      <button
                        type="button"
                        style={{
                          padding: 0,
                          background: "#666666",
                          borderRadius: "50%",
                          width: "45px",
                          height: "45px",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <img src="/cart1.png" alt="Add to Cart Icon" style={{ width: "22px", height: "22px" }} />
                      </button>
                      <button
                        style={{
                          backgroundColor: '#96105E',
                          border: 'none',
                          borderRadius: '4px',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '14px',
                          padding: '10px 20px',
                        }}
                      >
                        Buy now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomVideoPlayer = ({ videoSrc }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

 const handleFullscreen = () => {
  const container = videoRef.current.parentElement?.parentElement; // target the outer <div> holding video + controls
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  } else if (container.mozRequestFullScreen) {
    container.mozRequestFullScreen();
  } else if (container.msRequestFullscreen) {
    container.msRequestFullscreen();
  }
};

const handleDoubleClick = () => {
  const container = videoRef.current.parentElement?.parentElement;

  if (!document.fullscreenElement) {
    if (container.requestFullscreen) {
      container.requestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const video = videoRef.current;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const setLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      video.currentTime = 0;
      video.play();
      setIsPlaying(true);
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', setLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', setLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleSeek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickPos = e.clientX - rect.left;
    const newTime = (clickPos / rect.width) * duration;
    videoRef.current.currentTime = newTime;
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#141414',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: '16 / 9',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          maxHeight: '100%',
          backgroundColor: '#141414',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
       <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        onClick={togglePlayPause}
        onDoubleClick={handleDoubleClick}
        style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            backgroundColor: '#141414',
            cursor: 'pointer',
        }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '0px 10px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white',
            fontSize: '14px',
            marginBottom: '2px'
          }}
        >
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button onClick={togglePlayPause} style={buttonStyle}>
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button onClick={toggleMute} style={buttonStyle}>
              {isMuted ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M16.5 12a4.5 4.5 0 0 0-9 0 4.5 4.5 0 0 0 9 0z" fill="none"/>
                  <path d="M9 9v6h4l5 5V4l-5 5H9z"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M3 10v4h4l5 5V5L7 10H3zm13.54-1.88a5 5 0 0 1 0 7.76l1.42 1.42a7 7 0 0 0 0-10.6l-1.42 1.42zm2.83-2.83a9 9 0 0 1 0 13.42l1.42 1.42a11 11 0 0 0 0-16.26l-1.42 1.42z"/>
                </svg>
              )}
            </button>
            <button onClick={handleFullscreen} style={buttonStyle}>⛶</button>
          </div>
        </div>

        <div
          onClick={handleSeek}
          style={{
            height: '4px',
            width: '100%',
            background: '#555',
            cursor: 'pointer',
            position: 'relative',
            borderRadius: '4px',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              backgroundColor: '#96105E',
              height: '100%',
              borderRadius: '4px',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: `${progress}%`,
              top: '-4px',
              width: '10px',
              height: '10px',
              backgroundColor: 'white',
              borderRadius: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  background: 'transparent',
  border: 'none',
  color: 'white',
  fontSize: '18px',
  cursor: 'pointer',
};

export default Brandvideos1;
