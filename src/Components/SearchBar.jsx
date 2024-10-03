import React, { useContext } from "react";
import "../Styles/SearchBar.css";
import { LuSearch } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { AppContext } from "../Final-phase/AppContext";
const SearchBar = () => {
  const { place, setPlace } = useContext(AppContext);
  return (
    <div className="search-box">
      <input
        className="search-text"
        type="text"
        placeholder="Search Anything"
        onChange={(e) => setPlace(e.target.value)}
      />
     <NavLink to="/Selector"> <a href="#" className="search-btn">
        <i className="fas fa-search"><LuSearch /></i>
      </a></NavLink>
    </div>
  );
};

export default SearchBar;