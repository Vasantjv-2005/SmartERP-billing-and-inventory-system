const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
    {
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },

        attendanceDate: {
            type: Date,
            required: true,
            default: Date.now,
        },

        checkIn: {
            type: String,
            default: "",
        },

        checkOut: {
            type: String,
            default: "",
        },

        workingHours: {
            type: Number,
            default: 0,
        },

        overtimeHours: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            enum: [
                "Present",
                "Absent",
                "Half Day",
                "Leave",
                "Holiday",
            ],
            default: "Present",
        },

        leaveType: {
            type: String,
            enum: [
                "",
                "Sick Leave",
                "Casual Leave",
                "Earned Leave",
                "Maternity Leave",
                "Paternity Leave",
                "Other",
            ],
            default: "",
        },

        remarks: {
            type: String,
            default: "",
        },

        markedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Attendance",
    attendanceSchema
);