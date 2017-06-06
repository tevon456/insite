const request = require("request");
const trim = require("strman").trim;
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
  request(
    {
      url: url,
      json: true
    },
    function(error, response, body) {
      if (error) console.log(error);
      else console.log(body);
    }
  );
};

exports.post = function(uri, data) {
  var url = formatUrl(uri);
  request.post(url, data);
};
