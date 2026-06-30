const express = require("express");
const router = express.Router();

const {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany,
} = require("../controllers/companyController");

const protect = require("../middleware/authMiddleware");

// CREATE COMPANY
router.post("/", protect, createCompany);

// GET ALL COMPANIES
router.get("/", protect, getCompanies);

// GET COMPANY BY ID
router.get("/:id", protect, getCompanyById);

// UPDATE COMPANY
router.put("/:id", protect, updateCompany);

// DELETE COMPANY
router.delete("/:id", protect, deleteCompany);

module.exports = router;