const express = require("express");
const router = express.Router();
const home = require("./models/home");
const rests = require("./models/rests");


router.use("/",home);
router.use("/restaurants",rests);

module.exports = router;