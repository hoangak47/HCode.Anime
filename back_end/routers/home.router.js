const router = require("express").Router();

const { getHome, schedule } = require("../controllers/home.controller");

router.get("/", getHome);
router.get("/schedule", schedule);

module.exports = router;
