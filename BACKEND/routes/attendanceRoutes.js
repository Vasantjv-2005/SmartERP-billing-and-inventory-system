const express = require("express");
const router = express.Router();

const {
    createAttendance,
    getAttendance,
    getAttendanceById,
    updateAttendance,
    deleteAttendance,
    getEmployeeAttendance,
} = require("../controllers/attendanceController");

const protect = require("../middleware/authMiddleware");

// CREATE ATTENDANCE
router.post("/", protect, createAttendance);

// GET ALL ATTENDANCE
router.get("/", protect, getAttendance);

// GET EMPLOYEE ATTENDANCE
router.get("/employee/:employeeId", protect, getEmployeeAttendance);

// GET ATTENDANCE BY ID
router.get("/:id", protect, getAttendanceById);

// UPDATE ATTENDANCE
router.put("/:id", protect, updateAttendance);

// DELETE ATTENDANCE
router.delete("/:id", protect, deleteAttendance);

module.exports = router;