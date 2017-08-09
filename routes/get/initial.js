const Infoset = require("../../utils/infoset.js");
const API = require("../../utils/api.js");

const infoset = new Infoset();

async function initial(req, res, err) {
  var idx_device = await infoset.getIdxDevice();
  var idx_agent = await infoset.getIdxAgent();

  var data;
  data = await API.get("agents/" + idx_agent);

  res.send({
    agent: "2",
    idx_agent: "2"
  });
}

module.exports = initial;
