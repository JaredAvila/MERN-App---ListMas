import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { updateProfile } from "../../actions/profileActions";

class EditBio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: this.props.profile.profile.handle,
      imgUrl: this.props.profile.profile.imgUrl,
      bio: this.props.profile.profile.bio,
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
    const profileData = {
      handle: this.state.handle,
      imgUrl: this.state.imgUrl,
      bio: this.state.bio
    };

    this.props.updateProfile(profileData, this.props.history);
    this.props.toggleBio();
  };

  render() {
    const { errors } = this.state;
    return (
      <form
        noValidate
        onSubmit={this.onSubmit}
        id="profileForm"
        className="forms"
      >
        <label htmlFor="handle">Nickname: </label>
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
        {errors.handle && <div className="inValidText">*{errors.handle}</div>}
        <label htmlFor="imgUrl">Image URL: </label>
        <input
          type="text"
          name="imgUrl"
          className={classnames("", {
            inValid: errors.imgUrl
          })}
          placeholder="Img URL"
          value={this.state.imgUrl}
          onChange={this.onChange}
        />
        {errors.imgUrl && <div className="inValidText">*{errors.imgUrl}</div>}
        <label htmlFor="bio">Bio: </label>
        <input
          type="text"
          name="bio"
          placeholder="Short Bio"
          value={this.state.bio}
          onChange={this.onChange}
        />
        <button type="submit" className="bttn-cen bttn bttn-red">
          Save
        </button>
      </form>
    );
  }
}

EditBio.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateProfile }
)(withRouter(EditBio));
