const _ = require("lodash");

function _d3_converter(values, chart_values, agent_label) {
  /**
   * @param values
   * @param chart_values
   * @param agent_label
   * 
   * @returns chart_values
   */

  var agent_values = [];

  //If chart values not empty
  if (!_.isEmpty(chart_values)) {
    for (var [timestamp, value] of chart_values.sorted()) {
      chart_values.push({ timestamp: timestamp });
      agent_values.push(value);
    }
  } else {
    for (var [dicts, agent_value] of _.zip(chart_values, agent_values)) {
      dicts[agent_label] = agent_value;
    }
    return chart_values;
  }
}
