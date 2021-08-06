
/*
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { promisify } from 'util'

//const { promisify } = require("util");

interface IUserRequest extends Request {
    user: any
}

let authenticateService = async (req: IUserRequest, res: Response, next: NextFunction) => {

    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return Promise.reject("You are not logged in. Please log in to get access")
        }

        //Verification of token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        console.log(decoded)

        //check if user still exist

        // const user = await userModel.findById(decoded.id);
        // if (!user) {
        //     return Promise.reject(
        //         "The user belonging to this token does no longer exist"
        //     )
        // }
        // if (user.changedPasswordAfter(decoded.iat)) {
        //     return Promise.reject("User recently changed password. Please log in again",
        //     )
        // }

        // // add user from payload
        // req.user = user;

        next();
    } catch (err) {
        if ((err.name = "JsonWebTokenError")) {
            return Promise.reject("Invalid token. Please log in again!")

        } else if ((err.name = "TokenExpiredError")) {

            return Promise.reject("Token expired. Please log in again!")
        }
        return Promise.reject("Something went wrong!")
    }
}

*/