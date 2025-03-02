import React, { useContext } from 'react';
import '../Styles/Home.css';
import { NavLink, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { MdMargin } from 'react-icons/md';
import { AppContext } from '../Final-phase/AppContext';
function Home() {
  const navigate1=useNavigate();
  const {loginStatus,setLoginStatus}=useContext(AppContext);
  const handleLogin=()=>{

    navigate1("/Selector");
  
 
  }
  return (
    <div className="main-div" id='home'>
      <div className="sub-div">
    <div className="inner-div">
      <h1>A travel planner for everyone</h1>
      <p>
        Organize flights & hotels and map your trips in a free travel app designed for vacation planning & road trips, powered by AI and Google Maps.
      </p>
      <div className="button-container">
     <button className="btn start-planning" onClick={handleLogin}>Start planning</button>
      <NavLink to="/Hotel">  <button className="btn get-app">Hotels</button></NavLink>
      </div>
      
    </div>
      <div className='iome'><h1>Lets start yor travel<br></br> with travelog</h1>
      <SearchBar/>
      </div>
      </div>
  </div>
  );
}

export default Home;
