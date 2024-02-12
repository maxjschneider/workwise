import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/session.js";

const mapStateToProps = ({ errors }) => ({
    errors
});

const mapDispatchToProps = dispatch => ({
    register: user => dispatch(register(user))
});

const Register = ({ errors, register }) => {
    const handleSubmit = e => {
        e.preventDefault();

        const user = {
            username: e.target[0].value,
            position: "E1",
            level: "0",
            email: e.target[1].value,
            password: e.target[2].value
        };

        register(user);
    };  
    
    return (
      <>
        <h1>Signup</h1>
        <p>{errors}</p>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" />
          </label>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <label>
            Password:
            <input type="password" name="password" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Link to="/login">Login</Link>
      </>
      );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);