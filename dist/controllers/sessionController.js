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
exports.deleteSession = exports.updateSession = exports.getAllSession = exports.getSession = exports.createSession = void 0;
const sessionService_1 = require("../services/sessionService");
let createSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionData = yield sessionService_1.createSessionService(req.body, req.user);
        return res.status(201).json(sessionData);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.createSession = createSession;
let getSession = sessionService_1.getSessionService;
exports.getSession = getSession;
let getAllSession = sessionService_1.getAllSessionService;
exports.getAllSession = getAllSession;
let updateSession = sessionService_1.updateSessionService;
exports.updateSession = updateSession;
let deleteSession = sessionService_1.deleteSessionService;
exports.deleteSession = deleteSession;
