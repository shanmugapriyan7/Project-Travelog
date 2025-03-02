import React, { createContext, useState, useEffect } from "react";
import axios from "axios"; // Make sure to import axios

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [compactView, setCompactView] = useState(false);
  const [place, setPlace] = useState("");
  const [startdate, setStartdate] = useState();
  const [enddate, setEnddate] = useState();
  const [queryLocation, setQueryLocation] = useState("japan");
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchPlaceData = async () => {
      try {
        const response = await axios.get('http://localhost:3006/api/placedata/place');
        const { placeName, startDate, endDate } = response.data;
        
        // Set values to state
        setPlace(placeName);
        setStartdate(new Date(startDate));
        setEnddate(new Date(endDate));
      } catch (error) {
        console.error("Error fetching place data:", error);
      }
    };

    fetchPlaceData();
  }, []); // Empty dependency array to run this effect only once when the component mounts

  return (
    <AppContext.Provider
      value={{
        compactView,
        setCompactView,
        setPlace,
        place,
        startdate,
        enddate,
        setEnddate,
        setStartdate,
        queryLocation,
        setQueryLocation,
        loginStatus,
        setLoginStatus,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
