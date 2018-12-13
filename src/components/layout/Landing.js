import React, { Component } from "react";
import "../../styles/landing.css";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="wrap">
        <div id="land-btns">
          <Link
            to="/login"
            className="bttn-lg bttn-red marL-10 marR-10 snowTxt"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bttn-lg bttn-green marL-10 marR-10 snowTxt"
          >
            Sign Up
          </Link>
        </div>
      </div>
    );
  }
}

export default Landing;
