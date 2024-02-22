import React from 'react';

import { Route, Routes } from "react-router-dom"

// import components here
import SiteNav from './components/navbar';
import Schedule from './components/schedule';
import StaffDirectory from './components/staffdirectory';
import Register from './components/register';
import Login from './components/login';
import TimeClock from "./components/timeclock"
import  PrivateRoutes  from './util/route';

const App = () => {
  return (
    <div>
      <SiteNav />
      <div style={{ margin: 20 }}></div>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route exact path="/schedule" element={<Schedule />} />
          <Route exact path="/staffdirectory" element={<StaffDirectory />} /> 
          <Route exact path="/timeclock" element={<TimeClock/>} /> 
        </Route>
        
        <Route exact path="/register" element={<Register />} />      
        <Route exact path="/login" element={<Login />} />   
      </Routes>
    </div>
  );
}

export default App;
