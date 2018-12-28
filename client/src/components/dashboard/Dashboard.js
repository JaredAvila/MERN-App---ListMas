import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import "../../App.css";
import "../../styles/dash.css";

import List from "./List";
import Bio from "./Bio";
import EditBio from "./EditBio";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bioShow: true
    };
  }
  componentDidMount() {
    this.props.getCurrentProfile();
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  toggleBio = () => {
    this.state.bioShow
      ? this.setState({ bioShow: false })
      : this.setState({ bioShow: true });
  };

  deleteAccount = () => {
    this.props.deleteAccount(this.props.profile._id, this.props.history);
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = (
        <div style={{ background: "white", width: "100%", height: "100vh" }}>
          <Spinner />
        </div>
      );
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div id="profWrap">
            <div id="userProf" className="wrap">
              <div className="horRow">
                <div className="cards-2">
                  <h2 className="userName">{user.name}</h2>
                  <img
                    style={{ width: "100%", boxShadow: "2px 2px 8px black" }}
                    src={profile.imgUrl}
                    alt=""
                  />
                  <p onClick={this.toggleBio} className="ltGrn-txt links">
                    Edit Profile
                  </p>
                  <p onClick={this.deleteAccount} className="ltRed-txt links">
                    <strong>Delete Profile</strong>
                  </p>
                </div>
                <div className="cards-3">
                  {this.state.bioShow ? (
                    <Bio profile={profile} />
                  ) : (
                    <EditBio profile={profile} toggleBio={this.toggleBio} />
                  )}
                </div>
                <div className="cards-4 listCard">
                  <List items={profile.userWishList} />
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        //user has no profile
        dashboardContent = (
          <div id="dashboard">
            <div className="wrap">
              <div className="horRow-rev">
                <div id="cardBack" className="cards cards-6">
                  <h1>
                    Welcome,
                    <span className="profileHeading">{user.name}!</span>
                  </h1>
                  <p>
                    This is your dashboard. Get started by creating a new
                    Christmas List below.
                  </p>
                  <Link to="/create-profile">
                    <button className="bttn bttn-lg bttn-green">
                      Create List
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    return <div>{dashboardContent}</div>;
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
