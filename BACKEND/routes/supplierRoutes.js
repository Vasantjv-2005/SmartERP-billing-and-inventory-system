const express = require("express");
const router = express.Router();

const {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
} = require("../controllers/supplierController");

const protect = require("../middleware/authMiddleware");

// CREATE SUPPLIER
router.post("/", protect, createSupplier);

// GET ALL SUPPLIERS
router.get("/", protect, getSuppliers);

// GET SUPPLIER BY ID
router.get("/:id", protect, getSupplierById);

// UPDATE SUPPLIER
router.put("/:id", protect, updateSupplier);

// DELETE SUPPLIER
router.delete("/:id", protect, deleteSupplier);

module.exports = router;