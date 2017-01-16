import React, { Component } from 'react';
import { Link } from 'react-router';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import './Navbar.less'

class NavBar extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Garnet</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem><Link to="/hosts">Hosts</Link></NavItem>
          <NavItem><Link to="/agents">Agents</Link></NavItem>
          <NavItem><Link to="/settings">Settings</Link></NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export default NavBar;
