import { useEffect, useRef, useState } from 'react';
import { FaExpand, FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import "../App.css";
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
    // Added text fields: profileName, username, caption
    { id: 1, type: 'image', src: '/sample1.jpg', liked: false, saved: false, profileName: 'Fashionista', username: '@style guru', caption: 'Loving this look! #ootd #fashion #style' },
    // Added text fields to video items as well
    { id: 2, type: 'video', src: '/samplevideo1.mp4', muted: true, liked: false, saved: false, playing: false, userPaused: false, currentTime: 0, duration: 0, profileName: 'Workout Tips', username: '@fitlife', caption: 'Try this plank variation! #fitness #workout #exercise' },
    { id: 4, type: 'image', src: '/sample3.jpg', liked: false, saved: false, profileName: 'Travel Vibes', username: '@exploreworld', caption: 'Beautiful sunset in Greece. #travel #sunset #greece' },
    // Added text fields
    { id: 5, type: 'video', src: '/samplevideo3.mp4', muted: true, liked: false, saved: false, playing: false, userPaused: false, currentTime: 0, duration: 0, profileName: 'Coding Tutorials', username: '@dev_coder', caption: 'Quick React hook explanation. #coding #react #programming' },
    { id: 6, type: 'image', src: '/sample4.jpg', liked: false, saved: false, profileName: 'Foodie Fun', username: '@eatlover', caption: 'Amazing homemade pizza! #food #pizza #cooking' },
    { id: 7, type: 'image', src: '/sample5.jpg', liked: false, saved: false, profileName: 'Art Gallery', username: '@creativemind', caption: 'Abstract expressionism piece. #art #painting #abstract' },
    // Added text fields
    { id: 8, type: 'video', src: '/samplevideo4.mp4', muted: true, liked: false, saved: false, playing: false, userPaused: false, currentTime: 0, duration: 0, profileName: 'Music Channel', username: '@beatsmaker', caption: 'New track release! Check it out. #music #producer #newrelease' },
    { id: 9, type: 'video', src: '/samplevideo5.mp4', muted: true, liked: false, saved: false, playing: false, userPaused: false, currentTime: 0, duration: 0, profileName: 'Nature Lover', username: '@greenworld', caption: 'Hiking in the mountains. Stunning views. #nature #hiking #mountains' },
    { id: 10, type: 'video', src: '/samplevideo6.mp4', muted: true, liked: false, saved: false, playing: false, userPaused: false, currentTime: 0, duration: 0, profileName: 'Tech Reviews', username: '@gadgetguru', caption: 'Unboxing the latest smartphone. #tech #review #smartphone' },
    { id: 11, type: 'video', src: '/samplevideo7.mp4', muted: true, liked: false, saved: false, playing: false, userPaused: false, currentTime: 0, duration: 0, profileName: 'DIY Projects', username: '@craftymaker', caption: 'How to build a wooden shelf. Easy tutorial. #diy #crafts #woodworking' },
    { id: 12, type: 'video', src: '/samplevideo8.mp4', muted: true, liked: false, saved: false, playing: false, userPaused: false, currentTime: 0, duration: 0, profileName: 'Gaming Highlights', username: '@gamerpro', caption: 'Epic win moment! #gaming #fortnite #victory' },
    { id: 13, type: 'image', src: '/sample6.jpg', liked: false, saved: false, profileName: 'Photography', username: '@shutterbug', caption: 'Urban exploration shot. #photography #city #exploration' },
  ]);

  const [fadingHeartVisible, setFadingHeartVisible] = useState({});
  // State to track the ID of the item currently in fullscreen
  const [fullscreenItemId, setFullscreenItemId] = useState(null);

  const videoRefs = useRef({});
  const clickTimeoutRef = useRef(null); // Ref to store the click timeout ID


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
    console.log(`Add to cart clicked for item ${id}`);
  };

  const handleCommentClick = (id) => {
    console.log(`Comment clicked for item ${id}`);
  };

  const handleShareClick = (id) => {
    console.log(`Share clicked for item ${id}`);
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


  return (
    <>
    <style>
      {`
        video::-webkit-media-controls {
          display: none !important;
          -webkit-appearance: none;
        }
        
        video::-moz-media-controls {
          display: none !important;
        }
      `}
    </style>
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
          <div key={item.id} style={{
            display: 'flex',
            alignItems: 'flex-end', // Align video/image and icons to the bottom
            marginBottom: '70px',
            width: '100%',
            position: 'relative', 
            height:"90vh",
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
              width: fullscreenItemId === item.id ? '100vw' : 'auto', // Take full viewport width in fullscreen
              height: fullscreenItemId === item.id ? '87vh' : "87vh", // Take full viewport height in fullscreen
              aspectRatio: fullscreenItemId === item.id ? 'auto' : '4 / 5', // Auto aspect ratio in fullscreen
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
                          backgroundColor: 'rgba(255, 255, 255, 0.1)', // Lighter background for better contrast
                          cursor: 'pointer',
                          zIndex: 1, // Ensure visibility above the video
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
                      src="/Heart.png"
                      alt="Heart Icon"
                      style={{ marginBottom: 0, width: smallestActionIconSize, height: smallestActionIconSize, cursor: 'pointer' }}
                      onClick={() => handleCommentClick(item.id)}
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

                {/* Save Icon - Slightly larger base size */}
                <div
                  style={{ marginBottom: '0', cursor: 'pointer' }}
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

              </div>
            )}

            {/* Text Overlay Container - Positioned absolutely within the main item container */}
            {fullscreenItemId !== item.id && ( // Hide text overlay in fullscreen
                  <div style={{
                      position: 'absolute', // Position relative to the main item container
                      // Conditional bottom position based on item type
                      bottom: item.type === 'video' ? '65px' : '10px', // Increased bottom for video posts
                      left: '10px', // Left padding
                      right: '100px', // Right padding (to the left of icons) - Adjust if icons column width differs
                      color: 'white',
                      zIndex: 3, // Increased zIndex to ensure visibility
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)', // Add shadow for readability
                  }}>
                      {/* Profile Name */}
                      <div style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '2px' }}>
                          {item.profileName}
                      </div>
                      {/* Username */}
                      <div style={{ fontSize: '0.9rem', marginBottom: '4px' }}>
                          {item.username}
                      </div>
                      {/* Caption */}
                      <div style={{ fontSize: '0.9rem', lineHeight: '1.3' }}>
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
    </>
  );
}

export default FeedItems;