const express = require("express");
const router = express.Router();

const {
    createPurchase,
    getPurchases,
    getPurchaseById,
    updatePurchase,
    deletePurchase,
} = require("../controllers/purchaseController");

const protect = require("../middleware/authMiddleware");

// CREATE PURCHASE
router.post("/", protect, createPurchase);

// GET ALL PURCHASES
router.get("/", protect, getPurchases);

// GET PURCHASE BY ID
router.get("/:id", protect, getPurchaseById);

// UPDATE PURCHASE
router.put("/:id", protect, updatePurchase);

// DELETE PURCHASE
router.delete("/:id", protect, deletePurchase);

module.exports = router;