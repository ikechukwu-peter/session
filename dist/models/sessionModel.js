"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slug_1 = __importDefault(require("slug"));
const schema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A Session must belong to a user.']
    },
    title: {
        type: String, trim: true,
        required: [true, "A session must have a title"],
        maxlength: [60, 'A session title must have less or equal then 60 characters'],
        minlength: [10, 'A session title must have more or equal then 10 characters']
    },
    body: {
        type: String,
        required: [true, "A session must have a body"],
        maxlength: [400, 'A session title must have less or equal then 400 characters'],
        minlength: [50, 'A session title must have more or equal then 10 characters']
    },
    date: Date,
    slug: String,
    dateCreated: {
        type: Date,
        default: Date.now(),
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
schema.index({ slug: 1 });
schema.pre('save', function (next) {
    this.slug = slug_1.default(this.title, { lower: true });
    next();
});
schema.pre(/^findByIdAndUpdate/, function (next) {
    this.slug = slug_1.default(this.title, { lower: true });
    next();
});
schema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
    });
    next();
});
// 3. Create a Model.
const sessionModel = mongoose_1.model('Session', schema);
exports.default = sessionModel;
