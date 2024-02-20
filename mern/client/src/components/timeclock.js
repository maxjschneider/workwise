import React from "react";

function MyButton() {
    return (
      <button>
        I'm a button
      </button>
    );
  }
  
  export default function ImAButton() {
    return (
      <div>
        <h1>i exist</h1>
        <MyButton />
      </div>
    );
  }