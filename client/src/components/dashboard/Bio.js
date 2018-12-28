import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Bio extends Component {
  render() {
    const { profile } = this.props.profile;
    return (
      <div>
        <div className="wrap">
          <h6 className="loud lHand">Nickname:</h6>
          <h3 className="ltGrn-txt">{profile.handle}</h3>
        </div>
        <div className="wrap">
          <h6 className="loud lHand">Bio:</h6>
          <p>{profile.bio}</p>
        </div>
      </div>
    );
  }
}

Bio.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {}
)(Bio);
