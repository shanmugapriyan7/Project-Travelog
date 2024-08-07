import React, { useState, useRef, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../Mid-phase/Selector.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { AppContext } from "../Final-phase/AppContext";

const CalendarComponent = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarView, setCalendarView] = useState("start");
  const [inviteEmail, setInviteEmail] = useState("");
  const [showInviteBox, setShowInviteBox] = useState(false);

  const calendarRef = useRef(null);
  const dateInputRef = useRef(null);
  const { place, setPlace } = useContext(AppContext);
  const { startdate, setStartdate } = useContext(AppContext);
  const { enddate, setEnddate } = useContext(AppContext);

  const navigate = useNavigate();

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
      setStartdate(start); // Store start date in context
      setCalendarView("end");
    } else {
      setDateRange([dateRange[0], end]);
      setEnddate(end); // Store end date in context
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

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    // Perform any necessary validation or state updates here
    navigate("/Planner"); // Navigate to the Planner route
  };

  return (
    <>
      <Navbar />
      <div className="selector-body">
        <div className="container1">
          <h2>Plan a New Trip</h2>
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
              <label
                htmlFor="invite"
                onClick={() => setShowInviteBox(!showInviteBox)}
              >
                <h5>+ Invite Tripmates</h5>
              </label>
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
                  Start Planning
                </button>
              </center>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CalendarComponent;
