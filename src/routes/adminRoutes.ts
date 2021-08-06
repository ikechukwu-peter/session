
import express from 'express';
import passport from 'passport';
import {checkAdmin} from '../util/checkRole';
import { getAllSession, getSession, updateSession, deleteSession } from '../controllers/sessionController'
import { getUser, getUsers, updateUser, deleteUser } from '../controllers/adminController'

const router = express.Router();
router.get(
    '/getuser/:id', passport.authenticate('jwt', { session: false }),
    checkAdmin, getUser
)
router.get(
    '/getusers', passport.authenticate('jwt', { session: false }),
    checkAdmin, getUsers
)
router.put(
    '/updateuser/:id', passport.authenticate('jwt', { session: false }),
    checkAdmin, updateUser
)
router.delete(
    '/deleteuser/:id', passport.authenticate('jwt', { session: false }),
    checkAdmin, deleteUser
)

router.get(
    '/adminget/:id', passport.authenticate('jwt', { session: false }),
    checkAdmin, getSession
)
router.get(
    '/admingetall', passport.authenticate('jwt', { session: false }),
    checkAdmin, getAllSession
)
router.put(
    '/adminupdate/:id', passport.authenticate('jwt', { session: false }),
    checkAdmin, updateSession
)
router.delete(
    '/admindelete/:id', passport.authenticate('jwt', { session: false }),
    checkAdmin, deleteSession
)

export default router;
