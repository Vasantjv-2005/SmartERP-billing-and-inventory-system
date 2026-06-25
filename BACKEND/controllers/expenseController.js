const Expense = require("../models/Expense");

// CREATE EXPENSE
const createExpense = async (req, res) => {
    try {
        const {
            expenseName,
            category,
            amount,
            paymentMethod,
            expenseDate,
            description,
            company,
        } = req.body;

        const expense = await Expense.create({
            expenseName,
            category,
            amount,
            paymentMethod,
            expenseDate,
            description,
            company,
        });

        res.status(201).json({
            success: true,
            message: "Expense added successfully",
            expense,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ALL EXPENSES
const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find()
            .populate("company", "companyName")
            .sort({ expenseDate: -1 });

        res.status(200).json({
            success: true,
            expenses,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET SINGLE EXPENSE
const getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found",
            });
        }

        res.status(200).json({
            success: true,
            expense,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE EXPENSE
const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            expense,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE EXPENSE
const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found",
            });
        }

        await expense.deleteOne();

        res.status(200).json({
            success: true,
            message: "Expense deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// EXPENSE SUMMARY
const getExpenseSummary = async (req, res) => {
    try {
        const summary = await Expense.aggregate([
            {
                $group: {
                    _id: null,
                    totalExpense: {
                        $sum: "$amount",
                    },
                    totalTransactions: {
                        $sum: 1,
                    },
                },
            },
        ]);

        res.status(200).json({
            success: true,
            summary: summary[0] || {
                totalExpense: 0,
                totalTransactions: 0,
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpenseSummary,
};