/**
 * Component: Footer
 * Purpose: Displays Footer Section of UI
 * Properties: None
 **/

//React and React Bootstrap imports
import React, { Component } from "react";
//React-Router imports for..Routing
import { Link } from "react-router";

//Component's style
import logo from "./garnet_logo.png";
import "./Navbar.less";

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="NavBar">
        <ul>
          <li>
            <Link to="/data"><b>Data</b></Link>
          </li>
          <li>
            <Link to="/hosts"><b>Hosts</b></Link>
          </li>
          <li>
            <Link to="/">
<<<<<<< HEAD
              <img src="./img/garnet_logo.png" style={{height: '35px'}} />
=======
              <img src={logo} style={{ height: "35px" }} />
>>>>>>> upstream/master
            </Link>
          </li>
          <li>
            <Link to="/agents"><b>Agents</b></Link>
          </li>
          <li>
            <Link to="/settings"><b>Settings</b></Link>
          </li>
        </ul>
      </div>
    );
  }
}

//Exports class to Global namespace
export default NavBar;
