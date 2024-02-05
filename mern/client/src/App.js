import React from 'react';

import { Route, Routes } from "react-router-dom"

// import components here
import Schedule from './components/schedule';

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Schedule />} />      </Routes>
    </div>
  );
}

export default App;
