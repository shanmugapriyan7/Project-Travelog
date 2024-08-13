import React from 'react';
import HotelFeatures from './HotelFeatures';
import HotelMain from './HotelMain';
import HotelHelper from './HotelHelper';
import ResponsiveComponent from './ResponsiveComponent';
import Navbar from '../Navbar';
import Footer from '../Footer';
import CheckHotels from '../CheckHotels';

const Hotel = () => {
  return (
    <div>
      
      <Navbar/>
      <HotelMain/>
      <HotelFeatures/>
      <HotelHelper/>
      <ResponsiveComponent/>
      <Footer/>
      </div>
  )
}

export default Hotel