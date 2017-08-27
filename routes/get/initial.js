const Infoset = require("../../utils/infoset.js");
const API = require("../../utils/api.js");

const infoset = new Infoset();

async function initial(req, res, err) {
  var idx_device = await infoset.getIdxDevice();
  var idx_agent = await infoset.getIdxAgent();

  var datapoints;
  datapoints = await API.get("datapoints?idx_deviceagent=" + idx_device);
  var results = [];

  for (var datapoint of datapoints.data) {
    if (datapoint.agent_label === "release") {
      results.push(datapoint.timefixed_value);
    }
    if (datapoint.agent_label === "system") {
      results.push(datapoint.timefixed_value);
    }
  }

  results.push("localhost");

  res.send(results);
}

module.exports = initial;
