import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";


import Planner from './Final-phase/Planner';
import Signup from './Mid-phase/Signup';
import Sin from './Mid-phase/Sin';
import Selector from './Mid-phase/Selector';
import Component from './Components/Component';
import Hotel from './Components/Hotels/Hotel';
import { AppProvider } from './Final-phase/AppContext';
import CheckHotels from './Components/CheckHotels';
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
</Routes>
</BrowserRouter>
</AppProvider>

    </div>
  );
};

export default LinkRouter;
