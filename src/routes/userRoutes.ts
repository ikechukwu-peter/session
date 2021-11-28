import express from 'express';
import passport from 'passport';
import { signup, login, resetPassword, forgotPassword } from '../controllers/authController';
import {validateUserLogin} from '../validation/validator'
const router = express.Router();

router.post(
    '/register', signup
)

router.post(
    '/login', validateUserLogin,  login
)

router.patch(
    '/resetpassword', passport.authenticate('jwt', { session: false }), resetPassword
)

router.patch(
    '/forgotpassword', forgotPassword
)


export default router;