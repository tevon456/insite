import React, { Component } from 'react';
import './Navbar.less'

class NavBar extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="Navbar">
        <ul>
          <li>
            <a onClick={() => history.push('page1') }>Home</a>
          </li>
          <li>
            <a onClick={() => history.push('page2') }>Search</a>
          </li>
          <li>
            <a onClick={() => history.push('page3') }>Charts</a>      
          </li>
        </ul>
      </div>
    )
  }
}

export default NavBar;
