//Node Modules import/require
const axios = require("axios");
const trim = require("strman").trim;

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

exports.get = function(uri) {
  var url = formatUrl(uri);
  var result;
  axios
    .get(url)
    .then(data => {
      result = data;
    })
    .catch(err => {
      console.error("\nCannot contact Infoset API, charts will be blank!");
      result = {};
    });
  return result;
};

exports.post = function(uri, data) {
  var url = formatUrl(uri);
  request.post(url, data);
};
