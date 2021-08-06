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
exports.getAll = exports.getOne = exports.updateOne = exports.createOne = exports.deleteOne = void 0;
let deleteOne = (Model) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield Model.findByIdAndDelete(req.params.id);
        if (!doc) {
            return res.status(404).json({
                status: "fail",
                message: "No document found",
            });
        }
        res.status(204).json({
            status: "success",
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            status: "fail",
            message: "Something went wrong, try again",
        });
    }
});
exports.deleteOne = deleteOne;
let updateOne = (Model) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!doc) {
            return res.status(404).json({
                status: "fail",
                message: "No document found with that ID",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            status: "fail",
            err,
            message: "Something went wrong, try again",
        });
    }
});
exports.updateOne = updateOne;
let createOne = (Model) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield Model.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            status: "fail",
            message: "Something went wrong, try again",
        });
    }
});
exports.createOne = createOne;
let getOne = (Model) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield Model.findById(req.params.id);
        if (!doc) {
            return res.status(404).json({
                status: "fail",
                message: "No document found with that ID",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                doc,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            status: "fail",
            message: "Something went wrong, try again",
        });
    }
});
exports.getOne = getOne;
let getAll = (Model) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield Model.find();
        // SEND RESPONSE
        res.status(200).json({
            status: "success",
            results: doc.length,
            data: {
                doc,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            status: "fail",
            message: "Something went wrong, try again",
        });
    }
});
exports.getAll = getAll;
