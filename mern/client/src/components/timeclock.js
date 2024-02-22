import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.css";

import { getUser, clockIn, clockOut, getUserTotalHours } from "../util/user"

export default function TimeClock() {
  const [status, setStatus] = useState("");
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const sessionUser = await getUser();
    const hours = await getUserTotalHours();
    console.log(hours);
    setUser(sessionUser);
  }

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
    <Container style={{textAlign: "center"}}>
      <Row className="align-items-center">
        <Col>
          <h1>{ user == null ? "" : user.firstName + " " + user.lastName }</h1>

          <br />
        
          <h3>{date}</h3>
          <h4>{time}</h4>
          
          <br />

          <Button size="lg" variant="outline-success  mx-2" value={"clockIn"} onClick={ handleSubmit }>
            Clock In
          </Button>

          <Button size="lg" variant="outline-danger mx-2" value={"clockOut"} onClick={ handleSubmit }>
            Clock Out
          </Button>

          <p>{ status }</p>
        
        </Col>
      
        <Col>
        
        
        </Col>
      </Row>
    </Container>
  );
}