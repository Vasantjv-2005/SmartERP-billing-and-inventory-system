const Purchase = require("../models/Purchase");
const Item = require("../models/Item");

// CREATE PURCHASE
const createPurchase = async (
    req,
    res
) => {
    try {
        const {
            supplier,
            items,
            totalAmount,
            gstAmount,
            voucherNumber,
            company,
        } = req.body;

        const purchase =
            await Purchase.create({
                supplier,
                items,
                totalAmount,
                gstAmount,
                voucherNumber,
                company,
            });

        // UPDATE STOCK
        for (const item of items) {
            const existingItem =
                await Item.findById(
                    item.item
                );

            if (existingItem) {
                existingItem.stock +=
                    item.quantity;

                await existingItem.save();
            }
        }

        res.status(201).json({
            success: true,
            message:
                "Purchase created successfully",
            purchase,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                error.message,
        });
    }
};

// GET ALL PURCHASES
const getPurchases =
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

// GET SINGLE PURCHASE
const getPurchaseById =
    async (req, res) => {
        try {
            const purchase =
                await Purchase.findById(
                    req.params.id
                );

            if (!purchase) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Purchase not found",
                    });
            }

            res.status(200).json({
                success: true,
                purchase,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// DELETE PURCHASE
const deletePurchase =
    async (req, res) => {
        try {
            const purchase =
                await Purchase.findById(
                    req.params.id
                );

            if (!purchase) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Purchase not found",
                    });
            }

            await purchase.deleteOne();

            res.status(200).json({
                success: true,
                message:
                    "Purchase deleted successfully",
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
    createPurchase,
    getPurchases,
    getPurchaseById,
    deletePurchase,
};