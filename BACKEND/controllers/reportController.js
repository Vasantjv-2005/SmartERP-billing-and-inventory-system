const Sales = require("../models/Sales");
const Purchase = require("../models/Purchase");
const Item = require("../models/Item");
const Ledger = require("../models/Ledger");

// DASHBOARD REPORT
const getDashboardReport =
    async (req, res) => {
        try {
            const totalSales =
                await Sales.aggregate([
                    {
                        $group: {
                            _id: null,
                            total: {
                                $sum:
                                    "$totalAmount",
                            },
                        },
                    },
                ]);

            const totalPurchases =
                await Purchase.aggregate([
                    {
                        $group: {
                            _id: null,
                            total: {
                                $sum:
                                    "$totalAmount",
                            },
                        },
                    },
                ]);

            const totalItems =
                await Item.countDocuments();

            const totalLedgers =
                await Ledger.countDocuments();

            res.status(200).json({
                success: true,

                dashboard: {
                    totalSales:
                        totalSales[0]
                            ?.total || 0,

                    totalPurchases:
                        totalPurchases[0]
                            ?.total || 0,

                    totalItems,

                    totalLedgers,
                },
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// SALES REPORT
const getSalesReport =
    async (req, res) => {
        try {
            const sales =
                await Sales.find()
                    .populate(
                        "customer"
                    )
                    .populate(
                        "company"
                    );

            res.status(200).json({
                success: true,
                sales,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// PURCHASE REPORT
const getPurchaseReport =
    async (req, res) => {
        try {
            const purchases =
                await Purchase.find()
                    .populate(
                        "supplier"
                    )
                    .populate(
                        "company"
                    );

            res.status(200).json({
                success: true,
                purchases,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// STOCK REPORT
const getStockReport =
    async (req, res) => {
        try {
            const stock =
                await Item.find();

            res.status(200).json({
                success: true,
                stock,
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
    getDashboardReport,
    getSalesReport,
    getPurchaseReport,
    getStockReport,
};