const router = require("express").Router();

const { getMovie } = require("../controllers/movie.controller.js");

router.get("/:name/:episode", getMovie);

module.exports = router;
