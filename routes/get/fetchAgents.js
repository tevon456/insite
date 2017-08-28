const Infoset = require("../../utils/infoset.js");
const API = require("../../utils/api.js");

const infoset = new Infoset();

async function fetchAgents(req, res, err) {
  try {
    var agents = await API.get("agents");
  } catch (error) {
    console.log(error);
  }
  res.send(agents.data);
}

module.exports = fetchAgents;
