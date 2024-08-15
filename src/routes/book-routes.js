const express = require("express");
const router = express.Router();

bookController = require("../controllers/book-controller");

router.get("/", bookController.findAll);
router.get("/:bookCode", bookController.findByCode);

module.exports = router;
