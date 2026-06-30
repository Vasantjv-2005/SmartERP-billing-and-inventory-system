const ActivityLog = require("../models/ActivityLog");

// CREATE ACTIVITY LOG
const createActivityLog = async (req, res) => {
    try {
        const activityLog = await ActivityLog.create(req.body);

        res.status(201).json({
            success: true,
            message: "Activity log created successfully",
            activityLog,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ALL ACTIVITY LOGS
const getActivityLogs = async (req, res) => {
    try {
        const activityLogs = await ActivityLog.find()
            .populate("user", "name email")
            .populate("company", "companyName")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: activityLogs.length,
            activityLogs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ACTIVITY LOG BY ID
const getActivityLogById = async (req, res) => {
    try {
        const activityLog = await ActivityLog.findById(req.params.id)
            .populate("user", "name email")
            .populate("company", "companyName");

        if (!activityLog) {
            return res.status(404).json({
                success: false,
                message: "Activity log not found",
            });
        }

        res.status(200).json({
            success: true,
            activityLog,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE ACTIVITY LOG
const deleteActivityLog = async (req, res) => {
    try {
        const activityLog = await ActivityLog.findById(req.params.id);

        if (!activityLog) {
            return res.status(404).json({
                success: false,
                message: "Activity log not found",
            });
        }

        await activityLog.deleteOne();

        res.status(200).json({
            success: true,
            message: "Activity log deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET USER ACTIVITY
const getUserActivity = async (req, res) => {
    try {
        const logs = await ActivityLog.find({
            user: req.params.userId,
        })
            .sort({ createdAt: -1 })
            .populate("company", "companyName");

        res.status(200).json({
            success: true,
            count: logs.length,
            activityLogs: logs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createActivityLog,
    getActivityLogs,
    getActivityLogById,
    deleteActivityLog,
    getUserActivity,
};