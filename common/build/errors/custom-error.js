"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
// this is where typescript excels compared to javascript
// creating a custom abstract class for errors
class CustomError extends Error {
    constructor(message) {
        // necessities for typescript extend feature
        super(message); // message will be sent up to the Error parent class for dev logging purposes
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.CustomError = CustomError;
