import express from 'express';


import  registerController from '../controllers/registerController'
import  loginController from '../controllers/loginController'


const router = express.Router();

router.post(
    '/register', registerController
)

router.post(
    '/login', loginController
)

export default router;

/*****
 * /users/createsession
 * /users/getsession
 * /users/deletesession
 * /users/updatesession
 * 
 * 
 * /admin/get_all
 * /admin/get_one
 * /admin/delete_one
 * /admin/update_one
 * 
 */