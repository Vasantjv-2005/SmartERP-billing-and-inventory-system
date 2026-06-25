const User = require("../models/User");
const Company = require("../models/Company");
const Item = require("../models/Item");
const Ledger = require("../models/Ledger");
const Purchase = require("../models/Purchase");
const Sales = require("../models/Sales");

// GET DASHBOARD DATA
const getDashboard = async (req, res) => {
    try {
        // COUNTS
        const totalUsers = await User.countDocuments();
        const totalCompanies = await Company.countDocuments();
        const totalItems = await Item.countDocuments();
        const totalLedgers = await Ledger.countDocuments();

        // SALES TOTAL
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

        // PURCHASE TOTAL
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

        // PROFIT
        const totalProfit =
            totalSales - totalPurchases;

        // LOW STOCK ITEMS
        const lowStockItems =
            await Item.find({
                stock: {
                    $lte: 10,
                },
            }).select(
                "itemName stock"
            );

        // RECENT SALES
        const recentSales =
            await Sales.find()
                .sort({
                    createdAt: -1,
                })
                .limit(5);

        // RECENT PURCHASES
        const recentPurchases =
            await Purchase.find()
                .sort({
                    createdAt: -1,
                })
                .limit(5);

        res.status(200).json({
            success: true,

            dashboard: {
                totalUsers,
                totalCompanies,
                totalItems,
                totalLedgers,

                totalSales,
                totalPurchases,
                totalProfit,

                lowStockCount:
                    lowStockItems.length,

                lowStockItems,

                recentSales,

                recentPurchases,
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
    getDashboard,
};