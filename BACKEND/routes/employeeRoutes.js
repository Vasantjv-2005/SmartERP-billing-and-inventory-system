const express = require("express");
const router = express.Router();

const {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getEmployeeSummary,
} = require("../controllers/employeeController");

const protect = require("../middleware/authMiddleware");

// CREATE EMPLOYEE
router.post("/", protect, createEmployee);

// GET ALL EMPLOYEES
router.get("/", protect, getEmployees);

// EMPLOYEE SUMMARY
router.get("/summary", protect, getEmployeeSummary);

// GET EMPLOYEE BY ID
router.get("/:id", protect, getEmployeeById);

// UPDATE EMPLOYEE
router.put("/:id", protect, updateEmployee);

// DELETE EMPLOYEE
router.delete("/:id", protect, deleteEmployee);

module.exports = router;