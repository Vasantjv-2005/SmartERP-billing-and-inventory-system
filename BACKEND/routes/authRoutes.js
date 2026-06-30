const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getProfile,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

// REGISTER USER
router.post("/register", registerUser);

// LOGIN USER
router.post("/login", loginUser);

// GET LOGGED-IN USER PROFILE
router.get("/profile", protect, getProfile);

module.exports = router;