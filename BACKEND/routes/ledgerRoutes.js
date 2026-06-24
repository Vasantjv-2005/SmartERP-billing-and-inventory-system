const express = require("express");
const router = express.Router();

const {
    createLedger,
    getLedgers,
} = require("../controllers/ledgerController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createLedger);
router.get("/", protect, getLedgers);

module.exports = router;