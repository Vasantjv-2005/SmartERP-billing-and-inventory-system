const mongoose = require("mongoose");

const purchaseSchema =
    new mongoose.Schema(
        {
            voucherNumber: {
                type: String,
                required: true,
                unique: true,
            },

            supplier: {
                type:
                    mongoose.Schema.Types
                        .ObjectId,
                ref: "Ledger",
                required: true,
            },

            items: [
                {
                    item: {
                        type:
                            mongoose.Schema.Types
                                .ObjectId,
                        ref: "Item",
                        required: true,
                    },

                    quantity: {
                        type: Number,
                        required: true,
                    },

                    price: {
                        type: Number,
                        required: true,
                    },

                    amount: {
                        type: Number,
                        required: true,
                    },
                },
            ],

            gstAmount: {
                type: Number,
                default: 0,
            },

            totalAmount: {
                type: Number,
                required: true,
            },

            company: {
                type:
                    mongoose.Schema.Types
                        .ObjectId,
                ref: "Company",
                required: true,
            },

            purchaseDate: {
                type: Date,
                default: Date.now,
            },

            notes: {
                type: String,
                default: "",
            },
        },
        {
            timestamps: true,
        }
    );

module.exports =
    mongoose.model(
        "Purchase",
        purchaseSchema
    );