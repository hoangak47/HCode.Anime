const router = require("express").Router();

const { getDetail } = require("../controllers/detail.controller.js");

router.get("/:name", getDetail);

module.exports = router;
