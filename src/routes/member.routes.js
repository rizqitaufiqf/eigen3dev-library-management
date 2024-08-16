const express = require("express");
const router = express.Router();

memberController = require("../controllers/member.controller");

router.get("/", memberController.findAll);
router.get("/:memberCode", memberController.findByCode);

module.exports = router;
