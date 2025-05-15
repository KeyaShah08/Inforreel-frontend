        // src/components/Marketplace.jsx


        // This component is structured to have a background that starts from the
        // absolute left edge of the screen, potentially overlapping fixed elements.
        // The content scrolls over this background.

        function Marketplace() {
          return (
            // This outermost div is positioned absolutely. It starts from the
            // far left edge of the screen. Its height will expand based on the
            // content inside, allowing the video background (which covers 100%
            // of this div) to scroll.
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                minHeight: '100vh', // Ensures at least viewport height initially
                // Height will automatically expand based on content due to block-level nature
                backgroundColor: '#141414' // This should provide the background
            }}>

              {/* Scrollable Video Background Layer */}
              {/* Position absolute makes it layered behind content within THIS absolute container.
                  Its width/height 100% make it cover the full dimensions of THIS container.
                  Since THIS container's height grows with the content, the video stretches vertically and scrolls with it.
                  Its Z-index is low so content appears on top.
              */}
              <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%", // Stretches to the height of the outermost div
                  overflow: "hidden",
                  zIndex: 0,
                  backgroundColor: '#000', // Fallback
              }}>
                <video autoPlay muted loop playsInline style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover" // Ensure video covers the area without distortion
                }}>
                  <source src="/hero-bg.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                 {/* Gradients (Optional) - these will scroll with the video layer */}
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

              {/* Main Marketplace Content Layer */}
              {/* This div holds your actual marketplace UI elements.
                  Positioned relative to the outermost absolute div.
                  Its content determines the scrollable height.
              */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 5,
                color: 'white',
                padding: '20px',
                textAlign: 'center',
                boxSizing: 'border-box',
                // Add padding-top here if needed to clear a fixed header
              }}>
                 {/* YOUR MARKETPLACE CONTENT GOES HERE */}
                 {/* This content will scroll over the video background */}

                 {/* Temporary placeholder content to demonstrate scrolling */}
                 <div style={{ height: '3000px', marginTop: '50px' }}>
                     {/* Content goes here */}
                 </div>    
                 {/* End of Temporary placeholder content */}
              </div>

            </div>
          );
        }

        export default Marketplace;