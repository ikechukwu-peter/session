import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator';


export const validateUserLogin = [
    check('email')
        .trim()
        .normalizeEmail()
        .not()
        .isEmpty()
        .withMessage('Invalid email address!')
        .bail(),
    check("password")
        .isLength({ min: 4})
        .withMessage("your password should have a length of 4"),
    (req: Request, res: Response, next: NextFunction) => {
        const error = validationResult(req).formatWith(({ msg }) => msg);

        const hasError = !error.isEmpty();

        if (hasError) {
            res.status(422).json({ error: error.mapped() });
        } else {
            next();
        }
    },
];

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
    check("datetime")
        .not()
        .isEmpty()
        .withMessage('You must provide a date and time!')
        .bail(),
    (req: Request, res: Response, next: NextFunction) => {
        const error = validationResult(req).formatWith(({ msg }) => msg);

        const hasError = !error.isEmpty();

        if (hasError) {
            res.status(422).json({ err: error.array() });
        } else {
            next();
        }
    },
];
