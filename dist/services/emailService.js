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
Object.defineProperty(exports, "__esModule", { value: true });
const sgMail = require("@sendgrid/mail");
const sendEmail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: options.email,
        from: process.env.EMAIL_FROM,
        subject: options.subject,
        text: options.message,
        html: options.html,
    };
    yield sgMail.send(msg);
});
exports.default = sendEmail;
