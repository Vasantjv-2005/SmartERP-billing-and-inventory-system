const express = require("express");
const router = express.Router();

const {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
} = require("../controllers/customerController");

const protect = require("../middleware/authMiddleware");

// CREATE CUSTOMER
router.post("/", protect, createCustomer);

// GET ALL CUSTOMERS
router.get("/", protect, getCustomers);

// GET CUSTOMER BY ID
router.get("/:id", protect, getCustomerById);

// UPDATE CUSTOMER
router.put("/:id", protect, updateCustomer);

// DELETE CUSTOMER
router.delete("/:id", protect, deleteCustomer);

module.exports = router;