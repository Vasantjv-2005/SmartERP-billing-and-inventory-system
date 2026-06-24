const mongoose = require("mongoose");

const companySchema =
    new mongoose.Schema(
        {
            companyName: {
                type: String,
                required: true,
                trim: true,
            },

            gstNumber: {
                type: String,
                required: true,
                unique: true,
                trim: true,
            },

            address: {
                type: String,
                required: true,
            },

            phone: {
                type: String,
                required: true,
            },

            email: {
                type: String,
                required: true,
                lowercase: true,
            },

            owner: {
                type:
                    mongoose.Schema.Types
                        .ObjectId,

                ref: "User",

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
        "Company",
        companySchema
    );