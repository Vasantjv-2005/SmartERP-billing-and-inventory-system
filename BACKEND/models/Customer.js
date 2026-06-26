const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
    {
        customerCode: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        customerName: {
            type: String,
            required: true,
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

        openingBalance: {
            type: Number,
            default: 0,
        },

        currentBalance: {
            type: Number,
            default: 0,
        },

        creditLimit: {
            type: Number,
            default: 0,
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
    "Customer",
    customerSchema
);