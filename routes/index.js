const express = require("express");
const router = express.Router();

const HomeController = require("../controllers/HomeController");

router.get("/api/v1", HomeController.home);

router.use("/api/user", require("./user"));
router.use("/api/book", require("./book"));

console.log("Routes are running fine");
module.exports = router;
