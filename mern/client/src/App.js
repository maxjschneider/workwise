import React from 'react';

import { Route, Routes } from "react-router-dom"

// import components here
import Navbar from './components/navbar';
import Schedule from './components/schedule';

const App = () => {
  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}></div>
      <Routes>
        <Route exact path="/" element={<Schedule />} />      </Routes>
    </div>
  );
}

export default App;
