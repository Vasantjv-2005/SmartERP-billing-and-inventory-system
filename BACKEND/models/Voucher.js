const mongoose = require("mongoose");

const voucherSchema =
    new mongoose.Schema(
        {
            voucherNumber: {
                type: String,
                required: true,
                unique: true,
                trim: true,
            },

            voucherType: {
                type: String,
                required: true,
                enum: [
                    "PURCHASE",
                    "SALES",
                    "PAYMENT",
                    "RECEIPT",
                    "JOURNAL",
                ],
            },

            referenceId: {
                type:
                    mongoose.Schema.Types
                        .ObjectId,

                required: true,
            },

            company: {
                type:
                    mongoose.Schema.Types
                        .ObjectId,

                ref: "Company",

                required: true,
            },

            amount: {
                type: Number,
                required: true,
            },

            remarks: {
                type: String,
                default: "",
            },

            voucherDate: {
                type: Date,
                default: Date.now,
            },

            createdBy: {
                type:
                    mongoose.Schema.Types
                        .ObjectId,

                ref: "User",

                required: true,
            },
        },
        {
            timestamps: true,
        }
    );

module.exports =
    mongoose.model(
        "Voucher",
        voucherSchema
    );