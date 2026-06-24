const mongoose = require("mongoose");

const stockTransactionSchema =
    new mongoose.Schema(
        {
            item: {
                type:
                    mongoose.Schema.Types
                        .ObjectId,
                ref: "Item",
                required: true,
            },

            type: {
                type: String,
                enum: [
                    "IN",
                    "OUT",
                ],
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

            company: {
                type:
                    mongoose.Schema.Types
                        .ObjectId,
                ref: "Company",
                required: true,
            },
        },
        {
            timestamps: true,
        }
    );

module.exports =
    mongoose.model(
        "StockTransaction",
        stockTransactionSchema
    );