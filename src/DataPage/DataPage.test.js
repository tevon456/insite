import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";

//import NavBar from "../Navbar/Navbar.js";
import DataPage from "./DataPage.js";
import DataPanel from "./DataPanel/DataPanel.js";
import SideBar from "./SideBar/SideBar.js";
//import Footer from "../../Dashboard/Footer/Footer.js";

describe("<DataPage />", () => {
  it("renders one <DataPanel /> components", () => {
    const wrapper = shallow(<DataPage />);
    expect(wrapper.find(DataPanel)).to.have.length(1);
  });

  it("renders children when passed in", () => {
    const wrapper = shallow(
      <DataPage>
        <DataPanel />
      </DataPage>
    );
    expect(wrapper.contains(<DataPanel />)).to.equal(true);
  });
});
