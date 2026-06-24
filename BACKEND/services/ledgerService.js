const Ledger = require("../models/Ledger");

// FIND LEDGER BY ID
const getLedgerById =
    async (ledgerId) => {
        return await Ledger.findById(
            ledgerId
        );
    };

// UPDATE BALANCE
const updateLedgerBalance =
    async (
        ledgerId,
        amount,
        type
    ) => {
        const ledger =
            await Ledger.findById(
                ledgerId
            );

        if (!ledger) {
            throw new Error(
                "Ledger not found"
            );
        }

        if (type === "CREDIT") {
            ledger.currentBalance +=
                amount;
        }

        if (type === "DEBIT") {
            ledger.currentBalance -=
                amount;
        }

        await ledger.save();

        return ledger;
    };

// GET ALL LEDGERS
const getAllLedgers =
    async () => {
        return await Ledger.find();
    };

module.exports = {
    getLedgerById,
    updateLedgerBalance,
    getAllLedgers,
};