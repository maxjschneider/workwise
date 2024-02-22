import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.css";

import { clockIn, clockOut } from "../util/timeclock";
import { connect } from "react-redux";

const mapStateToProps = ({session: { userId }}) => ({
  userId: userId
});

function TimeClock(user) {
  const [status, setStatus] = useState("");
  const [userId] = useState(user.userId);

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


export default connect(
  mapStateToProps
)(TimeClock);