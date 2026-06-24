const express = require("express");
const router = express.Router();

const {
    getDashboardReport,
    getSalesReport,
    getPurchaseReport,
    getStockReport,
} = require("../controllers/reportController");

const protect = require("../middleware/authMiddleware");

// Dashboard Summary
router.get(
    "/dashboard",
    protect,
    getDashboardReport
);

// Sales Report
router.get(
    "/sales",
    protect,
    getSalesReport
);

// Purchase Report
router.get(
    "/purchases",
    protect,
    getPurchaseReport
);

// Stock Report
router.get(
    "/stock",
    protect,
    getStockReport
);

module.exports = router;