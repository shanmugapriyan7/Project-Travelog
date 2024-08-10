
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [compactView, setCompactView] = useState(false);
  const [place,setPlace]=useState("");
  const [startdate,setStartdate]=useState();
  const [enddate,setEnddate]=useState();
  return (
    <AppContext.Provider value={{ compactView,setCompactView,setPlace,place,startdate,enddate,setEnddate,setStartdate}}>
      {children}
    </AppContext.Provider>

  );
};
