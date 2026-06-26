const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema(
    {
        receiptNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        voucherNumber: {
            type: String,
            required: true,
            trim: true,
        },

        ledger: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ledger",
            required: true,
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
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
                "NEFT",
                "RTGS",
                "IMPS",
            ],
            required: true,
        },

        receiptDate: {
            type: Date,
            default: Date.now,
        },

        referenceNumber: {
            type: String,
            default: "",
            trim: true,
        },

        bankName: {
            type: String,
            default: "",
            trim: true,
        },

        chequeNumber: {
            type: String,
            default: "",
            trim: true,
        },

        remarks: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Received",
                "Cancelled",
            ],
            default: "Received",
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
    "Receipt",
    receiptSchema
);