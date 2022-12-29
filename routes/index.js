const express = require("express");
const router = express.Router();
const auth = require("./auth");
const question = require("./question");
const answer = require("./answer");
const history = require("./history");
const biodata = require("./biodata");
const user = require("./user");
const notification = require("./notification");

router.use("/", auth);
router.use("/user", user);
router.use("/question", question);
router.use("/answer", answer);
router.use("/history", history);
router.use("/biodata", biodata);
router.use("/notification", notification);
module.exports = router;
