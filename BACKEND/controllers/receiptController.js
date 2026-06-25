const Receipt = require("../models/Receipt");

// CREATE RECEIPT
const createReceipt = async (req, res) => {
    try {
        const {
            voucherNumber,
            ledger,
            amount,
            paymentMethod,
            receiptDate,
            remarks,
            company,
        } = req.body;

        const receipt = await Receipt.create({
            voucherNumber,
            ledger,
            amount,
            paymentMethod,
            receiptDate,
            remarks,
            company,
        });

        res.status(201).json({
            success: true,
            message: "Receipt created successfully",
            receipt,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ALL RECEIPTS
const getReceipts = async (req, res) => {
    try {
        const receipts = await Receipt.find()
            .populate("ledger", "ledgerName")
            .populate("company", "companyName")
            .sort({
                receiptDate: -1,
            });

        res.status(200).json({
            success: true,
            receipts,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET RECEIPT BY ID
const getReceiptById = async (req, res) => {
    try {
        const receipt = await Receipt.findById(req.params.id)
            .populate("ledger")
            .populate("company");

        if (!receipt) {
            return res.status(404).json({
                success: false,
                message: "Receipt not found",
            });
        }

        res.status(200).json({
            success: true,
            receipt,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE RECEIPT
const updateReceipt = async (req, res) => {
    try {
        const receipt = await Receipt.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!receipt) {
            return res.status(404).json({
                success: false,
                message: "Receipt not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Receipt updated successfully",
            receipt,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE RECEIPT
const deleteReceipt = async (req, res) => {
    try {
        const receipt = await Receipt.findById(req.params.id);

        if (!receipt) {
            return res.status(404).json({
                success: false,
                message: "Receipt not found",
            });
        }

        await receipt.deleteOne();

        res.status(200).json({
            success: true,
            message: "Receipt deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// RECEIPT SUMMARY
const getReceiptSummary = async (req, res) => {
    try {
        const summary = await Receipt.aggregate([
            {
                $group: {
                    _id: null,
                    totalReceipts: {
                        $sum: "$amount",
                    },
                    totalTransactions: {
                        $sum: 1,
                    },
                },
            },
        ]);

        res.status(200).json({
            success: true,
            summary: summary[0] || {
                totalReceipts: 0,
                totalTransactions: 0,
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
    createReceipt,
    getReceipts,
    getReceiptById,
    updateReceipt,
    deleteReceipt,
    getReceiptSummary,
};