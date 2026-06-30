const express = require("express");
const router = express.Router();

const {
    createLedger,
    getLedgers,
    getLedgerById,
    updateLedger,
    deleteLedger,
} = require("../controllers/ledgerController");

const protect = require("../middleware/authMiddleware");

// CREATE LEDGER
router.post("/", protect, createLedger);

// GET ALL LEDGERS
router.get("/", protect, getLedgers);

// GET LEDGER BY ID
router.get("/:id", protect, getLedgerById);

// UPDATE LEDGER
router.put("/:id", protect, updateLedger);

// DELETE LEDGER
router.delete("/:id", protect, deleteLedger);

module.exports = router;