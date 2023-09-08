const router = require("express").Router();

const {
  getCategory,
  getCategoryDetail,
} = require("../controllers/category.controller.js");

router.get("/", getCategory);
router.get("/:name/page/:page", getCategoryDetail);

module.exports = router;
