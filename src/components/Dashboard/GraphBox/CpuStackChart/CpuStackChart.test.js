import React from "react";
import { shallow } from "enzyme";
import CpuStackChart from "./CpuStackChart.js";

describe("CpuStackChart", () => {
  test("should match snapshot", () => {
    const cpuStackChart = shallow(<CpuStackChart />);
    expect(cpuStackChart).toMatchSnapshot();
  });
});
