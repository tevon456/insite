const express = require("express");
const router = express.Router();

//Routes
const initial = require("./get/initial.js");

router.get("/initial", initial);

module.exports = router;
