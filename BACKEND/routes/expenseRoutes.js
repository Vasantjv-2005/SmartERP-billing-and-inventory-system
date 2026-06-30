const express = require("express");
const router = express.Router();

const {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpenseSummary,
} = require("../controllers/expenseController");

const protect = require("../middleware/authMiddleware");

// CREATE EXPENSE
router.post("/", protect, createExpense);

// GET ALL EXPENSES
router.get("/", protect, getExpenses);

// EXPENSE SUMMARY
router.get("/summary", protect, getExpenseSummary);

// GET EXPENSE BY ID
router.get("/:id", protect, getExpenseById);

// UPDATE EXPENSE
router.put("/:id", protect, updateExpense);

// DELETE EXPENSE
router.delete("/:id", protect, deleteExpense);

module.exports = router;