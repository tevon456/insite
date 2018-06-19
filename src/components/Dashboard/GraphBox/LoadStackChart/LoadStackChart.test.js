import React from "react";
import { shallow } from "enzyme";

import LoadStackChart from "./LoadStackChart.js";

describe("LoadStackChart", () => {
  test("should match snapshot", () => {
    const loadStackChart = shallow(<LoadStackChart />);
    expect(loadStackChart).toMatchSnapshot();
  });
});
