const Sales = require("../models/Sales");
const Purchase = require("../models/Purchase");
const Item = require("../models/Item");
const Ledger = require("../models/Ledger");

// DASHBOARD REPORT
const getDashboardData =
    async () => {
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

        return {
            totalSales:
                totalSales[0]?.total ||
                0,

            totalPurchases:
                totalPurchases[0]
                    ?.total || 0,

            totalItems,

            totalLedgers,
        };
    };

// SALES REPORT
const getSalesData =
    async () => {
        return await Sales.find()
            .populate(
                "customer"
            )
            .populate(
                "company"
            );
    };

// PURCHASE REPORT
const getPurchaseData =
    async () => {
        return await Purchase.find()
            .populate(
                "supplier"
            )
            .populate(
                "company"
            );
    };

// STOCK REPORT
const getStockData =
    async () => {
        return await Item.find();
    };

module.exports = {
    getDashboardData,
    getSalesData,
    getPurchaseData,
    getStockData,
};