import React, { Component } from "react";

import NavBar from "../Navbar/Navbar.js";
import DataPanel from "./DataPanel/DataPanel.js";
import SideBar from "./SideBar/SideBar.js";
import Footer from "../Dashboard/Footer/Footer.js";

class DataPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <NavBar />
        <SideBar>
          <DataPanel />
        </SideBar>
        <Footer />
      </div>
    );
  }
}

export default DataPage;
