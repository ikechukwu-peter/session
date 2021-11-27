"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const checkRole_1 = require("../util/checkRole");
const sessionController_1 = require("../controllers/sessionController");
const router = express_1.default.Router();
router.post('/create', passport_1.default.authenticate('jwt', { session: false }), checkRole_1.checkUser, sessionController_1.createSession);
router.get('/get/:id', passport_1.default.authenticate('jwt', { session: false }), checkRole_1.checkUser, checkRole_1.checkUserSession, sessionController_1.getSession);
router.put('/update/:id', passport_1.default.authenticate('jwt', { session: false }), checkRole_1.checkUser, checkRole_1.checkUserSession, sessionController_1.updateSession);
router.delete('/delete/:id', passport_1.default.authenticate('jwt', { session: false }), checkRole_1.checkUser, checkRole_1.checkUserSession, sessionController_1.deleteSession);
exports.default = router;
