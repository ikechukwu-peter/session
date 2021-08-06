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
const userModel_1 = __importDefault(require("../models/userModel"));
//@ts-ignore
const jwt_decode_1 = __importDefault(require("jwt-decode"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization.split(" ")[1];
    let data = jwt_decode_1.default(token);
    try {
        let user = yield userModel_1.default.findById(data.id);
        if (!(user.role === 'admin')) {
            res.status(403).json({ warning: 'You are not allowed to access this functionality' });
        }
        next();
    }
    catch (err) {
        res.status(500).json('Internal Server Error');
    }
});
