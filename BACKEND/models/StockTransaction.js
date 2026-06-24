const mongoose = require("mongoose");

const stockTransactionSchema = new mongoose.Schema(
    {
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
            required: true,
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },

        type: {
            type: String,
            enum: ["IN", "OUT"],
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
        },

        voucherNumber: {
            type: String,
            default: "",
        },

        remarks: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const StockTransaction = mongoose.model(
    "StockTransaction",
    stockTransactionSchema
);

module.exports = StockTransaction;