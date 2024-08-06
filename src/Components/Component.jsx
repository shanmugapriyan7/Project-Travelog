import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Home from './Home';
import SearchBar from './SearchBar';
import ImageSlider from './ImageSlider';
import Features from './Features';
import PlanLikeAPro from './PlanLikeAPro';
import Review from './Review';
import Footer from './Footer';




function Component() {
	return (<>
	  <Navbar/>
	  <Home/><br></br><br></br><br></br><br></br>
	  <SearchBar/>
	  <center><h2>Some popular Destinations</h2></center>
	  <ImageSlider/><br></br><br></br><br></br><br></br>
	  <Features/>
	  <PlanLikeAPro/>
      <Review/>
	 
	  <Footer/>
	  
		
</>


	);
}

export default Component;