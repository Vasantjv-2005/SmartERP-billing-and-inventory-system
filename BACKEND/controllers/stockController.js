const Item = require("../models/Item");
const StockTransaction = require("../models/StockTransaction");

// GET ALL STOCK
const getStock = async (req, res) => {
    try {
        const stock = await Item.find();

        res.status(200).json({
            success: true,
            stock,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// STOCK IN
const stockIn = async (req, res) => {
    try {
        const {
            itemId,
            quantity,
            company,
        } = req.body;

        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }

        item.stock += Number(quantity);

        await item.save();

        await StockTransaction.create({
            item: itemId,
            company,
            type: "IN",
            quantity,
        });

        res.status(200).json({
            success: true,
            message: "Stock added successfully",
            item,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// STOCK OUT
const stockOut = async (req, res) => {
    try {
        const {
            itemId,
            quantity,
            company,
        } = req.body;

        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }

        if (item.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock",
            });
        }

        item.stock -= Number(quantity);

        await item.save();

        await StockTransaction.create({
            item: itemId,
            company,
            type: "OUT",
            quantity,
        });

        res.status(200).json({
            success: true,
            message: "Stock removed successfully",
            item,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// STOCK HISTORY
const getStockHistory = async (req, res) => {
    try {
        const history = await StockTransaction.find()
            .populate("item")
            .populate("company")
            .sort({
                createdAt: -1,
            });

        res.status(200).json({
            success: true,
            history,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getStock,
    stockIn,
    stockOut,
    getStockHistory,
};