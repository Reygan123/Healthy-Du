const errorHandler = (err, req, res, next) => {
    console.log(err)
    if (err.name === "errorNotFound") {
        res.status(404).json({ status: false, message: "Error Not Found" });
    } else if (err.name === "Unauthenticated") {
        res.status(401).json({ status: false, message: "Unauthenticated User" });
    } else if (err.name === "userAlreadyExist") {
        res
            .status(400)
            .json({ status: false, message: "User Email or Username Already Exist" });
    } else if (err.name === "TokenExpiredError") {
        res.status(400).json({ status: false, message: "Token is Expired" });
    } else if (err.name === "JsonWebTokenError") {
        res.status(404).json({ status: false, message: "Token is invalid" });
    } else if (err.name === "SequelizeUniqueConstraintError") {
        let messages = err.errors.map((currentError) => currentError.message);
        res.status(404).json({ status: false, message: messages });
    } else if (err.name === "SequelizeValidationError") {
        let messages = err.errors.map((currentError) => currentError.message);
        res.status(404).json({ status: false, message: messages });
    } else if (err.name === "lessStockItems") {
        res.status(400).json({ status: false, message: "Less Stock Items" });
    } else if (err.name === "InvalidCredentials") {
        res
            .status(400)
            .json({ status: false, message: "Wrong Email or Username and Password" });
    } else if (err.name === "insufficientQuantity") {
        res.status(400).json({ status: false, message: "Insufficient quantity of items" });
    } else if (err.name === "itemPriceIncorect") {
        res.status(400).json({ status: false, message: "Item price input is incorrect" });
    } else if (err.name === "FileNotExists") {
        res.status(500).json({ status: false, message: "File Required!" })
    }
    else {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

module.exports = errorHandler;
