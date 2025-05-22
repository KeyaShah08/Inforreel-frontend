import { useEffect, useRef, useState } from 'react';
import { FaExpand, FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import "../App.css";
import BeautyProducts from './BeautyProducts';
// You might need to install react-icons if you haven't already: npm install react-icons

// Helper function to format time in seconds to MM:SS or HH:MM:SS
const formatTime = (timeInSeconds) => {
  if (isNaN(timeInSeconds)) return '0:00';
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
      const paddedMinutes = remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
      return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  }

  return `${minutes}:${paddedSeconds}`;
};

function FeedItems() {
  const [mediaItems, setMediaItems] = useState([
  { id: 1, type: 'video', src: '/health/health2.mp4', muted: true, liked: false, saved: false, playing: false, userPaused: false, currentTime: 0, duration: 0, profileName: 'Dior', username: '@zara_elan', caption: '#ZaraElanStyle #Beauty #SkincareRoutine', logo: '/icons/dior.png' },
  { id: 2, type: 'video', src: '/Beauty/beauty2.mp4', muted: true, liked: false, saved: false, playing: false, userPaused: false, currentTime: 0, duration: 0, profileName: 'Dior', username: '@zara_elan', caption: '#ZaraElanStyle #Beauty #SkincareRoutine', logo: '/icons/dior.png' },
  { id: 3, type: 'video', src: '/Fashion/fashion2.mp4', muted: true, liked: false, saved: false, playing: false, userPaused: false, currentTime: 0, duration: 0, profileName: 'Dior', username: '@zara_elan', caption: '#ZaraElanStyle #Beauty #SkincareRoutine', logo: '/icons/dior.png' },
  { id: 4, type: 'video', src: '/Fitness/fitness2.mp4', muted: true, liked: false, saved: false, playing: false, userPaused: false, currentTime: 0, duration: 0, profileName: 'Dior', username: '@zara_elan', caption: '#ZaraElanStyle #Beauty #SkincareRoutine', logo: '/icons/dior.png' },
  { id: 5, type: 'video', src: '/health/health3.mp4', muted: true, liked: false, saved: false, playing: false, userPaused: false, currentTime: 0, duration: 0, profileName: 'Dior', username: '@zara_elan', caption: '#ZaraElanStyle #Beauty #SkincareRoutine', logo: '/icons/dior.png' },
  { id: 6, type: 'video', src: '/Beauty/beauty3.mp4', muted: true, liked: false, saved: false, playing: false, userPaused: false, currentTime: 0, duration: 0, profileName: 'Dior', username: '@zara_elan', caption: '#ZaraElanStyle #Beauty #SkincareRoutine', logo: '/icons/dior.png' },
  { id: 7, type: 'video', src: '/Fashion/fashion3.mp4', muted: true, liked: false, saved: false, playing: false, userPaused: false, currentTime: 0, duration: 0, profileName: 'Dior', username: '@zara_elan', caption: '#ZaraElanStyle #Beauty #SkincareRoutine', logo: '/icons/dior.png' },
  { id: 8, type: 'video', src: '/Fitness/fitness3.mp4', muted: true, liked: false, saved: false, playing: false, userPaused: false, currentTime: 0, duration: 0, profileName: 'Dior', username: '@zara_elan', caption: '#ZaraElanStyle #Beauty #SkincareRoutine', logo: '/icons/dior.png' },
  { id: 9, type: 'video', src: '/health/health4.mp4', muted: true, liked: false, saved: false, playing: false, userPaused: false, currentTime: 0, duration: 0, profileName: 'Dior', username: '@zara_elan', caption: '#ZaraElanStyle #Beauty #SkincareRoutine', logo: '/icons/dior.png' },
  { id: 10, type: 'video', src: '/Beauty/beauty4.mp4', muted: true, liked: false, saved: false, playing: false, userPaused: false, currentTime: 0, duration: 0, profileName: 'Dior', username: '@zara_elan', caption: '#ZaraElanStyle #Beauty #SkincareRoutine', logo: '/icons/dior.png' },
  { id: 11, type: 'video', src: '/Fashion/fashion4.mp4', muted: true, liked: false, saved: false, playing: false, userPaused: false, currentTime: 0, duration: 0, profileName: 'Dior', username: '@zara_elan', caption: '#ZaraElanStyle #Beauty #SkincareRoutine', logo: '/icons/dior.png' },
  { id: 12, type: 'video', src: '/Fitness/fitness4.mp4', muted: true, liked: false, saved: false, playing: false, userPaused: false, currentTime: 0, duration: 0, profileName: 'Dior', username: '@zara_elan', caption: '#ZaraElanStyle #Beauty #SkincareRoutine', logo: '/icons/dior.png' },
  { id: 13, type: 'video', src: '/Beauty/beauty1.mp4', muted: true, liked: false, saved: false, playing: false, userPaused: false, currentTime: 0, duration: 0, profileName: 'Dior', username: '@zara_elan', caption: '#ZaraElanStyle #Beauty #SkincareRoutine', logo: '/icons/dior.png' },
  { id: 14, type: 'video', src: '/Fashion/fashion1.mp4', muted: true, liked: false, saved: false, playing: false, userPaused: false, currentTime: 0, duration: 0, profileName: 'Dior', username: '@zara_elan', caption: '#ZaraElanStyle #Beauty #SkincareRoutine', logo: '/icons/dior.png' },
  { id: 15, type: 'video', src: '/Fitness/fitness1.mp4', muted: true, liked: false, saved: false, playing: false, userPaused: false, currentTime: 0, duration: 0, profileName: 'Dior', username: '@zara_elan', caption: '#ZaraElanStyle #Beauty #SkincareRoutine', logo: '/icons/dior.png' }
]);

  const [fadingHeartVisible, setFadingHeartVisible] = useState({});
  // State to track the ID of the item currently in fullscreen
  const [fullscreenItemId, setFullscreenItemId] = useState(null);
  const [showOpenCart, setOpenCart] = useState(false);

  const videoRefs = useRef({});
  const clickTimeoutRef = useRef(null); // Ref to store the click timeout ID
  const [isOpenDrp, setIsOpenDrp] = useState(false);
  const [isRedirectioin, setRedirection] = useState(false);


  // Function to toggle mute state for a specific video
  const toggleMute = (id) => {
    setMediaItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.type === 'video' ? { ...item, muted: !item.muted } : item
      )
    );
  };

  // Function to handle like button click (used for both icon click and double-click)
  const handleLikeClick = (id) => {
    setMediaItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          if (!item.liked) {
            setFadingHeartVisible(prev => ({ ...prev, [id]: true }));
            setTimeout(() => {
              setFadingHeartVisible(prev => ({ ...prev, [id]: false }));
            }, 1000);
          }
          return { ...item, liked: !item.liked };
        }
        return item;
      })
    );

    const item = mediaItems.find(item => item.id === id);
    if (!item.liked) {
      console.log(`Item ${id} liked!`);
    } else {
      console.log(`Item ${id} unliked.`);
    }
  };

  // Function to handle save button click
  const handleSaveClick = (id) => {
      setMediaItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, saved: !item.saved } : item
        )
      );
      const item = mediaItems.find(item => item.id === id);
      if (!item.saved) {
        console.log(`Item ${id} saved!`);
      } else {
        console.log(`Item ${id} unsaved.`);
      }
  };

  // Placeholder functions for other icon clicks
  const handleAddToCartClick = (id) => {
    setOpenCart(true);
    console.log(`Add to cart clicked for item ${id}`);
  };

  const handleCommentClick = (id) => {
    console.log(`Comment clicked for item ${id}`);
  };

  const handleShareClick = (id) => {
    console.log(`Share clicked for item ${id}`);
  };
  const toggleDropdown = () => {
    setIsOpenDrp(!isOpenDrp);
  };

  // Function to toggle play/pause for a specific video
  const togglePlayPause = (id) => {
    console.log(`Toggle Play/Pause clicked for item ${id}`); // Log when clicked
    const video = videoRefs.current[id];

    if (video) {
      console.log(`Found video element for item ${id}. Current paused state: ${video.paused}`); // Log video state
      if (video.paused) {
        video.play()
          .then(() => {
            console.log(`Video ${id} played successfully.`); // Log successful play
             setMediaItems(prevItems =>
              prevItems.map(item =>
                // When playing via button or click, set playing to true and userPaused to false
                item.id === id && item.type === 'video' ? { ...item, playing: true, userPaused: false } : item
              )
            );
          })
          .catch(error => console.error(`Video ${id} play failed:`, error)); // Log play errors
      } else {
        video.pause();
        console.log(`Video ${id} paused.`); // Log pause action
         setMediaItems(prevItems =>
          prevItems.map(item =>
             // When pausing via button or click, set playing to false and userPaused to true
            item.id === id && item.type === 'video' ? { ...item, playing: false, userPaused: true } : item
          )
        );
      }
    } else {
        console.log(`Video element not found for item ${id}.`); // Log if video ref is missing
    }
  };

  // Function to handle time updates from the video
  const handleTimeUpdate = (id, event) => {
      // Update state only if the video is currently being played by the user or autoplay
       const item = mediaItems.find(item => item.id === id);
       if (item && item.type === 'video') { // Always update time state when timeupdate fires for accuracy
           setMediaItems(prevItems =>
               prevItems.map(mediaItem =>
                   mediaItem.id === id && mediaItem.type === 'video'
                       ? { ...mediaItem, currentTime: event.target.currentTime }
                       : mediaItem
               )
           );
       }
  };

  // Function to handle loaded metadata from the video (gets duration)
  const handleLoadedMetadata = (id, event) => {
      setMediaItems(prevItems =>
          prevItems.map(item =>
              item.id === id && item.type === 'video'
                  ? { ...item, duration: event.target.duration }
                  : item
          )
      );
  };

    // Function to handle seeking on the progress bar
    const handleSeek = (id, event) => {
        // Prevent click on the progress bar from triggering video play/pause
        event.stopPropagation();

        const progressBar = event.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickPosition = event.clientX - rect.left; // Position relative to the left edge of the bar
        const percentage = clickPosition / rect.width; // Percentage of the bar clicked

        const video = videoRefs.current[id];
        const item = mediaItems.find(item => item.id === id);

        if (video && item && item.type === 'video' && item.duration > 0) {
            const newTime = percentage * item.duration;
            video.currentTime = newTime;
             console.log(`Seeking video ${id} to ${newTime} seconds.`);
             // Update state immediately for visual feedback
             setMediaItems(prevItems =>
                prevItems.map(mediaItem =>
                    mediaItem.id === id ? { ...mediaItem, currentTime: newTime, userPaused: false, playing: true } : mediaItem // Assume playing after seeking
                )
            );
             video.play().catch(error => console.error('Seek play failed:', error)); // Attempt to play after seek
        }
    };


  // Function to toggle fullscreen for a specific video
  const toggleFullscreen = (id) => {
    const videoContainer = videoRefs.current[id]?.parentElement; // Get the parent div holding the video

    if (videoContainer) {
      // Check if fullscreen is currently active for any element in the document
      const fullscreenElement = document.fullscreenElement ||
                                document.mozFullScreenElement ||
                                document.webkitFullscreenElement ||
                                document.msFullscreenElement;

      if (fullscreenElement) {
        // If fullscreen is active, exit fullscreen
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
          document.webkitExitFullscreen();
        } else if (document.msRequestFullscreen) { /* IE/Edge */
          document.msRequestFullscreen();
        }
        // The 'fullscreenchange' event listener will handle setting fullscreenItemId to null
        console.log(`Attempting to exit fullscreen for item ${id}`);
      } else {
        // If not in fullscreen, request fullscreen for the video container
        if (videoContainer.requestFullscreen) {
          videoContainer.requestFullscreen();
        } else if (videoContainer.mozRequestFullScreen) { /* Firefox */
          videoContainer.mozRequestFullScreen();
        } else if (videoContainer.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
          videoContainer.webkitRequestFullscreen();
        } else if (document.msRequestFullscreen) { /* IE/Edge */
          document.msRequestFullscreen();
        }
        // Set the state to the ID of the item entering fullscreen
        setFullscreenItemId(id);
        console.log(`Requesting fullscreen for item ${id}`);
      }
    } else {
        console.log(`Video container not found for fullscreen for item ${id}`);
    }
  };

  // Effect to listen for fullscreen changes (e.g., pressing Escape key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      // Check if any element is in fullscreen mode
      const currentFullscreenElement = document.fullscreenElement ||
                                      document.mozFullScreenElement ||
                                      document.webkitFullscreenElement ||
                                      document.msFullscreenElement;

      // If no element is in fullscreen, reset fullscreenItemId
      if (!currentFullscreenElement) {
        setFullscreenItemId(null);
        console.log("Fullscreen exited by event.");
      } else {
        // Optional: If you need to confirm which item entered fullscreen
        // You could check if the currentFullscreenElement is one of your video containers
        // For simplicity here, we assume if an element is fullscreen, it's one of ours
        // if we initiated it. If you need to handle external fullscreen, you'd add more checks.
         console.log("Fullscreen entered/changed by event.");
      }
    };

    // Add event listeners for fullscreen change
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    // Clean up event listeners on component unmount
    
<style>{`
  @media screen and (max-width: 768px) {
    .feed-item-container {
      width: 90vw !important;
    }

    .feed-item-content {
      width: 100% !important;
      height: auto !important;
      border-radius: 10px !important;
    }

    .brand-logo {
      width: 28px !important;
      height: 28px !important;
      margin-right: 6px !important;
    }

    .brand-info div {
      font-size: 0.85rem !important;
    }

    .hashtag-text {
      font-size: 0.8rem !important;
    }
  }
`}</style>

return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []); // Empty dependency array means this effect runs only once on mount and cleans up on unmount


  // Effect to set up Intersection Observer for video autoplay/pause and attach time/metadata listeners
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target.tagName === 'VIDEO') {
            const itemId = parseInt(entry.target.dataset.itemId); // Get item ID from data attribute
            // Find the item in the current state
            const currentItem = mediaItems.find(item => item.id === itemId);

            if (entry.isIntersecting) {
              // Only play if the video is intersecting AND the user hasn't manually paused it
              // Also, prevent autoplay if currently in fullscreen mode
              if (currentItem?.type === 'video' && !currentItem.userPaused && fullscreenItemId !== itemId) {
                 entry.target.play().catch(error => console.error('Video play failed:', error));
                 setMediaItems(prevItems =>
                  prevItems.map(item =>
                    item.id === itemId && item.type === 'video' ? { ...item, playing: true } : item
                  )
                );
              }
            } else {
              // Always pause when not intersecting
               if (currentItem?.type === 'video') { // Added check for video type
                  entry.target.pause();
                  setMediaItems(prevItems =>
                    prevItems.map(item =>
                      item.id === itemId && item.type === 'video' ? { ...item, playing: false } : item
                    )
                  );
               }
            }
          }
        });
      },
      // Keep the threshold at 0.8 or adjust as needed
      { threshold: 0.8 }
    );

    mediaItems.forEach(item => {
      if (item.type === 'video' && videoRefs.current[item.id]) {
        const videoElement = videoRefs.current[item.id];
        // Add a data attribute to easily get the item ID in the observer
        videoElement.dataset.itemId = item.id;
        observer.observe(videoElement);

        // Add event listeners for time update and loaded metadata
        // Pass item.id to the handlers
        videoElement.addEventListener('timeupdate', (e) => handleTimeUpdate(item.id, e));
        videoElement.addEventListener('loadedmetadata', (e) => handleLoadedMetadata(item.id, e));
      }
    });

    return () => {
      mediaItems.forEach(item => {
        if (item.type === 'video' && videoRefs.current[item.id]) {
           const videoElement = videoRefs.current[item.id];
          observer.unobserve(videoElement);
          // Clean up event listeners
          videoElement.removeEventListener('timeupdate', (e) => handleTimeUpdate(item.id, e));
          videoElement.removeEventListener('loadedmetadata', (e) => handleLoadedMetadata(item.id, e));
        }
      });
    };
    // Depend on mediaItems and fullscreenItemId as state changes affect observer behavior
  }, [mediaItems, fullscreenItemId]);


  const smallestActionIconSize = '28px';
  const engagementIconSize = '22px';
  const addToCartIconSize = '47px';
  const profileIconSize = '50px';
  const fadingHeartSize = '100px';

  const standardSpacing = '20px';
  const reducedSpacing = '5px';

  const customControlSize = '24px'; // Size for custom video controls
  const customControlPadding = '8px'; // Padding around custom controls
  const customControlBackgroundColor = 'rgba(0, 0, 0, 0.5)';

const handleRedirection = () => {
  setRedirection(true);
}
  return (
    <>
    
    {isRedirectioin ? <BeautyProducts /> :
      <>
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '550px',
        width: '100%',
        marginTop:"50px"
      }}>
        {mediaItems.map(item => (
          // Main container for each item - Position relative for text overlay
          <div key={item.id} className='feed-item-container' style={{
            display: 'flex',
            alignItems: 'flex-end', // Align video/image and icons to the bottom
            marginBottom: '70px', // Reverted to 70px margin bottom
            width: 'auto', /* Changed to auto so the inner div can control the width */
            position: 'relative', 
            // height:"90vh", /* This can be removed or set to 'auto' as inner div will control height */
          }}
          onDoubleClick={() => { // Modified onDoubleClick
            handleLikeClick(item.id); // Always handle like on double click

            // If it's a video and a single click timeout is pending, clear it
            if (item.type === 'video' && clickTimeoutRef.current) {
              clearTimeout(clickTimeoutRef.current);
              clickTimeoutRef.current = null;
            }
          }}
          >
            {/* Video/Image Container - Apply fullscreen styles here */}
            <div style={{
              width: fullscreenItemId === item.id ? '100vw' : '310px', // Changed width to 310px
              height: fullscreenItemId === item.id ? '87vh' : 'auto', // Take full viewport height in fullscreen, or auto otherwise
              aspectRatio: '9 / 16', className: 'feed-item-content', // Always maintain 9/16 aspect ratio
              overflow: 'hidden', // Keep overflow hidden for the main container
              borderRadius: fullscreenItemId === item.id ? '0' : '10px', // No border radius in fullscreen
              backgroundColor: fullscreenItemId === item.id ? '#141414' : '#333', // Background color in fullscreen
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative', // Keep relative for absolute positioning of controls and progress bar
              flexGrow: fullscreenItemId === item.id ? 0 : 1, // Don't grow in fullscreen relative to other items
              transition: 'all 0.3s ease', // Smooth transition
            }}>
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={`Feed item ${item.id}`}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  onError={(e) => { e.target.onerror = null; e.target.src = 'placeholder_image_url'; }}
                />
              ) : (
                <>
                  <video
                    ref={el => videoRefs.current[item.id] = el}
                    // controls are removed for custom controls
                    style={{
                      display: 'block',
                      // Use 'contain' in fullscreen, 'cover' otherwise
                      objectFit: fullscreenItemId === item.id ? 'contain' : 'cover',
                      width: '100%', // Video should fill container
                      height: '100%', // Video should fill container
                    }}
                    controls={false}
                    controlsList="nodownload nofullscreen noremoteplayback"
                    onContextMenu={e => e.preventDefault()}
                    onTouchStart={e => e.preventDefault()}
                    muted={item.muted}
                    onError={(e) => { e.target.onerror = null; e.target.src = 'placeholder_video_url'; }}
                    loop
                    // Always call togglePlayPause on click on the video element
                    onClick={() => { // Modified onClick for video
                      if (clickTimeoutRef.current) {
                        clearTimeout(clickTimeoutRef.current);
                        clickTimeoutRef.current = null;
                        // This is the second click of a double-click, do nothing here
                      } else {
                        // This is the first click, set a timeout
                        clickTimeoutRef.current = setTimeout(() => {
                          togglePlayPause(item.id);
                          clickTimeoutRef.current = null;
                        }, 300); // 300ms threshold
                      }
                    }}
                  >
                    <source src={item.src} type={`video/${item.src.split('.').pop()}`} />
                    Your browser does not support the video tag.
                  </video>

                  {/* Custom Video Controls Overlay - Adjusted bottom position */}
                  <div style={{
                    position: 'absolute',
                    bottom: '22px', // Positioned above the progress bar and text (approx. 16px bar/text + 6px spacing)
                    left: '10px',
                    right: '10px',
                    display: 'flex',
                    justifyContent: 'space-between', // Space out the controls
                    alignItems: 'center',
                    zIndex: 1, // Ensure visibility
                    color: 'white',
                    zIndex:"9999"
                  }}>
                    {/* Play/Pause Button */}
                    <div
                      style={{
                        backgroundColor: customControlBackgroundColor,
                        borderRadius: '50%',
                        padding: customControlPadding,
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: customControlSize,
                        height: customControlSize,
                      }}
                      onClick={() => togglePlayPause(item.id)}
                    >
                      {item.playing ? <FaPause /> : <FaPlay />}
                    </div>

                    {/* Spacer (to push fullscreen button to the right) */}
                    <div style={{ flexGrow: 1 }}></div>

                    {/* Fullscreen Button */}
                    <div
                      style={{
                        backgroundColor: customControlBackgroundColor,
                        borderRadius: '50%',
                        padding: customControlPadding,
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: customControlSize,
                        height: customControlSize,
                      }}
                      onClick={() => toggleFullscreen(item.id)}
                    >
                      <FaExpand />
                    </div>
                  </div>


                  {/* Mute/Unmute Icon Overlay - Still using react-icons */}
                  {/* Positioned separately from the bottom control bar */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '50%',
                      padding: '8px',
                      cursor: 'pointer',
                      zIndex: 1, // Ensure visibility
                      color: 'white',
                      fontSize: '1.2rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',                      
                    }}
                    onClick={() => toggleMute(item.id)}
                  >
                    {item.muted ? <FaVolumeMute /> : <FaVolumeUp />}
                  </div>

                  {/* Progress Bar Container (Visible for video items in both normal and fullscreen) */}
                  {item.type === 'video' && ( // Progress bar visible in fullscreen too
                      <div style={{
                          position: 'absolute', // Position relative to the video container
                          bottom: '4px', // Move slightly up from the very bottom
                          left: '0',
                          right: '0',
                          height: '16px', // Increased height for text visibility
                          backgroundColor: 'transparent', // Lighter background for better contrast
                          cursor: 'pointer',
                          zIndex: 9999999, // Ensure visibility above the video
                          display: 'flex', // Use flexbox for internal alignment
                          alignItems: 'center', // Vertically center content
                          paddingLeft: '10px', // Add padding for text
                          paddingRight: '10px', // Add padding for dot/fill
                      }}
                      onClick={(e) => handleSeek(item.id, e)}
                      >
                          {/* Current time / Duration text - Positioned within the progress bar container */}
                        <div style={{
                            color: 'white',
                            fontSize: '0.7rem', // Slightly smaller font for fit
                            marginRight: 'auto', // Push time text to the left
                            textShadow: '1px 1px 2px rgba(0,0,0,0.5)', // Add shadow for readability
                            pointerEvents: 'none', // Prevent clicks on text from interfering with seek
                            zIndex: 2, // Ensure text is above the fill and background
                        }}>
                            {formatTime(item.currentTime)} / {formatTime(item.duration)}
                        </div>

                        {/* Progress Bar Visual */}
                        <div style={{
                            flexGrow: 1, // Allows the bar to take up remaining space
                            height: '4px', // Height of the progress bar line itself
                            backgroundColor: 'rgba(255, 255, 255, 0.3)', // Background of the bar line
                            borderRadius: '2px', // Rounded corners for the bar line
                            position: 'relative', // Needed for positioning the dot
                            marginLeft: '10px', // Space between time text and bar
                        }}>
                              {/* Progress Fill */}
                            <div style={{
                                height: '100%',
                                width: item.duration > 0 ? `${(item.currentTime / item.duration) * 100}%` : '0%',
                                backgroundColor: '#96105E', // Color of the filled progress
                                borderRadius: '2px', // Match parent border radius
                                transition: 'width 0.2s linear', // Smooth transition
                                position: 'relative', // Needed for the dot
                            }}>
                            </div>
                              {/* Progress Dot - Positioned relative to the fill's parent (the bar visual div) */}
                              {item.duration > 0 && ( // Only show dot if duration is known
                                  <div style={{
                                      position: 'absolute',
                                      left: item.duration > 0 ? `${(item.currentTime / item.duration) * 100}%` : '0%', // Position based on progress percentage
                                      top: '50%',
                                      transform: 'translate(-50%, -50%)', // Center the dot
                                      width: '12px', // Size of the dot
                                      height: '12px', // Size of the dot
                                      borderRadius: '50%',
                                      backgroundColor: 'white', // Color of the dot
                                      zIndex: 3, // Ensure dot is above everything in the bar
                                      pointerEvents: 'none', // Prevent clicks on dot from interfering with seek
                                  }}></div>
                              )}
                        </div>
                      </div>
                  )}
                </>
              )}

              {/* Fading Heart Icon - Conditionally rendered and animated */}
              {fadingHeartVisible[item.id] && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2, // Ensure it's above video and controls/progress bar
                  animation: 'fade-in-out 1s ease-out',
                }}>
                  {/* EMBEDDED SVG for the large fading heart */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#96105E"
                    width={fadingHeartSize}
                    height={fadingHeartSize}
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  </div>
              )}
            </div>

            {/* Icons Container - Hide icons container when a video is in fullscreen */}
            {fullscreenItemId !== item.id && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '20px',
                alignItems: 'center',
                // paddingBottom: standardSpacing,
                paddingBottom: 0,
              }}>

                {/* Profile Icon (Large size) */}
                <div style={{
                    marginBottom: standardSpacing,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: profileIconSize,
                    height: profileIconSize,
                }}
                onClick={() => console.log(`Profile icon clicked for item ${item.id}`)}
                >
                    <img
                        src="/icons/profileicon.svg"
                        alt="Profile Icon"
                        style={{
                            display: 'block',
                            width: '100%',
                            height: '100%',
                            }}
                        />
                </div>


                {/* Action Icons (Sizes adjusted based on visual reference) */}

                {/* Shopping Cart Icon - Medium size */}
                <button type='buttn' style={{padding:"0",marginBottom: "20px", background:"#666", borderRadius:"50%", width:"45px",height:"45px", border:"none"}}>
                    <img
                     src="/cart1.png"
                     alt="Add to Cart Icon"
                     style={{ marginBottom: 0, width: "50%", height: "auto", cursor: 'pointer',margin:"auto", display:"flex", alignItems:"center",justifyContent:"center"}}
                     onClick={() => handleAddToCartClick(item.id)}
                     />
              </button>
                {/* Like Icon and Count - Slightly larger base size */}
                <div
                  style={{ marginBottom: "0px", cursor: 'pointer' }}
                  onClick={() => handleLikeClick(item.id)}
                >
                    {/* EMBEDDED SVG for dynamic color change */}
                    <img
  src={item.liked ? "/icons/filledlike.svg" : "/icons/like.svg"}
  alt="Like Icon"
  style={{ marginBottom: 0, width: smallestActionIconSize, height: smallestActionIconSize, cursor: 'pointer' }}
/>
                  </div>
                  {/* Static Like Count */}
                  <div style={{ marginBottom: "20px", fontSize: '14px', color: 'white', textAlign: 'center' }}>
                    247K
                  </div>

                {/* Comment Icon and Count - Smallest size */}
                <img
                  src="/comment.png"
                  alt="Comment Icon"
                  style={{ marginBottom: reducedSpacing, width: smallestActionIconSize, height: smallestActionIconSize, cursor: 'pointer' }}
                  
                />
                  {/* Static Comment Count */}
                  <div style={{ marginBottom: "20px", fontSize: '14px', color: 'white', textAlign: 'center' }}>
                    1,495
                  </div>

                {/* Share Icon - Smallest size */}
                <img
                  src="/shared.png"
                  alt="Share Icon"
                  style={{ marginBottom: "20px", width: engagementIconSize, height: engagementIconSize, cursor: 'pointer' }}
                  onClick={() => handleShareClick(item.id)}
                />

                {/* Save Icon - Slightly larger base size */}
                <div
                  style={{ marginBottom: '20px', cursor: 'pointer' }}
                  onClick={() => handleSaveClick(item.id)}
                >
                  {/* EMBEDDED SVG for dynamic color change */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth={item.saved ? "4" : "2"}
                    width={engagementIconSize}
                    height={engagementIconSize}
                  >
                    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
                  </svg>
                </div>
                <div
                  style={{ marginBottom: '0', cursor: 'pointer' }}
                >
                  <img
                        src="/dots.png"
                        alt="Profile Icon"
                        style={{
                            display: 'block',
                            width: '100%',
                            height: '100%',
                            }}
                        />
                </div>
                

              </div>
            )}

            {/* Text Overlay Container - Positioned absolutely within the main item container */}
{fullscreenItemId !== item.id && (
  <div style={{
    position: 'absolute',
    bottom: item.type === 'video' ? '0px' : '0px',
    left: '0',
    right: '70px',
    color: 'white',
    zIndex: 3,
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    background: 'linear-gradient(to bottom, rgba(8, 9, 13, 0) 0%, rgba(8, 9, 13, 0.9) 100%)',
    padding: "10px",
    paddingBottom: item.type === 'video' ? "75px" : "10px",
    borderBottomLeftRadius: "9px",
    borderBottomRightRadius: "10px"
  }}>
    {/* Logo + Brand Info Section */}
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
      <img
        src={item.logo}
        alt="brand logo"
        className='brand-logo' style={{ width: '36px', height: '36px', objectFit: 'contain', marginRight: '10px', borderRadius: '4px' }}
      />
      <div className='brand-info'>
        <div style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '2px' }}>{item.profileName}</div>
        <div style={{ fontSize: '0.9rem', color: '#ccc' }}>{item.username}</div>
      </div>
    </div>

    {/* Hashtags */}
    <div className='hashtag-text' style={{ fontSize: '0.9rem', lineHeight: '1.3', marginTop: '4px' }}>
      {item.caption}
    </div>
  </div>
)}
          </div>
        ))}

        <style>{`
          @keyframes fade-in-out {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.8);
            }
            20% {
              opacity: 0.5;
              transform: translate(-50%, -50%) scale(1);
            }
            80% {
              opacity: 0.5;
              transform: translate(-50%, -50%) scale(1);
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(1.2);
            }
          }

          /* Note: The fullscreen styling is handled inline in the JSX
                  to dynamically apply based on the fullscreenItemId state.
                  The commented out CSS below is an alternative approach
                  if you preferred using standard CSS pseudo-classes.
          */
          /*
          :-webkit-full-screen .video-container {
              width: 100vw !important;
              height: 100vh !important;
              background-color: #141414 !important;
              border-radius: 0 !important;
          }
          :-moz-full-screen .video-container {
              width: 100vw !important;
              height: 100vh !important;
              background-color: #141414 !important;
              border-radius: 0 !important;
          }
          :fullscreen .video-container {
              width: 100vw !important;
              height: 100vh !important;
              background-color: #141414 !important;
              border-radius: 0 !important;
          }
          :-ms-fullscreen .video-container {
              width: 100vw !important;
              height: 100vh !important;
              background-color: #141414 !important;
              border-radius: 0 !important;
          }

          :-webkit-full-screen video {
              object-fit: contain !important;
          }
          :-moz-full-screen video {
              object-fit: contain !important;
          }
          :fullscreen video {
              object-fit: contain !important;
          }
          :-ms-fullscreen video {
              object-fit: contain !important;
          }
          */
        `}</style>
      </div>
      {showOpenCart ? 
        <div style={{display:"block",position:"fixed", top:"0px",zIndex:"9999", right:"0", height:"100vh", width:"100%", background:"rgba(20,20,20,0.5)"}}>
          <div style={{display:"block",position:"fixed", top:"58.5px",zIndex:"99999", right:"0", height:"100vh", width:"340px", background:"rgba(20,20,20,1)"}}>
            <div style={{margin:"15px", borderBottom:"1px solid #454545"}}>
              <button style={{ paddingBottom:"15px",background:"transparent", width:"100%", border:"none",  display:"flex", justifyContent:"flex-end"}} onClick={() => {setOpenCart(false)}}>
                <img
                  src={"/closeicon.png"}
                  alt={`cdiorbeauty`}
                  style={{ width: 'auto', height: 'auto', borderRadius: '0px' }}
                />
              </button>
            </div>
            <div style={{padding:"0 15px",}}>
              <div style={{display: 'flex',alignItems:"center",justifyContent: 'space-between', marginTop:"25px"}}>                                  
                              <div style={{display: 'flex',alignItems:"center",justifyContent: 'flex-start',}}>    
                                      <img
                                          src={'/gucci.png'}
                                          alt={`Brand`}
                                          style={{width: "auto",cursor:"pointer",height: "auto",borderRadius: "0px",objectFit: "cover",marginRight:"15px",}}
                                        />
                                      <span style={{display: 'flex',alignItems:"center",justifyContent: 'flex-start', fontWeight:"bold", fontSize:"20px", color:"#fff"}}>Dior</span>
                                      </div>
                                      <div onClick={() => handleRedirection()} style={{display: 'flex',alignItems:"center",justifyContent: 'flex-end',cursor:"pointer"}}>    
                                        <img
                                          src={"/back.png"}
                                          alt={`cdiorbeauty`}
                                          style={{ width: 'auto', height: 'auto', borderRadius: '0px' }}
                                        />
                                      </div>
                                    </div>
                                    <div style={{display: 'block', marginTop:"15px"}}>
                                      <p style={{display: 'block', fontSize:"18px", marginTop:"10px", color:"#d2d2d2",width:"330px", whiteSpace: "nowrap",overflow: "hidden", textOverflow: "ellipsis"}}>Dior Prestige La Micro-Huile de Rose Activated Serum</p>
                                    </div>
                                    <div style={{display: 'flex', color:"#fff",alignItems:"center",justifyContent: 'flex-start', marginTop:"15px"}}>
                                      <p style={{display: 'flex', alignItems:"center",justifyContent: 'flex-start', marginRight:"20px",fontSize:"px"}}>$100.00</p>
                                      <img
                                          src={'/star.png'}
                                          alt={`Brand`}
                                          style={{width: "auto",height: "auto",borderRadius: "0px",objectFit: "cover",marginRight:"6px",marginTop:"3px"}}
                                        />
                                        <p style={{fontSize:"13px", marginTop:"3px"}}>( 32 review )</p>
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
                                            <div className="dropdown" style={{ position: 'relative', display: 'block' }}>
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
                                        <div style={{ display:"flex",alignItems:"center", justifyContent:"center",textAlign: 'center', }} >
                                        <button style={{ marginTop:"30px", display:"flex",alignItems:"center", justifyContent:"center",marginLeft:"auto",marginRigth:"auto",textAlign: 'center', background:'#96105E', color:'#fff', height:'50px', width:'100%', borderRadius:'30px', border:'1px solid #96105E', fontSize:'16px' }} type='button'>Add to Cart</button>
                                        </div>
                                        
            </div>
          </div>
        </div>
      :""}
      </>
      }
    </>
  );
}

export default FeedItems;