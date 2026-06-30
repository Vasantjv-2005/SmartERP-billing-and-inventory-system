const express = require("express");
const router = express.Router();

const {
    getStock,
    stockIn,
    stockOut,
    getStockHistory,
} = require("../controllers/stockController");

const protect = require("../middleware/authMiddleware");

// GET CURRENT STOCK
router.get("/", protect, getStock);

// STOCK IN
router.post("/in", protect, stockIn);

// STOCK OUT
router.post("/out", protect, stockOut);

// STOCK TRANSACTION HISTORY
router.get("/history", protect, getStockHistory);

module.exports = router;