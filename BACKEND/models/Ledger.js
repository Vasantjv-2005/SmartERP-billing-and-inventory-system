const mongoose = require("mongoose");

const ledgerSchema =
    new mongoose.Schema(
        {
            ledgerName: {
                type: String,
                required: true,
                trim: true,
            },

            ledgerType: {
                type: String,
                required: true,
                enum: [
                    "Customer",
                    "Supplier",
                    "Cash",
                    "Bank",
                    "Sales",
                    "Purchase",
                    "Expense",
                    "Income"
                ],
            },

            openingBalance: {
                type: Number,
                default: 0,
            },

            currentBalance: {
                type: Number,
                default: 0,
            },

            phone: {
                type: String,
                default: "",
            },

            email: {
                type: String,
                default: "",
            },

            address: {
                type: String,
                default: "",
            },

            gstNumber: {
                type: String,
                default: "",
            },

            company: {
                type:
                    mongoose.Schema.Types
                        .ObjectId,

                ref: "Company",

                required: true,
            },

            isActive: {
                type: Boolean,
                default: true,
            },
        },
        {
            timestamps: true,
        }
    );

module.exports =
    mongoose.model(
        "Ledger",
        ledgerSchema
    );