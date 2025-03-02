import React, { useRef, useState } from "react";
import "./Feedback.css";

const FeedbackSlider = () => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const maxIndex = sliderRef.current.children.length - 1;
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
      sliderRef.current.style.transform = `translateX(-${
        (currentIndex + 1) * 270
      }px)`;
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      sliderRef.current.style.transform = `translateX(-${
        (currentIndex - 1) * 270
      }px)`;
    }
  };

  return (
    <div className="feedback-main">
      <button className="feedback-arrow feedback-left-arrow" onClick={handlePrev}>
        &#9664;
      </button>

      <div className="feedback-slider-container">
        <div className="feedback-slider" ref={sliderRef}>
          {/* Empty Cards - populate with API data later */}
          <div className="feedback-card"></div>
          <div className="feedback-card"></div>
          <div className="feedback-card"></div>
          <div className="feedback-card"></div>
        </div>
      </div>

      <button className="feedback-arrow feedback-right-arrow" onClick={handleNext}>
        &#9654;
      </button>
    </div>
  );
};

export default FeedbackSlider;
