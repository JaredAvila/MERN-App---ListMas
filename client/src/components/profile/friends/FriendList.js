import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { checkOffItem, unCheckOffItem } from "../../../actions/friendActions";

class FriendList extends Component {
  onClickCheck = e => {
    console.log(this.props.auth.user.id);
    if (this.props.auth.isAuthenticated) {
      let item_id = e.target.className;
      this.props.checkOffItem(
        item_id,
        this.props.profile._id,
        this.props.auth.user.id
      );
    } else {
      alert("You must be logged in to check off items");
    }
  };
  onClickUnCheck = e => {
    if (this.props.auth.isAuthenticated) {
      let item_id = e.target.className;
      this.props.unCheckOffItem(
        item_id,
        this.props.profile._id,
        this.props.auth.user.id
      );
    } else {
      alert("You must be logged in to check off items");
    }
  };

  render() {
    const listWithItems = this.props.items
      .sort((a, b) => b.importance - a.importance)
      .map(item => (
        <div key={item._id}>
          {item.item.checked === false ? (
            <div>
              <li onClick={this.onClickCheck}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p className={item._id}>{item.title}</p>
                  <p>Priority: {item.importance}</p>
                </div>
                <p />
              </li>
            </div>
          ) : (
            <li onClick={this.onClickUnCheck}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p
                  style={{ textDecoration: "line-through" }}
                  className={item._id}
                >
                  {item.title}
                </p>
                <p>Priority: {item.importance}</p>
              </div>
              <p />
            </li>
          )}
        </div>
      ));
    return (
      <div>
        <h4 className="goldenGoddess">Christmas List</h4>
        <hr />
        <h4 className="ltRed-txt">
          <strong>Click an item to check it off</strong>
        </h4>
        <div id="theList">
          <ol>{listWithItems}</ol>
        </div>
      </div>
    );
  }
}

FriendList.propTypes = {
  checkOffItem: PropTypes.func.isRequired,
  unCheckOffItem: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  checkOffItem: state.checkOffItem,
  unCheckOffItem: state.unCheckOffItem,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { checkOffItem, unCheckOffItem }
)(FriendList);
