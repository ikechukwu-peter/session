"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUsers = exports.getUser = void 0;
//@ts-ignore
const adminService_1 = require("../services/adminService");
let getUser = adminService_1.getUserService;
exports.getUser = getUser;
let getUsers = adminService_1.getUsersService;
exports.getUsers = getUsers;
let updateUser = adminService_1.updateUsersService;
exports.updateUser = updateUser;
let deleteUser = adminService_1.deleteUserService;
exports.deleteUser = deleteUser;
/**
 *
 * Admin can do more than is here.
 * Admin can facilitate session too check the admin routes.
 */ 
