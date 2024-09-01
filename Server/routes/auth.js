const express = require("express");
const { registerUser, loginUser } = require("../controllers/authcontroller");
const router = express.Router();

// Routes
router.post("/signup", registerUser);
router.post("/login", loginUser);

module.exports = router;
