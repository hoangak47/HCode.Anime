const router = require("express").Router();

const { getHome, test } = require("../controllers/home.controller");

router.get("/", getHome);
router.get("/schedule", test);

module.exports = router;
