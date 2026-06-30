const express = require("express");
const router = express.Router();

const {
    createFinancialYear,
    getFinancialYears,
    getFinancialYearById,
    updateFinancialYear,
    deleteFinancialYear,
    setActiveFinancialYear,
} = require("../controllers/financialYearController");

const protect = require("../middleware/authMiddleware");

// CREATE FINANCIAL YEAR
router.post("/", protect, createFinancialYear);

// GET ALL FINANCIAL YEARS
router.get("/", protect, getFinancialYears);

// SET ACTIVE FINANCIAL YEAR
router.put("/activate/:id", protect, setActiveFinancialYear);

// GET FINANCIAL YEAR BY ID
router.get("/:id", protect, getFinancialYearById);

// UPDATE FINANCIAL YEAR
router.put("/:id", protect, updateFinancialYear);

// DELETE FINANCIAL YEAR
router.delete("/:id", protect, deleteFinancialYear);

module.exports = router;