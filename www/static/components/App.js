import React, { Component } from 'react';
import NavBar from './Navbar/Navbar.js';
import Dashboard from './Dashboard/Dashboard.js';
import Footer from './Footer/Footer.js';

class App extends Component {

  render() {
    return (
      <div>
        <NavBar></NavBar>
        <Dashboard></Dashboard>
        <Footer></Footer>
      </div>
    )
  }
}

export default App;
