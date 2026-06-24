const express = require("express");
const router = express.Router();

const {
    createPurchase,
    getPurchases,
    getPurchaseById,
    deletePurchase,
} = require("../controllers/purchaseController");

const protect = require("../middleware/authMiddleware");

// Create Purchase
router.post("/", protect, createPurchase);

// Get All Purchases
router.get("/", protect, getPurchases);

// Get Single Purchase
router.get("/:id", protect, getPurchaseById);

// Delete Purchase
router.delete("/:id", protect, deletePurchase);

module.exports = router;