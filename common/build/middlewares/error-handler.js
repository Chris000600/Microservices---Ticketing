"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const custom_error_1 = require("../errors/custom-error");
const errorHandler = (err, req, res, 
// not really used, specific to express library
// a different solution is used to handle async errors ('express-async-errors')
next) => {
    // check if error is one of our expected errors
    if (err instanceof custom_error_1.CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    // unknown errors
    console.error(err);
    res.status(400).send({ errors: [{ message: 'Something went wrong' }] });
};
exports.errorHandler = errorHandler;
