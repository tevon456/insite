const _ = require ('lodash');

function _datapoint_labels (idx_device, idx_agent, labels) {
  /**
 * et datapoint IDXes for a device / agent with specific labels.
    Args:
        idx_device: Device index
        idx_agent: Agent index
        labels: Labels to match
        
    Returns:
        listing: List of datapoints
 */

  // Initialize key variables
  var listing = [];

  //Get datapoints the agent is tracking for the device
  var datapoints = _get_datapoints (idx_agent, idx_device);

  for (var i = 0; i < datapoints.length; i++) {
    var data_dict = [];
    data_dict[i++] = datapoints;
    var agent_label = data_dict['agent_label'];
    var idx_datapoint = data_dict['idx_datapoint'];

    for (var i = 0; i < labels.length; i++) {
      if (agent_label == lables[i]) {
        listing.append (idx_datapoint);
      }
    }
  }
  return listing;
}

function _get_dp_label_idx (idx_device, idx_agent) {
  data_dict = [];

  var data = _get_datapoints (idx_device, idx_agent);

  if (data.length > 0) {
    for (var instance = 0; instance < data.length; instance++) {
      var agent_label = instance['agent_label'];
      var idx_datapoint = instance['idx_datapoint'];
      var timefixed_value = instance['timefixed_value'];

      data_dict[agent_label] = (idx_datapoint, timefixed_value);
    }
  } else {
    var log_message = 'Agent idx %s not found.' % idx_agent;
    log.log2die (1050, log_message);
  }
  return data_dict;
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
