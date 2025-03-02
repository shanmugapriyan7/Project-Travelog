import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Planner from './Final-phase/Planner';
import Signup from './Mid-phase/Signup';
import Sin from './Mid-phase/Sin';
import Selector from './Mid-phase/Selector';
import Component from './Components/Component';
import Hotel from './Components/Hotels/Hotel';
import { AppProvider } from './Final-phase/AppContext';
import CheckHotels from './Components/CheckHotels';
import Feedback from './Feedback/Feedback1';
import FeedbackForm from './Mid-phase/FeedbackForm';
import User_Review from './Feedback/User_Review';
import Review from './Components/Review';
import HomePage from './Mid-phase/HomePage';
const LinkRouter = () => {
  return (
    <div>
<AppProvider>
<BrowserRouter>
<Routes>
<Route path='/' element=<Component/> >
</Route>
<Route path='/Planner' element=<Planner/> >
</Route>
<Route path='/Signup' element=<Signup/> >
</Route>
<Route path='/Sin' element=<Sin/> >
</Route>
<Route path='/Selector' element=<Selector/> >
</Route>
<Route path='/Hotel' element=<Hotel/> >
</Route>
<Route path='/CheckHotels' element=<CheckHotels/> >
</Route>
<Route path='/Feedback' element=<FeedbackForm/> >
</Route>
<Route path='/Review' element=<Review/> >
</Route>
<Route path='/Feed' element=<Feedback/> >
</Route>
<Route path='/userReview' element=<User_Review/> >
</Route>
<Route path='/home' element=<HomePage/> >
</Route>
</Routes>
</BrowserRouter>
</AppProvider>
    </div>
  )
}

export default LinkRouter