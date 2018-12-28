import React, { Component } from "react";
import "../../styles/auth.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="formWrap-dark">
          <h1 className="headingTxt">Login</h1>
          <form noValidate className="forms" onSubmit={this.onSubmit}>
            <input
              type="email"
              autoComplete="username"
              name="email"
              placeholder="Email"
              className={classnames("", {
                inValid: errors.email
              })}
              value={this.state.email}
              onChange={this.onChange}
            />
            {errors.email && <div className="inValidText">*{errors.email}</div>}
            <input
              type="password"
              autoComplete="current-password"
              name="password"
              placeholder="Password"
              className={classnames("", {
                inValid: errors.password
              })}
              value={this.state.password}
              onChange={this.onChange}
            />
            {errors.password && (
              <div className="inValidText">*{errors.password}</div>
            )}
            <button type="submit" className="bttn bttn-green">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
