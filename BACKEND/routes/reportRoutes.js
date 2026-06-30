const express = require("express");
const router = express.Router();

const {
    getSalesReport,
    getPurchaseReport,
    getStockReport,
    getLedgerReport,
    getProfitLossReport,
} = require("../controllers/reportController");

const protect = require("../middleware/authMiddleware");

// SALES REPORT
router.get("/sales", protect, getSalesReport);

// PURCHASE REPORT
router.get("/purchases", protect, getPurchaseReport);

// STOCK REPORT
router.get("/stock", protect, getStockReport);

// LEDGER REPORT
router.get("/ledger", protect, getLedgerReport);

// PROFIT & LOSS REPORT
router.get("/profit-loss", protect, getProfitLossReport);

module.exports = router;