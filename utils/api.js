//Node Modules import/require
const axios = require("axios");
const trim = require("strman").trim;

const Rx = require("rxjs");

// Garnet Config Object
const CONFIG = require("./configuration.js");

//Default is set to http
var prefix = "http";

//Check if https is enabled
if (CONFIG.api_server_https()) {
  prefix = "https";
}

//Gets Infoset's url
var fixed_uri = CONFIG.api_server_uri();

var url_prefix =
  prefix +
  "://" +
  CONFIG.api_server_name() +
  ":" +
  CONFIG.api_server_port() +
  fixed_uri;

function formatUrl(uri) {
  let fixed_uri = trim(uri, "/");
  let result = url_prefix + "/" + fixed_uri;
  return result;
}

module.exports.get = function get(uri) {
  return axios.get(formatUrl(uri));
};

exports.post = function(uri, data) {
  var url = formatUrl(uri);
  request.post(url, data);
};
