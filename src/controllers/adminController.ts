//@ts-ignore
import {
    getUserService,
    getUsersService,
    updateUsersService,
    deleteUserService
} from '../services/adminService';

/**
 * Admin can do more than is here.
 * Admin can facilitate session too check the admin routes.
 */

let getUser = getUserService;
let getUsers = getUsersService;
let updateUser =    updateUsersService;
let deleteUser= deleteUserService;

export {
    getUser,
    getUsers,
    updateUser,
    deleteUser,
}

