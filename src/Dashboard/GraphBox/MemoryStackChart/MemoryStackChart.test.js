import React from "react";
import { shallow } from "enzyme";

import MemoryStackChart from "./MemoryStackChart.js";

describe("MemoryStackChart", () => {
  test("should match snapshot", () => {
    const memoryStackChart = shallow(<MemoryStackChart />);
    expect(memoryStackChart).toMatchSnapshot();
  });
});
