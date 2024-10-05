import React, { useContext } from 'react';
import './HotelMain.css';
// Import the context
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AppContext } from '../../Final-phase/AppContext';

const HotelMain = () => {
  const { queryLocation, setQueryLocation } = useContext(AppContext); // Access context values
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLocationChange = (e) => {
    setQueryLocation(e.target.value); // Update queryLocation on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (queryLocation) {
      navigate('/CheckHotels'); // Navigate to /CheckHotels if queryLocation is provided
    }
  };

  return (
    <div className="hotel-main-container">
      <div className="hotel-main-content">
        <h1>Search for hotel and Airbnb stays in one place</h1><br></br>
        <h3>Experience a better hotel search that helps you find the perfect lodging,<br></br> with your preferences as the highest priority.</h3>
        <br></br><br></br>
        <form className="hotel-main-form" onSubmit={handleSubmit}>
          <div className="text-input">
            <input 
              type="text" 
              placeholder="Search destinations" 
              value={queryLocation} // Set value to queryLocation
              onChange={handleLocationChange} // Handle change to update queryLocation
              required // Make input required
            />
            <input className='Ho-In' type="date" placeholder='Check IN' />
            <input className='Ho-In' type="date" placeholder='Check Out' />
          </div>
          <div className="num-input">
            <input className='Ho-In' type="number" min="0" placeholder="Rooms" />
            <input className='Ho-In' type="number" min="0" placeholder="Guests" />
            <button className='Hotel-Button' type="submit">Search</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HotelMain;
