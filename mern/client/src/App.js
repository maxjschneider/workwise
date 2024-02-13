import React from 'react';

import { Route, Routes } from "react-router-dom"

// import components here
import SiteNav from './components/navbar';
import Schedule from './components/schedule';
import StaffDirectory from './components/staffdirectory';

const App = () => {
  return (
    <div>
      <SiteNav />
      <div style={{ margin: 20 }}></div>
      <Routes>
        <Route exact path="/schedule" element={<Schedule />} />
        <Route exact path="/staffdirectory" element={<StaffDirectory />} />      </Routes>
    </div>
  );
}

export default App;
