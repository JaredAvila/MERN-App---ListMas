import React, { Component } from "react";
import "../../styles/auth.css";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConf: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordConf: this.state.passwordConf
    };
    this.props.registerUser(newUser, this.props.history);

    // this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;

    // const { user } = this.props.auth;

    return (
      <div className="login">
        <div className="formWrap-dark">
          <h1 className="headingTxt">Register</h1>
          <form noValidate onSubmit={this.onSubmit} className="forms">
            <input
              type="text"
              name="name"
              className={classnames("", {
                inValid: errors.name
              })}
              placeholder="Name"
              value={this.state.name}
              onChange={this.onChange}
            />
            {errors.name && <div className="inValidText">*{errors.name}</div>}
            <input
              type="email"
              name="email"
              className={classnames("", {
                inValid: errors.email
              })}
              placeholder="Email"
              autoComplete="username"
              value={this.state.email}
              onChange={this.onChange}
            />
            {errors.email && <div className="inValidText">*{errors.email}</div>}
            <input
              type="password"
              name="password"
              className={classnames("", {
                inValid: errors.password
              })}
              placeholder="Password"
              autoComplete="new-password"
              value={this.state.password}
              onChange={this.onChange}
            />
            {errors.password && (
              <div className="inValidText">*{errors.password}</div>
            )}
            <input
              type="password"
              name="passwordConf"
              className={classnames("", {
                inValid: errors.passwordConf
              })}
              placeholder="Confirm Password"
              autoComplete="new-password"
              value={this.state.passwordConf}
              onChange={this.onChange}
            />
            {errors.passwordConf && (
              <div className="inValidText">*{errors.passwordConf}</div>
            )}
            <button type="submit" className="bttn bttn-green">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
