const Infoset = require("../../utils/infoset.js");
const API = require("../../utils/api.js");
const general = require("../../utils/general.js");
const _ = require("lodash");

const infoset = new Infoset();

async function fetchDatapoints(req, res, err) {
  try {
    var idx_device = await infoset.getIdxDevice();
    var datapoints = await API.get("/datapoints?idx_deviceagent=" + idx_device);
  } catch (error) {
    console.log(error);
  }
  res.send(datapoints.data);
}

module.exports = fetchDatapoints;
