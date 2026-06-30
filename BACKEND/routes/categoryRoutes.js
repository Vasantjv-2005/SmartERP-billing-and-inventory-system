const express = require("express");
const router = express.Router();

const {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryController");

const protect = require("../middleware/authMiddleware");

// CREATE CATEGORY
router.post("/", protect, createCategory);

// GET ALL CATEGORIES
router.get("/", protect, getCategories);

// GET CATEGORY BY ID
router.get("/:id", protect, getCategoryById);

// UPDATE CATEGORY
router.put("/:id", protect, updateCategory);

// DELETE CATEGORY
router.delete("/:id", protect, deleteCategory);

module.exports = router;