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
exports.deleteSessionService = exports.updateSessionService = exports.getSessionService = exports.createSessionService = void 0;
const sessionModel_1 = __importDefault(require("../models/sessionModel"));
const handler_1 = require("../util/handler");
let createSessionService = (sessionData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body, date } = sessionData;
    let user = userId.id;
    try {
        const session = yield sessionModel_1.default.create({ user, title, body, date });
        return Promise.resolve(session);
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.createSessionService = createSessionService;
let getSessionService = handler_1.getOne(sessionModel_1.default);
exports.getSessionService = getSessionService;
let updateSessionService = handler_1.updateOne(sessionModel_1.default);
exports.updateSessionService = updateSessionService;
let deleteSessionService = handler_1.deleteOne(sessionModel_1.default);
exports.deleteSessionService = deleteSessionService;
