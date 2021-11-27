"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// 2. Create a Schema corresponding to the document interface.
const schema = new mongoose_1.Schema({
    username: { type: String, required: true, lower: true },
    email: {
        type: String, required: true, unique: true,
        lowercase: true,
        //validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: { type: String, required: true, select: false },
    role: {
        type: String,
        enum: ["client", "admin"],
        default: "client",
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
    },
});
schema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Only run this function if password was actually modified
        if (!this.isModified("password"))
            return next();
        // Hash the password with cost of 12
        this.password = yield bcryptjs_1.default.hash(this.password, 12);
        next();
    });
});
schema.methods.comparePassword = function (candidatePassword, userPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(candidatePassword, userPassword);
    });
};
// 3. Create a Model.
const UserModel = mongoose_1.model('User', schema);
exports.default = UserModel;
