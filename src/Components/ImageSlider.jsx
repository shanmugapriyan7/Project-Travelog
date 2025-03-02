import React from 'react';
import Slider from 'react-slick';
import '../Styles/ImageSlider.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Import images
import travel1 from './images/img1.jpeg';
import travel2 from './images/img2.jpeg';
import travel3 from './images/img3.jpeg';
import travel4 from './images/img4.jpeg';
import travel5 from './images/img5.jpeg';
import travel6 from './images/img6.jpeg';
import travel7 from './images/img7.jpeg';

const images = [
  { src: travel1, caption: 'Beautiful scenery of travel destination 1' },
  { src: travel2, caption: 'Stunning view of travel destination 2' },
  { src: travel3, caption: 'Amazing landscape of travel destination 3' },
  { src: travel4, caption: 'Captivating sight of travel destination 4' },
  { src: travel5, caption: 'Gorgeous scene of travel destination 5' },
  { src: travel6, caption: 'Gorgeous scene of travel destination 5' },
  { src: travel7, caption: 'Gorgeous scene of travel destination 5' },
];

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
  <div className="sliderbody">
    <h1 className='slider-heading'> Your Travel Inspiration Starts Here!✈️</h1>
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.src} alt={`Travel ${index + 1}`}  className='slick-image28'/>
            <p>{image.caption}</p>
          </div>
        ))}
      </Slider>
    </div>
    </div>
  );
};

export default ImageSlider;
