import { useEffect, useRef, useState } from 'react';

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
  // NEW STATE: To control the visibility of the three-dots pop-out menu
  const [showThreeDotsMenu, setShowThreeDotsMenu] = useState(null);


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
      // Close the three-dots menu after saving/unsaving
      setShowThreeDotsMenu(null);
  };

  // Placeholder functions for other icon clicks
  const handleAddToCartClick = (id) => {
    setOpenCart(true);
    console.log(`Add to cart clicked for item ${id}`);
  };

  const handleCommentClick = (id) => {
  setOpenCart(true);
  console.log(`Comment clicked for item ${id}`);
};

  const handleShareClick = (id) => {
    console.log(`Share clicked for item ${id}`);
  };
  const toggleDropdown = () => {
    setIsOpenDrp(!isOpenDrp);
  };

  // NEW FUNCTION: To toggle the three-dots menu visibility
  const toggleThreeDotsMenu = (id) => {
    setShowThreeDotsMenu(showThreeDotsMenu === id ? null : id);
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
    const videoContainer = videoRefs.current[id]?.closest('.media-aspect-ratio-container'); // Get the aspect ratio container

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
      { threshold: 0.5 }
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
    {/* Global Styles for responsiveness */}
<style>{`
  .feed-item-container {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin-bottom: 70px;
    width: 100%;
    max-width: 420px;
    position: relative;
  }

  .media-aspect-ratio-container {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    background-color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    transition: all 0.3s ease;
  }

  /* Feed wrapper centered within remaining 80% of screen (after 20% sidebar) */
  .feed-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin-left: 20%;
    padding-top: 50px;
    max-width: 1440px;
    
  }

  @media screen and (min-width: 1440px) {
    .media-aspect-ratio-container {
      width: 340px;
      height: 605.7px;
    }
  }

  @media screen and (min-width: 1280px) and (max-width: 1439px) {
    .media-aspect-ratio-container {
      width: 310px;
      height: 551.1px;
    }
  }

  @media screen and (min-width: 1024px) and (max-width: 1279px) {
    .media-aspect-ratio-container {
      width: 270px;
      height: 480px;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    .media-aspect-ratio-container {
      width: 210px;
      height: 373.3px;
    }
  }

  @media screen and (max-width: 767px) {
    .feed-item-container {
      flex-direction: column;
      align-items: center;
      margin-bottom: 40px;
    }

    .feed-wrapper {
      width: 100%;
      margin-left: 0;
      padding-top: 50px;
    }

    .media-aspect-ratio-container {
      width: 80vw;
      height: auto;
      aspect-ratio: 9 / 16;
    }
  }
`}</style>
    {isRedirectioin ? (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            color: 'white',
            fontSize: '24px'
        }}>
            BeautyProducts Component Placeholder
        </div>
    ) : (
      <>
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '1440px', /* Set max width for the entire feed column for the Figma design */
          width: '100%',
          marginTop:"50px"
        }}>
          {mediaItems.map(item => (
            // Main container for each item - Position relative for text overlay
            <div key={item.id} className='feed-item-container'
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
              {/* This div uses padding-top for the 9:16 aspect ratio */}
              <div className='media-aspect-ratio-container' style={{
                position: 'relative',
                width: '320px', // Fixed width for video
                height: '569px', // Fixed height for video
                paddingTop: '0', // No padding-top needed when height is fixed
                overflow: 'hidden',
                borderRadius: fullscreenItemId === item.id ? '0' : '10px',
                backgroundColor: fullscreenItemId === item.id ? '#141414' : '#333',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0, // Prevent shrinking
                transition: 'all 0.3s ease',
              }}>
                {/* Inner div to hold the actual media and controls, positioned absolutely */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
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
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/501x890/333/white?text=Image+Error'; }}
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
                          pointerEvents: 'auto',
                          width: '100%', // Video should fill container
                          height: '100%', // Video should fill container
                        }}
                        controls={false}
                        controlsList="nodownload nofullscreen noremoteplayback"
                        onContextMenu={e => e.preventDefault()}
                        onTouchStart={e => e.preventDefault()}
                        muted={item.muted}
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/501x890/333/white?text=Video+Error'; }}
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
                      {/* Gradient Overlay Behind Buttons but Above Video */}
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '180px',
                        background: 'linear-gradient(to top, rgba(8, 9, 13, 0.7) 0%, rgba(8, 9, 13, 0.4) 40%, rgba(8, 9, 13, 0.1) 75%, transparent 100%)',
                        zIndex: 2,
                        pointerEvents: 'none',
                      }}></div>


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
                      }}>
                        {/* Play/Pause Button */}
                        <div
                          style={{
                            backgroundColor: customControlBackgroundColor,
                            zIndex: 999999,
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
                          {item.playing ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M14 19V5h4v14zm-8 0V5h4v14z"/></svg>
                          ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                          )}
                        </div>

                        {/* Spacer (to push fullscreen button to the right) */}
                        <div style={{ flexGrow: 1 }}></div>

                        {/* Fullscreen Button */}
                        <div
                          style={{
                            backgroundColor: customControlBackgroundColor,
                            zIndex: 999999,
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7zM5 10h2V7h3V5H5zm12 7h-3v2h5v-5h-2zM14 5v2h3v3h2V5z"/></svg>
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
                        {item.muted ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .9-.2 1.75-.54 2.54l1.47 1.47A9.994 9.994 0 0 0 22 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM19 12c0 2.59-1.72 4.79-4.11 5.33L16.89 19A10 10 0 0 0 22 12c0-4.41-3.59-8-8-8v2c2.98 0 5.45 2.18 5.92 5h-2.02c-.45-1.77-2.01-3-3.9-3-2.21 0-4 1.79-4 4s1.79 4 4 4c1.89 0 3.45-1.23 3.9-3H19z"/></svg>
                        )}
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
                                          zIndex: 3,
  pointerEvents: 'none', // Ensure dot is above everything in the bar
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
              </div>

              {/* Icons Container - Hide icons container when a video is in fullscreen */}
              {fullscreenItemId !== item.id && (
                <div className='icons-container' style={{
                  display: 'flex',
                  flexDirection: 'column', // Default to column for larger screens
                  marginLeft: '20px', // Spacing between video and icons
                  alignItems: 'center',
                  flexShrink: 0, // Prevent shrinking
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
                  <button type='button' style={{padding:"0",marginBottom: "20px", background:"#666", borderRadius:"50%", width:"45px",height:"45px", border:"none"}}>
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
    style={{ marginBottom: 0, width: '40px', height: '40px', cursor: 'pointer' }}
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
                    onClick={() => handleCommentClick(item.id)}
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

                  {/* Save Icon (three dots) - Changed to handle pop-out menu */}
                  <div
                    style={{ marginBottom: '0', cursor: 'pointer', position: 'relative' }} // Added position: relative for the pop-out
                    onClick={() => toggleThreeDotsMenu(item.id)} // Toggle the menu for this item
                  >
                    <img
                          src="/dots.png"
                          alt="More options"
                          style={{
                              display: 'block',
                              width: '100%',
                              height: '100%',
                              }}
                          />
                    {/* Three Dots Pop-out Menu - Conditionally rendered */}
                    {showThreeDotsMenu === item.id && (
                      <div style={{
                        position: 'absolute',
                        bottom: 'calc(70%)', // Position above the three dots icon
                        left: '170%', // Align to the right of the three dots
                        backgroundColor: '#333', // Dark background for the menu
                        borderRadius: '8px',
                        padding: '0', // Set padding to 0, individual item padding will control spacing
                        boxShadow: '0px 4px 10px rgba(0,0,0,0.5)',
                        zIndex: 10, // Ensure it's above other elements
                        width: '273px', // Fixed width for the menu
                        height: '172px', // Fixed height for the menu
                        textAlign: 'left',
                        display: 'flex', // Use flexbox for vertical alignment
                        flexDirection: 'column', // Arrange items in a column
                        justifyContent: 'space-around', // Distribute space equally
                        overflow: 'hidden', // Added to ensure content respects the border-radius

                      }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0px 15px', // Only horizontal padding for items
                            color: 'white',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'background-color 0.2s ease',
                            flexGrow: 1, // Allow each item to grow and fill available space
                            justifyContent: 'flex-start', // Align content to the start
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#555'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#333'}
                          onClick={() => handleSaveClick(item.id)} // Call handleSaveClick
                        >
                          <img
                            src="/icons/saveoption.svg" // Use the provided save option icon
                            alt="Save"
                            style={{ width: '20px', height: '20px', marginRight: '10px' }}
                          />
                          {item.saved ? 'Unsave' : 'Save'}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0px 15px',
                            color: 'white',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'background-color 0.2s ease',
                            flexGrow: 1, // Allow each item to grow and fill available space
                            justifyContent: 'flex-start', // Align content to the start
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#555'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#333'}
                          onClick={() => { console.log(`Don't recommend this channel clicked for item ${item.id}`); setShowThreeDotsMenu(null); }}
                        >
                          <img
                            src="/icons/dontrecommend.svg" // Placeholder or actual icon for "Don't recommend"
                            alt="Don't recommend"
                            style={{ width: '20px', height: '20px', marginRight: '10px' }}
                          />
                          Don't recommend this channel
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0px 15px',
                            color: 'white',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'background-color 0.2s ease',
                            flexGrow: 1, // Allow each item to grow and fill available space
                            justifyContent: 'flex-start', // Align content to the start
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#555'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#333'}
                          onClick={() => { console.log(`Report clicked for item ${item.id}`); setShowThreeDotsMenu(null); }}
                        >
                          <img
                            src="/icons/saveoption.svg" // Placeholder or actual icon for "Report"
                            alt="Report"
                            style={{ width: '20px', height: '20px', marginRight: '10px' }}
                          />
                          Report
                        </div>
                      </div>
                    )}
                  </div>


                </div>
              )}

              {/* Text Overlay Container - Positioned absolutely within the main item container */}
              {fullscreenItemId !== item.id && (
                <div className='text-overlay-container' style={{
                  position: 'absolute',
                  bottom: item.type === 'video' ? '70px' : '70px',
                  left: '0',
                  right: '70px', // Default for larger screens to leave space for icons
                  color: 'white',
                  zIndex: 3,
  pointerEvents: 'none',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  background: 'none', // Removed gradient as requested
                  padding: "10px",
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
                      <div style={{ fontSize: '0.9rem', color: 'white' }}>{item.username}</div>
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
    )}
    </>
  );
}

export default FeedItems;