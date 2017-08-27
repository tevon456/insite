const express = require("express");
const router = express.Router();

//Routes

const initial = require("./get/initial.js");
const agents = require("./get/fetchAgents.js");
const datapoints = require("./get/fetchDatapoints.js");
const areaCharts = require("./get/areaChart.js");
const stackedCharts = require("./get/stackedChart.js");

router.get("/initial", initial);
router.get("/agents", agents);
router.get("/datapoints", datapoints);
router.get("/charts/area/:datapointId", areaCharts);
router.get("/charts/stacked/:id_agent/:stack_type", stackedCharts);

module.exports = router;
