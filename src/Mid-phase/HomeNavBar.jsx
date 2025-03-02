import React from 'react'
import '../Mid-phase/HomeNavBar.css';
import { useNavigate } from 'react-router-dom';
const HomeNavBar = () => {
    const navigate1=useNavigate();
  
  const handleLogin1=()=>{
    navigate1("/Selector");
  }
  const handleLogin2=()=>{
    navigate1("/home");
  }
  const handleLogin3=()=>{
    navigate1("/hotel");
  }
  const handleLogin4=()=>{
    navigate1("/");
  }
  return (
    <>
    <div className="NavBody">
        <div className="NavC1">
            <h1>TRAVELOG</h1>
        </div>
        <div className="NavC2">
         <button className="NavButton1" onClick={handleLogin2}>Home</button>
         <button className="NavButton2" onClick={handleLogin1}>Plan a trip</button>
         <button className="NavButton3" onClick={handleLogin3}>Hotel</button>

        </div>
        <div className="NavC3">
            <button className="NavLogout" onClick={handleLogin4}>Logout</button>
        </div>

    </div>
    
    </>
  )
}

export default HomeNavBar