const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
    {
        supplierCode: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        supplierName: {
            type: String,
            required: true,
            trim: true,
        },

        contactPerson: {
            type: String,
            default: "",
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            default: "",
            trim: true,
            lowercase: true,
        },

        address: {
            type: String,
            default: "",
        },

        city: {
            type: String,
            default: "",
        },

        state: {
            type: String,
            default: "",
        },

        pincode: {
            type: String,
            default: "",
        },

        gstNumber: {
            type: String,
            default: "",
            uppercase: true,
        },

        panNumber: {
            type: String,
            default: "",
            uppercase: true,
        },

        openingBalance: {
            type: Number,
            default: 0,
        },

        currentBalance: {
            type: Number,
            default: 0,
        },

        bankName: {
            type: String,
            default: "",
        },

        accountNumber: {
            type: String,
            default: "",
        },

        ifscCode: {
            type: String,
            default: "",
            uppercase: true,
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model(
    "Supplier",
    supplierSchema
);