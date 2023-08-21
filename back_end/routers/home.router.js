const router = require("express").Router();

const { getHome, scrapeLogic } = require("../controllers/home.controller");

router.get("/", getHome);
router.get("/carousel", scrapeLogic);

module.exports = router;
