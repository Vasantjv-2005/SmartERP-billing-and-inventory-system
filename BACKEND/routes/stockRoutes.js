const express = require("express");
const router = express.Router();

const {
    getStock,
    stockIn,
    stockOut,
    getStockHistory,
} = require("../controllers/stockController");

const protect = require("../middleware/authMiddleware");

// Current Stock
router.get("/", protect, getStock);

// Add Stock
router.post("/in", protect, stockIn);

// Remove Stock
router.post("/out", protect, stockOut);

// Stock History
router.get(
    "/history",
    protect,
    getStockHistory
);

module.exports = router;