import React from "react";
import spinner from "../../img/Spinner.gif";
import "../../App.css";

export default () => {
  return (
    <div id="spinner">
      <img
        src={spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};
