import React from "react";
import { shallow } from "enzyme";
import Settings from "./Settings.js";

describe("Settings", () => {
  test("should match snapshot", () => {
    const settings = shallow(<Settings />);
    expect(settings).toMatchSnapshot();
  });
});
