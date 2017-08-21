import React from "react";
import { expect } from "chai";
import { shallow, mount } from "enzyme";

import DataPanel from "../DataPanel/DataPanel";
import SideBar from "./SideBar";

describe("<SideBar />", () => {
  it("renders content when passed in", () => {
    const wrapper = shallow(
      <SideBar>
        <div className="unique">
          Content
        </div>
      </SideBar>
    );
    expect(wrapper.contains(<div className="unique">Content</div>)).to.equal(
      true
    );
  });

  it("toggles SideBar when menu clicked", () => {
    const wrapper = mount(
      <SideBar>
        <div className="unique">
          Content
        </div>
      </SideBar>
    );
    wrapper.find(".toggleSideBar").simulate("click");
    expect(wrapper.state("open")).to.equal(true);
  });
});
