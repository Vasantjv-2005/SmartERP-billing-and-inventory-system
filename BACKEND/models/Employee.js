const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        employeeId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        gender: {
            type: String,
            enum: [
                "Male",
                "Female",
                "Other",
            ],
            required: true,
        },

        dateOfBirth: {
            type: Date,
        },

        designation: {
            type: String,
            required: true,
            trim: true,
        },

        department: {
            type: String,
            required: true,
            trim: true,
        },

        salary: {
            type: Number,
            required: true,
            min: 0,
        },

        joiningDate: {
            type: Date,
            required: true,
        },

        employmentType: {
            type: String,
            enum: [
                "Full Time",
                "Part Time",
                "Contract",
                "Intern",
            ],
            default: "Full Time",
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

        emergencyContactName: {
            type: String,
            default: "",
        },

        emergencyContactPhone: {
            type: String,
            default: "",
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
        },

        panNumber: {
            type: String,
            default: "",
        },

        aadhaarNumber: {
            type: String,
            default: "",
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
    "Employee",
    employeeSchema
);