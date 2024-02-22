import React from "react";

import { clockIn } from "../util/timeclock";

const handleClockIn = async () => {
  console.log(clockIn());
}

function ClockInButton() {
    return (
      <button onClick={ handleClockIn }>
        Clock In
      </button>
    );
}
  
export default function timeClock() {
  return (
    <div>
      <h1>i exist</h1>
      <ClockInButton />
    </div>
  );
}