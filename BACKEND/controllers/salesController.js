const Sales = require("../models/Sales");
const Item = require("../models/Item");

// CREATE SALES
const createSale = async (
    req,
    res
) => {
    try {
        const {
            customer,
            items,
            totalAmount,
            gstAmount,
            voucherNumber,
            company,
        } = req.body;

        // CHECK STOCK
        for (const item of items) {
            const existingItem =
                await Item.findById(
                    item.item
                );

            if (!existingItem) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Item not found",
                });
            }

            if (
                existingItem.stock <
                item.quantity
            ) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${existingItem.itemName}`,
                });
            }
        }

        // CREATE SALE
        const sale =
            await Sales.create({
                customer,
                items,
                totalAmount,
                gstAmount,
                voucherNumber,
                company,
            });

        // REDUCE STOCK
        for (const item of items) {
            const existingItem =
                await Item.findById(
                    item.item
                );

            existingItem.stock -=
                item.quantity;

            await existingItem.save();
        }

        res.status(201).json({
            success: true,
            message:
                "Sale created successfully",
            sale,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                error.message,
        });
    }
};

// GET ALL SALES
const getSales = async (
    req,
    res
) => {
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

// GET SINGLE SALE
const getSaleById =
    async (req, res) => {
        try {
            const sale =
                await Sales.findById(
                    req.params.id
                );

            if (!sale) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Sale not found",
                    });
            }

            res.status(200).json({
                success: true,
                sale,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// DELETE SALE
const deleteSale =
    async (req, res) => {
        try {
            const sale =
                await Sales.findById(
                    req.params.id
                );

            if (!sale) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Sale not found",
                    });
            }

            await sale.deleteOne();

            res.status(200).json({
                success: true,
                message:
                    "Sale deleted successfully",
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
    createSale,
    getSales,
    getSaleById,
    deleteSale,
};