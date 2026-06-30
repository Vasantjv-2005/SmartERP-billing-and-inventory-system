const express = require("express");
const router = express.Router();

const {
    createInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
    downloadInvoice,
} = require("../controllers/invoiceController");

const protect = require("../middleware/authMiddleware");

// CREATE INVOICE
router.post("/", protect, createInvoice);

// GET ALL INVOICES
router.get("/", protect, getInvoices);

// DOWNLOAD INVOICE
router.get("/download/:id", protect, downloadInvoice);

// GET SINGLE INVOICE
router.get("/:id", protect, getInvoiceById);

// UPDATE INVOICE
router.put("/:id", protect, updateInvoice);

// DELETE INVOICE
router.delete("/:id", protect, deleteInvoice);

module.exports = router;