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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.signup = exports.login = void 0;
const authService_1 = require("../services/authService");
let login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield authService_1.loginService(req.body);
        res.status(200).json({
            userData
        });
    }
    catch (err) {
        res.status(401).json({
            err
        });
    }
});
exports.login = login;
let signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield authService_1.registerService(req.body);
        res.status(201).json({
            userData
        });
    }
    catch (err) {
        res.status(400).json({
            err
        });
    }
});
exports.signup = signup;
let forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const changed = yield authService_1.forgotPasswordService(req.body.email);
        res.status(200).json(changed);
    }
    catch (e) {
        res.status(400).json(e);
    }
});
exports.forgotPassword = forgotPassword;
let resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reset = yield authService_1.resetPasswordService(req.body.password, req.user);
        res.status(200).json(reset);
    }
    catch (e) {
        res.status(400).json(e);
    }
});
exports.resetPassword = resetPassword;
