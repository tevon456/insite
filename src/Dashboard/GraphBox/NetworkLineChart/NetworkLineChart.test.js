import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

import NetworkLineChart from "./NetworkLineChart.js";

describe("NetworkLineChart", () => {
  test("should match snapshot", () => {
    const networkLineChart = shallow(<NetworkLineChart />);
    expect(networkLineChart).toMatchSnapshot();
  });
});
