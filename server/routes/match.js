// routes/match.js
const express = require("express");
const router = express.Router();
const Match = require("../models/Match");
const User = require("../models/User");
const {matchUser} = require("../controllers/matchController")

router.post("/", matchUser)
module.exports = router;
