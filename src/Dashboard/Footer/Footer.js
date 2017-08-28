/**
 * Component: Footer
 * Purpose: Displays Footer Section of UI
 * Properties: None
 **/

//React and React Bootstrap imports
import React, { Component } from "react";
import { Col } from "react-bootstrap";

import "./Footer.less";

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //Additional inline styles
    var style = {
      minHeight: "90px",
      width: "100%",
      backgroundColor: "#bc3e3f",
      color: "#fff",
      paddingTop: "20px",
      textAlign: "center",
      bottom: "0"
    };

    return (
      <Col className="Footer" sm={12} md={12} lg={12} style={style}>
        <div className="container">
          <Col md={12}>
            <a href="https://github.com/PalisadoesFoundation/garnet.git">
              <b>Garnet</b>
            </a>
            <p style={{ display: "inline" }}>.    Made by </p>
            <a href="https://github.com/PalisadoesFoundation">
              <b>The Palisadoes Foundation</b>
            </a>
          </Col>
        </div>
        <div
          className="container text-center"
          style={{ marginTop: "20px", fontSize: "9px" }}
        >
          <div>
            Icons made by
            <a href="http://www.freepik.com" title="Freepik"> Freepik</a>
            {" "}
            from
            {" "}
            <a href="http://www.flaticon.com" title="Flaticon">
              www.flaticon.com
            </a>
            {" "}
            is licensed by
            <a
              href="http://creativecommons.org/licenses/by/3.0/"
              title="Creative Commons BY 3.0"
              target="_blank"
            >
              CC 3.0 BY
            </a>
          </div>
        </div>
      </Col>
    );
  }
}

//Exports class to Global namespace
export default Footer;
