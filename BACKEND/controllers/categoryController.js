const Category = require("../models/Category");

// CREATE CATEGORY
const createCategory = async (req, res) => {
    try {
        const {
            categoryName,
            description,
            company,
        } = req.body;

        const categoryExists =
            await Category.findOne({
                categoryName,
                company,
            });

        if (categoryExists) {
            return res.status(400).json({
                success: false,
                message:
                    "Category already exists",
            });
        }

        const category =
            await Category.create({
                categoryName,
                description,
                company,
            });

        res.status(201).json({
            success: true,
            message:
                "Category created successfully",
            category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                error.message,
        });
    }
};

// GET ALL CATEGORIES
const getCategories =
    async (req, res) => {
        try {
            const categories =
                await Category.find()
                    .populate(
                        "company",
                        "companyName"
                    );

            res.status(200).json({
                success: true,
                categories,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// GET SINGLE CATEGORY
const getCategoryById =
    async (req, res) => {
        try {
            const category =
                await Category.findById(
                    req.params.id
                );

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Category not found",
                });
            }

            res.status(200).json({
                success: true,
                category,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// UPDATE CATEGORY
const updateCategory =
    async (req, res) => {
        try {
            const category =
                await Category.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new: true,
                        runValidators: true,
                    }
                );

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Category not found",
                });
            }

            res.status(200).json({
                success: true,
                message:
                    "Category updated successfully",
                category,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// DELETE CATEGORY
const deleteCategory =
    async (req, res) => {
        try {
            const category =
                await Category.findById(
                    req.params.id
                );

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Category not found",
                });
            }

            await category.deleteOne();

            res.status(200).json({
                success: true,
                message:
                    "Category deleted successfully",
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
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};