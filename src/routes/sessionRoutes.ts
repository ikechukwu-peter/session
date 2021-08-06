import express from 'express';
import passport from 'passport';

import {checkUser} from '../util/checkRole';
import { createSession, getSession, updateSession, deleteSession } from '../controllers/sessionController';

const router = express.Router();

router.post(
    '/create', passport.authenticate('jwt', { session: false }), checkUser, createSession
)

router.get(
    '/get/:id', passport.authenticate('jwt', { session: false }), checkUser, getSession
)
router.put(
    '/update/:id', passport.authenticate('jwt', { session: false }),checkUser,  updateSession
)
router.delete(
    '/delete/:id', passport.authenticate('jwt', { session: false }), checkUser,deleteSession
)

export default router;
