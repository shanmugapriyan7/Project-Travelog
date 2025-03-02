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
import CallToAction from './CallToAction';
import Hotel from './Hotels/Hotel';
import IndexPage from '../Index_Page/IndexPage';
import '../Index_Page/IndexPage.css';
import logo1 from '../assets/travelog-high-resolution-logo-transparent.png';
import logo from '../Components/images/logo2.png';
import { useNavigate } from 'react-router-dom';

function Component() {
	const navigate = useNavigate();

  const goToSin= () => {
    navigate('/Sin');
  };
  const goToSignup= () => {
    navigate('/Signup');
  };

	return (<>
	<div className='indexbody'>
	<div className="indexNav">
	<div className="NavC1">
	<img src={logo1} alt="" className="logo" style={{ width: "200px" }} />
        </div>
		<div className="index-nav-button">
		<div className="indexbutton3" onClick={goToSin}>
					<div className="indexx-bn3" >Login</div>
					</div>
				<div className="indexbutton4" onClick={goToSignup}>
					
					<div className="indexx-bn4" >SignUp</div>
					</div>
		</div>
      </div>
        <div className="indexBox">
        <div className='indexbody2'>
		<div className="indexft">
            <div className="indexft-title">A travel planner for
				<br></br> everyone</div>
			<div className="indexft-pa">Organize flights & hotels and map your trips in a free travel app designed for vacation planning & road trips, powered by AI and Google Maps.</div>
			<div className="indexft-button">
				<div className="indexbutton1" onClick={goToSin}>
					<div className="indexx-bn1">Login</div>
					</div>
				<div className="indexbutton2" onClick={goToSignup}>
					<div className="indexx-bn2">SignUp</div>
					</div>
				
			</div>
          </div>
     </div>
     <div className='indexpng'>
    
     </div></div>
  
	<div className="componentbody">
	

	
	  <ImageSlider/>
	  <Features/>
	  <PlanLikeAPro/>
      <Review/>
	
	  <Footer/>
	 
	  </div>
	  </div>	
</>


	);
}

export default Component;