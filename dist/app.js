"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
//@ts-ignore
const xss_clean_1 = __importDefault(require("xss-clean"));
const compression_1 = __importDefault(require("compression"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const sessionRoutes_1 = __importDefault(require("./routes/sessionRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const passport_2 = __importDefault(require("./config/passport"));
const app = express_1.default();
// Set security HTTP headers
app.use(helmet_1.default());
// Body parser, reading data from body into req.body
app.use(express_1.default.json({ limit: "10kb" }));
app.use(express_1.default.urlencoded({ extended: true }));
// Data sanitization against NoSQL query injection
app.use(express_mongo_sanitize_1.default());
// Data sanitization against XSS
app.use(xss_clean_1.default());
//compress app
app.use(compression_1.default());
app.use(passport_1.default.initialize());
// Passport Config
passport_2.default(passport_1.default);
//CORS enable
app.use(cors_1.default());
// 3) ROUTES
//Respond to ping
app.get('/', (req, res) => [
    res.send('Pong')
]);
app.use("/users", userRoutes_1.default);
app.use("/session", sessionRoutes_1.default);
app.use("/admin", adminRoutes_1.default);
//Handle all undefined route hit by the client
app.all("*", (req, res, next) => {
    res.status(404).json(`Can't find ${req.originalUrl} on this server!`);
});
exports.default = app;
