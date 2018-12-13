import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container">
          <div id="menuLinks">
            <Link className="ltGry-txt spaced" to="/users">
              View Lists
            </Link>
            <Link className="heading" to="/">
              <span className="ltGrn-txt">List</span>mas
            </Link>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="links" to="/register">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="links" to="/login">
                  Login
                </Link>
              </li>
              <li>
                {/* <a className="ltGry-txt spaced" href="#">View Lists</a> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
