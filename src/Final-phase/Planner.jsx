import React, { useState, useEffect, useCallback, useContext } from "react";
import "../Final-phase/Planner.css"; // Ensure this CSS is updated
import "boxicons/css/boxicons.min.css";
import logo from "..//assets/travelog-high-resolution-logo-transparent.png";
import Budget from "./Budget";
import ItineraryPlanner from "./ItinearyPlanner";
import { NavLink } from "react-router-dom";
import MapComponent from "./MapComponent";
import { AppContext } from "./AppContext";
// Component to change the view of the map

const Planner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  const [yourPhoto, setYourPhoto] = useState(false);
  const [selectMenu, setSelectMenu] = useState(false);
  const {compactView,setCompactView}=useContext(AppContext);
  const {place,setPlace}=useContext(AppContext);
    
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [defaultImageUrl, setDefaultImageUrl] = useState("");
  const [defaultImageUrl1, setDefaultImageUrl1] = useState("");
  const [defaultImageUrl2, setDefaultImageUrl2] = useState("");
  const [defaultImageUrl3, setDefaultImageUrl3] = useState("");
  const [selectAddExpense, setSelectAddExpense] = useState(false);
  
  const [selectEditButton, setSelectEditButton] = useState(false);
  const query = place;

  const [budgetAmount, setBudgetAmount] = useState(0);



  const { startdate, setStartdate } = useContext(AppContext);
  const { enddate, setEnddate } = useContext(AppContext);
  const startDate = startdate;
  const endDate = enddate;

  /* ----------------*/
  const handleCompactView = () => {
    setCompactView(true);
  };
  const handleCompactView1 = () => {
    setCompactView(false);
  };

  /* ----------- date ========*/
 
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

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "numeric",
      day: "numeric",
    });
  };
  const formatDate2 = (date) => {
    const options = { month: "numeric", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const dateRange = getDateRange(startDate, endDate);
  /* ----------- date ========*/

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${query}&per_page=25`,
          {
            headers: {
              Authorization:
                "ntfx0m9Bo8eZIomHdsn3NViEaf1vFYtOlcgGPjgr69cCeNak0qFMTARU",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setImages(data.photos);

        if (data.photos.length > 0) {
          setDefaultImageUrl(data.photos[0].src.landscape);
          setDefaultImageUrl1(data.photos[1].src.landscape);
          setDefaultImageUrl2(data.photos[4].src.landscape);
          setDefaultImageUrl3(data.photos[3].src.landscape);
        }
      } catch (error) {
        setError("Failed to fetch images. Please try again later.");
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query]);

  const handleImageClick = (id, url) => {
    setSelectedImageId(id);
    setSelectedImageUrl(url);
  };

  const [heading, setHeading] = useState(`Trip To ${query}...`);
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (event) => {
    setHeading(event.target.innerText);
    setIsEditing(false);
  };

  

  return (
    <>
      <div className={`nav-bar ${isOpen2 ? "hidden" : ""}`}>
        <div className="navbox1" style={{ paddingLeft: "50px" }}>
          <img src={logo} alt="" className="logo" style={{ width: "200px" }} />
        </div>
        <div className="navbox2" style={{}}>
          <div className="navbutton">
            <NavLink to="/">
              {" "}
              <button className="nav-home">
                <i class="bx bx-home"></i>
              </button>
            </NavLink>
          </div>
          <div className="navbutton1">
            <NavLink to="/Selector">
              {" "}
              <button className="nav-home">
                <i class="bx bx-edit"></i>
              </button>
            </NavLink>
          </div>
        </div>
        <div className="navbox3" style={{}}>
       <abbr title="Image view">  <div className="navbutton">
            <button className="nav-home" onClick={handleCompactView1}>
              <i class="bx bx-images" ></i>
            </button>
          </div></abbr> 
          <div className="navbutton1">
         <abbr title="compact view"> <button className="nav-home" onClick={handleCompactView}>
              <i class="bx bx-menu" ></i>
            </button></abbr>
          </div> 
        </div>
        <div className="navbox4" style={{}}>
          <button className="nav-download">
            <i class="bx bxs-download"></i>
          </button>
        </div>
      </div>


      {selectMenu && (
        <div className="select-main-container">
          <div className="select-container">
            <div className="photo-head">
              <span>Choose Photo</span>
              <button onClick={() => setSelectMenu(false)}>&times;</button>
            </div>
            <div className="select-buttons">
              <button
                onClick={() => setYourPhoto(true)}
                className={`your-button ${yourPhoto ? "yp" : ""}`}
                style={{ borderRadius: "10px" }}
              >
                Your Photo
              </button>
              <button
                onClick={() => setYourPhoto(false)}
                className={`your-button ${yourPhoto ? "" : "yp"}`}
                style={{ borderRadius: "10px" }}
              >
                Select Photo.
              </button>
            </div>

            {yourPhoto ? (
              <div className="your-photo"></div>
            ) : (
              <div className="select-photo">
                <div className="image-gallery">
                  {images.length === 0 ? (
                    <p>No images found.</p>
                  ) : (
                    images.map((image) => (
                      <div
                        className="image-container"
                        key={image.id}
                        style={{
                          backgroundImage: `url(${image.src.landscape})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          marginBottom: "10px",
                          borderRadius: "10px",
                          position: "relative",
                          overflowY:'auto',
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleImageClick(image.id, image.src.landscape)
                        }
                      >
                        {selectedImageId === image.id && (
                          <button
                            style={{
                              padding: "5px 10px",
                              cursor: "pointer",
                              borderRadius: "5px",
                              border: "none",
                              position: "absolute",
                              bottom: "10px",
                              right: "10px",
                              backgroundColor: "#007bff",
                              color: "#fff",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImageUrl(image.src.landscape);
                            }}
                          >
                            Selected
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="app-container">
        <div
          className={`menu-btn ${isOpen ? "hidden" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
    <i class='bx bxs-right-arrow-alt' ></i>
        </div>
        
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={() => setIsOpen(false)} style={{color:'black'}}>
            &times;
          </button>

          <div
            className="sidebar-content"
            style={{ padding: "10px", width: "200px" }}
          >
            <div
              style={{
                padding: "15px",
                marginBottom: "10px",
                color: "white",
                width: "210px",
                position: "fixed",
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "20px",
                marginLeft: "-10px",
                boxShadow: "grey 5px 2px 5px",
                textAlign: "center",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => setSelectMenu(!selectMenu)}
              className="edit-background-button"
            >
              Edit Background <i className="bx bxs-edit-alt"></i>
            </div>
            <div
              style={{
                padding: "10px",
                marginBottom: "10px",
                marginTop: "50px",
              }}
            >
              <h1>Itinerary</h1>
              <div
                style={{
                  marginTop: "10px",
                  color: "white",
                  overflowY: "auto",
                
                }}
                className="Itineary-scroll"
              >
                {dateRange.length > 0 && (
                  <div style={{ marginLeft: "35px", cursor: "pointer" }}>
                    {dateRange.map((date, index) => (
                      <div
                        key={index}
                        id={`date-${index}`}
                        style={{ padding: "10px", color: "grey" }}
                      >
                        {" "}
                        <a
                          key={index}
                          href={`#date-heading-${index}`} // Corrected href to match the id
                          style={{ color: "grey", textDecoration: "none" }} // Use <a> for clickable links
                        >
                          {formatDate(date)}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div
              style={{
                padding: "10px",
                color: "white",
                width: "100%",
                borderRadius: "20px",
                height: "50px",
                marginLeft: "-30px",
                textAlign: "center",
                fontSize: "25px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              className="expense-sidebar-button"
              href="#expense"
            >
              Expenses
            </div>
          </div>
        </div>

        
    
        <div className="full-body">
          <div className="content-section" style={{}}>
            <div className="headimage-container">
              <div
                className="headimage"
                style={{
                  backgroundImage: `url(${
                    selectedImageUrl || defaultImageUrl
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                }}
              ></div>
              <div className="headcontent">
                {isEditing ? (
                  <h1
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={handleBlur}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.target.blur();
                      }
                    }}
                  >
                    {heading}
                  </h1>
                ) : (
                  <h1 onClick={handleClick}>{heading}</h1>
                )}

                <div className="headcontent-date" style={{}}>
                  <div className="hc-image">
                    <div
                      className="hc-imagebox"
                      style={{ backgroundImage: `url(${defaultImageUrl1})` }}
                    ></div>
                    <div
                      className="hc-imagebox"
                      style={{ backgroundImage: `url(${defaultImageUrl2})` }}
                    ></div>
                    <div
                      className="hc-imagebox"
                      style={{ backgroundImage: `url(${defaultImageUrl3})` }}
                    ></div>
                  </div>
                  <div className="hc-date">
                    {" "}
                    <i class="bx bxs-calendar"></i> {formatDate2(startDate)} -{" "}
                    {formatDate2(endDate)}
                  </div>
                </div>
              </div>
            </div>

            <div className="itineary-budget">
<Note/>
              <ItineraryPlanner />
              <Budget id="expense" />




              <div className="planner-footer">
                Need help or have suggestions? Visit help.travelog.com<br></br>
                Or get in touch with the travelog team at support@travellog.com
              </div>
            </div>
          </div>

          <MapComponent className={`map-full ${mapView ? "hidden" : "no"}`}/>


        </div>
      </div>
    </>
  );
};

export default Planner;
