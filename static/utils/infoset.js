const API = require("./api.js");

let idx_agent = 1;
let idx_device = 1;
var device_agents_indices = API.get("deviceagents");
var agents;

if (device_agents_indices) agents = API.get("agents");

let devicename;
//agents.forEach(function(element) {}, this);
//device_agents_indices.forEach(function(element) {}, this);

exports.idx_device = function() {
  return idx_device;
};

exports.idx_agent = function() {
  return idx_agent;
};

exports.devicename = function() {
  var device_data;
  var device;
  device_data = API.get("devices/" + idx_device);
  device = device_data.data;
  return device;
};
