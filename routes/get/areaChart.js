const Infoset = require("../../utils/infoset.js");
const API = require("../../utils/api.js");
const general = require("../../utils/general.js");
const _ = require("lodash");

const infoset = new Infoset();

async function fetchAreaChart(req, res, err) {
  const timeStart = req.query.timeStart;
  const timeStop = req.query.timeStop;
  const datapointId = req.params.datapointId;

  let datapoint = await API.get("datapoints/" + datapointId);

  let results = await API.get(
    "/datapoints/" +
      datapointId +
      "/data?ts_start=" +
      timeStart +
      "&ts_stop=" +
      timeStop
  );

  let data = _d3_converter(results.data, [], "y");
  res.send(data);
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

module.exports = fetchAreaChart;
