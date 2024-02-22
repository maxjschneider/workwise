import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
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
      const response = await clockOut();
      const result = await response.json();

      setStatus(result);
    }
  }  

  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const time = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric'
  });

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome </h1>
      <h2>Current time is: </h2>
      <h3>{date}</h3>
      <h4>{time}</h4>
      <Button variant="outline-success" value={"clockIn"} onClick={ handleSubmit }>
        Clock In
      </Button>

      <Button variant="outline-danger" value={"clockOut"} onClick={ handleSubmit }>
        Clock Out
      </Button>

      <p>{ status }</p>

    </div>
  );
}