import React, { useState } from "react";

import { clockIn, clockOut } from "../util/timeclock";

export default function TimeClock() {
  const [status, setStatus] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (e.target.value === "clockIn") {
      const response = await clockIn();
      const result = await response.json();
  
      setStatus(result);
    } else if (e.target.value === "clockOut") {
      // TODO
    }
  }  

  return (
    <div>
      <h1>i exist</h1>

      <button value={"clockIn"} onClick={ handleSubmit }>
        Clock In
      </button>

      <p>{ status }</p>

    </div>
  );
}