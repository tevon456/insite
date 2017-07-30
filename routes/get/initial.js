const Infoset = require("../../utils/infoset.js");
const API = require("../../utils/api.js");

const infoset = new Infoset();

async function initial(req, res, err) {
  var idx_device = infoset.getIdxDevice();
  var idx_agent = infoset.getIdxAgent();

  var data;
  data = await API.get("agents/" + idx_agent);

  res.send({
    agent: "1",
    idx_agent: "1"
  });
}

module.exports = initial;
