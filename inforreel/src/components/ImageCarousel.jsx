// src/components/ImageCarousel.jsx
import React, { useRef } from 'react';

const ImageCarousel = ({ images }) => {
  const containerRef = useRef(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= containerRef.current.offsetWidth;
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += containerRef.current.offsetWidth;
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory', // Optional: for a snapping effect
          WebkitOverflowScrolling: 'touch', // For smoother scrolling on iOS
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Item ${index + 1}`}
            style={{
              width: 'auto', // Adjust as needed
              height: '200px', // Adjust as needed
              marginRight: '10px',
              scrollSnapAlign: 'start', // Optional: for snapping
            }}
          />
        ))}
      </div>
      <button
        onClick={scrollLeft}
        style={{
          position: 'absolute',
          left: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          padding: '10px',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        &lt;
      </button>
      <button
        onClick={scrollRight}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          padding: '10px',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        &gt;
      </button>
    </div>
  );
};

export default ImageCarousel;