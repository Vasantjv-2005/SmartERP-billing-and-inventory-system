const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
    {
        invoiceNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        sales: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sales",
            required: true,
        },

        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },

        invoiceDate: {
            type: Date,
            default: Date.now,
        },

        dueDate: {
            type: Date,
        },

        subtotal: {
            type: Number,
            required: true,
            min: 0,
        },

        gstAmount: {
            type: Number,
            default: 0,
        },

        discount: {
            type: Number,
            default: 0,
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },

        paymentStatus: {
            type: String,
            enum: [
                "Pending",
                "Partially Paid",
                "Paid",
                "Cancelled",
            ],
            default: "Pending",
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
            default: "Cash",
        },

        qrCode: {
            type: String,
            default: "",
        },

        pdfUrl: {
            type: String,
            default: "",
        },

        notes: {
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
    "Invoice",
    invoiceSchema
);