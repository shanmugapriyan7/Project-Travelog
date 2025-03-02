import React, { useState, useRef, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../Mid-phase/Selector.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { AppContext } from "../Final-phase/AppContext";
import HomeNavBar from "./HomeNavBar";

const CalendarComponent = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarView, setCalendarView] = useState("start");
  const [inviteEmail, setInviteEmail] = useState("");
  const [showInviteBox, setShowInviteBox] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updateMessage, setUpdateMessage] = useState("");

  const calendarRef = useRef(null);
  const dateInputRef = useRef(null);
  const { place, setPlace } = useContext(AppContext);
  const { startdate, setStartdate } = useContext(AppContext);
  const { enddate, setEnddate } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    // Replace the API call with default trip details or mock data if needed
    const mockTripDetails = {
      place: "Paris",
      startdate: new Date(),
      enddate: new Date(),
    };

    setPlace(mockTripDetails.place);
    setStartdate(mockTripDetails.startdate);
    setEnddate(mockTripDetails.enddate);
    setDateRange([mockTripDetails.startdate, mockTripDetails.enddate]);
    setLoading(false);
  }, []);

  const handleClickOutside = (event) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target) &&
      dateInputRef.current &&
      !dateInputRef.current.contains(event.target)
    ) {
      setShowCalendar(false);
      setShowInviteBox(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputClick = () => {
    setShowCalendar(true);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    if (calendarView === "start") {
      setDateRange([start, dateRange[1]]);
      setStartdate(start);
      setCalendarView("end");
    } else {
      setDateRange([dateRange[0], end]);
      setEnddate(end);
      setShowCalendar(false);
      setCalendarView("start");
    }
  };

  const handleInviteChange = (event) => {
    setInviteEmail(event.target.value);
  };

  const handleSendInvite = () => {
    if (inviteEmail) {
      alert(`Invite sent to ${inviteEmail}`);
      setInviteEmail("");
    }
  };

  const formattedDateRange = () => {
    const [start, end] = dateRange;
    const startDateStr = start ? start.toDateString() : "Start Date";
    const endDateStr = end ? end.toDateString() : "End Date";
    return `${startDateStr} | ${endDateStr}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure valid date objects for start and end dates
    if (!(startdate instanceof Date) || isNaN(startdate.getTime())) {
      setUpdateMessage("Invalid start date. Please select a valid date.");
      return;
    }

    if (!(enddate instanceof Date) || isNaN(enddate.getTime())) {
      setUpdateMessage("Invalid end date. Please select a valid date.");
      return;
    }

    // Format dates to ISO strings
    const formattedStartDate = startdate.toISOString();
    const formattedEndDate = enddate.toISOString();

    try {
      const response = await fetch("http://localhost:3006/api/placedata/updateplace", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          placeName: place,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setUpdateMessage("Trip updated successfully!");
        setTimeout(() => {
          navigate("/Planner");
        }, 1000); // Redirect to /Planner after 1 second
      } else {
        setUpdateMessage(result.message || "Failed to update trip details.");
      }
    } catch (error) {
      setUpdateMessage(`An error occurred: ${error.message}`);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <HomeNavBar />
      <br></br>
      <br></br>
      <div className="selector-body">
        <div className="container1">
          <h2>Update Trip Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="destination">Where to?</label>
              <input
                type="text"
                id="destination"
                placeholder="e.g. Paris, Hawaii, Japan"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dates">Dates :</label>
              <div className="date-picker">
                <input
                  type="text"
                  id="dates"
                  ref={dateInputRef}
                  value={formattedDateRange()}
                  onClick={handleInputClick}
                  readOnly
                  required
                />
              </div>
            </div>
            {showCalendar && (
              <div className="calendar" ref={calendarRef}>
                <Calendar
                  selectRange
                  value={dateRange}
                  onChange={handleDateChange}
                  minDate={new Date()}
                />
              </div>
            )}
            <div className="form-group">
              {showInviteBox && (
                <div className="invite-box">
                  <input
                    type="email"
                    id="invite"
                    placeholder="Invite friend"
                    value={inviteEmail}
                    onChange={handleInviteChange}
                    required
                  />
                  <button
                    onClick={handleSendInvite}
                    className="send-invite-button"
                  >
                    Send Invite
                  </button>
                </div>
              )}
            </div>
            <div className="button">
              <center>
                <button className="start-planning-button" type="submit">
                  Update Trip
                </button>
              </center>
            </div>
          </form>
          {updateMessage && <p>{updateMessage}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CalendarComponent;
