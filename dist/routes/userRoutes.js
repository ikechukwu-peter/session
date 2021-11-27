"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.post('/register', authController_1.signup);
router.post('/login', authController_1.login);
router.patch('/resetpassword', passport_1.default.authenticate('jwt', { session: false }), authController_1.resetPassword);
router.patch('/forgotpassword', authController_1.forgotPassword);
exports.default = router;
