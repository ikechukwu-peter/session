import express from 'express';
import passport from 'passport';

import { checkUser, checkUserSession } from '../util/checkRole';
import { createSession, getSession, updateSession, deleteSession } from '../controllers/sessionController';
import { validateBooking } from '../validation/validator'
const router = express.Router();

router.post(
    '/create', passport.authenticate('jwt', { session: false }), validateBooking,  checkUser, createSession
)

router.get(
    '/get/:id', passport.authenticate('jwt', { session: false }), checkUser, checkUserSession, getSession
)
router.put(
    '/update/:id', passport.authenticate('jwt', { session: false }), checkUser, checkUserSession, updateSession
)
router.delete(
    '/delete/:id', passport.authenticate('jwt', { session: false }), checkUser, checkUserSession, deleteSession
)

export default router;
