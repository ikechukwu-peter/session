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
exports.deleteSession = exports.updateSession = exports.getSession = exports.createSession = void 0;
//@ts-ignore
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const sessionService_1 = require("../services/sessionService");
let createSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        let data = jwt_decode_1.default(token);
        const session = yield sessionService_1.createSessionService(req.body, data);
        return res.status(201).json(session);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.createSession = createSession;
let getSession = sessionService_1.getSessionService;
exports.getSession = getSession;
let updateSession = sessionService_1.updateSessionService;
exports.updateSession = updateSession;
let deleteSession = sessionService_1.deleteSessionService;
exports.deleteSession = deleteSession;
