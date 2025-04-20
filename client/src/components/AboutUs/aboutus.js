import { useState, useEffect } from 'react';
import './aboutus.css';

const AboutUs = () => {
  const images = [
    {
      src: 'https://i.etsystatic.com/21657904/r/il/7cf8a7/4391867555/il_570xN.4391867555_e8rt.jpg',
      alt: 'Gardening Tools',
    },
    {
      src: 'https://m.media-amazon.com/images/I/71DqzXBtAXL.jpg',
      alt: 'Power Drill',
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRklCyW8CW5XXcFtZNfnYFFnAjo9KVMsw-gFQ&s',
      alt: 'Tool Set',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Handle navigation
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="aboutus-container">
      <div className="aboutus-text-section">
        <h2 className="aboutus-title">About Our Tool Library</h2>
        <p className="aboutus-text">
          The Neighborhood Tool Library is a community-driven platform where neighbors can share and borrow tools. 
          Whether it's gardening, repairing, or DIY projects — we believe in reducing waste, saving money, and building trust through shared resources.
        </p>
      </div>
      <div className="aboutus-carousel">
        <div className="carousel" role="region" aria-label="Tool images carousel">
          <div
            className="carousel-images"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                className={index === currentIndex ? 'active' : ''}
                aria-hidden={index !== currentIndex}
              />
            ))}
          </div>
          <button
            className="carousel-btn prev"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            &#10094;
          </button>
          <button
            className="carousel-btn next"
            onClick={goToNext}
            aria-label="Next image"
          >
            &#10095;
          </button>
          <div className="carousel-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to image ${index + 1}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;