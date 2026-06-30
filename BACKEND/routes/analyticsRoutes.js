const express = require("express");
const router = express.Router();

const {
    getAnalytics,
    getMonthlySales,
    getMonthlyPurchases,
    getTopSellingItems,
} = require("../controllers/analyticsController");

const protect = require("../middleware/authMiddleware");

// DASHBOARD ANALYTICS
router.get("/", protect, getAnalytics);

// MONTHLY SALES REPORT
router.get("/monthly-sales", protect, getMonthlySales);

// MONTHLY PURCHASE REPORT
router.get(
    "/monthly-purchases",
    protect,
    getMonthlyPurchases
);

// TOP SELLING ITEMS
router.get(
    "/top-selling-items",
    protect,
    getTopSellingItems
);

module.exports = router;