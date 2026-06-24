const express = require("express");
const router = express.Router();

const {
    createSale,
    getSales,
    getSaleById,
    deleteSale,
} = require("../controllers/salesController");

const protect = require("../middleware/authMiddleware");

// Create Sale
router.post("/", protect, createSale);

// Get All Sales
router.get("/", protect, getSales);

// Get Single Sale
router.get("/:id", protect, getSaleById);

// Delete Sale
router.delete("/:id", protect, deleteSale);

module.exports = router;