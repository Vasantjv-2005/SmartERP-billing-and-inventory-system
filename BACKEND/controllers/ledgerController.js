const Ledger = require("../models/Ledger");

// CREATE LEDGER
const createLedger = async (
    req,
    res
) => {
    try {
        const {
            ledgerName,
            ledgerType,
            openingBalance,
            company,
        } = req.body;

        const ledger =
            await Ledger.create({
                ledgerName,
                ledgerType,
                openingBalance,
                company,
            });

        res.status(201).json({
            success: true,
            message:
                "Ledger created successfully",
            ledger,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                error.message,
        });
    }
};

// GET ALL LEDGERS
const getLedgers =
    async (req, res) => {
        try {
            const ledgers =
                await Ledger.find();

            res.status(200).json({
                success: true,
                ledgers,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// GET SINGLE LEDGER
const getLedgerById =
    async (req, res) => {
        try {
            const ledger =
                await Ledger.findById(
                    req.params.id
                );

            if (!ledger) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Ledger not found",
                    });
            }

            res.status(200).json({
                success: true,
                ledger,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// UPDATE LEDGER
const updateLedger =
    async (req, res) => {
        try {
            const ledger =
                await Ledger.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new: true,
                    }
                );

            if (!ledger) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Ledger not found",
                    });
            }

            res.status(200).json({
                success: true,
                message:
                    "Ledger updated successfully",
                ledger,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// DELETE LEDGER
const deleteLedger =
    async (req, res) => {
        try {
            const ledger =
                await Ledger.findById(
                    req.params.id
                );

            if (!ledger) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Ledger not found",
                    });
            }

            await ledger.deleteOne();

            res.status(200).json({
                success: true,
                message:
                    "Ledger deleted successfully",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

module.exports = {
    createLedger,
    getLedgers,
    getLedgerById,
    updateLedger,
    deleteLedger,
};