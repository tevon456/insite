import React from "react";
import { shallow } from "enzyme";
import DataPanel from "./DataPanel.js";

describe("DataPanel", () => {
  test("should match snapshot", () => {
    const dataPanel = shallow(<DataPanel />);
    expect(dataPanel).toMatchSnapshot();
  });
});
