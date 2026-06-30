const express = require("express");
const router = express.Router();

const {
    createReceipt,
    getReceipts,
    getReceiptById,
    updateReceipt,
    deleteReceipt,
    getReceiptSummary,
} = require("../controllers/receiptController");

const protect = require("../middleware/authMiddleware");

// CREATE RECEIPT
router.post("/", protect, createReceipt);

// GET ALL RECEIPTS
router.get("/", protect, getReceipts);

// RECEIPT SUMMARY
router.get("/summary", protect, getReceiptSummary);

// GET RECEIPT BY ID
router.get("/:id", protect, getReceiptById);

// UPDATE RECEIPT
router.put("/:id", protect, updateReceipt);

// DELETE RECEIPT
router.delete("/:id", protect, deleteReceipt);

module.exports = router;