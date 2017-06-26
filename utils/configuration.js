const path = require("path");
const fs = require("fs");

// Default Config Object
var CONFIG = {
  log_file: "log/garnet.log",
  log_level: "info",
  agent_cache_directory: "cache",
  language: "en",
  interval: 100,
  agent_subprocesses: 10,
  listen_address: "0.0.0.0",
  bind_port: 5000,
  api_server_name: "0.0.0.0",
  api_server_port: 6000,
  api_server_https: false,
  api_server_uri: "/infoset/api/v1"
};

const general = require("./general.js");
const config_directory = path.join(general.root_directory(), "/etc");

// If config.yaml is available, try to load
if (fs.existsSync(path.join(config_directory, "config.yml")))
  CONFIG = general.read_yaml_file(path.join(config_directory, "config.yml"));

exports.log_file = function() {
  return CONFIG.log_file;
};

exports.log_level = function() {
  return CONFIG.log_level;
};

exports.agent_cache_directory = function() {
  return CONFIG.agent_cache_directory;
};

exports.language = function() {
  return CONFIG.language;
};

exports.interval = function() {
  return CONFIG.interval;
};

exports.listen_address = function() {
  return CONFIG.listen_address;
};

exports.bind_port = function() {
  return CONFIG.bind_port;
};

exports.api_server_name = function() {
  return CONFIG.api_server_name;
};

exports.api_server_port = function() {
  return CONFIG.api_server_port;
};

exports.api_server_https = function() {
  return CONFIG.api_server_https;
};

exports.api_server_uri = function() {
  return CONFIG.api_server_uri;
};

exports.agent_subprocesses = function() {
  return CONFIG.agent_subprocesses;
};
