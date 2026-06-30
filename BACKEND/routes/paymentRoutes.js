const express = require("express");
const router = express.Router();

const {
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
    getPaymentSummary,
} = require("../controllers/paymentController");

const protect = require("../middleware/authMiddleware");

// CREATE PAYMENT
router.post("/", protect, createPayment);

// GET ALL PAYMENTS
router.get("/", protect, getPayments);

// PAYMENT SUMMARY
router.get("/summary", protect, getPaymentSummary);

// GET PAYMENT BY ID
router.get("/:id", protect, getPaymentById);

// UPDATE PAYMENT
router.put("/:id", protect, updatePayment);

// DELETE PAYMENT
router.delete("/:id", protect, deletePayment);

module.exports = router;