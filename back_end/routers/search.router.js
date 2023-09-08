const router = require("express").Router();

const { search, searchAll } = require("../controllers/search.controller.js");

router.get("/", search);
router.get("/all", searchAll);

module.exports = router;
