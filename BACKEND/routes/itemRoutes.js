const express = require("express");
const router = express.Router();

const {
    createItem,
    getItems,
} = require("../controllers/itemController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createItem);
router.get("/", protect, getItems);

module.exports = router;