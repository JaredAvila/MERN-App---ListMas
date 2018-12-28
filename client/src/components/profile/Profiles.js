import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getAllProfiles } from "../../actions/profileActions";
import "../../styles/friends.css";

class Profiles extends Component {
  componentDidMount() {
    this.props.getAllProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles
          .sort((a, b) =>
            a.user.name > b.user.name ? 1 : b.user.name > a.user.name ? -1 : 0
          )
          .map(profile => (
            <div
              id="profileCards"
              key={profile._id}
              className="horRowLeft mar-10"
            >
              <img
                style={{
                  height: "100px",
                  width: "100px",
                  borderRadius: "50%",
                  boxShadow: "1px 1px 4px black"
                }}
                src={profile.imgUrl}
                alt=""
              />
              <Link to={`/profile/${profile.handle}`}>
                {" "}
                <h3 id="profileLink" className="goldenGoddess marL-10">
                  {profile.user.name}
                </h3>
              </Link>
            </div>
          ));
      } else {
        profileItems = <h4>No Proflies Found...</h4>;
      }
    }
    return (
      <div id="usersList">
        <div className="wrap">{profileItems}</div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAllProfiles }
)(Profiles);
