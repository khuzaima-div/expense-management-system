const express = require("express");
const {getAllusers, getAllexpenses} = require("../controllers/adminController");
const protect = require("../middleware/auth");
const allowRoles = require("../middleware/role");

const router = express.Router();

router.get("/users", protect, allowRoles("admin"), getAllusers);
router.get("/expenses", protect, allowRoles("admin"), getAllexpenses);

module.exports = router;



