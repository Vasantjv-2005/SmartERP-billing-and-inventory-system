const Ledger = require("../models/Ledger");

// CREATE SUPPLIER
const createSupplier = async (req, res) => {
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

        const supplierExists = await Ledger.findOne({
            ledgerName,
            ledgerType: "Supplier",
            company,
        });

        if (supplierExists) {
            return res.status(400).json({
                success: false,
                message: "Supplier already exists",
            });
        }

        const supplier = await Ledger.create({
            ledgerName,
            ledgerType: "Supplier",
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
            message: "Supplier created successfully",
            supplier,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ALL SUPPLIERS
const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Ledger.find({
            ledgerType: "Supplier",
        });

        res.status