const Infoset = require("../../utils/infoset.js");
const API = require("../../utils/api.js");
const general = require("../../utils/general.js");
const _ = require("lodash");

const infoset = new Infoset();

async function fetchStackGraph(req, res, err) {
  const id_agent = req.params.id_agent;
  const stack_type = req.params.stack_type;
  var idx_device;
  var agent_data;
  var idx_agent;

  try {
    idx_device = await infoset.getIdxDevice();
    agent_data = await API.get("agents/" + id_agent);
    idx_agent = agent_data.data.idx_agent;
  } catch (error) {
    console.log(error);
  }

  var ts_stop = general.normalized_timestamp();
  var ts_start = ts_stop - 3600 * 3;

  var labels = _get_labels();
  var datapoint_list;

  if ("cpu" === stack_type)
    datapoint_list = await _datapoint_labels(idx_device, idx_agent, labels.cpu);
  if ("memory" === stack_type)
    datapoint_list = await _datapoint_labels(
      idx_device,
      idx_agent,
      labels.memory
    );
  if ("load" === stack_type)
    datapoint_list = await _datapoint_labels(
      idx_device,
      idx_agent,
      labels.load
    );
  if ("network" === stack_type)
    datapoint_list = await _datapoint_labels(
      idx_device,
      idx_agent,
      labels.network
    );

  var values = [];
  var data = [];
  var previous_data = [];

  for (var idx_datapoint of datapoint_list) {
    try {
      var datapoint = await API.get("datapoints/" + idx_datapoint);
      var agent_label = datapoint.data.agent_label;

      var results = await API.get(
        "datapoints/" +
          idx_datapoint +
          "/data?ts_start=" +
          ts_start +
          "&ts_stop=" +
          ts_stop
      );

      data = _d3_converter(results.data, data, agent_label);
    } catch (error) {
      console.log(error);
    }
  }
  res.send(data);
}

function _get_labels() {
  return {
    cpu: [
      "cpu_times_percent_iowait",
      "cpu_times_percent_irq",
      "cpu_times_percent_ctx_switches",
      "cpu_times_percent_syscalls",
      "cpu_times_percent_interrupts",
      "cpu_times_percent_soft_interrupts",
      "cpu_times_percent_softirq",
      "cpu_times_percent_steal",
      "cpu_times_percent_user",
      "cpu_times_percent_nice",
      "cpu_times_percent_system",
      "cpu_times_percent_idle",
      "cpu_times_percent_guest",
      "cpu_times_percent_guest_nice"
    ],
    memory: [
      "memory_buffers",
      "memory_cached",
      "memory_shared",
      "memory_available",
      "memory_free"
    ],
    load: ["load_average_01min", "load_average_05min", "load_average_15min"],
    network: ["network_bytes_recv", "network_bytes_sent"]
  };
}

function _get_flatten_labels() {
  return [
    "cpu_times_percent_iowait",
    "cpu_times_percent_irq",
    "cpu_times_percent_ctx_switches",
    "cpu_times_percent_syscalls",
    "cpu_times_percent_interrupts",
    "cpu_times_percent_soft_interrupts",
    "cpu_times_percent_softirq",
    "cpu_times_percent_steal",
    "cpu_times_percent_user",
    "cpu_times_percent_nice",
    "cpu_times_percent_system",
    "cpu_times_percent_idle",
    "cpu_times_percent_guest",
    "cpu_times_percent_guest_nice",
    "memory_buffers",
    "memory_cached",
    "memory_shared",
    "memory_available",
    "memory_free",
    "load_average_01min",
    "load_average_05min",
    "load_average_15min"
  ];
}

_d3_converter = function(values, chart_values, agent_label) {
  /**
   * @param values
   * @param chart_values
   * @param agent_label
   * 
   * @returns chart_values
   */

  var agent_values = [];
  if (_.isEmpty(chart_values)) {
    for (const timestamp of Object.keys(values)) {
      let time = {
        timestamp: timestamp
      };
      chart_values.push(time);
      //console.log(timestamp);
      agent_values.push(values[timestamp]);
    }
  } else {
    for (const timestamp of Object.keys(values)) {
      agent_values.push(values[timestamp]);
    }
  }
  var zipped = _.zip(chart_values, agent_values);

  for (var [dicts, agent_value] of zipped) {
    dicts[agent_label] = agent_value;
  }

  return chart_values;
};

async function _get_datapoints(idx_agent, idx_device) {
  /**
   * @param idx_agent
   * @param idx_device
   * @returns data
   */
  let data_charted;
  let data_timefixed;
  try {
    data_charted = await API.get(
      "datapoints?idx_deviceagent=" + idx_device + "&base_type=64"
    );
    //Get timefixed
    data_timefixed = await API.get("datapoints?idx_deviceagent=" + idx_device);
  } catch (error) {
    console.log(error);
  }

  return _.concat(data_charted.data, data_timefixed.data);
}

async function _datapoint_labels(idx_device, idx_agent, labels) {
  var listing = [];
  var flat_labels = _get_flatten_labels();
  var datapoints = await _get_datapoints(idx_agent, idx_device);
  for (var datapoint of datapoints) {
    let agent_label = datapoint.agent_label;
    let idx_datapoint = datapoint.idx_datapoint;
    if (labels.indexOf(agent_label) > -1) {
      listing.push(idx_datapoint);
    }
  }
  return listing;
}

function _get_dp_label_idx(idx_device, idx_agent) {
  /**
   * @param idx_device
   * @param idx_agent
   * 
   * @returns chart_values
   * def _get_dp_label_idx(idx_device, idx_agent):
    """Get datapoint labels for agent and device.

    Args:
        idx_device: idx of device
        idx_agent: idx of agent

    Returns:
        None

    """
    # Initialize important variables
    data_dict = {}

    # Get data
    data = _get_datapoints(idx_agent, idx_device)

    # Massage data
    if len(data) > 0:
        for instance in data:
            agent_label = instance['agent_label']
            idx_datapoint = instance['idx_datapoint']
            timefixed_value = instance['timefixed_value']
            data_dict[agent_label] = (idx_datapoint, timefixed_value)
    else:
        log_message = ('Agent idx %s not found.') % (idx_agent)
        log.log2die(1050, log_message)

    return data_dict
   */
  let agent_label;
  let idx_datapoint;
  let timefixed_value;
  let data_dict = {};

  let datapoints = _get_datapoints(idx_agent, idx_device);

  datapoints.map(response => {
    return response;
  });
}

module.exports = fetchStackGraph;
