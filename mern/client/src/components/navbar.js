import React from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../images/transparent_logo.png"
import Button from 'react-bootstrap/Button';

import { connect } from "react-redux";
import { logout } from "../actions/session";

import { Person } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap'

const mapStateToProps = ({ session: {userId} }) => ({
  loggedIn: Boolean(userId)
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const SiteNav = ({loggedIn, logout}) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img alt="WorkWise" className="d-inline-block align-top" width="100"  src={logo}></img>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {
            loggedIn ? 
            
              <Navbar.Collapse id="basic-navbar-nav" className="container-fluid">
                <Nav >
                  <LinkContainer className="text-dark" to="/schedule">
                    <Nav.Link>Schedule</Nav.Link>
                  </LinkContainer>
                </Nav>
                
                <Nav >
                  <LinkContainer className="text-dark" to="/staffdirectory">
                    <Nav.Link>Staff Directory</Nav.Link>
                  </LinkContainer>
                </Nav>

                <Nav >
                  <LinkContainer className="text-dark" to="/timeclock">
                    <Nav.Link>Clock In/Out</Nav.Link>
                  </LinkContainer>
                </Nav>

                <Nav className="ms-auto fw-bold ">
                  <Button variant="primary" onClick={logout}>Logout</Button>
                </Nav>
              </Navbar.Collapse>
            :
            <Navbar.Collapse id="basic-navbar-nav" className="container-fluid">
              <Nav className="ms-auto fw-bold ">
                <LinkContainer className="text-dark" to="/login">
                  <Nav.Link><Person size={30} /> Login</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          }
      </Container>
    </Navbar>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteNav);