import { useRef, useState } from 'react';

function Sidebar({ onNavItemClick, activeItem }) {
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showPostDetailsModal, setShowPostDetailsModal] = useState(false);
  const [showDiscardPostModal, setShowDiscardPostModal] = useState(false); // New state for discard confirmation modal
  const [selectedUploadFiles, setSelectedUploadFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [postTags, setPostTags] = useState('');

  const fileInputRef = useRef(null);

  const handleNavItemClick = (item) => {
    onNavItemClick(item);
  };

  const handleCreatePostClick = () => {
    setShowCreatePostModal(true);
    setSelectedUploadFiles([]);
    setErrorMessage('');
    setPostTitle('');
    setPostDescription('');
    setPostTags('');
    console.log('Create Post button clicked');
  };

  const processIncomingFiles = async (incomingFiles) => {
    const videoValidationPromises = [];
    const nonVideoFiles = [];

    Array.from(incomingFiles).forEach(file => {
      if (file.type.startsWith('video/')) {
        videoValidationPromises.push(
          new Promise((resolve) => {
            const video = document.createElement('video');
            video.preload = 'metadata';

            video.onloadedmetadata = () => {
              URL.revokeObjectURL(video.src);
              const aspectRatio = video.videoWidth / video.videoHeight;
              const targetRatio = 9 / 16;
              const tolerance = 0.01;

              if (Math.abs(aspectRatio - targetRatio) < tolerance) {
                resolve({ file, isValid: true });
              } else {
                console.log(`Rejected: ${file.name} - Aspect ratio ${video.videoWidth}:${video.videoHeight} (${aspectRatio.toFixed(4)}) is not 9:16`);
                resolve({ file, isValid: false, reason: 'aspectRatio' });
              }
            };

            video.onerror = () => {
              URL.revokeObjectURL(video.src);
              console.error(`Error loading metadata for ${file.name}. It might be corrupted or unsupported.`);
              resolve({ file, isValid: false, reason: 'corruptedOrUnsupported' });
            };

            video.src = URL.createObjectURL(file);
          })
        );
      } else {
        nonVideoFiles.push(file);
      }
    });

    const videoResults = await Promise.allSettled(videoValidationPromises);

    const validVideoFiles = [];
    const invalidVideoFiles = [];

    videoResults.forEach(result => {
      if (result.status === 'fulfilled' && result.value.isValid) {
        validVideoFiles.push(result.value.file);
      } else if (result.status === 'fulfilled' && !result.value.isValid) {
        invalidVideoFiles.push(result.value.file);
      }
    });

    const allInvalidFiles = [...nonVideoFiles, ...invalidVideoFiles];

    if (allInvalidFiles.length > 0) {
      setErrorMessage("Only 9:16 ratio video files can be uploaded as your post.");
      console.warn('Files rejected:', allInvalidFiles);
    } else {
      setErrorMessage('');
    }

    if (validVideoFiles.length > 0) {
      setSelectedUploadFiles(prevFiles => {
        const uniqueNewFiles = validVideoFiles.filter(newFile =>
          !prevFiles.some(existingFile =>
            existingFile.name === newFile.name && existingFile.size === newFile.size
          )
        );
        return [...prevFiles, ...uniqueNewFiles];
      });
      console.log('Processed valid 9:16 video files:', validVideoFiles);
    }
  };

  const handleSelectFilesClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (event) => {
    processIncomingFiles(event.target.files);
    event.target.value = null;
  };

  const handleRemoveFile = (fileName, fileSize) => {
    setSelectedUploadFiles(prevFiles => {
      const updatedFiles = prevFiles.filter(file => !(file.name === fileName && file.size === fileSize));
      if (updatedFiles.length === 0) {
          setErrorMessage('');
      }
      return updatedFiles;
    });
  };

  const handleContinueClick = () => {
    if (selectedUploadFiles.length > 0) {
      setShowCreatePostModal(false);
      setShowPostDetailsModal(true);
      setErrorMessage('');
    } else {
        setErrorMessage("Please select at least one video file to continue.");
    }
  };

  const handleBackToUpload = () => {
    setShowPostDetailsModal(false);
    setShowCreatePostModal(true);
  };

  const handlePostSubmit = () => {
    console.log("Post Submitted!");
    console.log("Files:", selectedUploadFiles);
    console.log("Title:", postTitle);
    console.log("Description:", postDescription);
    console.log("Tags:", postTags);

    setShowPostDetailsModal(false);
    setShowCreatePostModal(false);
    setSelectedUploadFiles([]);
    setErrorMessage('');
    setPostTitle('');
    setPostDescription('');
    setPostTags('');
  };

  // --- NEW DISCARD MODAL FUNCTIONS ---
  const handleDiscardAttempt = () => {
    setShowDiscardPostModal(true); // Show the discard confirmation modal
  };

  const handleConfirmDiscard = () => {
    setShowDiscardPostModal(false); // Hide discard modal
    setShowPostDetailsModal(false); // Hide post details modal
    setShowCreatePostModal(false); // Hide upload modal
    setSelectedUploadFiles([]); // Clear all files
    setErrorMessage(''); // Clear any errors
    setPostTitle(''); // Clear form fields
    setPostDescription('');
    setPostTags('');
  };

  const handleCancelDiscard = () => {
    setShowDiscardPostModal(false); // Just hide the discard modal, return to post details
  };
  // --- END NEW DISCARD MODAL FUNCTIONS ---

  const handleCloseModal = () => { // This function now acts as a general close for the first modal
    setShowCreatePostModal(false);
    setSelectedUploadFiles([]);
    setErrorMessage('');
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      processIncomingFiles(droppedFiles);
    }
  };

  const baseLiStyle = {
    marginBottom: '10px',
    padding: '12px 0',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const activeLiStyle = {
    backgroundColor: '#262626',
    borderRight: '4px solid #96105E',
    paddingLeft: '25px',
    paddingRight: '8px',
  };

  const inactiveLiStyle = {
    paddingLeft: '25px',
    paddingRight: '12px',
  };

  const headerHeight = '11vh';

  return (
    <>
      <div className="sidebar">
        <div style={{ height: '100%', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <nav>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li
                style={{
                  ...baseLiStyle,
                  ...(activeItem === 'Home' ? activeLiStyle : inactiveLiStyle),
                }}
                onClick={() => handleNavItemClick('Home')}
              >
                <img src="/icons/home.svg" alt="Home" className="nav-icon" />
                <span className="nav-label">Home</span>
              </li>
              <li
                style={{
                  ...baseLiStyle,
                  ...(activeItem === 'Global Showroom' ? activeLiStyle : inactiveLiStyle),
                }}
                onClick={() => handleNavItemClick('Global Showroom')}
              >
                <img src="/icons/globalShowroom.svg" alt="Showroom" className="nav-icon" />
                <span className="nav-label">Global Showroom</span>
              </li>
              <li
                style={{
                  ...baseLiStyle,
                  ...(activeItem === 'Search' ? activeLiStyle : inactiveLiStyle),
                }}
                onClick={() => handleNavItemClick('Search')}
              >
                <img src="/icons/search.svg" alt="Search" className="nav-icon" />
                <span className="nav-label">Search</span>
              </li>
              <li
                style={{
                  ...baseLiStyle,
                  ...(activeItem === 'Chats' ? activeLiStyle : inactiveLiStyle),
                }}
                onClick={() => handleNavItemClick('Chats')}
              >
                <img src="/icons/chat.svg" alt="Chats" className="nav-icon" />
                <span className="nav-label">Chats</span>
              </li>
              <li
                style={{
                  ...baseLiStyle,
                  ...(activeItem === 'Library' ? activeLiStyle : inactiveLiStyle),
                }}
                onClick={() => handleNavItemClick('Library')}
              >
                <img src="/icons/library.svg" alt="Library" className="nav-icon" />
                <span className="nav-label">Library</span>
              </li>
            </ul>
          </nav>

          {/* Create Post Button */}
          <div style={{ paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px' }}>
            <button className="create-post-btn" onClick={handleCreatePostClick}>
              Create Post
            </button>
          </div>
        </div>
      </div>

      {/* Create Post Modal (First Stage: Upload Videos) */}
      {showCreatePostModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(20, 20, 20, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000,
        }}>
          <div style={{
            backgroundColor: 'rgba(20, 20, 20, 1)',
            border: '1px solid #454545',
            borderRadius: '16px',
            width: '600px',
            height: '400px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
          }}>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              position: 'relative',
              borderBottom: '1px solid #454545',
              marginBottom: '0px',
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '18px',
                textAlign: 'left',
                flexGrow: 1,
              }}>
                Upload Videos
              </h2>
              {/* Close Button for first modal */}
              <button
                style={{
                  background: 'transparent',
                  border: 'none',
                  position: 'absolute',
                  right: '20px',
                  cursor: 'pointer',
                  padding: '0',
                  zIndex: 1,
                }}
                onClick={handleCloseModal}
              >
                <img
                  src={"/closeicon.png"}
                  alt="Close"
                  style={{ width: '24px', height: '24px', borderRadius: '0px' }}
                />
              </button>
            </div>

            {/* Upload Area - main content (Drag & Drop Zone) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexGrow: 1,
                padding: '20px',
                overflowY: 'auto',
                border: isDragging ? '2px dashed #96105E' : '2px dashed transparent',
                borderRadius: '10px',
                transition: 'border 0.2s ease-in-out',
              }}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {/* Error Message Display */}
              {errorMessage && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#ff6b6b',
                  marginBottom: '20px',
                  fontSize: '14px',
                  textAlign: 'center',
                  padding: '10px 15px',
                  backgroundColor: 'rgba(255, 107, 107, 0.1)',
                  borderRadius: '8px',
                  width: 'auto',
                  maxWidth: '80%',
                }}>
                  <img src="/icons/Alerticon.svg" alt="Error" style={{
                    width: '20px',
                    height: '20px',
                    marginRight: '10px',
                  }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {selectedUploadFiles.length === 0 && (
                <>
                  <img src="/icons/cloud-upload.png" alt="Upload" style={{ width: '60px', height: '60px', marginBottom: '20px' }} />
                  <p style={{ fontSize: '18px', color: '#d2d2d2', marginBottom: '30px' }}>Drag and drop video files to upload</p>
                </>
              )}

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                accept="video/*"
                multiple
              />

              {/* Wrapper for buttons: ensures they are side-by-side */}
              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                {/* Custom "Select files" button */}
                <label
                  htmlFor="file-upload"
                  style={{
                    backgroundColor: '#96105E',
                    color: 'white',
                    border: 'none',
                    padding: '10px 30px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                  }}
                  onClick={handleSelectFilesClick}
                >
                  Select files
                </label>

                {/* Continue button - conditionally rendered */}
                {selectedUploadFiles.length > 0 && (
                  <button
                    style={{
                      backgroundColor: '#96105E',
                      color: 'white',
                      border: 'none',
                      padding: '10px 30px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                    }}
                    onClick={handleContinueClick}
                  >
                    Continue
                  </button>
                )}
              </div>

              {/* Display selected files here */}
              {selectedUploadFiles.length > 0 && (
                <div style={{
                  marginTop: '20px',
                  width: '100%',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  boxSizing: 'border-box',
                  paddingRight: '10px',
                }}>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                  }}>
                    {selectedUploadFiles.map((file, index) => (
                      <li key={file.name + file.size + index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: '#262626',
                          padding: '8px 12px',
                          borderRadius: '5px',
                          marginBottom: '8px',
                          fontSize: '14px',
                          color: '#e0e0e0',
                          wordBreak: 'break-all',
                        }}
                      >
                        <span>{file.name}</span>
                        <button
                          onClick={() => handleRemoveFile(file.name, file.size)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ff6b6b',
                            cursor: 'pointer',
                            marginLeft: '10px',
                            fontSize: '18px',
                            lineHeight: '1',
                            padding: '0 5px',
                          }}
                        >
                          &times;
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- MODIFIED NEW MODAL: Add Post Information --- */}
      {showPostDetailsModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(20, 20, 20, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2001,
        }}>
          <div style={{
            backgroundColor: 'rgba(20, 20, 20, 1)',
            border: '1px solid #454545',
            borderRadius: '16px',
            width: '600px',
            height: 'auto',
            maxHeight: '90vh',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
          }}>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px 20px',
              borderBottom: '1px solid #454545',
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '18px',
              }}>
                Add Post Information
              </h2>
              {/* X Close Button for second modal - onClick opens Discard Post? modal */}
              <button
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0',
                }}
                onClick={handleDiscardAttempt} // New handler for opening discard confirmation
              >
                <img
                  src={"/closeicon.png"}
                  alt="Close"
                  style={{ width: '24px', height: '24px', borderRadius: '0px' }}
                />
              </button>
            </div>

            {/* Modal Content - Form and Preview */}
            <div style={{
              display: 'flex',
              padding: '20px',
              gap: '20px',
              overflowY: 'auto',
              flexGrow: 1,
            }}>
              {/* Left Section: Form Inputs */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Title Input */}
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="postTitle" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#d2d2d2' }}>
                    Title
                  </label>
                  <input
                    type="text"
                    id="postTitle"
                    maxLength={100}
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #666',
                      backgroundColor: '#333',
                      color: 'white',
                      fontSize: '15px',
                      boxSizing: 'border-box',
                    }}
                    placeholder=""
                  />
                  <div style={{ fontSize: '12px', color: '#888', textAlign: 'right', marginTop: '5px' }}>
                    {postTitle.length}/100
                  </div>
                </div>

                {/* Description Input */}
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="postDescription" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#d2d2d2' }}>
                    Description
                  </label>
                  <textarea
                    id="postDescription"
                    maxLength={500}
                    value={postDescription}
                    onChange={(e) => setPostDescription(e.target.value)}
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #666',
                      backgroundColor: '#333',
                      color: 'white',
                      fontSize: '15px',
                      resize: 'vertical',
                      boxSizing: 'border-box',
                    }}
                    placeholder="Enter description"
                  ></textarea>
                  <div style={{ fontSize: '12px', color: '#888', textAlign: 'right', marginTop: '5px' }}>
                    {postDescription.length}/500
                  </div>
                </div>

                {/* Tags Input (Dropdown like in image) */}
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="postTags" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#d2d2d2' }}>
                        Tags
                    </label>
                    <input
                        type="text"
                        id="postTags"
                        value={postTags}
                        onChange={(e) => setPostTags(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #666',
                            backgroundColor: '#333',
                            color: 'white',
                            fontSize: '15px',
                            boxSizing: 'border-box',
                            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px"><path d="M7 10l5 5 5-5z"/></svg>')`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 10px center',
                            paddingRight: '35px',
                        }}
                        placeholder="Select Tags"
                    />
                </div>
              </div>

              {/* Right Section: Video Preview */}
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#d2d2d2', width: '100%', textAlign: 'left' }}>
                  Preview
                </label>
                <div style={{
                  width: '100%',
                  aspectRatio: '9 / 16',
                  backgroundColor: '#000',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  {selectedUploadFiles.length > 0 && (
                    <>
                      <video
                        src={URL.createObjectURL(selectedUploadFiles[0])}
                        controls={false}
                        loop
                        muted
                        autoPlay
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        onLoadedMetadata={(e) => URL.revokeObjectURL(e.target.src)}
                      />
                      
                    </>
                  )}
                  {selectedUploadFiles.length === 0 && (
                      <span style={{color: '#888', fontSize: '14px'}}>No video selected for preview</span>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer - Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '15px 20px',
              borderTop: '1px solid #454545',
            }}>
              <button
                onClick={handlePostSubmit}
                style={{
                  backgroundColor: '#96105E',
                  color: 'white',
                  border: 'none',
                  padding: '12px 60px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- NEW MODAL: Discard Post Confirmation --- */}
      {showDiscardPostModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(20, 20, 20, 0.7)', // Darker overlay
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2002, // Even higher z-index to be on top of all modals
        }}>
          <div style={{
            backgroundColor: 'rgba(20, 20, 20, 1)',
            border: '1px solid #454545',
            borderRadius: '16px',
            width: '350px', // Smaller width for a confirmation modal
            height: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white',
            textAlign: 'center',
          }}>
            <h3 style={{
              margin: '10px 0',
              fontSize: '18px',
            }}>
              Discard post?
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#d2d2d2',
              marginBottom: '20px',
            }}>
              If you leave, your video won’t be saved.
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column', // Stack buttons vertically
              gap: '10px',
              width: '100%',
            }}>
              <button
                onClick={handleConfirmDiscard}
                style={{
                  background: 'transparent',
                  border: '1px solid #666',
                  color: 'red',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '15px',
                }}
              >
                Discard
              </button>
              <button
                onClick={handleCancelDiscard}
                style={{
                  background: 'transparent',
                  border: '1px solid #666',
                  color: '#d2d2d2',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '15px',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        .sidebar {
          display: flex;
          flex-direction: column;
          width: 20%;
          background-color: rgba(20, 20, 20, 0.35);
          color: white;
          padding: 0;
          padding-top: 20px;
          box-sizing: border-box;
          border-right: 1px solid rgba(51, 51, 51, 0.7);
          position: fixed;
          top: ${headerHeight};
          left: 0;
          height: calc(100vh - ${headerHeight});
          z-index: 1000;
        }

        .nav-icon {
          margin-right: 10px;
          width: 18px;
          height: 18px;
        }

        .create-post-btn {
          background-color: #96105E;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          width: 100%;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .create-post-btn {
            font-size: 14px;
            padding: 8px 15px;
          }

          .nav-icon {
            width: 16px;
            height: 16px;
          }

          .nav-label {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .nav-label {
            display: none;
          }

          .nav-icon {
            margin-right: 0;
            margin-left: 2px;
          }

          .create-post-btn {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

export default Sidebar;