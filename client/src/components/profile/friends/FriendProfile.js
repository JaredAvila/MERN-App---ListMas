import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFriendProfile } from "../../../actions/friendActions";

import Bio from "../../dashboard/Bio";
import Spinner from "../../common/Spinner";
import FriendList from "./FriendList";

import { Link } from "react-router-dom";

class FriendProfile extends Component {
  componentDidMount = () => {
    if (this.props.match.params.handle) {
      this.props.getFriendProfile(this.props.match.params.handle);
    }
  };
  componentWillReceiveProps = nextProps => {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/");
    }
  };

  onAddClick = () => {
    console.log(this.props.profile.profile._id);
  };
  render() {
    let boolCheck = true;
    let isMyProfile;
    if (this.props.profile.profile !== null) {
      if (this.props.profile.profile.user._id !== this.props.auth.user.id) {
        boolCheck = false;
      } else {
        boolCheck = true;
        isMyProfile = (
          <div className="wrap wrapCenter">
            <h1>Hey! No peeking! (unless you're a duck. Mmmmmm)</h1>
            <Link to="/">
              <button className="bttn bttn-green marT-10">Your profile</button>{" "}
            </Link>
            <Link to="/users">
              <button className="bttn bttn-ltGray marT-10">Back</button>{" "}
            </Link>
          </div>
        );
      }
    }
    const { profile, loading } = this.props.profile;
    let profileContent;
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div id="profWrap">
          <div id="userProf" className="wrap">
            <div className="horRow">
              <div className="cards-2">
                <img
                  style={{ width: "100%", boxShadow: "2px 2px 8px black" }}
                  src={profile.imgUrl}
                  alt=""
                />
                <h2 className="userName">{profile.user.name}</h2>
                <div className="horRow">
                  <Link to="/users" className="bttn bttn-ltGray marT-10">
                    Back to profiles
                  </Link>
                </div>
              </div>
              <div className="cards-3">
                <Bio profile={profile} />
              </div>
              <div className="cards-4 listCard">
                <FriendList
                  checkOffItem={this.props.checkOffItem}
                  unCheckOffItem={this.props.unCheckOffItem}
                  items={profile.userWishList}
                  profile={profile}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <div>{!boolCheck && !loading ? profileContent : isMyProfile}</div>;
  }
}

FriendProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getFriendProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  getFriendProfile: state.getFriendProfile
});

export default connect(
  mapStateToProps,
  { getFriendProfile }
)(FriendProfile);
