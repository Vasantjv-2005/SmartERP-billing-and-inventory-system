const formatDate = (
    date = new Date()
) => {
    return new Date(date)
        .toISOString()
        .split("T")[0];
};

const getCurrentDate =
    () => {
        return new Date();
    };

const getCurrentYear =
    () => {
        return new Date().getFullYear();
    };

const getCurrentMonth =
    () => {
        return (
            new Date().getMonth() +
            1
        );
    };

module.exports = {
    formatDate,
    getCurrentDate,
    getCurrentYear,
    getCurrentMonth,
};