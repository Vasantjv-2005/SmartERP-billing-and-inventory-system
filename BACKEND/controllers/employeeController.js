const Employee = require("../models/Employee");

// CREATE EMPLOYEE
const createEmployee = async (req, res) => {
    try {
        const {
            employeeId,
            name,
            email,
            phone,
            designation,
            department,
            salary,
            joiningDate,
            address,
            company,
        } = req.body;

        const employeeExists = await Employee.findOne({
            employeeId,
        });

        if (employeeExists) {
            return res.status(400).json({
                success: false,
                message: "Employee already exists",
            });
        }

        const employee = await Employee.create({
            employeeId,
            name,
            email,
            phone,
            designation,
            department,
            salary,
            joiningDate,
            address,
            company,
        });

        res.status(201).json({
            success: true,
            message: "Employee created successfully",
            employee,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ALL EMPLOYEES
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
            .populate("company", "companyName")
            .sort({
                createdAt: -1,
            });

        res.status(200).json({
            success: true,
            employees,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET EMPLOYEE BY ID
const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(
            req.params.id
        ).populate("company");

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found",
            });
        }

        res.status(200).json({
            success: true,
            employee,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE EMPLOYEE
const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            employee,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE EMPLOYEE
const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(
            req.params.id
        );

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found",
            });
        }

        await employee.deleteOne();

        res.status(200).json({
            success: true,
            message: "Employee deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// EMPLOYEE SUMMARY
const getEmployeeSummary = async (req, res) => {
    try {
        const totalEmployees =
            await Employee.countDocuments();

        const totalSalary = await Employee.aggregate([
            {
                $group: {
                    _id: null,
                    totalSalary: {
                        $sum: "$salary",
                    },
                },
            },
        ]);

        res.status(200).json({
            success: true,
            summary: {
                totalEmployees,
                totalSalary:
                    totalSalary.length > 0
                        ? totalSalary[0].totalSalary
                        : 0,
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getEmployeeSummary,
};