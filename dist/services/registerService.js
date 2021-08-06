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
//@ts-ignore
const randity_1 = __importDefault(require("randity"));
const userModel_1 = __importDefault(require("../models/userModel"));
const emailService_1 = __importDefault(require("./emailService"));
let registerService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, role } = userData;
    const password = randity_1.default(4);
    try {
        if (!email || !username) {
            return Promise.reject('Please provide username and email');
        }
        let newUser = yield userModel_1.default.create({
            username,
            email,
            password,
            role
        });
        //the message sent along with the url for verification
        const message = `You have just signed up for a session , here is your passcode ${password}. \nIf you didn't sign up for a Session please ignore this email.`;
        const html = `<strong>You have just signed up for a Session, here is your passcode ${password}. \n <br /> If you didn't sign up for a Session please ignore this email.</strong>`;
        //email sent here
        yield emailService_1.default({
            email,
            subject: " Session, Here is Your Passcode",
            html,
            message,
        });
        return Promise.resolve("Please check your email to see your passcode, use the code to login");
    }
    catch (err) {
        return Promise.reject({
            from: 'Signup',
            err
        });
    }
});
exports.default = registerService;
