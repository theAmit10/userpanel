import React, { useState, useEffect } from 'react';
import './ImageSlider.css'; // Ensure you create this CSS file for styling

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="ImageSlider">
      <button className="nav-button prev" onClick={handlePrev}>❮</button>
      <img src={images[currentIndex]} alt="Slider" className="slider-image" />
      <button className="nav-button next" onClick={handleNext}>❯</button>
      <div className="indicator-container">
        {images.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
