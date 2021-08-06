import express from 'express';
import passport from 'passport';


import { createSession } from '../controllers/sessionController'
// import  loginController from '../controllers/loginController'


const router = express.Router();

router.post(
    '/create', passport.authenticate('jwt', { session: false }), createSession
)

// router.post(
//     '/login', loginController
// )

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