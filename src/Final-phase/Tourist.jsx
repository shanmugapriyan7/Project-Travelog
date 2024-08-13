import React, { useEffect, useState, useRef, useContext } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Tourist.css';
import { AppContext } from './AppContext';

const Tourist = () => {
  const [touristPlaces, setTouristPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [images, setImages] = useState({});
  const [showCards, setShowCards] = useState(true);
  const [expanded, setExpanded] = useState(null);
  // Default filter to Japan
  const {place,setPlace}=useContext(AppContext);
  const [selectedCountry, setSelectedCountry] = useState(place); 
  const sliderRef = useRef(null);

  const pexelsApiKey = 'ntfx0m9Bo8eZIomHdsn3NViEaf1vFYtOlcgGPjgr69cCeNak0qFMTARU'; // Replace with your Pexels API key

  useEffect(() => {
    const fetchTouristPlaces = async () => {
      try {
        const response = await fetch('http://localhost:3006/api/countries');
        const data = await response.json();

        // Set tourist places for the selected country
        const countryData = data.find(country => country.name.toLowerCase() === selectedCountry.toLowerCase());
        if (countryData) {
          setTouristPlaces(countryData.touristPlaces);
          setFilteredPlaces(countryData.touristPlaces);

          // Fetch images for each tourist place
          countryData.touristPlaces.forEach(place => {
            fetchImage(place);
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTouristPlaces();
  }, [selectedCountry]);

  const fetchImage = async (place) => {
    try {
      const response = await axios.get('https://api.pexels.com/v1/search', {
        params: { query: place, per_page: 1 },
        headers: {
          Authorization: pexelsApiKey,
        },
      });

      if (response.data.photos && response.data.photos.length > 0) {
        setImages(prevImages => ({
          ...prevImages,
          [place]: response.data.photos[0].src.medium,
        }));
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const toggleCards = () => {
    setShowCards(!showCards);
  };

  const handleCardClick = (place) => {
    setExpanded(expanded === place ? null : place);
  };

  return (
    <>
    <div className="explore-places">
      <div className="explorer-body-heading">
        <span className="toggle-button" onClick={toggleCards}>
          {showCards ? <FaChevronDown /> : <FaChevronRight />}
        </span>
        <span className='tphhh'>Tourist Places</span>
      </div>

      {showCards && (
        <div className="tourist-slider">
          <Slider ref={sliderRef} {...settings}>
            {filteredPlaces.map((place, index) => (
              <div key={index} className="card12" onClick={() => handleCardClick(place)}>
                <div className={`card-body12 ${expanded === place ? 'expanded' : ''}`}>
                  <div className="image-placeholder12">
                    {images[place] ? (
                      <img src={images[place]} alt={place} className='image-in'/>
                    ) : (
                      <p>Loading image...</p>
                    )}
                  </div>
                  <span>{place}</span>
                </div>
              </div>
            ))}
          </Slider>

          <button className="prev-button" onClick={previous}>
            <FaChevronLeft />
          </button>
          <button className="next-button" onClick={next}>
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default Tourist;
