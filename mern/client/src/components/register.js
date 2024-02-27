import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/session.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Col";

const mapStateToProps = ({ errors }) => ({
  errors,
});

const mapDispatchToProps = (dispatch) => ({
  register: (user) => dispatch(register(user)),
});

const Register = ({ errors, register }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      position: "E1",
      level: "0",
      email: e.target[2].value,
      password: e.target[3].value,
    };

    register(user);
  };

  return (
    <>
      <Stack gap={2} className="col-md-7 mx-auto">
        <h1>Signup</h1>

        <br />

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="John" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Doe" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <p>{errors}</p>

          <Button variant="primary" type="submit">
            Submit
          </Button>

          <br />
          <br />

          <Link to="/login">Already have an account?</Link>
        </Form>
      </Stack>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
