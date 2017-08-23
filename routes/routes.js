const express = require ('express');
const router = express.Router ();

//Routes
<<<<<<< HEAD
const initial = require ('./get/initial.js');

router.get ('/initial', initial);
=======
const initial = require("./get/initial.js");
const datapoints = require("./get/fetchDatapoints.js");
const areaCharts = require("./get/areaChart.js");
const stackedCharts = require("./get/stackedChart.js");

router.get("/initial", initial);
router.get("/datapoints", datapoints);
router.get("/charts/area/:datapointId", areaCharts);
router.get("/charts/stacked/:id_agent/:stack_type", stackedCharts);
>>>>>>> upstream/master

module.exports = router;
