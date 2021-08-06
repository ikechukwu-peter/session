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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN,
    });
};
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
exports.default = loginService;
