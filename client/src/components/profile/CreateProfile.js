import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { createProfile } from "../../actions/profileActions";
import "../../styles/dash.css";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      imgUrl: "",
      bio: "",
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

    const newProfile = {
      handle: this.state.handle,
      imgUrl: this.state.imgUrl,
      bio: this.state.bio
    };
    this.props.createProfile(newProfile, this.props.history);

    // this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div id="dashboard" className="wrap">
        <div className="horRow-rev">
          <div className="cards cards-4" id="cardBack">
            <h4 className="drkGry-txt">Tell us a little about yourself</h4>
            <form
              noValidate
              onSubmit={this.onSubmit}
              id="profileForm"
              className="forms"
            >
              <input
                type="text"
                name="handle"
                className={classnames("", {
                  inValid: errors.handle
                })}
                placeholder="Profile Handle"
                value={this.state.handle}
                onChange={this.onChange}
              />
              {errors.handle && (
                <div className="inValidText">*{errors.handle}</div>
              )}
              <input
                type="text"
                name="imgUrl"
                placeholder="Img URL"
                value={this.state.imgUrl}
                onChange={this.onChange}
              />
              <input
                type="text"
                name="bio"
                className={classnames("", {
                  inValid: errors.bio
                })}
                placeholder="Short Bio"
                value={this.state.bio}
                onChange={this.onChange}
              />
              {errors.bio && <div className="inValidText">*{errors.bio}</div>}
              <button type="submit" className="bttn-cen bttn bttn-red">
                Create Profile
              </button>
            </form>
          </div>
          <div className="cards-3">
            <h1 className="profileHeading">Welcome to ListMas</h1>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
