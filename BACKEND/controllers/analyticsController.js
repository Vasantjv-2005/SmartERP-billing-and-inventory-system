const Sales = require("../models/Sales");
const Purchase = require("../models/Purchase");
const Item = require("../models/Item");
const Ledger = require("../models/Ledger");

// DASHBOARD ANALYTICS
const getAnalytics = async (req, res) => {
    try {
        // TOTAL SALES
        const salesResult = await Sales.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: {
                        $sum: "$totalAmount",
                    },
                },
            },
        ]);

        // TOTAL PURCHASES
        const purchaseResult = await Purchase.aggregate([
            {
                $group: {
                    _id: null,
                    totalPurchases: {
                        $sum: "$totalAmount",
                    },
                },
            },
        ]);

        const totalSales =
            salesResult.length > 0
                ? salesResult[0].totalSales
                : 0;

        const totalPurchases =
            purchaseResult.length > 0
                ? purchaseResult[0].totalPurchases
                : 0;

        const totalProfit =
            totalSales - totalPurchases;

        const totalItems =
            await Item.countDocuments();

        const totalCustomers =
            await Ledger.countDocuments({
                ledgerType: "Customer",
            });

        const totalSuppliers =
            await Ledger.countDocuments({
                ledgerType: "Supplier",
            });

        const lowStockItems =
            await Item.find({
                stock: {
                    $lte: 10,
                },
            }).select(
                "itemName stock"
            );

        res.status(200).json({
            success: true,
            analytics: {
                totalSales,
                totalPurchases,
                totalProfit,
                totalItems,
                totalCustomers,
                totalSuppliers,
                lowStockCount:
                    lowStockItems.length,
                lowStockItems,
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// MONTHLY SALES
const getMonthlySales = async (req, res) => {
    try {
        const monthlySales =
            await Sales.aggregate([
                {
                    $group: {
                        _id: {
                            month: {
                                $month:
                                    "$createdAt",
                            },
                        },
                        totalSales: {
                            $sum:
                                "$totalAmount",
                        },
                    },
                },
                {
                    $sort: {
                        "_id.month": 1,
                    },
                },
            ]);

        res.status(200).json({
            success: true,
            monthlySales,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// MONTHLY PURCHASES
const getMonthlyPurchases =
    async (req, res) => {
        try {
            const monthlyPurchases =
                await Purchase.aggregate([
                    {
                        $group: {
                            _id: {
                                month: {
                                    $month:
                                        "$createdAt",
                                },
                            },
                            totalPurchases: {
                                $sum:
                                    "$totalAmount",
                            },
                        },
                    },
                    {
                        $sort: {
                            "_id.month": 1,
                        },
                    },
                ]);

            res.status(200).json({
                success: true,
                monthlyPurchases,
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// TOP SELLING ITEMS
const getTopSellingItems =
    async (req, res) => {
        try {
            const items =
                await Item.find()
                    .sort({
                        stock: -1,
                    })
                    .limit(10);

            res.status(200).json({
                success: true,
                items,
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
    getAnalytics,
    getMonthlySales,
    getMonthlyPurchases,
    getTopSellingItems,
};