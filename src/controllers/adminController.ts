//@ts-ignore
import {
    getUserService,
    getUsersService,
    updateUsersService,
    deleteUserService
} from '../services/adminService';


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

/**
 * 
 * Admin can do more than is here.
 * Admin can facilitate session too check the admin routes.
 */