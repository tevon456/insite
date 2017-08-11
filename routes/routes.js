const express = require ('express');
const router = express.Router ();

//Routes
<<<<<<< HEAD
const initial = require ('./get/initial.js');

router.get ('/initial', initial);
=======
const initial = require("./get/initial.js");
const stackedCharts = require("./get/stackedChart.js");

router.get("/initial", initial);
router.get("/charts/stacked/:id_agent/:stack_type", stackedCharts);
>>>>>>> upstream/master

module.exports = router;
