import React from "react";
import { shallow } from "enzyme";
import BasicAreaChart from "./BasicAreaChart.js";

describe("BasicAreaChart", () => {
  test("should match snapshot", () => {
    const basicAreaChart = shallow(<BasicAreaChart />);
    expect(basicAreaChart).toMatchSnapshot();
  });
});
