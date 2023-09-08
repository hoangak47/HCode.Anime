const router = require("express").Router();

const { getLatestMovie } = require("../controllers/latest-movie.controller.js");

router.get("/page/:page", getLatestMovie);

module.exports = router;
