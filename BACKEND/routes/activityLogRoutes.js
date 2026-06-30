const express = require("express");
const router = express.Router();

const {
    createActivityLog,
    getActivityLogs,
    getActivityLogById,
    deleteActivityLog,
    getUserActivity,
} = require("../controllers/activityLogController");

const protect = require("../middleware/authMiddleware");

// CREATE ACTIVITY LOG
router.post("/", protect, createActivityLog);

// GET ALL ACTIVITY LOGS
router.get("/", protect, getActivityLogs);

// GET ACTIVITY LOG BY ID
router.get("/:id", protect, getActivityLogById);

// GET USER ACTIVITY
router.get("/user/:userId", protect, getUserActivity);

// DELETE ACTIVITY LOG
router.delete("/:id", protect, deleteActivityLog);

module.exports = router;