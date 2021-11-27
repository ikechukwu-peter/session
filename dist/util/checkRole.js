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
exports.checkUserSession = exports.checkAdmin = exports.checkUser = void 0;
const sessionModel_1 = __importDefault(require("../models/sessionModel"));
let checkUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(req.user.role === 'client')) {
            res.status(403).json({ warning: 'You are not allowed to access this functionality' });
        }
        else {
            next();
        }
    }
    catch (err) {
        res.status(500).json('Internal Server Error');
    }
});
exports.checkUser = checkUser;
let checkAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(req.user.role === 'admin')) {
            res.status(403).json({ warning: 'You are not allowed to access this functionality' });
        }
        else {
            next();
        }
    }
    catch (err) {
        res.status(500).json('Internal Server Error');
    }
});
exports.checkAdmin = checkAdmin;
let checkUserSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let session = yield sessionModel_1.default.findById(req.params.id);
        if (!(JSON.stringify(req.user) === JSON.stringify(session === null || session === void 0 ? void 0 : session.user))) {
            res.status(403).json({ warning: 'Nice try' });
        }
        else {
            next();
        }
    }
    catch (err) {
        res.status(500).json('Internal Server Error');
    }
});
exports.checkUserSession = checkUserSession;
