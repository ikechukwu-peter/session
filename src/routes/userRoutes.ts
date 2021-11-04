import express from 'express';
import passport from 'passport';
import { signup, login, resetPassword, forgotPassword } from '../controllers/authController';

const router = express.Router();

router.post(
    '/register', signup
)

router.post(
    '/login', login
)

router.patch(
    '/resetpassword', passport.authenticate('jwt', { session: false }), resetPassword
)

router.patch(
    '/forgotpassword', forgotPassword
)


export default router;