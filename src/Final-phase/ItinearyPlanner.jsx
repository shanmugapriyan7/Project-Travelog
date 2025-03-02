import React, { useContext, useState } from "react";
import axios from "axios";
import "./ItineraryPlanner.css";
import { AppContext } from "./AppContext";

const ItineraryPlanner = () => {
  const { startdate, setStartdate } = useContext(AppContext);
  const { enddate, setEnddate } = useContext(AppContext);
  const startDate = startdate;
  const endDate = enddate;
  const { compactView } = useContext(AppContext);
  const formatDate2 = (date) => {
    const options = { month: "numeric", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const formatDate = (date) => {
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const dayOfMonth = date.getDate();
    const dayOfMonthWithSuffix = dayOfMonth + getDaySuffix(dayOfMonth);
    return `${day}, ${month} ${dayOfMonthWithSuffix}`;
  };

  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const getDateRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dateArray = [];

    while (startDate <= endDate) {
      dateArray.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }

    return dateArray;
  };

  const dateRange = getDateRange(startDate, endDate);
  const [subheadings, setSubheadings] = useState(
    Array(dateRange.length).fill("Add Subheading")
  );
  const [locations, setLocations] = useState(Array(dateRange.length).fill([]));
  const [images, setImages] = useState({});
  const [visibleDates, setVisibleDates] = useState(
    Array(dateRange.length).fill(false)
  );

  const API_KEY = "ntfx0m9Bo8eZIomHdsn3NViEaf1vFYtOlcgGPjgr69cCeNak0qFMTARU";

  const handleSubheadingBlur = (index, event) => {
    const newSubheadings = [...subheadings];
    newSubheadings[index] = event.target.innerText;
    setSubheadings(newSubheadings);
  };

  const fetchImage = async (query, dateIndex, locationIndex) => {
    try {
      const response = await axios.get(`https://api.pexels.com/v1/search`, {
        params: { query: query, per_page: 1 },
        headers: { Authorization: API_KEY },
      });
      if (response.data.photos.length > 0) {
        const newImages = { ...images };
        newImages[`${dateIndex}-${locationIndex}`] =
          response.data.photos[0].src.landscape;
        setImages(newImages);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleLocationChange = (index, event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newLocations = [...locations];
      const query = event.target.value;
      fetchImage(query, index, newLocations[index].length);
      newLocations[index] = [...newLocations[index], query];
      setLocations(newLocations);
      event.target.value = "";
    }
  };

  const removeLocation = (dateIndex, locationIndex) => {
    const newLocations = [...locations];
    newLocations[dateIndex].splice(locationIndex, 1);
    const newImages = { ...images };
    delete newImages[`${dateIndex}-${locationIndex}`];
    setLocations(newLocations);
    setImages(newImages);
  };

  const handleDateClick = (index) => {
    const newVisibleDates = [...visibleDates];
    newVisibleDates[index] = !newVisibleDates[index];
    setVisibleDates(newVisibleDates);
  };

  return (
    <div className="itinerary-planner">
      <div className="itinerary-heading">
        <span className="itinerary-heading1">Itinerary</span>
        <div className="date-range-label">
          <i className="bx bxs-calendar"></i>{" "}
          {`${formatDate2(startDate)} - ${formatDate2(endDate)}`}
        </div>
      </div>
      <div className="itinerary-content">
        {dateRange.map((date, index) => (
          <div key={index} className="date-item">
            <div
              className="date-details"
              id={`date-heading-${index}`}
              onClick={() => handleDateClick(index)}
            >
              <div className="date-format-header">{formatDate(date)}</div>
            </div>
            {visibleDates[index] && (
              <>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(event) => handleSubheadingBlur(index, event)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.target.blur();
                    }
                  }}
                  className="subheading"
                >
                  {subheadings[index]}
                </span>

                {!compactView && (
                  <div className="locations-list">
                    {locations[index].map((location, locIndex) => (
                      <div key={locIndex} className="location-item">
                        <div className="location-content">
                          <div className="location-info">
                            <div className="location-name">
                              <span className="location-index">
                                {locIndex + 1}. {location}
                              </span>
                            </div>
                            <div className="location-details">
                              <p>Details about {location}...</p>
                            </div>
                          </div>
                          {images[`${index}-${locIndex}`] && (
                            <div className="place-image-container">
                              <img
                                src={images[`${index}-${locIndex}`]}
                                alt="Place"
                                className="place-image"
                              />
                            </div>
                          )}
                        </div>
                        <div className="remove-location-button">
                          <button
                            onClick={() => removeLocation(index, locIndex)}
                            className="remove-button"
                          >
                            <i className="bx bx-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {compactView && (
                  <div className="locations-list">
                    {locations[index].map((location, locIndex) => (
                      <div key={locIndex} className="location-item">
                        <div className="location-content">
                          <div className="location-info">
                            <div className="location-name">
                              <span className="location-index">
                                {locIndex + 1}. {location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="remove-location-button">
                          <button
                            onClick={() => removeLocation(index, locIndex)}
                            className="remove-button"
                          >
                            <i className="bx bx-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <input
                  type="text"
                  onKeyDown={(e) => handleLocationChange(index, e)}
                  className="location-input"
                  placeholder="Add a location"
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryPlanner;
