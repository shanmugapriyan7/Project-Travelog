import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Tourist.css";

const Tourist = () => {
  const [touristPlaces, setTouristPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [images, setImages] = useState({});
  const [showCards, setShowCards] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const sliderRef = useRef(null);

  const pexelsApiKey =
    "ntfx0m9Bo8eZIomHdsn3NViEaf1vFYtOlcgGPjgr69cCeNak0qFMTARU"; // Replace with your Pexels API key

  const [data, setData] = useState(null); // State for storing the entire API response
  const [countryPlace, setCountryPlace] = useState(""); // State for storing the country place name

  const fetchImage = async (place) => {
    if (images[place]) return; // If image is already fetched for this place, don't fetch again.

    try {
      const response = await axios.get("https://api.pexels.com/v1/search", {
        params: { query: place, per_page: 1 },
        headers: {
          Authorization: pexelsApiKey,
        },
      });

      if (response.data.photos && response.data.photos.length > 0) {
        setImages((prevImages) => ({
          ...prevImages,
          [place]: response.data.photos[0].src.medium,
        }));
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    // Assuming you are fetching some data to populate filteredPlaces
    // Simulate setting filtered places
    setFilteredPlaces(["Tokyo", "Kyoto", "Osaka", "Hokkaido"]);

  }, []);

  useEffect(() => {
    // Fetch images for all filtered places
    filteredPlaces.forEach((place) => {
      fetchImage(place);
    });
  }, [filteredPlaces]); // Run when filteredPlaces change

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
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
          <span className="tphhh">Tourist Places</span>
        </div>

        {showCards && (
          <div className="tourist-slider">
            <Slider ref={sliderRef} {...settings}>
              {filteredPlaces.map((place, index) => (
                <div
                  key={index}
                  className="card12"
                  onClick={() => handleCardClick(place)}
                >
                  <div
                    className={`card-body12 ${
                      expanded === place ? "expanded" : ""
                    }`}
                  >
                    <div className="image-placeholder12">
                      {images[place] ? (
                        <img
                          src={images[place]}
                          alt={place}
                          className="image-in"
                        />
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
