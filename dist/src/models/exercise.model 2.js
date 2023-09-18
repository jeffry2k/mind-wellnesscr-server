"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const exerciseSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        max: 200,
    },
    observaciones: {
        type: String,
        optional: true,
        trim: true,
    },
    urlVideo: {
        type: String,
        optional: true,
        trim: true,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Exercise", exerciseSchema);
