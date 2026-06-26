const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },

        module: {
            type: String,
            enum: [
                "Authentication",
                "Company",
                "Customer",
                "Supplier",
                "Category",
                "Item",
                "Purchase",
                "Sales",
                "Stock",
                "Expense",
                "Payment",
                "Receipt",
                "Invoice",
                "Employee",
                "Attendance",
                "Financial Year",
                "System",
            ],
            required: true,
        },

        action: {
            type: String,
            enum: [
                "Create",
                "Update",
                "Delete",
                "View",
                "Login",
                "Logout",
                "Approve",
                "Reject",
                "Print",
                "Export",
            ],
            required: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        documentId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },

        documentType: {
            type: String,
            default: "",
        },

        ipAddress: {
            type: String,
            default: "",
        },

        device: {
            type: String,
            default: "",
        },

        browser: {
            type: String,
            default: "",
        },

        operatingSystem: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: [
                "Success",
                "Failed",
            ],
            default: "Success",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "ActivityLog",
    activityLogSchema
);