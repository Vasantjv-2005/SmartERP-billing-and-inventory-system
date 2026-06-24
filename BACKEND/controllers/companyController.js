const Company = require("../models/Company");

// CREATE COMPANY
const createCompany = async (
    req,
    res
) => {
    try {
        const {
            companyName,
            gstNumber,
            address,
            phone,
            email,
        } = req.body;

        const company =
            await Company.create({
                companyName,
                gstNumber,
                address,
                phone,
                email,
                owner: req.user.id,
            });

        res.status(201).json({
            success: true,
            message:
                "Company created successfully",
            company,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                error.message,
        });
    }
};

// GET ALL COMPANIES
const getCompanies =
    async (req, res) => {
        try {
            const companies =
                await Company.find({
                    owner:
                        req.user.id,
                });

            res.status(200).json({
                success: true,
                companies,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// GET SINGLE COMPANY
const getCompanyById =
    async (req, res) => {
        try {
            const company =
                await Company.findById(
                    req.params.id
                );

            if (!company) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Company not found",
                    });
            }

            res.status(200).json({
                success: true,
                company,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// UPDATE COMPANY
const updateCompany =
    async (req, res) => {
        try {
            const company =
                await Company.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new: true,
                    }
                );

            if (!company) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Company not found",
                    });
            }

            res.status(200).json({
                success: true,
                message:
                    "Company updated successfully",
                company,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// DELETE COMPANY
const deleteCompany =
    async (req, res) => {
        try {
            const company =
                await Company.findById(
                    req.params.id
                );

            if (!company) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Company not found",
                    });
            }

            await company.deleteOne();

            res.status(200).json({
                success: true,
                message:
                    "Company deleted successfully",
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
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany,
};