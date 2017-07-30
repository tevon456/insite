"use strict";
const API = require("./api.js");

class Infoset {
  constructor() {}

  async getIdxAgent() {
    let agents;
    let idx_agent;
    try {
      agents = await API.get("agents");
    } catch (error) {
      console.log(error);
    }

    for (var agent of agents.data) {
      if (agent.agent === "collectr") {
        idx_agent = agent.idx_agent;
      }
    }
    return idx_agent;
  }

  async getIdxDevice() {
    let idx_device;
    let device_agents_indices;
    let idx_agent;

    try {
      device_agents_indices = await API.get("deviceagents");
      idx_agent = await this.getIdxAgent();
    } catch (error) {
      console.log(error);
    }

    for (var device_agent of device_agents_indices.data) {
      if (device_agent.idx_agent === idx_agent) {
        idx_device = device_agent.idx_device;
      }
    }
    return idx_device;
  }

  async devicename() {
    let device_data;
    device_data = await API.get("devices/" + idx_device());
    return device_data.data;
  }
}

module.exports = Infoset;
