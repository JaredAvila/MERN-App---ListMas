import React, { Component } from "react";
import "../../styles/landing.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className="landing">
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

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
