const Payment = require("../models/Payment");

// CREATE PAYMENT
const createPayment = async (req, res) => {
    try {
        const {
            voucherNumber,
            ledger,
            amount,
            paymentMethod,
            paymentDate,
            remarks,
            company,
        } = req.body;

        const payment = await Payment.create({
            voucherNumber,
            ledger,
            amount,
            paymentMethod,
            paymentDate,
            remarks,
            company,
        });

        res.status(201).json({
            success: true,
            message: "Payment recorded successfully",
            payment,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ALL PAYMENTS
const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate("ledger", "ledgerName")
            .populate("company", "companyName")
            .sort({
                paymentDate: -1,
            });

        res.status(200).json({
            success: true,
            payments,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET PAYMENT BY ID
const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(
            req.params.id
        )
            .populate("ledger")
            .populate("company");

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });
        }

        res.status(200).json({
            success: true,
            payment,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE PAYMENT
const updatePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Payment updated successfully",
            payment,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE PAYMENT
const deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findById(
            req.params.id
        );

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });
        }

        await payment.deleteOne();

        res.status(200).json({
            success: true,
            message: "Payment deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// PAYMENT SUMMARY
const getPaymentSummary = async (req, res) => {
    try {
        const summary = await Payment.aggregate([
            {
                $group: {
                    _id: null,
                    totalPayments: {
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
                totalPayments: 0,
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
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
    getPaymentSummary,
};