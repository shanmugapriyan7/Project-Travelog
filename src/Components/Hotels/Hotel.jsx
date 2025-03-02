import React from 'react';
import HotelFeatures from './HotelFeatures';
import HotelMain from './HotelMain';
import HotelHelper from './HotelHelper';
import ResponsiveComponent from './ResponsiveComponent';
import Navbar from '../Navbar';
import Footer from '../Footer';
import CheckHotels from '../CheckHotels';
import HomeNavBar from '../../Mid-phase/HomeNavBar';

const Hotel = () => {
  return (
    <div style={{backgroundColor:'white'}}>
      <HomeNavBar/>
      <br></br>
      <HotelMain/>
      <HotelFeatures/>
      <HotelHelper/>
      <ResponsiveComponent/>
      <Footer/>
      </div>
  )
}

export default Hotel