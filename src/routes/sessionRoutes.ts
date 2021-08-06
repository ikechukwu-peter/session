import express from 'express';
import passport from 'passport';


import { createSession, getSession , updateSession, deleteSession} from '../controllers/sessionController'
// import  loginController from '../controllers/loginController'


const router = express.Router();

router.post(
    '/createsession', passport.authenticate('jwt', { session: false }), createSession
)

router.get(
    '/getsession/:id', passport.authenticate('jwt', { session: false }), getSession
)
router.put(
    '/updatesession/:id', passport.authenticate('jwt', { session: false }), updateSession
)
router.delete(
    '/deletesession/:id', passport.authenticate('jwt', { session: false }), deleteSession
)

export default router;

/*****
 *
 * /admin/get_all
 * /admin/get_one
 * /admin/delete_one
 * /admin/update_one
 *
 */