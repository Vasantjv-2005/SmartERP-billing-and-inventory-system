const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {
        expenseNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        expenseName: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        paymentMethod: {
            type: String,
            enum: [
                "Cash",
                "Bank",
                "UPI",
                "Cheque",
                "Card",
            ],
            required: true,
        },

        expenseDate: {
            type: Date,
            default: Date.now,
        },

        paidTo: {
            type: String,
            default: "",
            trim: true,
        },

        billNumber: {
            type: String,
            default: "",
            trim: true,
        },

        gstAmount: {
            type: Number,
            default: 0,
        },

        totalAmount: {
            type: Number,
            required: true,
        },

        description: {
            type: String,
            default: "",
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        isApproved: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Expense",
    expenseSchema
);