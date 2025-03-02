// src/Navbar.js

import React, { useContext, useState } from 'react';
import '../Styles/main.css'; 
import { NavLink } from 'react-router-dom';
import { AppContext } from '../Final-phase/AppContext';
import logo from "..//assets/travelog-high-resolution-logo-transparent.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {loginStatus,setLoginStatus}=useContext(AppContext);
  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);
 const handleloginStatus=()=>{
  setLoginStatus(false);
 }
  return (
    <nav className="navbar1">
      <div className="navbar-container">
        <div className="logo">
        <img src={logo} alt="" className="logo" style={{ width: "200px" }} />
        </div>
        <button className="navbar-toggle" onClick={toggleNavbar}>
          {isOpen ? '✖' : '☰'}
        </button>
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          
          <ul>
       <NavLink to="/home">     <li><a href="#home" onClick={closeNavbar}>Home</a></li></NavLink>
       <NavLink to="/hotel">  <li><a href="#review" onClick={closeNavbar}>Hotel</a></li></NavLink>
            <li><a href="#services" onClick={closeNavbar}>Services</a></li>
            <NavLink to="/">       <li><a  onClick={closeNavbar}>Logout</a></li></NavLink>
          </ul>
          <div className="auth-buttons">
          {!loginStatus && (
  <>
  
  </>
)}
          {loginStatus && (
  <>
    <NavLink to="/">  
      <button className="login-btn"  onClick={handleloginStatus}>LogOut</button>
    </NavLink>
  
  </>
)}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
