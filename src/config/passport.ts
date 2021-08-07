import {Request} from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt'
import mongoose from 'mongoose'

const User = mongoose.model("User");

interface options {
    jwtFromRequest: string,
    secretOrKey: string
}

let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

export default (passport: any) => {
    passport.use(
        new Strategy(options, async (jwt_payload: any, done: any) => {
            try {
                const user = await User.findById(jwt_payload.id);
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (err) {
                console.log(err);
            }
        })
    );
};
