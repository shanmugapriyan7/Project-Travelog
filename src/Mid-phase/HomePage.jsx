import React, { useEffect, useState } from "react";

import SearchBar from "../Components/SearchBar";
import Home from "../Components/Home";
import Navbar from "../Components/Navbar";
import '../Index_Page/IndexPage.css';

import 'bootstrap/dist/css/bootstrap.min.css';


import logo from '../Components/images/logo2.png';
import { useNavigate } from 'react-router-dom';
import Footer from "../Components/Footer";
import HomeNavBar from "./HomeNavBar";
import ImageSlider from "../Components/ImageSlider";
import Features from "../Components/Features";
import PlanLikeAPro from "../Components/PlanLikeAPro";
import Review from "../Components/Review";
const HomePage = () => {
  const [userName, setUserName] = useState("");
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!user) {
      navigate("/signin"); // Redirect to SignIn if no user is found in session
      return;
    }

    // Set user's name
    setUserName(user.name);

    const fetchItineraries = async () => {
      try {
        const response = await fetch(`http://localhost:3006/api/ua/itinerary/${user.loginId}`);
        const data = await response.json();

        if (response.ok) {
          setItineraries(data.itineraries); // Set itineraries from the response
        } else {
          console.log(data.message); // Handle error messages
        }
      } catch (error) {
        console.error("Error fetching itineraries:", error);
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };

    fetchItineraries(); // Fetch itineraries when component mounts
  }, [navigate]);
  const navigate1=useNavigate();
  
  const handleLogin1=()=>{
    navigate1("/Selector");
  }
  return (
    <div className="home-page">
    
     <div className='indexbody'>
<Navbar/>
{/*
        <div className="indexBox">
        <div className='indexbody2'>
		<div className="indexft">
            <div className="indexft-title">Plan your perfect journey with ease. Our travel planning app helps you create personalized itineraries, from the smallest details to the biggest adventures. Start exploring with confidenc every trip is just a plan away!"
		</div>
			<div className="indexft-pa">
        




      </div>
			
          </div>
     </div>
     <div className='indexpng'>
    
     </div></div>*/ }
     <Home/>
    </div>
    
    <div className="Sample">
      <div className="samplesub1">
        <div className="sampletitle1">
          <h1>Plan Less. Explore More</h1>
        </div>
        <div className="samplebutton">
          <button className="planbutton" onClick={handleLogin1}>New Plan +</button>
        </div>
      </div>
      <div className="samplesub2">

      <div className="samplecard1">
        <div className="sampleimg"></div>
        <div className="sampleimgt">Trip to Kashmir</div>
      </div>
      <div className="samplecard2">
      <div className="sampleimg2"></div>
      <div className="sampleimgt">Trip to Japan</div>
      </div>


      </div>
    </div>

    <ImageSlider/>
	  <Features/>
	  <PlanLikeAPro/>
      <Review/>

	  <Footer/>
    </div>
  );
};

export default HomePage;
