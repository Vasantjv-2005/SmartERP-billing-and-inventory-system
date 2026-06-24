const Item = require("../models/Item");

// INCREASE STOCK
const increaseStock =
    async (
        itemId,
        quantity
    ) => {
        const item =
            await Item.findById(
                itemId
            );

        if (!item) {
            throw new Error(
                "Item not found"
            );
        }

        item.stock += quantity;

        await item.save();

        return item;
    };

// DECREASE STOCK
const decreaseStock =
    async (
        itemId,
        quantity
    ) => {
        const item =
            await Item.findById(
                itemId
            );

        if (!item) {
            throw new Error(
                "Item not found"
            );
        }

        if (
            item.stock <
            quantity
        ) {
            throw new Error(
                "Insufficient stock"
            );
        }

        item.stock -= quantity;

        await item.save();

        return item;
    };

// CHECK STOCK
const checkStock =
    async (
        itemId,
        quantity
    ) => {
        const item =
            await Item.findById(
                itemId
            );

        if (!item) {
            throw new Error(
                "Item not found"
            );
        }

        return (
            item.stock >= quantity
        );
    };

// GET CURRENT STOCK
const getCurrentStock =
    async (itemId) => {
        const item =
            await Item.findById(
                itemId
            );

        if (!item) {
            throw new Error(
                "Item not found"
            );
        }

        return item.stock;
    };

module.exports = {
    increaseStock,
    decreaseStock,
    checkStock,
    getCurrentStock,
};