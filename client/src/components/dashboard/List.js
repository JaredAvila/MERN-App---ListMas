import React, { Component } from "react";
import {
  addListItem,
  getCurrentProfile,
  removeListItem
} from "../../actions/profileActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      importance: 5,
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
    const newItem = {
      title: this.state.title,
      importance: this.state.importance
    };
    this.resetForm();
    document.getElementById("listForm").reset();
    this.props.addListItem(newItem, this.props.history);
  };

  resetForm = () => {
    this.setState({
      ...this.state,
      title: "",
      importance: 5
    });
  };

  onClick = e => {
    this.props.removeListItem(e.target.className, this.props.history);
  };

  render() {
    const { errors } = this.state;
    const listWithItems = this.props.items
      .sort((a, b) => b.importance - a.importance)
      .map(item => (
        <li key={item._id} onClick={this.onClick}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className={item._id}>{item.title}</p>
            <p>Priority: {item.importance}</p>
          </div>
          <p />
        </li>
      ));
    return (
      <div>
        <h4 className="goldenGoddess">Christmas List</h4>
        <hr />
        <form id="listForm" className="forms" onSubmit={this.onSubmit}>
          <label htmlFor="title">Add An Item</label>
          <input
            type="text"
            name="title"
            placeholder="Name of item"
            className={classnames("", {
              inValid: errors.title
            })}
            value={this.state.item}
            onChange={this.onChange}
          />
          {errors.title && <div className="inValidText">*{errors.title}</div>}
          <label htmlFor="importance">How bad do you want it?</label>
          <select name="importance" onChange={this.onChange}>
            <option value="5">
              5 (I don't know how I've lived thus far without it)
            </option>
            <option value="4">
              4 (This is one of the cooler things on my list)
            </option>
            <option value="3">
              3 (This is good if you can't find the better stuff)
            </option>
            <option value="2">
              2 (There are better things on my list, but I guess)
            </option>
            <option value="1">1 (If you don't want to be rude. Ok bro.)</option>
          </select>
          <button type="submit" className="bttn bttn-green">
            Submit
          </button>
        </form>
        <hr />
        <h4 className="ltRed-txt">
          <strong>Click an item to remove</strong>
        </h4>
        <div id="theList">
          <ol>{listWithItems}</ol>
        </div>
      </div>
    );
  }
}

List.propTypes = {
  removeListItem: PropTypes.func.isRequired,
  addListItem: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addListItem, getCurrentProfile, removeListItem }
)(withRouter(List));
