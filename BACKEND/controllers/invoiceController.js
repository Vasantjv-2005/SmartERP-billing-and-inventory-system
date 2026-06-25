const Invoice = require("../models/Invoice");
const Sales = require("../models/Sales");

// CREATE INVOICE
const createInvoice = async (req, res) => {
    try {
        const {
            invoiceNumber,
            sales,
            customer,
            company,
            totalAmount,
            gstAmount,
            paymentStatus,
            dueDate,
            notes,
        } = req.body;

        const invoiceExists = await Invoice.findOne({
            invoiceNumber,
        });

        if (invoiceExists) {
            return res.status(400).json({
                success: false,
                message: "Invoice already exists",
            });
        }

        const invoice = await Invoice.create({
            invoiceNumber,
            sales,
            customer,
            company,
            totalAmount,
            gstAmount,
            paymentStatus,
            dueDate,
            notes,
        });

        res.status(201).json({
            success: true,
            message: "Invoice created successfully",
            invoice,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ALL INVOICES
const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find()
            .populate("sales")
            .populate("customer")
            .populate("company")
            .sort({
                createdAt: -1,
            });

        res.status(200).json({
            success: true,
            invoices,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET SINGLE INVOICE
const getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(
            req.params.id
        )
            .populate("sales")
            .populate("customer")
            .populate("company");

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found",
            });
        }

        res.status(200).json({
            success: true,
            invoice,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE INVOICE
const updateInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Invoice updated successfully",
            invoice,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE INVOICE
const deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findById(
            req.params.id
        );

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found",
            });
        }

        await invoice.deleteOne();

        res.status(200).json({
            success: true,
            message: "Invoice deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DOWNLOAD INVOICE
const downloadInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findById(
            req.params.id
        );

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found",
            });
        }

        res.status(200).json({
            success: true,
            message:
                "PDF generation feature will be integrated here.",
            invoice,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
    downloadInvoice,
};