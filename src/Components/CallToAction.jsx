import React, { useContext } from 'react';
import '../Styles/CallToAction.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../Final-phase/AppContext';

const CallToAction = () => {
  const navigate1=useNavigate();
  const {loginStatus,setLoginStatus}=useContext(AppContext);
  const handleLogin=()=>{
  if(loginStatus){
    navigate1("/Selector");
  }
  else{
    navigate1("/Sin");
  }
  }
  return (
    <div className="cta-container">
      <h1>Ready to plan your trip in half the time?</h1><br></br>
      <div className="cta-buttons">
      <button className="btn start-planning" onClick={handleLogin}>Start planning</button>
        <NavLink to="/Hotel"><button className="cta-button secondary">Hotels</button></NavLink>
      </div>
    </div>
  );
};

export default CallToAction;
