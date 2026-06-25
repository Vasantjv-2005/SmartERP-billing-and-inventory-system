const FinancialYear = require("../models/FinancialYear");

// CREATE FINANCIAL YEAR
const createFinancialYear = async (req, res) => {
    try {
        const {
            yearName,
            startDate,
            endDate,
            isActive,
            company,
        } = req.body;

        const financialYearExists =
            await FinancialYear.findOne({
                yearName,
                company,
            });

        if (financialYearExists) {
            return res.status(400).json({
                success: false,
                message:
                    "Financial Year already exists",
            });
        }

        const financialYear =
            await FinancialYear.create({
                yearName,
                startDate,
                endDate,
                isActive,
                company,
            });

        res.status(201).json({
            success: true,
            message:
                "Financial Year created successfully",
            financialYear,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ALL FINANCIAL YEARS
const getFinancialYears = async (req, res) => {
    try {
        const financialYears =
            await FinancialYear.find()
                .populate(
                    "company",
                    "companyName"
                )
                .sort({
                    startDate: -1,
                });

        res.status(200).json({
            success: true,
            financialYears,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET FINANCIAL YEAR BY ID
const getFinancialYearById =
    async (req, res) => {
        try {
            const financialYear =
                await FinancialYear.findById(
                    req.params.id
                ).populate(
                    "company"
                );

            if (!financialYear) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Financial Year not found",
                });
            }

            res.status(200).json({
                success: true,
                financialYear,
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// UPDATE FINANCIAL YEAR
const updateFinancialYear =
    async (req, res) => {
        try {
            const financialYear =
                await FinancialYear.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new: true,
                        runValidators: true,
                    }
                );

            if (!financialYear) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Financial Year not found",
                });
            }

            res.status(200).json({
                success: true,
                message:
                    "Financial Year updated successfully",
                financialYear,
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// DELETE FINANCIAL YEAR
const deleteFinancialYear =
    async (req, res) => {
        try {
            const financialYear =
                await FinancialYear.findById(
                    req.params.id
                );

            if (!financialYear) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Financial Year not found",
                });
            }

            await financialYear.deleteOne();

            res.status(200).json({
                success: true,
                message:
                    "Financial Year deleted successfully",
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// SET ACTIVE FINANCIAL YEAR
const setActiveFinancialYear =
    async (req, res) => {
        try {
            const { id } = req.params;

            // Make all financial years inactive
            await FinancialYear.updateMany(
                {},
                {
                    isActive: false,
                }
            );

            // Activate selected financial year
            const financialYear =
                await FinancialYear.findByIdAndUpdate(
                    id,
                    {
                        isActive: true,
                    },
                    {
                        new: true,
                    }
                );

            if (!financialYear) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Financial Year not found",
                });
            }

            res.status(200).json({
                success: true,
                message:
                    "Financial Year activated successfully",
                financialYear,
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
    createFinancialYear,
    getFinancialYears,
    getFinancialYearById,
    updateFinancialYear,
    deleteFinancialYear,
    setActiveFinancialYear,
};