import React, { Component } from "react";
import "../../styles/auth.css";

class Login extends Component {
  render() {
    return (
      <div className="login">
        <div className="formWrap-dark">
          <h1 className="headingTxt">Login</h1>
          <form className="forms">
            <input
              type="email"
              autoComplete="username"
              name="email"
              placeholder="Email"
            />
            <input
              type="password"
              autoComplete="current-password"
              name="password"
              placeholder="Password"
            />
            <button type="button" className="bttn bttn-green">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
