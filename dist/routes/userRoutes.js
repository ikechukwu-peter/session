"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registerController_1 = __importDefault(require("../controllers/registerController"));
const loginController_1 = __importDefault(require("../controllers/loginController"));
const router = express_1.default.Router();
router.post('/register', registerController_1.default);
router.post('/login', loginController_1.default);
exports.default = router;
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
