const mongoose = require("mongoose");

const financialYearSchema = new mongoose.Schema(
    {
        financialYear: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },

        isActive: {
            type: Boolean,
            default: false,
        },

        status: {
            type: String,
            enum: [
                "Open",
                "Closed",
            ],
            default: "Open",
        },

        openingBalance: {
            type: Number,
            default: 0,
        },

        closingBalance: {
            type: Number,
            default: 0,
        },

        totalSales: {
            type: Number,
            default: 0,
        },

        totalPurchases: {
            type: Number,
            default: 0,
        },

        totalExpenses: {
            type: Number,
            default: 0,
        },

        totalIncome: {
            type: Number,
            default: 0,
        },

        totalProfit: {
            type: Number,
            default: 0,
        },

        remarks: {
            type: String,
            default: "",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "FinancialYear",
    financialYearSchema
);