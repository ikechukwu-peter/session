import userModel from '../models/userModel';
import {getOne, getAll, deleteOne, updateOne} from '../util/handler'

let getUserService = getOne(userModel)
let getUsersService = getAll(userModel)
let updateUsersService = updateOne(userModel)
let deleteUserService = deleteOne(userModel)

export {
    getUserService,
    getUsersService,
    updateUsersService,
    deleteUserService
}