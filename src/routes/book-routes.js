const express = require("express");
const router = express.Router();

bookController = require("../controllers/book-controller");

router.get("/", bookController.findAll);
router.get("/:bookCode", bookController.findByCode);
router.post("/:memberCode/borrow", bookController.borrowBook);
router.post("/:memberCode/return", bookController.returnBook);

module.exports = router;
