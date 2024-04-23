import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions/session";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import { useNavigate } from "react-router-dom";

const mapStateToProps = ({ errors }) => ({
  errors,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
});

const Login = (props) => {
  const errors = props.errors;
  const login = props.login;
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: e.target[0].value,
      password: e.target[1].value,
    };

    login(user).then((res) => {
      if (res.type === "RECEIVE_CURRENT_USER") {
        navigate("/");
      }
    });
  };

  return (
    <>
      <Stack gap={2} className="col-md-7 mx-auto">
        <h1>Login</h1>

        <br />

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <p>{errors}</p>

          <Button variant="primary" type="submit">
            Login
          </Button>

          <br />
          <br />
          <Link to="/register">Don't have an account?</Link>
        </Form>
      </Stack>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
