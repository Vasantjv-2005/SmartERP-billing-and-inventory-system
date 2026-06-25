const Ledger = require("../models/Ledger");

// CREATE CUSTOMER
const createCustomer = async (req, res) => {
    try {
        const {
            ledgerName,
            phone,
            email,
            address,
            gstNumber,
            openingBalance,
            company,
        } = req.body;

        const customerExists = await Ledger.findOne({
            ledgerName,
            ledgerType: "Customer",
            company,
        });

        if (customerExists) {
            return res.status(400).json({
                success: false,
                message: "Customer already exists",
            });
        }

        const customer = await Ledger.create({
            ledgerName,
            ledgerType: "Customer",
            phone,
            email,
            address,
            gstNumber,
            openingBalance,
            currentBalance: openingBalance || 0,
            company,
        });

        res.status(201).json({
            success: true,
            message: "Customer created successfully",
            customer,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ALL CUSTOMERS
const getCustomers = async (req, res) => {
    try {
        const customers = await Ledger.find({
            ledgerType: "Customer",
        });

        res.status(200).json({
            success: true,
            customers,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET SINGLE CUSTOMER
const getCustomerById = async (req, res) => {
    try {
        const customer = await Ledger.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        res.status(200).json({
            success: true,
            customer,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE CUSTOMER
const updateCustomer = async (req, res) => {
    try {
        const customer = await Ledger.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Customer updated successfully",
            customer,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE CUSTOMER
const deleteCustomer = async (req, res) => {
    try {
        const customer = await Ledger.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        await customer.deleteOne();

        res.status(200).json({
            success: true,
            message: "Customer deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};