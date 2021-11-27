"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = exports.updateUsersService = exports.getUsersService = exports.getUserService = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const handler_1 = require("../util/handler");
let getUserService = handler_1.getOne(userModel_1.default);
exports.getUserService = getUserService;
let getUsersService = handler_1.getAll(userModel_1.default);
exports.getUsersService = getUsersService;
let updateUsersService = handler_1.updateOne(userModel_1.default);
exports.updateUsersService = updateUsersService;
let deleteUserService = handler_1.deleteOne(userModel_1.default);
exports.deleteUserService = deleteUserService;
