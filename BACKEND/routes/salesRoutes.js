const express = require("express");
const router = express.Router();

const {
    createSale,
    getSales,
    getSaleById,
    updateSale,
    deleteSale,
} = require("../controllers/salesController");

const protect = require("../middleware/authMiddleware");

// CREATE SALE
router.post("/", protect, createSale);

// GET ALL SALES
router.get("/", protect, getSales);

// GET SALE BY ID
router.get("/:id", protect, getSaleById);

// UPDATE SALE
router.put("/:id", protect, updateSale);

// DELETE SALE
router.delete("/:id", protect, deleteSale);

module.exports = router;