const express = require("express");
const router = express.Router();

//Routes
const initial = require("./get/initial.js");
const stackedCharts = require("./get/stackedChart.js");

router.get("/initial", initial);
router.get("/charts/stacked/:id_agent/:stack_type", stackedCharts);

module.exports = router;
