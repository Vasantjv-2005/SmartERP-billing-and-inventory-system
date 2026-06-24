const mongoose = require("mongoose");

const itemSchema =
    new mongoose.Schema(
        {
            itemName: {
                type: String,
                required: true,
                trim: true,
            },

            hsnCode: {
                type: String,
                required: true,
            },

            gstRate: {
                type: Number,
                required: true,
                default: 0,
            },

            purchasePrice: {
                type: Number,
                required: true,
            },

            sellingPrice: {
                type: Number,
                required: true,
            },

            stock: {
                type: Number,
                default: 0,
            },

            unit: {
                type: String,
                required: true,
                default: "Nos",
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
        "Item",
        itemSchema
    );