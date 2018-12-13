import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div id="footer">
        <p className="footerTxt">
          Copyright &copy; {new Date().getFullYear()} | Avila Media Group
        </p>
      </div>
    );
  }
}

export default Footer;
