const express = require("express");
const router = express.Router();

const {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
} = require("../controllers/itemController");

const protect = require("../middleware/authMiddleware");

// CREATE ITEM
router.post("/", protect, createItem);

// GET ALL ITEMS
router.get("/", protect, getItems);

// GET ITEM BY ID
router.get("/:id", protect, getItemById);

// UPDATE ITEM
router.put("/:id", protect, updateItem);

// DELETE ITEM
router.delete("/:id", protect, deleteItem);

module.exports = router;