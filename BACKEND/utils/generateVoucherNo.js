const generateVoucherNo = (
    type,
    count
) => {
    let prefix = "";

    switch (type) {
        case "PURCHASE":
            prefix = "PUR";
            break;

        case "SALES":
            prefix = "SAL";
            break;

        case "PAYMENT":
            prefix = "PAY";
            break;

        case "RECEIPT":
            prefix = "REC";
            break;

        case "JOURNAL":
            prefix = "JV";
            break;

        default:
            prefix = "VCH";
    }

    return `${prefix}-${String(
        count + 1
    ).padStart(3, "0")}`;
};

module.exports =
    generateVoucherNo;