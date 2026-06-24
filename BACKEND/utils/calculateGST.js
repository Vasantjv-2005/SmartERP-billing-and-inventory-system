// CALCULATE GST

const calculateGST = (
    amount,
    gstRate
) => {
    const gstAmount =
        (amount * gstRate) / 100;

    const totalAmount =
        amount + gstAmount;

    return {
        amount,
        gstRate,
        gstAmount,
        totalAmount,
    };
};

module.exports =
    calculateGST;