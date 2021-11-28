import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator';

export const validateBooking = [
    check("title")
        .escape()
        .not()
        .isEmpty()
        .withMessage('title can not be empty!')
        .bail()
        .isLength({ min: 10, max: 60 })
        .withMessage('Title should be between 10-60 characters')
        .bail(),
    check("body")
        .escape()
        .not()
        .isEmpty()
        .isLength({ min: 50, max: 400 })
        .withMessage("your message should be between 50-400 characters"),
    check("date")
        .not()
        .isEmpty()
        .withMessage('You must provide a date and time!')
        .bail(),
    (req: Request, res: Response, next: NextFunction) => {
        const error = validationResult(req).formatWith(({ msg }) => msg);

        const hasError = !error.isEmpty();

        if (hasError) {
            res.status(422).json({ error: error.array() });
        } else {
            next();
        }
    },
];
