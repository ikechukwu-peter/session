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
exports.resetPasswordService = exports.forgotPasswordService = exports.registerService = exports.loginService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//@ts-ignore
const randity_1 = __importDefault(require("randity"));
const userModel_1 = __importDefault(require("../models/userModel"));
const emailService_1 = __importDefault(require("./emailService"));
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN,
    });
};
let registerService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, role } = userData;
    const password = randity_1.default(4);
    try {
        if (!email || !username) {
            return Promise.reject('Please provide username and email');
        }
        yield userModel_1.default.create({
            username,
            email,
            password,
            role
        });
        const message = `You have just signed up for a session , here is your password ${password}. \nIf you didn't sign up for a Session, please ignore this email.`;
        const html = `<strong>You have just signed up for a Session, here is your password ${password}. \n <br /> If you didn't sign up for a Session,  please ignore this email.</strong>`;
        //email sent here
        yield emailService_1.default({
            email,
            subject: " Session, Here is Your Password",
            html,
            message,
        });
        return Promise.resolve("Please check your email to see your password, use the code to login");
    }
    catch (err) {
        if (err.code === 11000) {
            return Promise.reject('Email is taken up');
        }
        return Promise.reject({
            from: 'Signup',
            err
        });
    }
});
exports.registerService = registerService;
let loginService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, } = userData;
    try {
        if (!email || !password) {
            return Promise.reject('Please provide email and password');
        }
        // 2) Check if user exists && password is correct
        const user = yield userModel_1.default.findOne({ email }).select("+password");
        if (user === null || !(yield user.comparePassword(password, user.password))) {
            return Promise.reject('Incorrect email or password');
        }
        const token = signToken(user._id);
        user.password = undefined;
        user.dateCreated = undefined;
        user.__v = undefined;
        return Promise.resolve({ token, user });
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.loginService = loginService;
let forgotPasswordService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const password = randity_1.default(4);
    try {
        if (!email) {
            return Promise.reject('Please provide your email');
        }
        const user = yield userModel_1.default.findOne({ email: email });
        if (!user) {
            return Promise.reject("There is no user with this email address");
        }
        user.password = password;
        yield user.save({ validateBeforeSave: false });
        const message = `You have just requested to change your password , here is your password ${password}. \nIf you didn't request for a password change, your account might be compromised, contact the admin.`;
        const html = `<strong>You have just requested to change your password, here is your password ${password}. \n <br /> If you didn't request for a password change, your account might be compromised, contact the admin.</strong>`;
        //email sent here
        yield emailService_1.default({
            email,
            subject: " Session, Here is Your Password ",
            html,
            message,
        });
        return Promise.resolve("Please check your email to see your password, use the code to login");
    }
    catch (err) {
        return Promise.reject({
            err
        });
    }
});
exports.forgotPasswordService = forgotPasswordService;
let resetPasswordService = (password, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userData;
    if (!password) {
        return Promise.reject('Please provide your password');
    }
    // 2) Check if user exists && password is correct
    const user = yield userModel_1.default.findOne({ email: email }).select("+password");
    if (user === null || !(yield user.comparePassword(password, user.password))) {
        return Promise.reject('Incorrect  password');
    }
    const newPassword = randity_1.default(4);
    user.password = newPassword;
    yield user.save();
    const message = `Your password was resetted , here is your password ${newPassword}. \nIf you didn't request a reset, please contact the admin.`;
    const html = `<strong>Your password was resetted, here is your password ${newPassword}. \n <br /> If you didn't request a reset, please contact the admin.</strong>`;
    //email sent here
    yield emailService_1.default({
        email,
        subject: " Session, Here is Your Password after Reset",
        html,
        message,
    });
    return Promise.resolve("Please check your email to see your password, use the password to login");
});
exports.resetPasswordService = resetPasswordService;
