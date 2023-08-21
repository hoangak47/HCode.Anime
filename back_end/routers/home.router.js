const router = require("express").Router();

const { getHome, test } = require("../controllers/home.controller");

router.get("/", getHome);
router.get("/carousel", test);

module.exports = router;
