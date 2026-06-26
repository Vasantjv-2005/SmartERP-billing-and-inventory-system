const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        categoryCode: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        categoryName: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        parentCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: null,
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
    "Category",
    categorySchema
);