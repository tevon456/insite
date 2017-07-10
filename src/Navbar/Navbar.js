/**
 * Component: Footer
 * Purpose: Displays Footer Section of UI
 * Properties: None
 **/

//React and React Bootstrap imports
import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
//React-Router imports for..Routing
import {Link} from 'react-router';

//Component's style
import './Navbar.less';

class NavBar extends Component {
  constructor (props) {
    super (props);
  }

  render () {
    return (
      <div className="NavBar">
        <ul>
          <li>
            <Link to="/hosts"><b>Hosts</b></Link>
          </li>
          <li>
            <Link to="/">
              <img src="./img/garnet_logo.png" style={{height: '35px'}} />
            </Link>
          </li>
          <li>
            <Link to="/Agent"><b>Agents</b></Link>
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
