const Company = require("../models/Company");

const checkCompany = async (
    req,
    res,
    next
) => {
    try {
        const companyId =
            req.params.companyId ||
            req.body.company;

        if (!companyId) {
            return res.status(400).json({
                success: false,
                message:
                    "Company ID is required",
            });
        }

        const company =
            await Company.findById(
                companyId
            );

        if (!company) {
            return res.status(404).json({
                success: false,
                message:
                    "Company not found",
            });
        }

        req.company = company;

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                error.message,
        });
    }
};

module.exports =
    checkCompany;