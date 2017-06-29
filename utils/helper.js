const _ = require ('lodash');

function _datapoint_labels (idx_device, idx_agent, labels) {
  /**
   * @param idx_device
   * @param idx-agent
   * @param labels
   * 
   * @returns listings
   */

  var listing = [];

  var datapoints = _get_datapoints (idx_agent, idx_device);

  for (var data_dict of datapoints) {
    var agent_label = data_dict['agent_label'];
    var idx_datapoint = data_dict['idx_datapoint'];

    if (agent_label) of (labels);
    {
      listing.append (idx_datapoint);
    }
  }
  return listing;
}

function _d3_converter (values, chart_values, agent_label) {
  /**
   * @param values
   * @param chart_values
   * @param agent_label
   * 
   * @returns chart_values
   */

  var agent_values = [];

  //If chart values not empty
  if (!_.isEmpty (chart_values)) {
    for (var [timestamp, value] of chart_values.sorted ()) {
      chart_values.push ({timestamp: timestamp});
      agent_values.push (value);
    }
  } else {
    for (var [dicts, agent_value] of _.zip (chart_values, agent_values)) {
      dicts[agent_label] = agent_value;
    }
    return chart_values;
  }
}
