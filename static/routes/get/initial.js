const Infoset = require("../../utils/infoset.js");
const API = require("../../utils/api.js");

function initial(req, res, err) {
  var idx_device = Infoset.idx_device();
  var idx_agent = Infoset.idx_agent();

  var data;
  data = API.get("agents/" + idx_agent);

  res.send({
    agent: "1",
    idx_agent: "1"
  });
}

module.exports = initial;
