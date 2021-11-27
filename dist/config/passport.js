"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const mongoose_1 = __importDefault(require("mongoose"));
const User = mongoose_1.default.model("User");
let options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};
exports.default = (passport) => {
    passport.use(new passport_jwt_1.Strategy(options, (jwt_payload, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User.findById(jwt_payload.id);
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        }
        catch (err) {
            console.log(err);
        }
    })));
};
