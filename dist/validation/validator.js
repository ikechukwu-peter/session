"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBooking = void 0;
const express_validator_1 = require("express-validator");
exports.validateBooking = [
    express_validator_1.check("title")
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('title can not be empty!')
        .bail()
        .isLength({ min: 10, max: 60 })
        .withMessage('Title should be between 10-60 characters')
        .bail(),
    express_validator_1.check("body")
        .escape()
        .not()
        .isEmpty()
        .isLength({ min: 50, max: 400 })
        .withMessage("your message should be between 50-400 characters"),
    (req, res, next) => {
        const error = express_validator_1.validationResult(req).formatWith(({ msg }) => msg);
        const hasError = !error.isEmpty();
        if (hasError) {
            res.status(422).json({ error: error.array() });
        }
        else {
            next();
        }
    },
];
